import { LIKELY_ANSWERS, ALL_VALID_WORDS, LIKELY_SET, ALL_WORDS_SET, isLikelyAnswer } from './word-list';
import type { Clue, CellColor, TurnAnalysis, AnalysisResult, AIStrategy, LuckLevel, AIPlayTurn, UnusedClueDetail, PillarOfDoom, SolverMethod, DifficultyMetrics, SkillBreakdown, StarterWordMetric } from './types';

/**
 * Generate Wordle-style feedback for a guess against an answer.
 */
export function generateClue(guess: string, answer: string): Clue[] {
  const result: Clue[] = Array.from({ length: 5 }, () => ({
    letter: '',
    color: 'absent' as CellColor,
  }));

  const guessArr = guess.toUpperCase().split('');
  const answerArr = answer.toUpperCase().split('');
  const answerUsed = Array(5).fill(false);
  const guessUsed = Array(5).fill(false);

  // First pass: find greens (correct position)
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = { letter: guessArr[i], color: 'correct' };
      answerUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // Second pass: find yellows (wrong position)
  for (let i = 0; i < 5; i++) {
    if (guessUsed[i]) continue;
    for (let j = 0; j < 5; j++) {
      if (answerUsed[j]) continue;
      if (guessArr[i] === answerArr[j]) {
        result[i] = { letter: guessArr[i], color: 'present' };
        answerUsed[j] = true;
        break;
      }
    }
    if (result[i].color === 'absent') {
      result[i] = { letter: guessArr[i], color: 'absent' };
    }
  }

  return result;
}

/**
 * Filter words that match the clue pattern from a previous guess.
 */
export function getRemainingWords(
  guess: string,
  clue: Clue[],
  wordList: string[]
): string[] {
  const guessUpper = guess.toUpperCase();

  return wordList.filter((word) => {
    const wordUpper = word.toUpperCase();

    for (let i = 0; i < 5; i++) {
      const clueItem = clue[i];
      const clueLetter = clueItem.letter.toUpperCase();

      if (clueItem.color === 'correct') {
        if (wordUpper[i] !== clueLetter) return false;
      } else if (clueItem.color === 'present') {
        if (wordUpper[i] === clueLetter) return false;
        if (!wordUpper.includes(clueLetter)) return false;
      } else {
        const isElsewhereCorrect = clue.some(
          (c, j) => j !== i && c.letter.toUpperCase() === clueLetter && c.color === 'correct'
        );
        const isElsewherePresent = clue.some(
          (c, j) => j !== i && c.letter.toUpperCase() === clueLetter && c.color === 'present'
        );

        if (isElsewhereCorrect || isElsewherePresent) {
          if (wordUpper[i] === clueLetter) return false;
        } else {
          if (wordUpper.includes(clueLetter)) return false;
        }
      }
    }

    return true;
  });
}

/**
 * Get average remaining words for a guess across all possible answers.
 */
function getAverageRemaining(
  guess: string,
  remainingWords: string[],
  allWords: string[]
): { avgTotal: number; avgLikely: number; actualTotal: number; actualLikely: number } {
  if (remainingWords.length === 0) {
    return { avgTotal: 0, avgLikely: 0, actualTotal: 0, actualLikely: 0 };
  }

  let totalRemaining = 0;
  let totalLikely = 0;

  const sampleSize = Math.min(remainingWords.length, 50);
  const step = Math.max(1, Math.floor(remainingWords.length / sampleSize));
  let sampleCount = 0;

  for (let i = 0; i < remainingWords.length; i += step) {
    const testAnswer = remainingWords[i];
    const testClue = generateClue(guess, testAnswer);
    const testRemaining = getRemainingWords(guess, testClue, remainingWords);
    const testLikely = testRemaining.filter(w => LIKELY_SET.has(w)).length;
    totalRemaining += testRemaining.length;
    totalLikely += testLikely;
    sampleCount++;
  }

  const avgTotal = sampleCount > 0 ? totalRemaining / sampleCount : 0;
  const avgLikely = sampleCount > 0 ? totalLikely / sampleCount : 0;

  return { avgTotal, avgLikely, actualTotal: 0, actualLikely: 0 };
}

/**
 * Calculate luck level based on comparison of actual vs expected.
 */
function calculateLuckLevel(
  actualRemaining: number,
  actualLikely: number,
  avgRemaining: number,
  avgLikely: number
): { level: LuckLevel; rating: 'lucky' | 'unlucky' | 'neutral'; description: string } {
  if (avgRemaining === 0) {
    return { level: 'neutral', rating: 'neutral', description: 'No words remaining to analyze.' };
  }

  const ratio = actualRemaining / avgRemaining;

  let level: LuckLevel;
  let rating: 'lucky' | 'unlucky' | 'neutral';

  if (actualRemaining === 0) {
    level = 'literally_incredible';
    rating = 'lucky';
  } else if (ratio < 0.1) {
    level = 'unbelievably_lucky';
    rating = 'lucky';
  } else if (ratio < 0.25) {
    level = 'super_lucky';
    rating = 'lucky';
  } else if (ratio < 0.5) {
    level = 'very_lucky';
    rating = 'lucky';
  } else if (ratio < 0.8) {
    level = 'lucky';
    rating = 'lucky';
  } else if (ratio <= 1.25) {
    level = 'neutral';
    rating = 'neutral';
  } else if (ratio <= 1.8) {
    level = 'unlucky';
    rating = 'unlucky';
  } else if (ratio <= 3) {
    level = 'very_unlucky';
    rating = 'unlucky';
  } else {
    level = 'oh_god';
    rating = 'unlucky';
  }

  const luckLabels: Record<LuckLevel, string> = {
    literally_incredible: 'Literally incredible',
    unbelievably_lucky: 'Unbelievably lucky',
    super_lucky: 'Super lucky',
    very_lucky: 'Very lucky',
    lucky: 'Lucky',
    neutral: 'Neutral',
    unlucky: 'Unlucky',
    very_unlucky: 'Very unlucky',
    oh_god: 'Oh god, I\'m so sorry',
  };

  const likelyStr = actualLikely !== actualRemaining ? `, ${actualLikely} likely` : '';
  const avgLikelyStr = avgLikely > 0 ? `, ${Math.round(avgLikely * 10) / 10} likely` : '';

  let description: string;
  if (rating === 'lucky') {
    description = `Your guess left ${actualRemaining}${likelyStr} possible answers, significantly fewer than the expected ${Math.round(avgRemaining * 10) / 10}${avgLikelyStr}. ${luckLabels[level]}!`;
  } else if (rating === 'unlucky') {
    description = `Your guess left ${actualRemaining}${likelyStr} possible answers, more than the expected ${Math.round(avgRemaining * 10) / 10}${avgLikelyStr}. ${luckLabels[level]}.`;
  } else {
    description = `Your guess left ${actualRemaining}${likelyStr} possible answers, close to the expected ${Math.round(avgRemaining * 10) / 10}${avgLikelyStr}. About average luck.`;
  }

  return { level, rating, description };
}

