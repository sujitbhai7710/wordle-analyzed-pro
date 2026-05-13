/**
 * WASM-powered Wordle Solver Bridge
 * 
 * This module loads the Rust-compiled WASM solver and provides a JavaScript
 * interface for the heavy computational features:
 * - 5-Method Solver Comparison (runs 5 different AI strategies)
 * - Difficulty Calculation (entropy, frequency analysis)
 * - Skill & Luck Scoring (comprehensive breakdown)
 */

import { LIKELY_ANSWERS } from '../word-list';
import type { SolverMethod, DifficultyMetrics, SkillBreakdown, AIPlayTurn, Clue } from '../types';

// WASM module interface
interface WasmSolver {
  run_all_solvers(answer: string, word_list_json: string): unknown;
  compute_difficulty(answer: string, word_list_json: string): unknown;
  compute_skill(player_guesses_json: string, answer: string, word_list_json: string, hard_mode: boolean): unknown;
  suggest_best_play(remaining_words_json: string): string;
}

interface WasmSolverResult {
  method_name: string;
  method_description: string;
  guesses: string[];
  total_guesses: number;
  solved: boolean;
  clue_history: { letter: string; color: string }[][];
}

interface WasmDifficultyResult {
  overall: number;
  letter_frequency: number;
  positional_ambiguity: number;
  duplicate_risk: number;
  common_pattern: number;
  info_entropy: number;
  label: string;
  description: string;
}

interface WasmSkillResult {
  skill_score: number;
  luck_score: number;
  efficiency: number;
  consistency: number;
  clue_utilization: number;
  skill_label: string;
}

let wasmInstance: WasmSolver | null = null;
let wasmLoadPromise: Promise<WasmSolver> | null = null;

/**
 * Load the WASM module (lazy-loaded on first use)
 */
async function loadWasm(): Promise<WasmSolver> {
  if (wasmInstance) return wasmInstance;
  if (wasmLoadPromise) return wasmLoadPromise;

  wasmLoadPromise = (async () => {
    try {
      // Dynamic import of the WASM module
      const wasmModule = await import('/wasm/wasm_solver.js');
      const wasmBinary = await fetch('/wasm/wasm_solver_bg.wasm');
      const wasmBytes = await wasmBinary.arrayBuffer();
      const wasm = await wasmModule.default(wasmBytes);
      wasmInstance = wasm as WasmSolver;
      return wasmInstance;
    } catch (err) {
      console.warn('WASM solver failed to load, falling back to JS implementation:', err);
      return null as unknown as WasmSolver;
    }
  })();

  return wasmLoadPromise;
}

/**
 * Check if WASM is available
 */
export async function isWasmAvailable(): Promise<boolean> {
  try {
    const wasm = await loadWasm();
    return wasm !== null;
  } catch {
    return false;
  }
}

/**
 * Map WASM clue colors to our CellColor type
 */
function mapWasmClueColor(color: string): 'correct' | 'present' | 'absent' {
  switch (color) {
    case 'Correct': return 'correct';
    case 'Present': return 'present';
    case 'Absent': return 'absent';
    default: return 'absent';
  }
}

/**
 * Convert WASM clue history to our AIPlayTurn format
 */
