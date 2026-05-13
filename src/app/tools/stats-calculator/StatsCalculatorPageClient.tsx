'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  BarChart3,
  TrendingUp,
  Target,
  Lightbulb,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Award,
  AlertTriangle,
} from 'lucide-react';

interface WordleStats {
  gamesPlayed: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: [number, number, number, number, number, number]; // 1-6 guesses
}

const AVERAGE_STATS: WordleStats = {
  gamesPlayed: 200,
  winPercentage: 85,
  currentStreak: 5,
  maxStreak: 25,
  guessDistribution: [1, 10, 35, 33, 16, 5],
};

const GUESS_COLORS = [
  'bg-[#6aaa64]',
  'bg-[#6aaa64]',
  'bg-[#6aaa64]',
  'bg-[#c9b458]',
  'bg-[#c9b458]',
  'bg-[#787c7e]',
];

const GUESS_LABELS = ['Excellent', 'Great', 'Good', 'Average', 'Fair', 'Tough'];

function calculateDerivedStats(stats: WordleStats) {
  const totalGames = stats.guessDistribution.reduce((a, b) => a + b, 0);
  if (totalGames === 0) return null;

  // Average guesses
  const averageGuesses =
    stats.guessDistribution.reduce((sum, count, i) => sum + count * (i + 1), 0) / totalGames;

  // Consistency score (0-100): lower standard deviation = more consistent
  const mean = averageGuesses;
  const variance =
    stats.guessDistribution.reduce((sum, count, i) => {
      return sum + count * Math.pow(i + 1 - mean, 2);
    }, 0) / totalGames;
  const stdDev = Math.sqrt(variance);
  // A stdDev of 0 would be perfect consistency, stdDev of 2+ is very inconsistent
  const consistencyScore = Math.max(0, Math.min(100, Math.round((1 - stdDev / 2) * 100)));

  // Improvement trend: compare recent performance (guesses 4-6) vs early (guesses 1-3)
  const earlyWins = stats.guessDistribution[0] + stats.guessDistribution[1] + stats.guessDistribution[2];
  const lateWins = stats.guessDistribution[3] + stats.guessDistribution[4] + stats.guessDistribution[5];
  const earlyRatio = earlyWins / totalGames;
  const lateRatio = lateWins / totalGames;

  // Simple trend indicator
  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  if (earlyRatio > 0.55) trend = 'improving';
  else if (lateRatio > 0.55) trend = 'declining';

  // Efficiency rating: how quickly you solve relative to average
  const efficiencyRating = Math.max(0, Math.min(100, Math.round(((4.5 - averageGuesses) / 4.5) * 100 + 50)));

  // Win rate assessment
  const winRateCategory =
    stats.winPercentage >= 95
      ? 'Elite'
      : stats.winPercentage >= 85
        ? 'Advanced'
        : stats.winPercentage >= 70
          ? 'Intermediate'
          : 'Beginner';

  return {
    averageGuesses: Math.round(averageGuesses * 100) / 100,
    consistencyScore,
    trend,
    efficiencyRating,
    winRateCategory,
    totalWonGames: totalGames,
    earlyWinRate: Math.round(earlyRatio * 100),
    lateWinRate: Math.round(lateRatio * 100),
  };
}

function getTips(stats: WordleStats, derived: NonNullable<ReturnType<typeof calculateDerivedStats>>): string[] {
  const tips: string[] = [];

  if (derived.averageGuesses > 4.2) {
    tips.push('Your average guesses are above 4.2 — try starting with a high-information word like SLATE or CRANE to narrow down answers faster.');
  }

  if (derived.consistencyScore < 50) {
    tips.push('Your consistency score is low. Focus on a systematic approach: use the same starting word and develop a fixed second-guess strategy.');
  }

  if (stats.guessDistribution[5] > stats.guessDistribution.reduce((a, b) => a + b, 0) * 0.25) {
    tips.push('You\'re frequently needing 6 guesses. This suggests you might be wasting guesses on unlikely letters — stick to common ones longer.');
  }

  if (stats.currentStreak < 3 && stats.gamesPlayed > 20) {
    tips.push('Your current streak is short. Remember: you can always use process of elimination. If stuck, guess a word with completely new common letters.');
  }

  if (stats.winPercentage < 80 && stats.gamesPlayed > 10) {
    tips.push('Your win rate is below average. Try the "hard mode" strategy: always use confirmed letters in subsequent guesses to build information systematically.');
  }

  if (derived.trend === 'declining') {
    tips.push('Your recent games show more late-round wins. Consider revisiting starting word strategy — are you testing enough common letters early?');
  }

  if (stats.guessDistribution[0] === 0 && stats.gamesPlayed > 30) {
    tips.push('You\'ve never solved in 1 guess (which is expected!). But aiming for 2-guess solves is realistic — use your second guess strategically based on first-guess clues.');
  }

  if (derived.averageGuesses < 3.5) {
    tips.push('Excellent performance! You\'re solving well under average. Keep refining your strategy and try challenge modes like hard mode or custom starting words.');
  }

  if (tips.length === 0) {
    tips.push('Your stats look solid! Keep playing consistently and try to maintain your streak. Consider hard mode for an extra challenge.');
  }

  return tips;
}

