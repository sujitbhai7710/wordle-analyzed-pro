'use client';

interface TileCellProps {
  letter: string;
  hasChar: boolean;
  isFocused: boolean;
  isAnswerRow: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  // For analysis view (colored tiles)
  color?: 'correct' | 'present' | 'absent' | 'empty';
  isRevealing?: boolean;
  index?: number;
}

const colorMap: Record<string, string> = {
  correct: 'bg-[#6aaa64] text-white border-[#6aaa64] dark:bg-[#538d4e] dark:border-[#538d4e]',
  present: 'bg-[#c9b458] text-white border-[#c9b458] dark:bg-[#b59f3b] dark:border-[#b59f3b]',
  absent: 'bg-[#787c7e] text-white border-[#787c7e] dark:bg-[#3a3a3c] dark:border-[#3a3a3c]',
  empty: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
};

export function TileCell({
  letter,
  hasChar,
  isFocused,
  isAnswerRow,
  onClick,
  isDisabled,
  color,
  isRevealing,
  index,
}: TileCellProps) {
  // If in analysis mode (color is provided), use colored styling
  const isAnalysisMode = color !== undefined;

  if (isAnalysisMode) {
    return (
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold uppercase border-2 select-none ${
          colorMap[color] || colorMap.empty
        }`}
        style={
          isRevealing && index !== undefined
            ? {
                animation: `flipIn 0.5s ease ${index * 0.1}s both`,
              }
            : undefined
        }
        aria-label={`${letter || 'Empty'} tile, ${color === 'correct' ? 'correct position' : color === 'present' ? 'wrong position' : color === 'absent' ? 'not in word' : 'no color'}`}
      >
        {letter}
      </div>
    );
  }

  // Input mode - no colors, just styled tiles
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold uppercase select-none transition-all duration-100 ${
        hasChar
          ? 'border-2 border-gray-500 dark:border-gray-400 bg-transparent'
          : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'
      } ${isFocused ? 'border-[#6aaa64] shadow-[0_0_0_1px_#6aaa64]' : ''} ${
        isAnswerRow && hasChar ? 'border-b-[#6aaa64]' : ''
      } ${!isDisabled ? 'cursor-pointer' : ''}`}
      aria-label={`Row cell ${index !== undefined ? index + 1 : ''}, ${letter || 'empty'}`}
    >
      {letter}
    </button>
  );
}