/**
 * Calculate guess quality (0-1).
 */
function calculateGuessQuality(
  actualRemaining: number,
  totalBefore: number
): number {
  if (totalBefore <= 1) return 1;
  const eliminated = totalBefore - actualRemaining;
  return Math.min(1, Math.max(0, eliminated / (totalBefore - 1)));
}

/**
 * Get AI strategy label.
 */
function getAIStrategy(
  guess: string,
  remainingWords: string[],
  remainingLikely: number
): AIStrategy {
  const isLikely = LIKELY_SET.has(guess);
  const isRemaining = remainingWords.map(w => w.toUpperCase()).includes(guess.toUpperCase());

  if (remainingLikely <= 1) {
    if (remainingLikely === 1) return isRemaining ? 'play_unlikely' : 'eliminate_unlikely';
    if (remainingLikely === 0 && remainingWords.length <= 2) return isRemaining ? 'play_unlikely' : 'eliminate_unlikely';
    return isRemaining ? 'punt_unlikely' : 'eliminate_unlikely';
  }

  if (isRemaining) {
    return remainingLikely <= 2 ? 'punt_likely' : 'eliminate_likely_with_answer';
  }
  return 'eliminate_likely';
}

/**
 * Strategy display text.
 */
export function getStrategyLabel(strategy: AIStrategy): string {
  const labels: Record<AIStrategy, string> = {
    eliminate_likely: 'Eliminate likely words',
    eliminate_likely_with_answer: 'Eliminate likely words (possible answer)',
    punt_likely: 'Take a punt on a likely word',
    play_likely: 'Play the remaining likely word',
    eliminate_unlikely: 'Eliminate unlikely words',
    eliminate_unlikely_with_answer: 'Eliminate unlikely words (possible answer)',
    punt_unlikely: 'Take a punt on a remaining word',
    play_unlikely: 'Play the remaining word',
  };
  return labels[strategy];
}

/**
 * Find the optimal next guess using entropy maximization.
 */
export function getBestPlay(
  remainingWords: string[],
  allWords: string[]
): { word: string; strategy: AIStrategy } {
  if (remainingWords.length === 0) return { word: '', strategy: 'eliminate_likely' };
  if (remainingWords.length === 1) {
    return { word: remainingWords[0], strategy: LIKELY_SET.has(remainingWords[0]) ? 'play_likely' : 'play_unlikely' };
  }

  const remainingLikely = remainingWords.filter(w => LIKELY_SET.has(w)).length;
  let bestWord = remainingWords[0];
  let bestScore = -1;

  const candidates = new Set<string>();
  remainingWords.forEach((w) => candidates.add(w.toUpperCase()));

  const topStarters = ['SOARE', 'SLATE', 'CRANE', 'SALET', 'TRACE', 'RAISE', 'STARE', 'CRATE', 'IRATE', 'ARISE'];
  topStarters.forEach((w) => candidates.add(w));

  const candidateArray = Array.from(candidates).slice(0, 30);

  for (const candidate of candidateArray) {
    const clueGroups = new Map<string, number>();
    const sampleSize = Math.min(remainingWords.length, 50);
    const step = Math.max(1, Math.floor(remainingWords.length / sampleSize));

    for (let i = 0; i < remainingWords.length; i += step) {
      const testAnswer = remainingWords[i];
      const testClue = generateClue(candidate, testAnswer);
      const key = testClue.map((c) => `${c.letter}${c.color}`).join('');
      clueGroups.set(key, (clueGroups.get(key) || 0) + 1);
    }

    let score = 0;
    const total = Math.ceil(remainingWords.length / step);
    clueGroups.forEach((count) => {
      const p = count / total;
      if (p > 0) score -= p * Math.log2(p);
    });

    if (remainingWords.includes(candidate.toUpperCase())) score += 0.05;

    if (score > bestScore) {
      bestScore = score;
      bestWord = candidate;
    }
  }

  const strategy = getAIStrategy(bestWord, remainingWords, remainingLikely);
  return { word: bestWord, strategy };
}

/**
 * Enhanced Unused Clue Detection - Detects specific missed clue usage
 */
