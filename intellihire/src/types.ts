export type Role = 'frontend' | 'backend' | 'fullstack' | 'data-science' | 'product-manager' | 'devops';

export type Difficulty = 'junior' | 'mid-level' | 'senior';

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral' | 'system-design' | 'coding';
  category: string;
  difficulty: Difficulty;
  expectedKeywords: string[];
  sampleAnswer?: string;
  followUpQuestions?: string[];
}

export interface UserAnswer {
  question: InterviewQuestion;
  answer: string;
  timestamp: Date;
  score: number;
  feedback: string;
}

export interface InterviewSession {
  id: string;
  role: Role;
  difficulty: Difficulty;
  questions: InterviewQuestion[];
  answers: UserAnswer[];
  startTime: Date;
  endTime: Date | null;
  averageScore: number;
}

export interface AnswerEvaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  keywordsCovered: string[];
  missedKeywords: string[];
}