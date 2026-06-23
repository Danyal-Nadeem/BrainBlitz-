export type Difficulty = 'easy' | 'medium' | 'hard';

export type CategoryId =
  | 'general'
  | 'tech'
  | 'science'
  | 'popculture'
  | 'math'
  | 'history';

export type Screen = 'home' | 'loading' | 'quiz' | 'result' | 'error';

export type OptionState = 'idle' | 'correct' | 'wrong' | 'highlight' | 'disabled';

export interface Question {
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
}

export interface ShuffledQuestion extends Question {
  originalAnswer: number;
}

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  count: number;
}

export interface AnswerRecord {
  question: string;
  options: string[];
  selected: number | null;
  correct: number;
  isCorrect: boolean;
  points: number;
}

export interface QuizState {
  category: 'generated' | 'error' | null;
  topic: string;
  difficulty: Difficulty;
  questions: ShuffledQuestion[];
  current: number;
  score: number;
  answers: AnswerRecord[];
  answered: boolean;
  selectedIndex: number | null;
}