function detectUnusedClueDetails(
  guess: string,
  previousClues: Clue[][],
  previousGuesses: string[]
): UnusedClueDetail[] {
  const details: UnusedClueDetail[] = [];
  const guessUpper = guess.toUpperCase();

  for (let rowIdx = 0; rowIdx < previousClues.length; rowIdx++) {
    const prevClue = previousClues[rowIdx];
    const prevGuess = previousGuesses[rowIdx];

    for (let i = 0; i < 5; i++) {
      const clueItem = prevClue[i];
      const letter = clueItem.letter.toUpperCase();

      if (clueItem.color === 'present') {
        // Yellow letter: player knows this letter is in the word but NOT in position i
        // Check if the player tried this letter in a DIFFERENT position in the current guess
        const letterPositionsInGuess = guessUpper.split('').reduce((acc, l, idx) => {
          if (l === letter) acc.push(idx);
          return acc;
        }, [] as number[]);

        if (letterPositionsInGuess.length === 0) {
          // Yellow letter not used at all in this guess
          details.push({
            type: 'yellow_not_repositioned',
            message: `You had a yellow ${letter} in row ${rowIdx + 1} position ${i + 1}, but didn't use ${letter} in this guess`,
            letter,
            sourceRow: rowIdx,
            detail: `Row ${rowIdx + 1} showed ${letter} is in the word but not in position ${i + 1}. You should try ${letter} in a different position.`,
          });
        } else {
          // Check if the letter was tried in a new position (not the same yellow position)
          const triedNewPosition = letterPositionsInGuess.some(pos => pos !== i);
          if (!triedNewPosition) {
            details.push({
              type: 'yellow_not_repositioned',
              message: `You had a yellow ${letter} in row ${rowIdx + 1} position ${i + 1}, and you placed ${letter} in the same position again`,
              letter,
              sourceRow: rowIdx,
              detail: `You already know ${letter} is not in position ${i + 1} from row ${rowIdx + 1}. Try it in a different position.`,
            });
          }
        }
      }

      if (clueItem.color === 'correct') {
        // Green letter: should be used in the same position
        if (guessUpper[i] !== letter) {
          details.push({
            type: 'green_not_used',
            message: `You had a green ${letter} in position ${i + 1} from row ${rowIdx + 1}, but didn't place ${letter} there`,
            letter,
            sourceRow: rowIdx,
            detail: `You know ${letter} is correct in position ${i + 1}. All future guesses must have ${letter} there.`,
          });
        }
      }

      if (clueItem.color === 'absent') {
        // Gray letter: check if it appears in the current guess (when it shouldn't)
        const isElsewhereMarked = prevClue.some(
          (c, j) => j !== i && c.letter.toUpperCase() === letter && (c.color === 'correct' || c.color === 'present')
        );
        if (!isElsewhereMarked && guessUpper.includes(letter)) {
          const count = guessUpper.split('').filter(l => l === letter).length;
          const answerCount = prevClue.filter(c => c.letter.toUpperCase() === letter && (c.color === 'correct' || c.color === 'present')).length;
          if (count > answerCount) {
            details.push({
              type: 'absent_letter_used',
              message: `${letter} was marked absent in row ${rowIdx + 1}, but you used ${count} ${letter}'s (only ${answerCount} expected)`,
              letter,
              sourceRow: rowIdx,
              detail: `Row ${rowIdx + 1} showed ${letter} is not in the word${answerCount > 0 ? ` (only ${answerCount} ${letter} exists)` : ''}. Don't use more than ${answerCount}.`,
            });
          }
        }
      }
    }
  }

  // Check for duplicate letter not tested
  const allYellows = new Map<string, number[]>();
  for (let rowIdx = 0; rowIdx < previousClues.length; rowIdx++) {
    for (let i = 0; i < 5; i++) {
      const clueItem = previousClues[rowIdx][i];
      if (clueItem.color === 'present') {
        const letter = clueItem.letter.toUpperCase();
        if (!allYellows.has(letter)) allYellows.set(letter, []);
        allYellows.get(letter)!.push(i);
      }
    }
  }

  for (const [letter, positions] of allYellows) {
    if (positions.length >= 1) {
      const greensForLetter = previousClues.flat().filter(c => c.letter.toUpperCase() === letter && c.color === 'correct');
      const totalKnownCount = greensForLetter.length + 1; // at least the yellow means 1+
      const guessLetterCount = guessUpper.split('').filter(l => l === letter).length;
      // If the letter might be a duplicate and we haven't tested enough positions
      if (guessLetterCount < 2 && totalKnownCount < 2) {
        // Check if this letter could appear twice in the answer
        const couldBeDuplicate = LIKELY_ANSWERS.some(w => {
          const count = w.toUpperCase().split('').filter(l => l === letter).length;
          return count >= 2;
        });
        if (couldBeDuplicate) {
          details.push({
            type: 'duplicate_not_tested',
            message: `You have a yellow ${letter} but haven't tested if ${letter} appears twice in the answer`,
            letter,
            sourceRow: -1,
            detail: `About 7% of Wordle answers have duplicate letters. Consider testing if ${letter} appears more than once.`,
          });
        }
      }
    }
  }

  return details;
}

/**
 * Calculate Skill & Luck Scoring (like NYT WordleBot)
 */
function calculateSkillBreakdown(
  turns: TurnAnalysis[],
  answer: string,
  aiPlaythrough: AIPlayTurn[]
): SkillBreakdown {
  if (turns.length === 0) {
    return { skillScore: 50, luckScore: 50, efficiency: 50, consistency: 50, clueUtilization: 50, skillLabel: 'Average' };
  }

  // Skill Score: How close was the player to optimal play?
  // Compare player's average guess quality vs AI's average guess quality
  const playerAvgQuality = turns.reduce((sum, t) => sum + t.guessQuality, 0) / turns.length;
  const aiAvgQuality = turns.reduce((sum, t) => sum + t.aiGuessQuality, 0) / turns.length;

  // Efficiency: How many guesses used vs optimal
  const aiGuesses = aiPlaythrough.length;
  const playerGuesses = turns.length + 1; // +1 for answer
  const efficiencyRaw = aiGuesses > 0 ? Math.min(1, aiGuesses / playerGuesses) : 0.5;

  // Consistency: How consistent was guess quality across turns
  const qualities = turns.map(t => t.guessQuality);
  const avgQuality = qualities.reduce((a, b) => a + b, 0) / qualities.length;
  const variance = qualities.reduce((sum, q) => sum + Math.pow(q - avgQuality, 2), 0) / qualities.length;
  const consistencyRaw = Math.max(0, 1 - Math.sqrt(variance) / 50);

  // Clue Utilization: Based on unused clue details
  const totalUnusedClues = turns.reduce((sum, t) => sum + t.unusedClueDetails.length, 0);
  const clueUtilizationRaw = Math.max(0, 1 - totalUnusedClues * 0.15);

  // Luck Score: Based on how lucky/unlucky the player was
  const luckRatings = turns.map(t => {
    if (t.luck.rating === 'lucky') return 1;
    if (t.luck.rating === 'unlucky') return 0;
    return 0.5;
  });
  const luckScoreRaw = luckRatings.reduce((a, b) => a + b, 0) / luckRatings.length;

  // Weighted skill score (0-100)
  // playerAvgQuality is 0-100, normalize to 0-1 for the formula
  const playerAvgQualityNorm = playerAvgQuality / 100;
  const skillScore = Math.round(
    playerAvgQualityNorm * 30 +
    efficiencyRaw * 25 +
    consistencyRaw * 20 +
    clueUtilizationRaw * 25
  );

  const luckScore = Math.round(luckScoreRaw * 100);
  const efficiency = Math.round(efficiencyRaw * 100);
  const consistency = Math.round(consistencyRaw * 100);
  const clueUtilization = Math.round(clueUtilizationRaw * 100);

  let skillLabel: string;
  if (skillScore >= 90) skillLabel = 'Exceptional';
  else if (skillScore >= 75) skillLabel = 'Skilled';
  else if (skillScore >= 60) skillLabel = 'Above Average';
  else if (skillScore >= 45) skillLabel = 'Average';
  else if (skillScore >= 30) skillLabel = 'Below Average';
  else skillLabel = 'Needs Work';

  return { skillScore, luckScore, efficiency, consistency, clueUtilization, skillLabel };
}

/**
 * Calculate Game Difficulty Scorecard
 */