function wasmClueToTurns(
  guesses: string[],
  clueHistory: { letter: string; color: string }[][],
  answer: string,
  wordList: string[]
): AIPlayTurn[] {
  const LIKELY_SET = new Set(LIKELY_ANSWERS.map(w => w.toUpperCase()));
  const turns: AIPlayTurn[] = [];
  let currentLikely = [...wordList];

  for (let i = 0; i < guesses.length; i++) {
    const guess = guesses[i];
    const clueArr = clueHistory[i] || [];
    const clue: Clue[] = clueArr.map(c => ({
      letter: c.letter,
      color: mapWasmClueColor(c.color),
    }));

    const remainingBefore = currentLikely.length;
    const newRemaining = currentLikely.filter(word => {
      const wordUpper = word.toUpperCase();
      for (let j = 0; j < 5; j++) {
        if (j >= clue.length) break;
        if (clue[j].color === 'correct' && wordUpper[j] !== clue[j].letter) return false;
        if (clue[j].color === 'present') {
          if (wordUpper[j] === clue[j].letter) return false;
          if (!wordUpper.includes(clue[j].letter)) return false;
        }
      }
      return true;
    });

    const actualRemaining = newRemaining.length;
    const guessQuality = remainingBefore > 1
      ? Math.round(((remainingBefore - actualRemaining) / (remainingBefore - 1)) * 10000) / 100
      : 100;

    turns.push({
      guess,
      clue,
      strategy: 'eliminate_likely' as const,
      avgRemaining: 0,
      avgLikelyRemaining: 0,
      guessQuality,
      actualRemaining,
      actualLikelyRemaining: newRemaining.filter(w => LIKELY_SET.has(w.toUpperCase())).length,
      luck: { level: 'neutral' as const, rating: 'neutral' as const },
      isLikelyWord: LIKELY_SET.has(guess.toUpperCase()),
      remainingWords: newRemaining.slice(0, 20),
    });

    currentLikely = newRemaining;
  }

  return turns;
}

/**
 * Run 5-Method Solver Comparison using WASM
 * Falls back to JS implementation if WASM unavailable
 */
export async function runWasmSolverComparison(
  answer: string,
  hardMode: boolean,
  jsFallback: () => SolverMethod[]
): Promise<SolverMethod[]> {
  try {
    const wasm = await loadWasm();
    if (!wasm) return jsFallback();

    const wordListJson = JSON.stringify(LIKELY_ANSWERS);
    const results = wasm.run_all_solvers(answer, wordListJson) as WasmSolverResult[];

    if (!results || !Array.isArray(results)) return jsFallback();

    const LIKELY_SET = new Set(LIKELY_ANSWERS.map(w => w.toUpperCase()));

    return results.map((result) => {
      const turns = wasmClueToTurns(
        result.guesses,
        result.clue_history,
        answer.toUpperCase(),
        LIKELY_ANSWERS
      );

      return {
        name: result.method_name,
        description: result.method_description,
        turns,
        totalGuesses: result.total_guesses,
        solved: result.solved,
      };
    });
  } catch (err) {
    console.warn('WASM solver comparison failed, using JS fallback:', err);
    return jsFallback();
  }
}

/**
 * Compute difficulty using WASM
 */
export async function runWasmDifficulty(
  answer: string,
  jsFallback: () => DifficultyMetrics
): Promise<DifficultyMetrics> {
  try {
    const wasm = await loadWasm();
    if (!wasm) return jsFallback();

    const wordListJson = JSON.stringify(LIKELY_ANSWERS);
    const result = wasm.compute_difficulty(answer, wordListJson) as WasmDifficultyResult;

    if (!result) return jsFallback();

    return {
      overall: result.overall,
      letterFrequency: result.letter_frequency,
      positionalAmbiguity: result.positional_ambiguity,
      duplicateRisk: result.duplicate_risk,
      commonPattern: result.common_pattern,
      infoEntropy: result.info_entropy,
      label: result.label as DifficultyMetrics['label'],
      description: result.description,
    };
  } catch (err) {
    console.warn('WASM difficulty failed, using JS fallback:', err);
    return jsFallback();
  }
}

/**
 * Compute skill breakdown using WASM
 */
export async function runWasmSkill(
  guesses: string[],
  answer: string,
  hardMode: boolean,
  jsFallback: () => SkillBreakdown
): Promise<SkillBreakdown> {
  try {
    const wasm = await loadWasm();
    if (!wasm) return jsFallback();

    const guessesJson = JSON.stringify(guesses);
    const wordListJson = JSON.stringify(LIKELY_ANSWERS);
    const result = wasm.compute_skill(guessesJson, answer, wordListJson, hardMode) as WasmSkillResult;

    if (!result) return jsFallback();

    return {
      skillScore: result.skill_score,
      luckScore: result.luck_score,
      efficiency: result.efficiency,
      consistency: result.consistency,
      clueUtilization: result.clue_utilization,
      skillLabel: result.skill_label,
    };
  } catch (err) {
    console.warn('WASM skill failed, using JS fallback:', err);
    return jsFallback();
  }
}
