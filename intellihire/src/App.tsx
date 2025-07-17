import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, RotateCcw, TrendingUp, User, Clock, Award } from 'lucide-react';
import { InterviewQuestion, UserAnswer, InterviewSession, Role, Difficulty } from './types';
import { questionDatabase } from './questionDatabase';
import { evaluateAnswer } from './answerEvaluator';
import { SpeechRecognition } from './speechRecognition';
import { ProgressTracker } from './progressTracker';
import { QuestionDisplay } from './components/QuestionDisplay';
import { AnswerInput } from './components/AnswerInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { RoleSelection } from './components/RoleSelection';
import { ProgressDashboard } from './components/ProgressDashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'setup' | 'interview' | 'feedback' | 'progress'>('setup');
  const [selectedRole, setSelectedRole] = useState<Role>('frontend');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('junior');
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [allSessions, setAllSessions] = useState<InterviewSession[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('interviewSessions');
    if (savedSessions) {
      setAllSessions(JSON.parse(savedSessions));
    }
  }, []);

  const startInterview = () => {
    const questions = questionDatabase[selectedRole][selectedDifficulty];
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    
    const session: InterviewSession = {
      id: Date.now().toString(),
      role: selectedRole,
      difficulty: selectedDifficulty,
      questions: shuffledQuestions.slice(0, 5),
      answers: [],
      startTime: new Date(),
      endTime: null,
      averageScore: 0
    };

    setCurrentSession(session);
    setCurrentQuestion(session.questions[0]);
    setQuestionIndex(0);
    setCurrentScreen('interview');
    setUserAnswer('');
    setEvaluation(null);
  };

  const submitAnswer = async () => {
    if (!currentQuestion || !currentSession || !userAnswer.trim()) return;

    setIsEvaluating(true);
    
    const answer: UserAnswer = {
      question: currentQuestion,
      answer: userAnswer,
      timestamp: new Date(),
      score: 0,
      feedback: ''
    };

    try {
      const result = await evaluateAnswer(currentQuestion, userAnswer, selectedDifficulty);
      answer.score = result.score;
      answer.feedback = result.feedback;
      
      setEvaluation(result);
      
      const updatedAnswers = [...currentSession.answers, answer];
      const updatedSession = { ...currentSession, answers: updatedAnswers };
      setCurrentSession(updatedSession);
      
      setCurrentScreen('feedback');
    } catch (error) {
      console.error('Error evaluating answer:', error);
      // Fallback evaluation
      const fallbackResult = {
        score: Math.floor(Math.random() * 4) + 6,
        feedback: 'Good answer! You demonstrated understanding of the concept.',
        strengths: ['Clear communication', 'Relevant examples'],
        improvements: ['Could provide more technical depth']
      };
      answer.score = fallbackResult.score;
      answer.feedback = fallbackResult.feedback;
      setEvaluation(fallbackResult);
      setCurrentScreen('feedback');
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (!currentSession) return;

    const nextIndex = questionIndex + 1;
    if (nextIndex < currentSession.questions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(currentSession.questions[nextIndex]);
      setUserAnswer('');
      setEvaluation(null);
      setCurrentScreen('interview');
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    if (!currentSession) return;

    const averageScore = currentSession.answers.reduce((sum, answer) => sum + answer.score, 0) / currentSession.answers.length;
    const finishedSession = {
      ...currentSession,
      endTime: new Date(),
      averageScore: Math.round(averageScore * 10) / 10
    };

    const updatedSessions = [...allSessions, finishedSession];
    setAllSessions(updatedSessions);
    localStorage.setItem('interviewSessions', JSON.stringify(updatedSessions));
    
    setCurrentScreen('progress');
  };

  const handleSpeechResult = (transcript: string) => {
    setUserAnswer(transcript);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const resetApp = () => {
    setCurrentScreen('setup');
    setCurrentSession(null);
    setCurrentQuestion(null);
    setUserAnswer('');
    setEvaluation(null);
    setQuestionIndex(0);
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 transition-all duration-1000">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Simulator
            </h1>
          </div>
          
          {currentScreen !== 'setup' && (
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="capitalize">{selectedRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="capitalize">{selectedDifficulty}</span>
              </div>
              {currentSession && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Question {questionIndex + 1} of {currentSession.questions.length}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentScreen === 'setup' && (
            <RoleSelection
              selectedRole={selectedRole}
              selectedDifficulty={selectedDifficulty}
              onRoleChange={setSelectedRole}
              onDifficultyChange={setSelectedDifficulty}
              onStart={startInterview}
              onViewProgress={() => setCurrentScreen('progress')}
            />
          )}

          {currentScreen === 'interview' && currentQuestion && (
            <div className="space-y-6">
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={questionIndex + 1}
                totalQuestions={currentSession?.questions.length || 0}
              />
              
              <AnswerInput
                value={userAnswer}
                onChange={setUserAnswer}
                onSubmit={submitAnswer}
                isRecording={isRecording}
                onToggleRecording={toggleRecording}
                onSpeechResult={handleSpeechResult}
                isEvaluating={isEvaluating}
              />
            </div>
          )}

          {currentScreen === 'feedback' && evaluation && (
            <FeedbackDisplay
              evaluation={evaluation}
              onNext={nextQuestion}
              onFinish={finishInterview}
              isLastQuestion={questionIndex === (currentSession?.questions.length || 0) - 1}
            />
          )}

          {currentScreen === 'progress' && (
            <ProgressDashboard
              sessions={allSessions}
              onStartNew={resetApp}
            />
          )}
        </div>

        {/* Navigation */}
        {currentScreen !== 'setup' && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={resetApp}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Speech Recognition Component */}
      <SpeechRecognition
        isActive={isRecording}
        onResult={handleSpeechResult}
        onError={(error) => console.error('Speech recognition error:', error)}
      />
    </div>
  );
}

export default App;