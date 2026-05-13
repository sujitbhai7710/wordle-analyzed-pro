'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getTopStartingWords } from '@/lib/wordle/analyzer';
import { Crown, Filter, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

type FilterType = 'all' | 'vowel-heavy' | 'consonant-heavy' | 'common-letters';

const topWords = getTopStartingWords(20);

const vowelHeavyWords = topWords.filter((w) => {
  const vowels = (w.word.match(/[AEIOU]/g) || []).length;
  return vowels >= 3;
});

const consonantHeavyWords = topWords.filter((w) => {
  const vowels = (w.word.match(/[AEIOU]/g) || []).length;
  return vowels <= 1;
});

const commonLetterWords = topWords.filter((w) => {
  const common = ['S', 'T', 'A', 'E', 'R', 'N'];
  const matches = w.word.split('').filter((l) => common.includes(l)).length;
  return matches >= 4;
});

export function BestWordsPageClient() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const getFilteredWords = () => {
    switch (filter) {
      case 'vowel-heavy': return vowelHeavyWords;
      case 'consonant-heavy': return consonantHeavyWords;
      case 'common-letters': return commonLetterWords;
      default: return topWords;
    }
  };

  const filteredWords = getFilteredWords();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown className="h-6 w-6 text-[#c9b458]" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Best Starting <span className="text-[#6aaa64]">Words</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ranked by information theory and letter frequency analysis. Find the optimal word to start your Wordle game.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
          <Filter className="h-4 w-4" />
          Filter:
        </div>
        {[
          { key: 'all', label: 'All Words' },
          { key: 'vowel-heavy', label: 'Vowel-Heavy' },
          { key: 'consonant-heavy', label: 'Consonant-Heavy' },
          { key: 'common-letters', label: 'Common Letters' },
        ].map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.key as FilterType)}
            className={filter === f.key ? 'bg-[#6aaa64] hover:bg-[#5a9a54]' : ''}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Words Grid */}
      <div className="space-y-3">
        {filteredWords.map((wordData, i) => (
          <motion.div
            key={wordData.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedWord(expandedWord === wordData.word ? null : wordData.word)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    i === 0 ? 'bg-[#c9b458]/10 text-[#c9b458]' :
                    i === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' :
                    i === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    #{i + 1}
                  </div>

                  {/* Word tiles */}
                  <div className="flex gap-1">
                    {wordData.word.split('').map((letter, li) => {
                      const isVowel = 'AEIOU'.includes(letter);
                      return (
                        <div
                          key={li}
                          className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold ${
                            isVowel
                              ? 'bg-[#c9b458]/20 text-[#c9b458] border border-[#c9b458]/30'
                              : 'bg-[#6aaa64]/10 text-[#6aaa64] border border-[#6aaa64]/30'
                          }`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 ml-auto">
                    <Sparkles className="h-4 w-4 text-[#c9b458]" />
                    <span className="text-sm font-medium">{(wordData.score * 100).toFixed(0)}</span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6aaa64] rounded-full transition-all"
                        style={{ width: `${wordData.score * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Expand */}
                  {expandedWord === wordData.word ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Expanded content */}
                {expandedWord === wordData.word && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4 border-t"
                  >
                    <div className="pt-4 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {wordData.reason}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {wordData.word.split('').map((letter, li) => {
                          const isVowel = 'AEIOU'.includes(letter);
                          return (
                            <Badge key={li} variant="outline" className="text-xs">
                              {letter} — {isVowel ? 'Vowel' : 'Consonant'}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Methodology */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-xl bg-muted/50 border"
      >
        <h2 className="text-xl font-bold mb-3">How We Rank Starting Words</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Our rankings are based on information-theoretic analysis of Wordle&apos;s answer list. We evaluate each word by calculating its expected entropy — the average amount of information it reveals across all possible answers. Words that create more balanced partitions of the solution space score higher because they guarantee more useful feedback regardless of the answer.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The key factors we consider are: letter frequency (how common each letter is in Wordle answers), positional frequency (how likely each letter is to appear in each position), and distribution balance (how evenly the word splits the remaining answers across different clue patterns). Words that excel in all three areas consistently rank at the top.
        </p>
      </motion.section>
    </div>
  );
}
