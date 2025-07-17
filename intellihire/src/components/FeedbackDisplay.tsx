import React from 'react';
import { AnswerEvaluation } from '../types';
import { CheckCircle, XCircle, TrendingUp, ArrowRight, RotateCcw } from 'lucide-react';

interface FeedbackDisplayProps {
  evaluation: AnswerEvaluation;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
}

export function FeedbackDisplay({ evaluation, onNext, onFinish, isLastQuestion }: FeedbackDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Display */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${getScoreBackground(evaluation.score)}`}>
          <span className={`text-3xl font-bold ${getScoreColor(evaluation.score)}`}>
            {evaluation.score}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {evaluation.score >= 8 ? 'Excellent!' : evaluation.score >= 6 ? 'Good Job!' : 'Keep Practicing!'}
        </h2>
        <p className="text-gray-600">
          Score: {evaluation.score}/10
        </p>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Feedback</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          {evaluation.feedback}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {evaluation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="space-y-3">
            <h4 className="font-semibold text-orange-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {evaluation.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Keywords Analysis */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Keywords Analysis</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-green-700 mb-2">Keywords Covered:</h5>
              <div className="flex flex-wrap gap-2">
                {evaluation.keywordsCovered.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-red-700 mb-2">Missed Keywords:</h5>
              <div className="flex flex-wrap gap-2">
                {evaluation.missedKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!isLastQuestion ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Next Question
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Finish Interview
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}