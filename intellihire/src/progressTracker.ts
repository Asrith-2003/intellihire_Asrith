import { InterviewSession } from './types';

export class ProgressTracker {
  static calculateStats(sessions: InterviewSession[]) {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        totalQuestions: 0,
        strongestRole: null,
        weakestRole: null,
        improvement: 0,
        recentSessions: []
      };
    }

    const totalSessions = sessions.length;
    const totalQuestions = sessions.reduce((sum, session) => sum + session.answers.length, 0);
    const averageScore = sessions.reduce((sum, session) => sum + session.averageScore, 0) / totalSessions;

    // Calculate role performance
    const rolePerformance = sessions.reduce((acc, session) => {
      if (!acc[session.role]) {
        acc[session.role] = { totalScore: 0, count: 0 };
      }
      acc[session.role].totalScore += session.averageScore;
      acc[session.role].count += 1;
      return acc;
    }, {} as Record<string, { totalScore: number; count: number }>);

    const roleAverages = Object.entries(rolePerformance).map(([role, data]) => ({
      role,
      average: data.totalScore / data.count
    }));

    const strongestRole = roleAverages.reduce((prev, current) => 
      prev.average > current.average ? prev : current
    );

    const weakestRole = roleAverages.reduce((prev, current) => 
      prev.average < current.average ? prev : current
    );

    // Calculate improvement (last 5 sessions vs first 5 sessions)
    const recentSessions = sessions.slice(-5);
    const oldSessions = sessions.slice(0, 5);
    const recentAverage = recentSessions.reduce((sum, s) => sum + s.averageScore, 0) / recentSessions.length;
    const oldAverage = oldSessions.reduce((sum, s) => sum + s.averageScore, 0) / oldSessions.length;
    const improvement = recentAverage - oldAverage;

    return {
      totalSessions,
      averageScore: Math.round(averageScore * 10) / 10,
      totalQuestions,
      strongestRole: strongestRole.role,
      weakestRole: weakestRole.role,
      improvement: Math.round(improvement * 10) / 10,
      recentSessions: sessions.slice(-10).reverse()
    };
  }

  static getPerformanceByDifficulty(sessions: InterviewSession[]) {
    const difficultyPerformance = sessions.reduce((acc, session) => {
      if (!acc[session.difficulty]) {
        acc[session.difficulty] = { totalScore: 0, count: 0 };
      }
      acc[session.difficulty].totalScore += session.averageScore;
      acc[session.difficulty].count += 1;
      return acc;
    }, {} as Record<string, { totalScore: number; count: number }>);

    return Object.entries(difficultyPerformance).map(([difficulty, data]) => ({
      difficulty,
      average: Math.round((data.totalScore / data.count) * 10) / 10,
      count: data.count
    }));
  }
}