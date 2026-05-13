export type CellColor = 'correct' | 'present' | 'absent';

export type Clue = {
  letter: string;
  color: CellColor;
};

export type AIStrategy =
  | 'eliminate_likely'
  | 'eliminate_likely_with_answer'
  | 'punt_likely'
  | 'play_likely'
  | 'eliminate_unlikely'
  | 'eliminate_unlikely_with_answer'
  | 'punt_unlikely'
  | 'play_unlikely';

export type LuckLevel = 'literally_incredible' | 'unbelievably_lucky' | 'super_lucky' | 'very_lucky' | 'lucky' | 'neutral' | 'unlucky' | 'very_unlucky' | 'oh_god';

export type TurnAnalysis = {
  guess: string;
  clue: Clue[];
  remainingBefore: number;
  remainingLikelyBefore: number;
  remainingAfter: number;
  remainingLikelyAfter: number;
  remainingWords: string[];
  avgRemaining: number;
  avgLikelyRemaining: number;
  luck: { level: LuckLevel; rating: 'lucky' | 'unlucky' | 'neutral'; description: string };
  guessQuality: number;
  aiRecommendation: string;
  aiClue: Clue[];
  aiStrategy: AIStrategy;
  aiAvgRemaining: number;
  aiAvgLikelyRemaining: number;
  aiGuessQuality: number;
  aiActualRemaining: number;
  aiActualLikelyRemaining: number;
  aiLuck: { level: LuckLevel; rating: 'lucky' | 'unlucky' | 'neutral' };
  isPossibleAnswer: boolean;
  unusedClues: string[];
  hardModeViolations: string[];
  isLikelyWord: boolean;
  commentary: string;
};

export type AIPlayTurn = {
  guess: string;
  clue: Clue[];
  strategy: AIStrategy;
  avgRemaining: number;
  avgLikelyRemaining: number;
  guessQuality: number;
  actualRemaining: number;
  actualLikelyRemaining: number;
  luck: { level: LuckLevel; rating: 'lucky' | 'unlucky' | 'neutral' };
  isLikelyWord: boolean;
  remainingWords: string[];
};

export type AnalysisResult = {
  turns: TurnAnalysis[];
  aiPlaythrough: AIPlayTurn[];
  totalGuesses: number;
  hardMode: boolean;
  answer: string;
};