function calculateDifficulty(answer: string): DifficultyMetrics {
  const answerUpper = answer.toUpperCase();

  // Letter frequency score: how common are the letters in this word?
  const letterFreqs: Record<string, number> = {};
  for (const word of LIKELY_ANSWERS) {
    for (const letter of word.toUpperCase().split('')) {
      letterFreqs[letter] = (letterFreqs[letter] || 0) + 1;
    }
  }
  const totalWords = LIKELY_ANSWERS.length;
  const avgLetterFreq = answerUpper.split('').reduce((sum, l) => {
    return sum + (letterFreqs[l] || 0) / totalWords;
  }, 0) / 5;
  // Higher frequency = easier (lower difficulty)
  const letterFrequency = Math.round((1 - avgLetterFreq) * 100);

  // Positional ambiguity: how many other words share the same letter patterns?
  const posLetters = LIKELY_ANSWERS.map(w => w.toUpperCase());
  let positionalMatches = 0;
  for (let i = 0; i < 5; i++) {
    const letterAtPos = answerUpper[i];
    positionalMatches += posLetters.filter(w => w[i] === letterAtPos).length;
  }
  const avgPosMatches = positionalMatches / 5;
  const positionalAmbiguity = Math.round(Math.min(100, (avgPosMatches / totalWords) * 300));

  // Duplicate risk: does this word have duplicate letters?
  const uniqueLetters = new Set(answerUpper.split(''));
  const hasDuplicates = uniqueLetters.size < 5;
  const duplicateRisk = hasDuplicates ? 70 : 15;

  // Common pattern: is this word part of a common pattern (like -IGHT)?
  const commonPatterns = ['IGHT', 'OUND', 'OUGH', 'ATION', 'EACH', 'ATCH', 'OCK'];
  const hasCommonPattern = commonPatterns.some(p => answerUpper.includes(p));
  const commonPattern = hasCommonPattern ? 75 : 25;

  // Information entropy: how much info does the average first guess reveal about this word?
  const topStarters = ['SLATE', 'CRANE', 'TRACE', 'SALET', 'RAISE'];
  let totalEntropy = 0;
  for (const starter of topStarters) {
    const clue = generateClue(starter, answerUpper);
    const remaining = getRemainingWords(starter, clue, [...LIKELY_ANSWERS]);
    const p = remaining.length / LIKELY_ANSWERS.length;
    if (p > 0 && p < 1) {
      totalEntropy += -p * Math.log2(p);
    }
  }
  const avgEntropy = totalEntropy / topStarters.length;
  // Higher entropy after first guess = harder word
  const infoEntropy = Math.round(Math.min(100, avgEntropy * 25));

  // Overall difficulty (weighted average)
  const overall = Math.round(
    letterFrequency * 0.2 +
    positionalAmbiguity * 0.25 +
    duplicateRisk * 0.15 +
    commonPattern * 0.15 +
    infoEntropy * 0.25
  );

  let label: DifficultyMetrics['label'];
  let description: string;
  if (overall <= 20) { label = 'Easy'; description = 'Common letters in typical positions. Most strong openers will crack this quickly.'; }
  else if (overall <= 40) { label = 'Moderate'; description = 'A fair challenge. Good strategy and a bit of luck will solve this in 3-4 guesses.'; }
  else if (overall <= 60) { label = 'Hard'; description = 'Tricky letter combinations or uncommon patterns. Requires careful elimination strategy.'; }
  else if (overall <= 80) { label = 'Very Hard'; description = 'Unusual letter patterns or duplicate letters make this word particularly challenging to deduce.'; }
  else { label = 'Extreme'; description = 'Rare letters, uncommon patterns, or high ambiguity. Even optimal play may need 5-6 guesses.'; }

  return { overall, letterFrequency, positionalAmbiguity, duplicateRisk, commonPattern, infoEntropy, label, description };
}

/**
 * Identify Pillars of Doom - critical fork points
 */
function identifyPillarsOfDoom(turns: TurnAnalysis[]): PillarOfDoom[] {
  const pillars: PillarOfDoom[] = [];

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    const delta = turn.remainingAfter - turn.aiActualRemaining;

    if (delta > 0) {
      // Player's guess left more words remaining than AI's would have
      const isCritical = delta >= 20 || (turn.remainingBefore > 0 && delta / turn.remainingBefore > 0.3);

      let description: string;
      if (turn.guessQuality < turn.aiGuessQuality * 0.5) {
        description = `Your guess "${turn.guess}" was significantly less efficient than the AI's "${turn.aiRecommendation}". It left ${delta} more possibilities, creating a cascade of difficulty for subsequent guesses.`;
      } else if (turn.luck.rating === 'unlucky') {
        description = `Your guess "${turn.guess}" was reasonable, but you got unlucky feedback. The AI's "${turn.aiRecommendation}" would have narrowed things down by ${delta} more words.`;
      } else {
        description = `Playing "${turn.aiRecommendation}" instead of "${turn.guess}" would have eliminated ${delta} more possibilities, putting you on a faster track to the answer.`;
      }

      pillars.push({
        turnIndex: i,
        guess: turn.guess,
        aiGuess: turn.aiRecommendation,
        yourRemaining: turn.remainingAfter,
        aiRemaining: turn.aiActualRemaining,
        delta,
        description,
        isCritical,
      });
    }
  }

  return pillars;
}

/**
 * Multi-method solver comparison
 */
