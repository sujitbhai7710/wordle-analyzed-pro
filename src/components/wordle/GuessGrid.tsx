'use client';

import { TileCell } from './TileCell';

interface GuessGridProps {
  guessInputs: string[];
  focusedRow: number;
  firstIncomplete: number;
  lastFilledRow: number;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

const MAX_ROWS = 7;
const WORD_LENGTH = 5;

export function GuessGrid({
  guessInputs,
  focusedRow,
  firstIncomplete,
  lastFilledRow,
  onCellClick,
}: GuessGridProps) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-[5px]" role="grid" aria-label="Wordle guess grid">
      {Array.from({ length: MAX_ROWS }, (_, rowIndex) => {
        const rowValue = guessInputs[rowIndex] || '';
        const isFocused = rowIndex === focusedRow;
        // Rows after the first incomplete row (if they're empty) are disabled
        const isDisabled = rowIndex > firstIncomplete + 1 && rowValue.length === 0;
        // Row is the answer row (last non-empty row indicator)
        const isAnswerRow = rowIndex === lastFilledRow && lastFilledRow > 0;

        return (
          <div
            key={rowIndex}
            className={`flex gap-1 sm:gap-[5px] transition-opacity ${isDisabled ? 'opacity-30' : 'opacity-100'}`}
            role="row"
          >
            {Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
              const letter = rowValue[colIndex] || '';
              const hasChar = letter !== '';

              return (
                <TileCell
                  key={colIndex}
                  letter={letter}
                  hasChar={hasChar}
                  isFocused={isFocused && colIndex === rowValue.length && colIndex < WORD_LENGTH}
                  isAnswerRow={isAnswerRow}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                  isDisabled={isDisabled}
                  index={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
