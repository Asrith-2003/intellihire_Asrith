import React from 'react';
import { InterviewSession } from '../types';
import { ProgressTracker } from '../progressTracker';
import { TrendingUp, Award, Clock, Target, Play, Calendar } from 'lucide-react';

interface ProgressDashboardProps {
  sessions: InterviewSession[];
  onStartNew: () => void;
}

export function ProgressDashboard({ sessions, onStartNew }: ProgressDashboardProps) {
  const stats = ProgressTracker.calculateStats(sessions);
  const difficultyStats = ProgressTracker.getPerformanceByDifficulty(sessions);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

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
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your interview performance and improvement</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No sessions yet</h3>
          <p className="text-gray-600 mb-6">Start your first interview to see your progress here</p>
          <button
            onClick={onStartNew}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Your First Interview
          </button>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Sessions</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalSessions}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Avg Score</h3>
              </div>
              <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
                {stats.averageScore}/10
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Questions</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalQuestions}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Improvement</h3>
              </div>
              <p className={`text-2xl font-bold ${stats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.improvement >= 0 ? '+' : ''}{stats.improvement}
              </p>
            </div>
          </div>

          {/* Performance by Difficulty */}
          {difficultyStats.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Performance by Difficulty</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficultyStats.map((stat) => (
                  <div key={stat.difficulty} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 capitalize mb-2">{stat.difficulty.replace('-', ' ')}</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-bold ${getScoreColor(stat.average)}`}>
                        {stat.average}/10
                      </span>
                      <span className="text-sm text-gray-600">{stat.count} sessions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Performance */}
          {stats.strongestRole && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Role Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Strongest Role</h4>
                  <p className="text-green-700 capitalize">{stats.strongestRole.replace('-', ' ')}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Focus Area</h4>
                  <p className="text-red-700 capitalize">{stats.weakestRole?.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Sessions</h3>
            <div className="space-y-3">
              {stats.recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getScoreBackground(session.averageScore)}`}>
                      <span className={`font-bold ${getScoreColor(session.averageScore)}`}>
                        {session.averageScore}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 capitalize">
                        {session.role.replace('-', ' ')} - {session.difficulty.replace('-', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {session.answers.length} questions answered
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(session.startTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onStartNew}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mx-auto"
            >
              <Play className="w-5 h-5" />
              Start New Interview
            </button>
          </div>
        </>
      )}
    </div>
  );
}