function runSolverComparison(
  answer: string,
  hardMode: boolean
): SolverMethod[] {
  const answerUpper = answer.toUpperCase();
  const methods: SolverMethod[] = [];

  // Method 1: Entropy Maximizer (current AI)
  const entropyTurns = simulateAIPlaythrough(answer, hardMode, 'entropy');
  methods.push({
    name: 'Entropy Maximizer',
    description: 'Maximizes expected information gain each turn. The gold standard algorithm.',
    turns: entropyTurns,
    totalGuesses: entropyTurns.filter(t => t.guess.toUpperCase() === answerUpper).length > 0
      ? entropyTurns.findIndex(t => t.guess.toUpperCase() === answerUpper) + 1
      : entropyTurns.length,
    solved: entropyTurns.some(t => t.guess.toUpperCase() === answerUpper),
  });

  // Method 2: Letter Frequency Optimizer
  const freqTurns = simulateAIPlaythrough(answer, hardMode, 'frequency');
  methods.push({
    name: 'Letter Frequency',
    description: 'Prioritizes testing the most common letters first. Simple but effective.',
    turns: freqTurns,
    totalGuesses: freqTurns.filter(t => t.guess.toUpperCase() === answerUpper).length > 0
      ? freqTurns.findIndex(t => t.guess.toUpperCase() === answerUpper) + 1
      : freqTurns.length,
    solved: freqTurns.some(t => t.guess.toUpperCase() === answerUpper),
  });

  // Method 3: Random from Remaining
  const randomTurns = simulateAIPlaythrough(answer, hardMode, 'random');
  methods.push({
    name: 'Random Baseline',
    description: 'Picks a random word from remaining possibilities. Shows the floor of performance.',
    turns: randomTurns,
    totalGuesses: randomTurns.filter(t => t.guess.toUpperCase() === answerUpper).length > 0
      ? randomTurns.findIndex(t => t.guess.toUpperCase() === answerUpper) + 1
      : randomTurns.length,
    solved: randomTurns.some(t => t.guess.toUpperCase() === answerUpper),
  });

  // Method 4: First-possible Strategy
  const firstPossibleTurns = simulateAIPlaythrough(answer, hardMode, 'first_possible');
  methods.push({
    name: 'First Possible',
    description: 'Always guesses the first alphabetically from remaining possible answers. Naive but deterministic.',
    turns: firstPossibleTurns,
    totalGuesses: firstPossibleTurns.filter(t => t.guess.toUpperCase() === answerUpper).length > 0
      ? firstPossibleTurns.findIndex(t => t.guess.toUpperCase() === answerUpper) + 1
      : firstPossibleTurns.length,
    solved: firstPossibleTurns.some(t => t.guess.toUpperCase() === answerUpper),
  });

  // Method 5: Minimax Strategy
  const minimaxTurns = simulateAIPlaythrough(answer, hardMode, 'minimax');
  methods.push({
    name: 'Minimax',
    description: 'Minimizes the worst-case scenario. Plays it safe by ensuring no outcome is too bad.',
    turns: minimaxTurns,
    totalGuesses: minimaxTurns.filter(t => t.guess.toUpperCase() === answerUpper).length > 0
      ? minimaxTurns.findIndex(t => t.guess.toUpperCase() === answerUpper) + 1
      : minimaxTurns.length,
    solved: minimaxTurns.some(t => t.guess.toUpperCase() === answerUpper),
  });

  return methods;
}

/**
 * Simulate AI playthrough with different strategies
 */
function simulateAIPlaythrough(
  answer: string,
  hardMode: boolean,
  strategy: 'entropy' | 'frequency' | 'random' | 'first_possible' | 'minimax' = 'entropy'
): AIPlayTurn[] {
  const turns: AIPlayTurn[] = [];
  let currentLikely = [...LIKELY_ANSWERS];
  const previousClues: Clue[][] = [];

  // Deterministic seed for 'random' strategy based on answer
  let seed = 0;
  for (let i = 0; i < answer.length; i++) seed += answer.charCodeAt(i);
  const pseudoRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let i = 0; i < 6; i++) {
    const remainingLikely = currentLikely.filter(w => LIKELY_SET.has(w)).length;
    let aiGuess: string;
    let aiStrategy: AIStrategy;

    if (currentLikely.length === 0) break;

    if (currentLikely.length === 1) {
      aiGuess = currentLikely[0];
      aiStrategy = LIKELY_SET.has(currentLikely[0]) ? 'play_likely' : 'play_unlikely';
    } else {
      switch (strategy) {
        case 'frequency': {
          // Score by letter frequency coverage
          const letterFreqs: Record<string, number> = {};
          for (const word of currentLikely) {
            for (const letter of new Set(word.toUpperCase().split(''))) {
              letterFreqs[letter] = (letterFreqs[letter] || 0) + 1;
            }
          }
          let bestFreqWord = currentLikely[0];
          let bestFreqScore = -1;
          for (const word of currentLikely.slice(0, 50)) {
            const score = Array.from(new Set(word.toUpperCase().split(''))).reduce((s, l) => s + (letterFreqs[l] || 0), 0);
            if (score > bestFreqScore) { bestFreqScore = score; bestFreqWord = word; }
          }
          aiGuess = bestFreqWord;
          aiStrategy = getAIStrategy(bestFreqWord, currentLikely, remainingLikely);
          break;
        }
        case 'random': {
          const idx = Math.floor(pseudoRandom() * currentLikely.length);
          aiGuess = currentLikely[idx];
          aiStrategy = getAIStrategy(aiGuess, currentLikely, remainingLikely);
          break;
        }
        case 'first_possible': {
          const sorted = [...currentLikely].sort();
          aiGuess = sorted[0];
          aiStrategy = getAIStrategy(aiGuess, currentLikely, remainingLikely);
          break;
        }
        case 'minimax': {
          // Minimize worst-case remaining
          let bestMinimaxWord = currentLikely[0];
          let bestWorstCase = Infinity;
          const candidates = currentLikely.slice(0, 30);
          for (const candidate of candidates) {
            let worstCase = 0;
            const sampleSize = Math.min(currentLikely.length, 30);
            const step = Math.max(1, Math.floor(currentLikely.length / sampleSize));
            for (let j = 0; j < currentLikely.length; j += step) {
              const testClue = generateClue(candidate, currentLikely[j]);
              const testRemaining = getRemainingWords(candidate, testClue, currentLikely);
              worstCase = Math.max(worstCase, testRemaining.length);
            }
            if (worstCase < bestWorstCase) {
              bestWorstCase = worstCase;
              bestMinimaxWord = candidate;
            }
          }
          aiGuess = bestMinimaxWord;
          aiStrategy = getAIStrategy(aiGuess, currentLikely, remainingLikely);
          break;
        }
        default: {
          // entropy (default)
          const result = getBestPlay(currentLikely, currentLikely);
          aiGuess = result.word;
          aiStrategy = result.strategy;
        }
      }
    }

    if (!aiGuess) break;

    const clue = generateClue(aiGuess, answer);
    const { avgTotal, avgLikely } = getAverageRemaining(aiGuess, currentLikely, currentLikely);
    const newLikely = getRemainingWords(aiGuess, clue, currentLikely);
    const guessQuality = calculateGuessQuality(newLikely.length, currentLikely.length);
    const luck = calculateLuckLevel(newLikely.length, newLikely.filter(w => LIKELY_SET.has(w)).length, avgTotal, avgLikely);

    turns.push({
      guess: aiGuess,
      clue,
      strategy: aiStrategy,
      avgRemaining: Math.round(avgTotal * 100) / 100,
      avgLikelyRemaining: Math.round(avgLikely * 100) / 100,
      guessQuality: Math.round(guessQuality * 10000) / 100,
      actualRemaining: newLikely.length,
      actualLikelyRemaining: newLikely.filter(w => LIKELY_SET.has(w)).length,
      luck,
      isLikelyWord: LIKELY_SET.has(aiGuess),
      remainingWords: newLikely.slice(0, 20),
    });

    previousClues.push(clue);
    currentLikely = newLikely;

    if (aiGuess.toUpperCase() === answer.toUpperCase()) break;
    if (newLikely.length <= 1) break;
  }

  return turns;
}

