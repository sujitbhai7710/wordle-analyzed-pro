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

export type UnusedClueDetail = {
  type: 'yellow_not_repositioned' | 'green_not_used' | 'absent_letter_used' | 'duplicate_not_tested';
  message: string;
  letter: string;
  sourceRow: number;
  detail: string;
};

export type PillarOfDoom = {
  turnIndex: number;
  guess: string;
  aiGuess: string;
  yourRemaining: number;
  aiRemaining: number;
  delta: number;
  description: string;
  isCritical: boolean;
};

export type SolverMethod = {
  name: string;
  description: string;
  turns: AIPlayTurn[];
  totalGuesses: number;
  solved: boolean;
};

export type DifficultyMetrics = {
  overall: number;
  letterFrequency: number;
  positionalAmbiguity: number;
  duplicateRisk: number;
  commonPattern: number;
  infoEntropy: number;
  label: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard' | 'Extreme';
  description: string;
};

export type SkillBreakdown = {
  skillScore: number;
  luckScore: number;
  efficiency: number;
  consistency: number;
  clueUtilization: number;
  skillLabel: string;
};

export type StarterWordMetric = {
  word: string;
  entropyScore: number;
  letterCoverage: number;
  positionalScore: number;
  avgRemaining: number;
  bestCaseRemaining: number;
  worstCaseRemaining: number;
  solveRate3: number;
  overallRank: number;
};

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
  unusedClueDetails: UnusedClueDetail[];
  hardModeViolations: string[];
  isLikelyWord: boolean;
  commentary: string;
  /** Skill score for this turn (0-100) */
  turnSkill: number;
  /** Luck score for this turn (0-100) */
  turnLuck: number;
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
  /** NEW: Skill & Luck scoring */
  skillBreakdown: SkillBreakdown;
  /** NEW: Game difficulty scorecard */
  difficulty: DifficultyMetrics;
  /** NEW: Pillars of Doom analysis */
  pillarsOfDoom: PillarOfDoom[];
  /** NEW: Multi-method solver comparison */
  solverComparison: SolverMethod[];
  /** NEW: Sharable encoded state */
  encodedState: string;
};
