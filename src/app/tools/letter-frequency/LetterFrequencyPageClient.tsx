'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLetterFrequency } from '@/lib/wordle/analyzer';
import { BarChart3 } from 'lucide-react';

const POSITION_LABELS = ['1st', '2nd', '3rd', '4th', '5th'];

export function LetterFrequencyPageClient() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const letterData = useMemo(() => getLetterFrequency(), []);

  const selectedData = letterData.find((d) => d.letter === selectedLetter);
  const maxFreq = Math.max(...letterData.map((d) => d.frequency));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <BarChart3 className="h-6 w-6 text-[#6aaa64]" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Letter <span className="text-[#6aaa64]">Frequency</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore how often each letter appears in Wordle answers. Click any letter to see its position-specific frequency.
        </p>
      </motion.div>

      {/* Letter Grid */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-9 sm:grid-cols-13 gap-2 justify-items-center">
            {letterData.map((data) => {
              const intensity = Math.round((data.frequency / maxFreq) * 100);
              const isSelected = selectedLetter === data.letter;

              return (
                <button
                  key={data.letter}
                  onClick={() => setSelectedLetter(isSelected ? null : data.letter)}
                  className={`relative w-full aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-bold transition-all hover:scale-110 ${
                    isSelected
                      ? 'ring-2 ring-[#6aaa64] bg-[#6aaa64] text-white'
                      : 'bg-muted hover:bg-[#6aaa64]/10'
                  }`}
                  style={
                    !isSelected
                      ? {
                          backgroundColor: `rgba(106, 170, 100, ${intensity / 200})`,
                        }
                      : {}
                  }
                  aria-label={`Letter ${data.letter}: ${(data.frequency * 100).toFixed(1)}% frequency`}
                >
                  <span>{data.letter}</span>
                  <span className={`text-[9px] font-normal ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {(data.frequency * 100).toFixed(0)}%
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overall Frequency Chart */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-lg font-bold mb-4">Overall Letter Frequency</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {letterData.map((data) => (
              <div key={data.letter} className="flex items-center gap-3">
                <span className="w-6 text-sm font-mono font-bold text-right">
                  {data.letter}
                </span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.frequency / maxFreq) * 100}%` }}
                    transition={{ duration: 0.5, delay: letterData.indexOf(data) * 0.02 }}
                    className="h-full bg-[#6aaa64] rounded-full"
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {(data.frequency * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Letter Detail */}
      {selectedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-[#6aaa64]/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#6aaa64] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedData.letter}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Letter {selectedData.letter}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Appears in {(selectedData.frequency * 100).toFixed(1)}% of Wordle answers
                  </p>
                </div>
              </div>

              {/* Position Breakdown */}
              <h3 className="font-semibold mb-3">Position-Specific Frequency</h3>
              <div className="grid grid-cols-5 gap-3">
                {selectedData.positionFreq.map((freq, pos) => (
                  <div
                    key={pos}
                    className="text-center p-3 rounded-lg bg-muted/50"
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {POSITION_LABELS[pos]}
                    </div>
                    <div className="text-lg font-bold text-[#6aaa64]">
                      {(freq * 100).toFixed(1)}%
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6aaa64] rounded-full transition-all"
                        style={{
                          width: `${(freq / Math.max(...selectedData.positionFreq)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Most common position: {POSITION_LABELS[selectedData.positionFreq.indexOf(Math.max(...selectedData.positionFreq))]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Least common position: {POSITION_LABELS[selectedData.positionFreq.indexOf(Math.min(...selectedData.positionFreq))]}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Explanation */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-xl bg-muted/50 border"
      >
        <h2 className="text-xl font-bold mb-3">Understanding Letter Frequency</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Letter frequency analysis is one of the most powerful tools for improving your Wordle game. The data above shows how often each letter appears in the common Wordle answer list, both overall and in specific positions. This information can guide your word selection at every stage of the game.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          The most frequent letters (E, A, R, O, T, L, I, S, N) should be your primary targets in early guesses. Testing these letters first maximizes the expected information gain from each guess. Position-specific frequency is equally important — knowing that S is the most common starting letter while E is the most common ending letter helps you choose words that test letters in their most likely positions.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use this tool to explore the data interactively. Click on any letter to see its detailed position breakdown, and use these insights to inform your opening word choice and subsequent guesses. The colors in the letter grid above reflect overall frequency — darker green means the letter appears more frequently in Wordle answers.
        </p>
      </motion.section>
    </div>
  );
}
