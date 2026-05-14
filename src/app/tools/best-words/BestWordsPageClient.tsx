'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStarterWordRankings } from '@/lib/wordle/analyzer';
import type { StarterWordMetric } from '@/lib/wordle/types';
import { Crown, Filter, Sparkles, ChevronDown, ChevronUp, BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

type FilterType = 'all' | 'vowel-heavy' | 'consonant-heavy' | 'high-entropy';
type SortType = 'overall' | 'entropy' | 'coverage' | 'positional' | 'avgRemaining';

const topWordMetrics = getStarterWordRankings(30);

const vowelHeavyWords = topWordMetrics.filter((w) => {
  const vowels = (w.word.match(/[AEIOU]/g) || []).length;
  return vowels >= 3;
});

const consonantHeavyWords = topWordMetrics.filter((w) => {
  const vowels = (w.word.match(/[AEIOU]/g) || []).length;
  return vowels <= 1;
});

const highEntropyWords = topWordMetrics.filter((w) => w.entropyScore >= 85);

export function BestWordsPageClient() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('overall');
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const getFilteredWords = (): StarterWordMetric[] => {
    let words: StarterWordMetric[];
    switch (filter) {
      case 'vowel-heavy': words = vowelHeavyWords; break;
      case 'consonant-heavy': words = consonantHeavyWords; break;
      case 'high-entropy': words = highEntropyWords; break;
      default: words = topWordMetrics;
    }

    // Sort
    const sorted = [...words];
    switch (sort) {
      case 'entropy': sorted.sort((a, b) => b.entropyScore - a.entropyScore); break;
      case 'coverage': sorted.sort((a, b) => b.letterCoverage - a.letterCoverage); break;
      case 'positional': sorted.sort((a, b) => b.positionalScore - a.positionalScore); break;
      case 'avgRemaining': sorted.sort((a, b) => a.avgRemaining - b.avgRemaining); break;
      default: sorted.sort((a, b) => b.overallRank - a.overallRank);
    }

    return sorted;
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
          Ranked by multiple metrics: Entropy Score, Letter Coverage, Positional Fit, and Average Remaining. Find the optimal word for YOUR play style.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <Filter className="h-4 w-4" />
            Filter:
          </div>
          {[
            { key: 'all', label: 'All Words' },
            { key: 'vowel-heavy', label: 'Vowel-Heavy' },
            { key: 'consonant-heavy', label: 'Consonant-Heavy' },
            { key: 'high-entropy', label: 'High Entropy' },
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

        {/* Sort options */}
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <BarChart3 className="h-4 w-4" />
            Sort by:
          </div>
          {[
            { key: 'overall', label: 'Overall', icon: <Sparkles className="h-3 w-3" /> },
            { key: 'entropy', label: 'Entropy', icon: <Zap className="h-3 w-3" /> },
            { key: 'coverage', label: 'Letter Coverage', icon: <Target className="h-3 w-3" /> },
            { key: 'positional', label: 'Positional', icon: <BarChart3 className="h-3 w-3" /> },
            { key: 'avgRemaining', label: 'Avg Remaining', icon: <TrendingUp className="h-3 w-3" /> },
          ].map((s) => (
            <Button
              key={s.key}
              variant={sort === s.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSort(s.key as SortType)}
              className={sort === s.key ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              {s.icon} {s.label}
            </Button>
          ))}
        </div>
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

                  {/* Overall Score */}
                  <div className="flex items-center gap-2 ml-auto">
                    <Sparkles className="h-4 w-4 text-[#c9b458]" />
                    <span className="text-sm font-medium">{wordData.overallRank}</span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6aaa64] rounded-full transition-all"
                        style={{ width: `${wordData.overallRank}%` }}
                      />
                    </div>
                  </div>

                  {expandedWord === wordData.word ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Expanded content with multiple metrics */}
                {expandedWord === wordData.word && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4 border-t"
                  >
                    <div className="pt-4 space-y-3">
                      {/* Multi-metric breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20 text-center">
                          <div className="text-muted-foreground flex items-center justify-center gap-1"><Zap className="h-3 w-3" /> Entropy</div>
                          <div className="font-bold text-sm text-purple-700 dark:text-purple-300">{wordData.entropyScore}/100</div>
                        </div>
                        <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 text-center">
                          <div className="text-muted-foreground flex items-center justify-center gap-1"><Target className="h-3 w-3" /> Letter Coverage</div>
                          <div className="font-bold text-sm text-green-700 dark:text-green-300">{wordData.letterCoverage}/100</div>
                        </div>
                        <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-center">
                          <div className="text-muted-foreground flex items-center justify-center gap-1"><BarChart3 className="h-3 w-3" /> Positional</div>
                          <div className="font-bold text-sm text-blue-700 dark:text-blue-300">{wordData.positionalScore}/100</div>
                        </div>
                        <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-900/20 text-center">
                          <div className="text-muted-foreground">Avg Remaining</div>
                          <div className="font-bold text-sm text-yellow-700 dark:text-yellow-300">{wordData.avgRemaining}</div>
                        </div>
                        <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/20 text-center">
                          <div className="text-muted-foreground">Best Case</div>
                          <div className="font-bold text-sm text-emerald-700 dark:text-emerald-300">{wordData.bestCaseRemaining}</div>
                        </div>
                        <div className="p-2 rounded bg-red-50 dark:bg-red-900/20 text-center">
                          <div className="text-muted-foreground">Worst Case</div>
                          <div className="font-bold text-sm text-red-700 dark:text-red-300">{wordData.worstCaseRemaining}</div>
                        </div>
                      </div>

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
          Our rankings use five complementary metrics to give you a complete picture of each starting word&apos;s strength. The <strong>Entropy Score</strong> measures how much information a word reveals on average — higher entropy means the word creates more balanced partitions of the solution space. <strong>Letter Coverage</strong> scores how many of the top-10 most common Wordle letters a word contains. <strong>Positional Score</strong> evaluates how well the letters align with their most common positions in Wordle answers.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          We also provide <strong>Average Remaining</strong> (how many words are left after the average first guess), <strong>Best Case</strong> and <strong>Worst Case</strong> remaining counts, and an approximate <strong>Solve Rate in 3</strong> guesses. The overall rank is a weighted combination: 40% Entropy, 20% Letter Coverage, 20% Positional Score, and 20% Average Remaining.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This multi-metric approach reveals insights that single-metric rankings miss. For example, SOARE has the highest entropy but TRACE may have better positional coverage. The best word for you depends on your play style — entropy maximizers prefer SOARE, while pattern-focused players might prefer SLATE.
        </p>
      </motion.section>
    </div>
  );
}
