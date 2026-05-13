'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GuessGrid } from './GuessGrid';
import { AnalysisView } from './AnalysisView';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeGame, decodeGameState } from '@/lib/wordle/analyzer';
import type { AnalysisResult } from '@/lib/wordle/types';
import { Eraser, Search, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MAX_ROWS = 7;
const WORD_LENGTH = 5;

export function WordleAnalyzer() {
  const [guessInputs, setGuessInputs] = useState<string[]>(Array(MAX_ROWS).fill(''));
  const [focusedRow, setFocusedRow] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Load shared game state from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedState = params.get('s');
      if (sharedState) {
        const decoded = decodeGameState(sharedState);
        if (decoded) {
          const newInputs = Array(MAX_ROWS).fill('');
          decoded.guesses.forEach((g, i) => {
            if (i < MAX_ROWS) newInputs[i] = g.toUpperCase();
          });
          // Answer in last guess row
          const answerIdx = decoded.guesses.length;
          if (answerIdx < MAX_ROWS) {
            newInputs[answerIdx] = decoded.answer.toUpperCase();
          }
          setGuessInputs(newInputs);
          setHardMode(decoded.hardMode);
          // Auto-analyze after a short delay
          setTimeout(() => {
            const nonEmptyRows = newInputs.filter((g: string) => g.length === WORD_LENGTH);
            if (nonEmptyRows.length >= 2) {
              const answer = nonEmptyRows[nonEmptyRows.length - 1];
              const guesses = nonEmptyRows.slice(0, -1);
              try {
                const analysisResult = analyzeGame(guesses, answer, decoded.hardMode);
                setResult(analysisResult);
                setAnalyzed(true);
              } catch (err) {
                // ignore
              }
            }
          }, 300);
          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    }
  }, []);

  const getFirstIncompleteRow = useCallback((inputs: string[]) => {
    return inputs.findIndex((g) => g.length < WORD_LENGTH);
  }, []);

  const handleInputChange = useCallback((rowIndex: number, value: string) => {
    const filtered = value.replace(/[^a-zA-Z]/g, '').slice(0, WORD_LENGTH).toUpperCase();

    setGuessInputs((prev) => {
      const newInputs = [...prev];
      const oldValue = prev[rowIndex];
      newInputs[rowIndex] = filtered;

      // Auto-advance: if user just completed a word (was < 5, now == 5), move to next row
      if (filtered.length === WORD_LENGTH && oldValue.length < WORD_LENGTH && rowIndex + 1 < MAX_ROWS) {
        setTimeout(() => {
          inputRefs.current[rowIndex + 1]?.focus();
          setFocusedRow(rowIndex + 1);
        }, 50);
      }

      // If overflow: user typed a 6th char when 5 already exist
      if (value.length > WORD_LENGTH && oldValue.length === WORD_LENGTH && value.startsWith(oldValue)) {
        const overflowChar = value.slice(WORD_LENGTH).replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
        if (overflowChar && rowIndex + 1 < MAX_ROWS) {
          const nextRow = rowIndex + 1;
          newInputs[nextRow] = overflowChar + prev[nextRow];
          setTimeout(() => {
            inputRefs.current[nextRow]?.focus();
            setFocusedRow(nextRow);
          }, 0);
        }
      }

      return newInputs;
    });
  }, []);

  const handleKeyDown = useCallback((rowIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = guessInputs[rowIndex];

    if (e.key === 'Backspace') {
      if (input.selectionStart === 0 && input.selectionEnd === 0 && value.length === 0 && rowIndex > 0) {
        e.preventDefault();
        const prevRow = rowIndex - 1;
        setGuessInputs((prev) => {
          const newInputs = [...prev];
          const prevValue = newInputs[prevRow];
          if (prevValue.length > 0) {
            newInputs[prevRow] = prevValue.slice(0, -1);
          }
          return newInputs;
        });
        setTimeout(() => {
          const prevInput = inputRefs.current[prevRow];
          if (prevInput) {
            prevInput.focus();
            const len = guessInputs[prevRow].length - 1;
            prevInput.setSelectionRange(Math.max(0, len), Math.max(0, len));
          }
          setFocusedRow(prevRow);
        }, 0);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (value.length === WORD_LENGTH && rowIndex + 1 < MAX_ROWS) {
        const nextRow = rowIndex + 1;
        inputRefs.current[nextRow]?.focus();
        setFocusedRow(nextRow);
      }
    } else if (e.key === 'Tab') {
      // Let Tab naturally move focus
    }
  }, [guessInputs]);

  const handleFocus = useCallback((rowIndex: number) => {
    setFocusedRow(rowIndex);
  }, []);

  const handleCellClick = useCallback((rowIndex: number, cellIndex: number) => {
    const input = inputRefs.current[rowIndex];
    if (input) {
      input.focus();
      const value = guessInputs[rowIndex];
      if (cellIndex < value.length) {
        input.setSelectionRange(cellIndex, cellIndex + 1);
      } else {
        input.setSelectionRange(value.length, value.length);
      }
      setFocusedRow(rowIndex);
    }
  }, [guessInputs]);

  const handleAnalyze = useCallback(() => {
    const nonEmptyRows = guessInputs.filter((g) => g.length === WORD_LENGTH);

    if (nonEmptyRows.length < 2) {
      toast({
        title: "Need at least 2 rows",
        description: "Enter your guesses in the top rows and the answer in the last row.",
        variant: "destructive",
      });
      return;
    }

    const answer = nonEmptyRows[nonEmptyRows.length - 1];
    const guesses = nonEmptyRows.slice(0, -1);

    try {
      const analysisResult = analyzeGame(guesses, answer, hardMode);
      setResult(analysisResult);
      setAnalyzed(true);
    } catch (err) {
      toast({
        title: "Analysis error",
        description: "Something went wrong. Please check your inputs.",
        variant: "destructive",
      });
    }
  }, [guessInputs, hardMode]);

  const handleClear = useCallback(() => {
    setGuessInputs(Array(MAX_ROWS).fill(''));
    setFocusedRow(0);
    setAnalyzed(false);
    setResult(null);
  }, []);

  useEffect(() => {
    if (!analyzed) {
      inputRefs.current[0]?.focus();
    }
  }, [analyzed]);

  if (analyzed && result) {
    return <AnalysisView result={result} onNewAnalysis={handleClear} />;
  }

  const firstIncomplete = getFirstIncompleteRow(guessInputs);
  const lastFilledRow = guessInputs.reduce((last, g, i) => (g.length > 0 ? i : last), -1);

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      {/* Instruction */}
      <div className="text-center space-y-1 mb-2 px-2">
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Enter your guesses, then the answer in the last row
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          Type 5-letter words &bull; The last row is the answer &bull; Auto-advances when row is complete
        </p>
      </div>

      <GuessGrid
        guessInputs={guessInputs}
        focusedRow={focusedRow}
        firstIncomplete={firstIncomplete}
        lastFilledRow={lastFilledRow}
        onCellClick={handleCellClick}
      />

      {/* Hidden inputs */}
      <div className="sr-only" aria-hidden="true">
        {guessInputs.map((_, rowIndex) => (
          <input
            key={rowIndex}
            ref={(el) => { inputRefs.current[rowIndex] = el; }}
            type="text"
            maxLength={WORD_LENGTH}
            value={guessInputs[rowIndex]}
            onChange={(e) => handleInputChange(rowIndex, e.target.value)}
            onKeyDown={(e) => handleKeyDown(rowIndex, e)}
            onFocus={() => handleFocus(rowIndex)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            style={{ position: 'absolute', left: '-2000px', opacity: 0 }}
          />
        ))}
      </div>

      {/* Hard Mode Toggle & Action Buttons */}
      <Card>
        <CardContent className="pt-4 pb-4 sm:pt-5 sm:pb-5 space-y-3 sm:space-y-4 px-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hardmode"
              checked={hardMode}
              onCheckedChange={(checked) => setHardMode(checked === true)}
            />
            <Label htmlFor="hardmode" className="text-xs sm:text-sm cursor-pointer">
              Hard Mode
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={handleAnalyze}
              className="flex-1 gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold"
              size="lg"
            >
              <Search className="h-4 w-4" />
              Analyze
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="gap-2 w-full sm:w-auto"
              size="lg"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