/**
 * Generate commentary for a guess.
 */
function generateCommentary(
  turnNumber: number,
  guess: string,
  remainingBefore: number,
  remainingLikelyBefore: number,
  remainingAfter: number,
  remainingLikelyAfter: number,
  remainingWords: string[],
  aiRecommendation: string,
  isLikely: boolean,
  isFirstGuess: boolean
): string {
  const parts: string[] = [];

  if (isFirstGuess) {
    parts.push(`The Wordle dictionary contains <strong>${ALL_VALID_WORDS.length.toLocaleString()}</strong> words, and this tool considers <strong>${LIKELY_ANSWERS.length.toLocaleString()}</strong> of them to be "likely" answers. The first play should aim to eliminate as many words as possible, preferably likely words.`);

    if (aiRecommendation === 'SOARE') {
      parts.push('The AI always starts with "soare" which eliminates the most possibilities on average.');
    } else if (guess.toUpperCase() === aiRecommendation.toUpperCase()) {
      parts.push(`You played the optimal first word!`);
    }
    return parts.join(' ');
  }

  if (remainingAfter === 0) {
    return 'The answer has been found!';
  }

  const likelyStr = remainingLikelyAfter !== remainingAfter ? `, ${remainingLikelyAfter} likely` : '';

  if (remainingAfter === 1) {
    parts.push(`There's only <strong>one answer remaining</strong>. The trick is being able to think of it.`);
    return parts.join(' ');
  }

  if (remainingAfter <= 3) {
    parts.push(`There are <strong>${remainingAfter} words remaining${likelyStr}</strong>. They are:`);
    return parts.join(' ');
  }

  if (remainingLikelyAfter <= 2 && remainingLikelyAfter > 0) {
    parts.push(`There are <strong>${remainingAfter} words remaining, ${remainingLikelyAfter} likely</strong>.`);
    const likelyWords = remainingWords.filter(w => LIKELY_SET.has(w));
    if (likelyWords.length > 0 && likelyWords.length <= 5) {
      parts.push(`The likely words are: ${likelyWords.map(w => `<strong>${w}</strong>`).join(', ')}.`);
    }
    return parts.join(' ');
  }

  if (remainingAfter <= 20) {
    parts.push(`There are <strong>${remainingAfter} words remaining${likelyStr}</strong>. With this few remaining, you can likely solve it in the next guess.`);
    return parts.join(' ');
  }

  if (remainingAfter <= 100) {
    parts.push(`There are <strong>${remainingAfter} words remaining${likelyStr}</strong>. Focus on playing common letters that haven't been tested yet.`);
    return parts.join(' ');
  }

  parts.push(`There are <strong>${remainingAfter} words remaining${likelyStr}</strong>. With this many words remaining, the best strategy is to play some common letters that haven't already been played. Don't worry about picking a winner yet.`);
  return parts.join(' ');
}

/**
 * Check hard mode violations.
 */
function checkHardModeViolations(
  guess: string,
  previousClues: Clue[][]
): string[] {
  const violations: string[] = [];

  for (const prevClue of previousClues) {
    for (let i = 0; i < 5; i++) {
      const clueItem = prevClue[i];
      if (clueItem.color === 'correct') {
        if (guess[i] !== clueItem.letter) {
          violations.push(`Position ${i + 1} must be '${clueItem.letter}'`);
        }
      } else if (clueItem.color === 'present') {
        if (!guess.includes(clueItem.letter)) {
          violations.push(`Must include '${clueItem.letter}'`);
        }
        if (guess[i] === clueItem.letter) {
          violations.push(`'${clueItem.letter}' cannot be in position ${i + 1}`);
        }
      }
    }
  }

  return violations;
}

/**
 * Check if a guess is a possible answer given previous clues.
 */
function checkPossibleAnswer(
  guess: string,
  previousClues: Clue[][]
): { isPossible: boolean; unusedClues: string[] } {
  const unusedClues: string[] = [];

  for (const prevClue of previousClues) {
    for (let i = 0; i < 5; i++) {
      const clueItem = prevClue[i];
      if (clueItem.color === 'correct') {
        if (guess[i] !== clueItem.letter) {
          unusedClues.push(`Position ${i + 1} must be '${clueItem.letter}'`);
        }
      } else if (clueItem.color === 'present') {
        if (!guess.includes(clueItem.letter)) {
          unusedClues.push(`Must include '${clueItem.letter}'`);
        }
        if (guess[i] === clueItem.letter) {
          unusedClues.push(`'${clueItem.letter}' cannot be in position ${i + 1}`);
        }
      } else {
        const isElsewhereMarked = prevClue.some(
          (c, j) => j !== i && c.letter === clueItem.letter && (c.color === 'correct' || c.color === 'present')
        );
        if (!isElsewhereMarked && guess.includes(clueItem.letter)) {
          const count = guess.split('').filter(l => l === clueItem.letter).length;
          const answerCount = prevClue.filter(c => c.letter === clueItem.letter && (c.color === 'correct' || c.color === 'present')).length;
          if (count > answerCount) {
            unusedClues.push(`Too many '${clueItem.letter}'s`);
          }
        }
      }
    }
  }

  return { isPossible: unusedClues.length === 0, unusedClues };
}

/**
 * Encode game state for shareable URL
 */
function encodeGameState(guesses: string[], answer: string, hardMode: boolean): string {
  const state = { g: guesses, a: answer, h: hardMode };
  try {
    return btoa(encodeURIComponent(JSON.stringify(state)));
  } catch {
    return '';
  }
}

/**
 * Decode game state from shareable URL
 */
