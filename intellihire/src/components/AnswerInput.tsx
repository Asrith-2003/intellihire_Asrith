import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2, Type } from 'lucide-react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSpeechResult: (transcript: string) => void;
  isEvaluating: boolean;
}

export function AnswerInput({
  value,
  onChange,
  onSubmit,
  isRecording,
  onToggleRecording,
  onSpeechResult,
  isEvaluating
}: AnswerInputProps) {
  const [inputMode, setInputMode] = useState<'text' | 'speech'>('text');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(supported);
  }, []);

  const handleSubmit = () => {
    if (value.trim() && !isEvaluating) {
      onSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      {/* Input Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Answer</h3>
        {isSupported && (
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                inputMode === 'text'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Type className="w-4 h-4" />
              Type
            </button>
            <button
              onClick={() => setInputMode('speech')}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                inputMode === 'speech'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mic className="w-4 h-4" />
              Speak
            </button>
          </div>
        )}
      </div>

      {/* Text Input */}
      {inputMode === 'text' && (
        <div className="space-y-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here... (Ctrl+Enter to submit)"
            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isEvaluating}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {value.length} characters
            </span>
            <span className="text-sm text-gray-500">
              Ctrl+Enter to submit
            </span>
          </div>
        </div>
      )}

      {/* Speech Input */}
      {inputMode === 'speech' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <button
              onClick={onToggleRecording}
              disabled={isEvaluating}
              className={`p-8 rounded-full transition-all duration-300 transform hover:scale-105 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 shadow-lg'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </p>
          </div>

          {value && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700">{value}</p>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isEvaluating}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            !value.trim() || isEvaluating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isEvaluating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Evaluating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Answer
            </>
          )}
        </button>
      </div>
    </div>
  );
}