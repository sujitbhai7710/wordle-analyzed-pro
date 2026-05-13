import { LIKELY_ANSWERS, ALL_VALID_WORDS, LIKELY_SET, ALL_WORDS_SET, isLikelyAnswer } from './word-list';
import type { Clue, CellColor, TurnAnalysis, AnalysisResult, AIStrategy, LuckLevel, AIPlayTurn } from './types';

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
  let actualTotal = 0;
  let actualLikely = 0;

  // Use remainingWords (likely list) for filtering, not the full allWords
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

  return { avgTotal, avgLikely, actualTotal, actualLikely };
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
 * Find the optimal next guess.
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

  // Build candidate list - optimized for speed
  const candidates = new Set<string>();
  remainingWords.forEach((w) => candidates.add(w.toUpperCase()));

  // Add top starters for first guess
  const topStarters = ['SOARE', 'SLATE', 'CRANE', 'SALET', 'TRACE', 'RAISE', 'STARE', 'CRATE', 'IRATE', 'ARISE'];
  topStarters.forEach((w) => candidates.add(w));

  const candidateArray = Array.from(candidates).slice(0, 30);

  // Score each candidate using entropy
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

    // Small bonus for being a possible answer
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
        // Must use this letter in this position
        if (guess[i] !== clueItem.letter) {
          violations.push(`Position ${i + 1} must be '${clueItem.letter}'`);
        }
      } else if (clueItem.color === 'present') {
        // Must include this letter somewhere
        if (!guess.includes(clueItem.letter)) {
          violations.push(`Must include '${clueItem.letter}'`);
        }
        // Must NOT use it in the same position
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
        // absent - check if letter appears in guess despite being absent
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
 * Simulate AI playthrough from scratch.
 */
function simulateAIPlaythrough(
  answer: string,
  hardMode: boolean
): AIPlayTurn[] {
  const turns: AIPlayTurn[] = [];
  let currentLikely = [...LIKELY_ANSWERS];
  const previousClues: Clue[][] = [];

  for (let i = 0; i < 6; i++) {
    const remainingLikely = currentLikely.filter(w => LIKELY_SET.has(w)).length;
    const { word: aiGuess, strategy } = getBestPlay(currentLikely, currentLikely);

    if (!aiGuess) break;

    const clue = generateClue(aiGuess, answer);
    const { avgTotal, avgLikely } = getAverageRemaining(aiGuess, currentLikely, currentLikely);
    const newLikely = getRemainingWords(aiGuess, clue, currentLikely);
    const guessQuality = calculateGuessQuality(newLikely.length, currentLikely.length);
    const luck = calculateLuckLevel(newLikely.length, newLikely.filter(w => LIKELY_SET.has(w)).length, avgTotal, avgLikely);

    turns.push({
      guess: aiGuess,
      clue,
      strategy,
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

    // Check if AI found the answer
    if (aiGuess.toUpperCase() === answer.toUpperCase()) break;
    if (newLikely.length <= 1) break;
  }

  return turns;
}

/**
 * Full game analysis.
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

  for (let i = 0; i < guesses.length; i++) {
    const guess = guesses[i].toUpperCase();

    // Skip the answer row itself
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

    // Get average remaining for this guess
    const { avgTotal, avgLikely } = getAverageRemaining(guess, currentLikely, currentAll);

    // Calculate luck
    const luck = calculateLuckLevel(remainingAfter, remainingLikelyAfter, avgTotal, avgLikely);

    // Calculate guess quality
    const guessQuality = calculateGuessQuality(remainingAfter, remainingBefore);

    // Get AI recommendation
    const { word: aiRecommendation, strategy: aiStrategy } = getBestPlay(currentLikely, currentAll);
    const aiClue = generateClue(aiRecommendation, answerUpper);

    // AI metrics
    const aiRemaining = getRemainingWords(aiRecommendation, aiClue, currentLikely);
    const aiRemainingLikely = aiRemaining.filter(w => LIKELY_SET.has(w)).length;
    const { avgTotal: aiAvgTotal, avgLikely: aiAvgLikely } = getAverageRemaining(aiRecommendation, currentLikely, currentAll);
    const aiGuessQuality = calculateGuessQuality(aiRemaining.length, remainingBefore);
    const aiLuck = calculateLuckLevel(aiRemaining.length, aiRemainingLikely, aiAvgTotal, aiAvgLikely);

    // Check if guess is a possible answer
    const { isPossible: isPossibleAnswer, unusedClues } = checkPossibleAnswer(guess, previousClues);

    // Check hard mode violations
    const hardModeViolations = hardMode ? checkHardModeViolations(guess, previousClues) : [];

    // Is likely word
    const isLikelyWord = LIKELY_SET.has(guess);

    // Generate commentary
    const commentary = generateCommentary(
      i + 1,
      guess,
      remainingBefore,
      remainingLikelyBefore,
      remainingAfter,
      remainingLikelyAfter,
      remainingAfterList,
      aiRecommendation,
      isLikelyWord,
      i === 0
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
      hardModeViolations,
      isLikelyWord,
      commentary,
    });

    previousClues.push(clue);
    currentLikely = remainingAfterList;
    currentAll = getRemainingWords(guess, clue, currentAll);
  }

  // Simulate AI playthrough
  const aiPlaythrough = simulateAIPlaythrough(answerUpper, hardMode);

  return {
    turns,
    aiPlaythrough,
    totalGuesses: guesses.length,
    hardMode,
    answer: answerUpper,
  };
}

/**
 * Get the top starting words ranked by information score.
 */
export function getTopStartingWords(count: number = 20): { word: string; score: number; reason: string }[] {
  const topWords = [
    { word: 'SOARE', reason: 'The AI\'s preferred opener. Eliminates the most possibilities on average across all Wordle answers.' },
    { word: 'SLATE', reason: 'Contains the two most common consonants (S, T) and the most common vowel (A, E). Excellent letter coverage.' },
    { word: 'CRANE', reason: 'Uses C, R, N (top consonants) and A, E (top vowels). Great for revealing the answer structure.' },
    { word: 'SALET', reason: 'Mathematically proven near-optimal by information theory. Covers S, A, L, E, T — all high-frequency letters.' },
    { word: 'TRACE', reason: 'Top performer in simulations. T, R, A, C, E are all in the top 12 most common Wordle letters.' },
    { word: 'RAISE', reason: 'R, A, I, S, E cover 4 of the top 5 consonants and 2 of the top vowels. Strong elimination power.' },
    { word: 'ARISE', reason: 'Same letters as RAISE in different order. Effectively identical in information value.' },
    { word: 'STARE', reason: 'S, T, A, R, E — covers 5 of the 6 most common Wordle letters. Very strong opener.' },
    { word: 'SHARE', reason: 'S, H, A, R, E — includes H which is surprisingly common in Wordle answers.' },
    { word: 'CRATE', reason: 'C, R, A, T, E — strong coverage of common consonants and vowels.' },
    { word: 'TARES', reason: 'T, A, R, E, S — anagram of STARE with excellent letter distribution.' },
    { word: 'LEAST', reason: 'L, E, A, S, T — covers L which many openers miss, plus the essential S, T, A, E.' },
    { word: 'LANCE', reason: 'L, A, N, C, E — covers the often-overlooked L and N along with A, C, E.' },
    { word: 'ALERT', reason: 'A, L, E, R, T — solid coverage of high-frequency letters in common positions.' },
    { word: 'IRATE', reason: 'I, R, A, T, E — great for testing two vowels (I, A) and common consonants.' },
    { word: 'SNARE', reason: 'S, N, A, R, E — covers the common S, N and tests A, R, E positions.' },
    { word: 'LEARN', reason: 'L, E, A, R, N — excellent for revealing L and N positions early.' },
    { word: 'ROATE', reason: 'R, O, A, T, E — tests three vowels (O, A, E) and two key consonants.' },
    { word: 'STAIN', reason: 'S, T, A, I, N — covers the -ST- and -IN- patterns common in Wordle answers.' },
    { word: 'STALE', reason: 'S, T, A, L, E — another excellent combination of the most common letters.' },
  ];

  return topWords.slice(0, count).map((tw, i) => ({
    ...tw,
    score: 1 - i * 0.02,
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
