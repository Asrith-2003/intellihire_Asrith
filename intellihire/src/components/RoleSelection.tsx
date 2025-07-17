import React from 'react';
import { Role, Difficulty } from '../types';
import { Code, Database, Globe, BarChart, Users, Server, Play, TrendingUp } from 'lucide-react';

interface RoleSelectionProps {
  selectedRole: Role;
  selectedDifficulty: Difficulty;
  onRoleChange: (role: Role) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
  onViewProgress: () => void;
}

const roleIcons = {
  frontend: Globe,
  backend: Server,
  fullstack: Code,
  'data-science': BarChart,
  'product-manager': Users,
  devops: Database
};

const roleDescriptions = {
  frontend: 'User interfaces, React, CSS, JavaScript',
  backend: 'APIs, databases, server-side logic',
  fullstack: 'Full-stack development, both frontend and backend',
  'data-science': 'Machine learning, data analysis, Python',
  'product-manager': 'Product strategy, user research, roadmaps',
  devops: 'CI/CD, infrastructure, deployment, monitoring'
};

export function RoleSelection({
  selectedRole,
  selectedDifficulty,
  onRoleChange,
  onDifficultyChange,
  onStart,
  onViewProgress
}: RoleSelectionProps) {
  return (
    <div className="space-y-8">
      {/* Role Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(roleIcons).map(([role, Icon]) => (
            <button
              key={role}
              onClick={() => onRoleChange(role as Role)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedRole === role
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-3 ${
                selectedRole === role ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-800 capitalize mb-2">
                {role.replace('-', ' ')}
              </h3>
              <p className="text-sm text-gray-600">
                {roleDescriptions[role as keyof typeof roleDescriptions]}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Difficulty Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['junior', 'mid-level', 'senior'] as Difficulty[]).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedDifficulty === difficulty
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                selectedDifficulty === difficulty ? 'bg-purple-500' : 'bg-gray-300'
              }`}>
                <span className={`text-lg font-bold ${
                  selectedDifficulty === difficulty ? 'text-white' : 'text-gray-600'
                }`}>
                  {difficulty === 'junior' ? 'J' : difficulty === 'mid-level' ? 'M' : 'S'}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 capitalize mb-2">
                {difficulty.replace('-', ' ')}
              </h3>
              <p className="text-sm text-gray-600">
                {difficulty === 'junior' ? '0-2 years experience' : 
                 difficulty === 'mid-level' ? '2-5 years experience' : 
                 '5+ years experience'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-5 h-5" />
          Start Interview
        </button>
        
        <button
          onClick={onViewProgress}
          className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border"
        >
          <TrendingUp className="w-5 h-5" />
          View Progress
        </button>
      </div>
    </div>
  );
}