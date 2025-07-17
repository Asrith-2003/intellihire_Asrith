import { InterviewQuestion, AnswerEvaluation, Difficulty } from './types';

export async function evaluateAnswer(
  question: InterviewQuestion,
  answer: string,
  difficulty: Difficulty
): Promise<AnswerEvaluation> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const normalizedAnswer = answer.toLowerCase();
  const keywordsCovered = question.expectedKeywords.filter(keyword => 
    normalizedAnswer.includes(keyword.toLowerCase())
  );
  
  const missedKeywords = question.expectedKeywords.filter(keyword => 
    !normalizedAnswer.includes(keyword.toLowerCase())
  );

  // Base score calculation
  const keywordCoverage = keywordsCovered.length / question.expectedKeywords.length;
  const answerLength = answer.length;
  const lengthScore = Math.min(answerLength / 200, 1); // Optimal length around 200 characters
  
  // Difficulty adjustment
  const difficultyMultiplier = {
    junior: 1.2,
    'mid-level': 1.0,
    senior: 0.8
  }[difficulty];

  let baseScore = (keywordCoverage * 0.7 + lengthScore * 0.3) * 10 * difficultyMultiplier;
  baseScore = Math.max(3, Math.min(10, baseScore)); // Ensure score is between 3-10

  // Generate feedback
  const feedback = generateFeedback(question, answer, keywordsCovered, missedKeywords, baseScore);
  const strengths = generateStrengths(keywordsCovered, answerLength);
  const improvements = generateImprovements(missedKeywords, answerLength);

  return {
    score: Math.round(baseScore * 10) / 10,
    feedback,
    strengths,
    improvements,
    keywordsCovered,
    missedKeywords
  };
}

function generateFeedback(
  question: InterviewQuestion,
  answer: string,
  keywordsCovered: string[],
  missedKeywords: string[],
  score: number
): string {
  const scoreRanges = [
    { min: 9, feedback: "Excellent answer! You demonstrated comprehensive understanding and covered all key concepts." },
    { min: 7, feedback: "Good answer! You showed solid understanding with room for minor improvements." },
    { min: 5, feedback: "Decent answer. You covered some key points but missed important concepts." },
    { min: 3, feedback: "Basic answer. You should expand on key concepts and provide more detail." },
    { min: 0, feedback: "Your answer needs significant improvement. Focus on the core concepts." }
  ];

  const baseFeedback = scoreRanges.find(range => score >= range.min)?.feedback || 
    "Keep practicing and focus on understanding the fundamental concepts.";

  let specificFeedback = "";
  if (keywordsCovered.length > 0) {
    specificFeedback += ` You correctly mentioned: ${keywordsCovered.join(', ')}.`;
  }
  
  if (missedKeywords.length > 0) {
    specificFeedback += ` Consider discussing: ${missedKeywords.slice(0, 3).join(', ')}.`;
  }

  return baseFeedback + specificFeedback;
}

function generateStrengths(keywordsCovered: string[], answerLength: number): string[] {
  const strengths = [];
  
  if (keywordsCovered.length >= 3) {
    strengths.push("Covered multiple key concepts");
  }
  
  if (answerLength >= 150) {
    strengths.push("Provided detailed explanation");
  }
  
  if (answerLength >= 50 && answerLength <= 300) {
    strengths.push("Good answer length");
  }
  
  // Add some random positive feedback
  const positiveTraits = [
    "Clear communication",
    "Structured response",
    "Relevant examples",
    "Good understanding",
    "Logical flow"
  ];
  
  if (strengths.length < 2) {
    strengths.push(...positiveTraits.slice(0, 2 - strengths.length));
  }
  
  return strengths;
}

function generateImprovements(missedKeywords: string[], answerLength: number): string[] {
  const improvements = [];
  
  if (missedKeywords.length > 0) {
    improvements.push(`Include discussion of: ${missedKeywords.slice(0, 2).join(', ')}`);
  }
  
  if (answerLength < 50) {
    improvements.push("Provide more detailed explanation");
  }
  
  if (answerLength > 400) {
    improvements.push("Be more concise in your response");
  }
  
  // Add some general improvement suggestions
  const generalImprovements = [
    "Add practical examples",
    "Explain the 'why' behind concepts",
    "Consider edge cases",
    "Mention real-world applications"
  ];
  
  if (improvements.length < 2) {
    improvements.push(...generalImprovements.slice(0, 2 - improvements.length));
  }
  
  return improvements;
}