export function decodeGameState(encoded: string): { guesses: string[]; answer: string; hardMode: boolean } | null {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
    if (decoded.g && decoded.a && Array.isArray(decoded.g)) {
      return { guesses: decoded.g, answer: decoded.a, hardMode: decoded.h || false };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Calculate turn-level skill and luck scores
 */
function calculateTurnScores(
  guessQuality: number,
  aiGuessQuality: number,
  luckRating: 'lucky' | 'unlucky' | 'neutral',
  isPossibleAnswer: boolean,
  unusedClueDetailsCount: number
): { turnSkill: number; turnLuck: number } {
  // Skill: based on guess quality relative to AI, and clue utilization
  const qualityRatio = aiGuessQuality > 0 ? guessQuality / aiGuessQuality : 1;
  const cluePenalty = Math.min(30, unusedClueDetailsCount * 10);
  const possibilityBonus = isPossibleAnswer ? 10 : 0;
  const turnSkill = Math.round(Math.min(100, Math.max(0,
    qualityRatio * 60 + possibilityBonus - cluePenalty
  )));

  // Luck: based on luck rating
  let turnLuck: number;
  if (luckRating === 'lucky') turnLuck = 75;
  else if (luckRating === 'unlucky') turnLuck = 25;
  else turnLuck = 50;

  return { turnSkill, turnLuck };
}

/**
 * Full game analysis (ENHANCED with all Pro features).
 */
export function analyzeGame(
  guesses: string[],
  answer: string,
  hardMode: boolean
): AnalysisResult {
  const answerUpper = answer.toUpperCase();
  const turns: TurnAnalysis[] = [];

  let currentLikely = [...LIKELY_ANSWERS];
  let currentAll = [...ALL_VALID_WORDS];
  const previousClues: Clue[][] = [];
  const previousGuesses: string[] = [];

  for (let i = 0; i < guesses.length; i++) {
    const guess = guesses[i].toUpperCase();

    if (guess === answerUpper) {
      const clue = generateClue(guess, answerUpper);
      previousClues.push(clue);
      break;
    }

    const remainingBefore = currentLikely.length;
    const remainingLikelyBefore = currentLikely.filter(w => LIKELY_SET.has(w)).length;

    const clue = generateClue(guess, answerUpper);
    const remainingAfterList = getRemainingWords(guess, clue, currentLikely);
    const remainingAfter = remainingAfterList.length;
    const remainingLikelyAfter = remainingAfterList.filter(w => LIKELY_SET.has(w)).length;

    const { avgTotal, avgLikely } = getAverageRemaining(guess, currentLikely, currentAll);
    const luck = calculateLuckLevel(remainingAfter, remainingLikelyAfter, avgTotal, avgLikely);
    const guessQuality = calculateGuessQuality(remainingAfter, remainingBefore);

    const { word: aiRecommendation, strategy: aiStrategy } = getBestPlay(currentLikely, currentAll);
    const aiClue = generateClue(aiRecommendation, answerUpper);

    const aiRemaining = getRemainingWords(aiRecommendation, aiClue, currentLikely);
    const aiRemainingLikely = aiRemaining.filter(w => LIKELY_SET.has(w)).length;
    const { avgTotal: aiAvgTotal, avgLikely: aiAvgLikely } = getAverageRemaining(aiRecommendation, currentLikely, currentAll);
    const aiGuessQuality = calculateGuessQuality(aiRemaining.length, remainingBefore);
    const aiLuck = calculateLuckLevel(aiRemaining.length, aiRemainingLikely, aiAvgTotal, aiAvgLikely);

    const { isPossible: isPossibleAnswer, unusedClues } = checkPossibleAnswer(guess, previousClues);
    const hardModeViolations = hardMode ? checkHardModeViolations(guess, previousClues) : [];

    // NEW: Enhanced unused clue detection
    const unusedClueDetails = detectUnusedClueDetails(guess, previousClues, previousGuesses);

    const isLikelyWord = LIKELY_SET.has(guess);

    // NEW: Turn-level skill & luck scores
    const { turnSkill, turnLuck } = calculateTurnScores(
      guessQuality, aiGuessQuality, luck.rating,
      isPossibleAnswer, unusedClueDetails.length
    );

    const commentary = generateCommentary(
      i + 1, guess, remainingBefore, remainingLikelyBefore,
      remainingAfter, remainingLikelyAfter, remainingAfterList,
      aiRecommendation, isLikelyWord, i === 0
    );

    turns.push({
      guess,
      clue,
      remainingBefore,
      remainingLikelyBefore,
      remainingAfter,
      remainingLikelyAfter,
      remainingWords: remainingAfterList.slice(0, 20),
      avgRemaining: Math.round(avgTotal * 100) / 100,
      avgLikelyRemaining: Math.round(avgLikely * 100) / 100,
      luck,
      guessQuality: Math.round(guessQuality * 10000) / 100,
      aiRecommendation,
      aiClue,
      aiStrategy,
      aiAvgRemaining: Math.round(aiAvgTotal * 100) / 100,
      aiAvgLikelyRemaining: Math.round(aiAvgLikely * 100) / 100,
      aiGuessQuality: Math.round(aiGuessQuality * 10000) / 100,
      aiActualRemaining: aiRemaining.length,
      aiActualLikelyRemaining: aiRemainingLikely,
      aiLuck,
      isPossibleAnswer,
      unusedClues,
      unusedClueDetails,
      hardModeViolations,
      isLikelyWord,
      commentary,
      turnSkill,
      turnLuck,
    });

    previousClues.push(clue);
    previousGuesses.push(guess);
    currentLikely = remainingAfterList;
    currentAll = getRemainingWords(guess, clue, currentAll);
  }

  // Simulate AI playthrough
  const aiPlaythrough = simulateAIPlaythrough(answerUpper, hardMode);

  // NEW: Skill & Luck Scoring
  const skillBreakdown = calculateSkillBreakdown(turns, answerUpper, aiPlaythrough);

  // NEW: Difficulty Scorecard
  const difficulty = calculateDifficulty(answerUpper);

  // NEW: Pillars of Doom
  const pillarsOfDoom = identifyPillarsOfDoom(turns);

  // NEW: Multi-method solver comparison
  const solverComparison = runSolverComparison(answerUpper, hardMode);

  // NEW: Encoded state for shareable URL
  const encodedState = encodeGameState(guesses, answer, hardMode);

  return {
    turns,
    aiPlaythrough,
    totalGuesses: guesses.length,
    hardMode,
    answer: answerUpper,
    skillBreakdown,
    difficulty,
    pillarsOfDoom,
    solverComparison,
    encodedState,
  };
}

/**
 * Get the top starting words ranked by multiple metrics.
 */
export function getStarterWordRankings(count: number = 20): StarterWordMetric[] {
  const topWords = [
    'SOARE', 'SLATE', 'CRANE', 'SALET', 'TRACE', 'RAISE', 'ARISE', 'STARE',
    'SHARE', 'CRATE', 'TARES', 'LEAST', 'LANCE', 'ALERT', 'IRATE', 'SNARE',
    'LEARN', 'ROATE', 'STAIN', 'STALE', 'ADIEU', 'AUDIO', 'BLEND', 'CLASP',
    'DWARF', 'FLAME', 'GRIND', 'KNELT', 'PLUMB', 'QUEST',
  ];

  const letterFreqs: Record<string, number> = {};
  for (const word of LIKELY_ANSWERS) {
    for (const letter of word.toUpperCase().split('')) {
      letterFreqs[letter] = (letterFreqs[letter] || 0) + 1;
    }
  }
  const totalAnswers = LIKELY_ANSWERS.length;

  const results: StarterWordMetric[] = topWords.slice(0, count).map((word, idx) => {
    const wordUpper = word.toUpperCase();

    // Letter coverage: how many distinct letters from the top-6 most common does this word have?
    const topLetters = ['E', 'A', 'R', 'S', 'T', 'N', 'L', 'O', 'I', 'C'];
    const letterCoverage = Math.round(
      new Set(wordUpper.split('')).size >= 5
        ? (new Set(wordUpper.split('').filter(l => topLetters.includes(l))).size / 5) * 100
        : 60
    );

    // Positional score: how well do the letters align with common positions?
    const posFreqs: Record<string, number[]> = { A: [0,0,0,0,0], E: [0,0,0,0,0], R: [0,0,0,0,0], S: [0,0,0,0,0], T: [0,0,0,0,0] };
    for (const ans of LIKELY_ANSWERS) {
      for (let i = 0; i < 5; i++) {
        const l = ans[i];
        if (posFreqs[l]) posFreqs[l][i]++;
      }
    }
    let posScore = 0;
    for (let i = 0; i < 5; i++) {
      const l = wordUpper[i];
      if (posFreqs[l]) posScore += (posFreqs[l][i] || 0) / totalAnswers;
    }
    const positionalScore = Math.round(Math.min(100, posScore * 200));

    // Entropy score: pre-computed approximate values based on known results
    const entropyScores: Record<string, number> = {
      'SOARE': 99, 'SLATE': 97, 'CRANE': 95, 'SALET': 96, 'TRACE': 94,
      'RAISE': 92, 'ARISE': 91, 'STARE': 90, 'SHARE': 85, 'CRATE': 89,
      'TARES': 88, 'LEAST': 86, 'LANCE': 78, 'ALERT': 83, 'IRATE': 87,
      'SNARE': 79, 'LEARN': 82, 'ROATE': 93, 'STAIN': 81, 'STALE': 84,
      'ADIEU': 70, 'AUDIO': 55, 'BLEND': 65, 'CLASP': 63, 'DWARF': 50,
      'FLAME': 62, 'GRIND': 64, 'KNELT': 58, 'PLUMB': 48, 'QUEST': 52,
    };

    // Average remaining after this word (approximate)
    const sampleAnswers = LIKELY_ANSWERS.slice(0, 50);
    let totalRemaining = 0;
    let bestCase = Infinity;
    let worstCase = 0;
    let solvedIn3 = 0;

    for (const testAnswer of sampleAnswers) {
      const testClue = generateClue(wordUpper, testAnswer);
      const remaining = getRemainingWords(wordUpper, testClue, [...LIKELY_ANSWERS]);
      totalRemaining += remaining.length;
      bestCase = Math.min(bestCase, remaining.length);
      worstCase = Math.max(worstCase, remaining.length);
      // Approximate solve rate in 3: if remaining <= 2 after first guess
      if (remaining.length <= 2) solvedIn3++;
    }

    const avgRemaining = Math.round((totalRemaining / sampleAnswers.length) * 10) / 10;
    const solveRate3 = Math.round((solvedIn3 / sampleAnswers.length) * 100);

    const entropyScore = entropyScores[wordUpper] || Math.round(Math.max(40, 100 - idx * 3));

    // Overall rank: weighted combination
    const overallRank = Math.round(
      entropyScore * 0.4 +
      letterCoverage * 0.2 +
      positionalScore * 0.2 +
      (100 - Math.min(100, avgRemaining / 20)) * 0.2
    );

    return {
      word: wordUpper,
      entropyScore,
      letterCoverage,
      positionalScore,
      avgRemaining,
      bestCaseRemaining: bestCase,
      worstCaseRemaining: worstCase,
      solveRate3,
      overallRank,
    };
  });

  results.sort((a, b) => b.overallRank - a.overallRank);
  return results;
}

/**
 * Get the top starting words (legacy API compatibility)
 */
export function getTopStartingWords(count: number = 20): { word: string; score: number; reason: string }[] {
  const rankings = getStarterWordRankings(count);
  const reasons: Record<string, string> = {
    'SOARE': 'The AI\'s preferred opener. Eliminates the most possibilities on average across all Wordle answers.',
    'SLATE': 'Contains the two most common consonants (S, T) and the most common vowel (A, E). Excellent letter coverage.',
    'CRANE': 'Uses C, R, N (top consonants) and A, E (top vowels). Great for revealing the answer structure.',
    'SALET': 'Mathematically proven near-optimal by information theory. Covers S, A, L, E, T — all high-frequency letters.',
    'TRACE': 'Top performer in simulations. T, R, A, C, E are all in the top 12 most common Wordle letters.',
    'RAISE': 'R, A, I, S, E cover 4 of the top 5 consonants and 2 of the top vowels. Strong elimination power.',
    'ARISE': 'Same letters as RAISE in different order. Effectively identical in information value.',
    'STARE': 'S, T, A, R, E — covers 5 of the 6 most common Wordle letters. Very strong opener.',
    'SHARE': 'S, H, A, R, E — includes H which is surprisingly common in Wordle answers.',
    'CRATE': 'C, R, A, T, E — strong coverage of common consonants and vowels.',
  };

  return rankings.map((r) => ({
    word: r.word,
    score: r.overallRank / 100,
    reason: reasons[r.word] || `Overall rank: ${r.overallRank}/100. Strong opener with ${r.entropyScore}% entropy score.`,
  }));
}

/**
 * Calculate letter frequency in Wordle answers.
 */
export function getLetterFrequency(): { letter: string; frequency: number; positionFreq: number[] }[] {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const result: { letter: string; frequency: number; positionFreq: number[] }[] = [];

  for (const letter of letters) {
    let total = 0;
    const positionFreq = [0, 0, 0, 0, 0];

    for (const word of LIKELY_ANSWERS) {
      const upper = word.toUpperCase();
      if (upper.includes(letter)) {
        total++;
      }
      for (let i = 0; i < 5; i++) {
        if (upper[i] === letter) {
          positionFreq[i]++;
        }
      }
    }

    result.push({
      letter,
      frequency: total / LIKELY_ANSWERS.length,
      positionFreq: positionFreq.map((f) => f / LIKELY_ANSWERS.length),
    });
  }

  result.sort((a, b) => b.frequency - a.frequency);

  return result;
}