export function StatsCalculatorPageClient() {
  const [stats, setStats] = useState<WordleStats>({
    gamesPlayed: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
  });

  const [showResults, setShowResults] = useState(false);

  const derived = useMemo(() => calculateDerivedStats(stats), [stats]);

  const tips = useMemo(() => {
    if (!derived) return [];
    return getTips(stats, derived);
  }, [stats, derived]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setStats({
      gamesPlayed: 0,
      winPercentage: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
    });
    setShowResults(false);
  };

  const maxGuessCount = Math.max(...stats.guessDistribution, 1);

  const updateGuessDistribution = (index: number, value: number) => {
    const newDist = [...stats.guessDistribution] as WordleStats['guessDistribution'];
    newDist[index] = Math.max(0, value);
    setStats({ ...stats, guessDistribution: newDist });
  };

  const comparisonItems = derived
    ? [
        {
          label: 'Win Rate',
          yours: stats.winPercentage,
          average: AVERAGE_STATS.winPercentage,
          unit: '%',
        },
        {
          label: 'Avg Guesses',
          yours: derived.averageGuesses,
          average: 4.2,
          unit: '',
        },
        {
          label: 'Consistency',
          yours: derived.consistencyScore,
          average: 62,
          unit: '',
        },
        {
          label: 'Max Streak',
          yours: stats.maxStreak,
          average: AVERAGE_STATS.maxStreak,
          unit: '',
        },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calculator className="h-6 w-6 text-[#6aaa64]" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Stats <span className="text-[#6aaa64]">Calculator</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enter your Wordle stats to get deep analysis: average guesses, consistency score,
          improvement trend, and personalized tips.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
              <CardDescription>Enter your Wordle statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Games Played */}
              <div className="space-y-1.5">
                <Label htmlFor="gamesPlayed" className="text-sm">Games Played</Label>
                <Input
                  id="gamesPlayed"
                  type="number"
                  min={0}
                  value={stats.gamesPlayed || ''}
                  onChange={(e) =>
                    setStats({ ...stats, gamesPlayed: Math.max(0, parseInt(e.target.value) || 0) })
                  }
                  placeholder="e.g. 150"
                  className="h-11 text-base"
                />
              </div>

              {/* Win Percentage */}
              <div className="space-y-1.5">
                <Label htmlFor="winPct" className="text-sm">Win %</Label>
                <Input
                  id="winPct"
                  type="number"
                  min={0}
                  max={100}
                  value={stats.winPercentage || ''}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      winPercentage: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                    })
                  }
                  placeholder="e.g. 95"
                  className="h-11 text-base"
                />
              </div>

              {/* Streaks */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="currentStreak" className="text-sm">Current Streak</Label>
                  <Input
                    id="currentStreak"
                    type="number"
                    min={0}
                    value={stats.currentStreak || ''}
                    onChange={(e) =>
                      setStats({ ...stats, currentStreak: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    placeholder="e.g. 12"
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maxStreak" className="text-sm">Max Streak</Label>
                  <Input
                    id="maxStreak"
                    type="number"
                    min={0}
                    value={stats.maxStreak || ''}
                    onChange={(e) =>
                      setStats({ ...stats, maxStreak: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    placeholder="e.g. 45"
                    className="h-11 text-base"
                  />
                </div>
              </div>

              {/* Guess Distribution */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Guess Distribution</Label>
                <p className="text-xs text-muted-foreground">Number of games solved in each guess count</p>
                {[1, 2, 3, 4, 5, 6].map((guessNum, i) => {
                  return (
                    <div key={guessNum} className="flex items-center gap-2 py-0.5">
                      <span className="w-4 text-sm font-mono text-muted-foreground text-right">{guessNum}</span>
                      <Input
                        type="number"
                        min={0}
                        value={stats.guessDistribution[i] || ''}
                        onChange={(e) =>
                          updateGuessDistribution(i, Math.max(0, parseInt(e.target.value) || 0))
                        }
                        placeholder="0"
                        className="h-10 text-base"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-[#6aaa64] hover:bg-[#5a9a54] gap-2 h-11"
                  disabled={stats.gamesPlayed === 0}
                >
                  <Calculator className="h-4 w-4" />
                  Analyze
                </Button>
                <Button variant="outline" onClick={handleReset} className="gap-2 h-11">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <AnimatePresence mode="wait">
            {!showResults || !derived ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <CardContent className="p-12 text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Enter your stats to see analysis
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Fill in your Wordle statistics on the left and click &quot;Analyze&quot; to get
                      detailed insights about your performance.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Derived Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: 'Avg Guesses',
                      value: derived.averageGuesses,
                      icon: Target,
                      color: derived.averageGuesses <= 3.5 ? '#6aaa64' : derived.averageGuesses <= 4.2 ? '#c9b458' : '#787c7e',
                    },
                    {
                      label: 'Consistency',
                      value: `${derived.consistencyScore}%`,
                      icon: BarChart3,
                      color: derived.consistencyScore >= 70 ? '#6aaa64' : derived.consistencyScore >= 40 ? '#c9b458' : '#787c7e',
                    },
                    {
                      label: 'Efficiency',
                      value: `${derived.efficiencyRating}%`,
                      icon: TrendingUp,
                      color: derived.efficiencyRating >= 70 ? '#6aaa64' : derived.efficiencyRating >= 40 ? '#c9b458' : '#787c7e',
                    },
                    {
                      label: 'Skill Level',
                      value: derived.winRateCategory,
                      icon: Award,
                      color: derived.winRateCategory === 'Elite' || derived.winRateCategory === 'Advanced' ? '#6aaa64' : '#c9b458',
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-bold" style={{ color: stat.color }}>
                            {stat.value}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Trend Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            derived.trend === 'improving'
                              ? 'bg-[#6aaa64]/10'
                              : derived.trend === 'declining'
                                ? 'bg-red-500/10'
                                : 'bg-[#c9b458]/10'
                          }`}
                        >
                          {derived.trend === 'improving' ? (
                            <ArrowUpRight className="h-6 w-6 text-[#6aaa64]" />
                          ) : derived.trend === 'declining' ? (
                            <ArrowDownRight className="h-6 w-6 text-red-500" />
                          ) : (
                            <Minus className="h-6 w-6 text-[#c9b458]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Improvement Trend</p>
                          <p className="text-lg font-semibold capitalize">{derived.trend}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            Early wins: {derived.earlyWinRate}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Late wins: {derived.lateWinRate}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Distribution Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-[#6aaa64]" />
                        <CardTitle className="text-lg">Guess Distribution</CardTitle>
                      </div>
                      <CardDescription>Visual breakdown of your solve pattern</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stats.guessDistribution.map((count, i) => {
                          const pct = maxGuessCount > 0 ? (count / maxGuessCount) * 100 : 0;
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <span className="w-3 text-sm font-mono text-muted-foreground text-right">
                                {i + 1}
                              </span>
                              <div className="flex-1 h-8 bg-muted/50 rounded-md overflow-hidden relative">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                                  className={`h-full ${GUESS_COLORS[i]} rounded-md flex items-center justify-end px-2`}
                                >
                                  {count > 0 && (
                                    <span className="text-xs font-bold text-white drop-shadow-sm">
                                      {count}
                                    </span>
                                  )}
                                </motion.div>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-[10px] w-16 justify-center shrink-0"
                              >
                                {GUESS_LABELS[i]}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Comparison to Average */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-[#c9b458]" />
                        <CardTitle className="text-lg">You vs. Average Player</CardTitle>
                      </div>
                      <CardDescription>How you compare to typical Wordle players</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {comparisonItems.map((item, i) => {
                          const isLowerBetter = item.label === 'Avg Guesses';
                          const diff = item.yours - item.average;
                          const isBetter = isLowerBetter ? diff < 0 : diff > 0;
                          const isEven = Math.abs(diff) < 0.5;

                          return (
                            <div key={item.label}>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium">{item.label}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold">{item.yours}{item.unit}</span>
                                  <span className="text-xs text-muted-foreground">
                                    vs {item.average}{item.unit} avg
                                  </span>
                                  {!isEven && (
                                    <Badge
                                      className={`text-[10px] ${
                                        isBetter
                                          ? 'bg-[#6aaa64]/10 text-[#6aaa64] hover:bg-[#6aaa64]/20 border-[#6aaa64]/20'
                                          : 'bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20'
                                      }`}
                                    >
                                      {isBetter ? (
                                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                                      ) : (
                                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                                      )}
                                      {Math.abs(Math.round(diff))}{item.unit}
                                    </Badge>
                                  )}
                                  {isEven && (
                                    <Badge variant="outline" className="text-[10px]">
                                      <Minus className="h-3 w-3 mr-0.5" />
                                      Even
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                                  {/* Average marker */}
                                  <div
                                    className="absolute top-0 bottom-0 w-0.5 bg-[#c9b458] z-10"
                                    style={{ left: `${Math.min(100, (item.average / (isLowerBetter ? 6 : 100)) * 100)}%` }}
                                  />
                                  {/* Your value */}
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${Math.min(100, (item.yours / (isLowerBetter ? 6 : 100)) * 100)}%`,
                                    }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`h-full rounded-full ${
                                      isEven
                                        ? 'bg-[#c9b458]'
                                        : isBetter
                                          ? 'bg-[#6aaa64]'
                                          : 'bg-red-400'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-[#6aaa64]" />
                          Better than average
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-[#c9b458]" />
                          At average
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-red-400" />
                          Below average
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-[#c9b458]" />
                        <CardTitle className="text-lg">Personalized Tips</CardTitle>
                      </div>
                      <CardDescription>Based on your performance patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tips.map((tip, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#c9b458]/10 flex items-center justify-center shrink-0 mt-0.5">
                              {i === 0 ? (
                                <AlertTriangle className="h-3 w-3 text-[#c9b458]" />
                              ) : (
                                <Lightbulb className="h-3 w-3 text-[#c9b458]" />
                              )}
                            </div>
                            <p className="text-sm leading-relaxed">{tip}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
