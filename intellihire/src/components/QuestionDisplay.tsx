import React from 'react';
import { InterviewQuestion } from '../types';
import { HelpCircle, Tag, Clock } from 'lucide-react';

interface QuestionDisplayProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionDisplay({ question, questionNumber, totalQuestions }: QuestionDisplayProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-green-100 text-green-800';
      case 'system-design': return 'bg-purple-100 text-purple-800';
      case 'coding': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(question.type)}`}>
              {question.type.replace('-', ' ')}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {question.category}
            </span>
          </div>
          <span className="text-sm text-gray-600 capitalize">{question.difficulty} Level</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Helpful Tips */}
      <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-400">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Take your time to think through your answer. Consider providing examples where relevant and explain your reasoning.
        </p>
      </div>
    </div>
  );
}