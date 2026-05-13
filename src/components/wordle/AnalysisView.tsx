'use client';

import { TileCell } from './TileCell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalysisResult, TurnAnalysis, AIPlayTurn, LuckLevel, AIStrategy, UnusedClueDetail, PillarOfDoom, SolverMethod, DifficultyMetrics, SkillBreakdown } from '@/lib/wordle/types';
import { getStrategyLabel } from '@/lib/wordle/analyzer';
import { LIKELY_SET } from '@/lib/wordle/word-list';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Copy, RotateCcw, Lightbulb, Bot, ChevronDown, ChevronUp, AlertTriangle, BarChart3, Zap, Target, Shield, Swords, Trophy, Share2, Link2, Eye, EyeOff, Gauge, Flame, Brain, TrendingUp, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface AnalysisViewProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

const LUCK_LABELS: Record<LuckLevel, { text: string; color: string }> = {
  literally_incredible: { text: 'Literally incredible!', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
  unbelievably_lucky: { text: 'Unbelievably lucky', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
  super_lucky: { text: 'Super lucky', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  very_lucky: { text: 'Very lucky', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  lucky: { text: 'Lucky', color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400' },
  neutral: { text: 'Neutral', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  unlucky: { text: 'Unlucky', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
  very_unlucky: { text: 'Very unlucky', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  oh_god: { text: 'Oh god, I\'m so sorry', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

function LuckBadge({ level }: { level: LuckLevel }) {
  const { text, color } = LUCK_LABELS[level];
  return <Badge className={`${color} gap-1 font-medium text-xs whitespace-nowrap`}>{text}</Badge>;
}

function TileRow({ clue }: { clue: { letter: string; color: 'correct' | 'present' | 'absent' }[] }) {
  return (
    <div className="flex gap-[3px] sm:gap-1">
      {clue.map((c, i) => (
        <TileCell key={i} letter={c.letter} color={c.color} index={i} />
      ))}
    </div>
  );
}

// ============ SKILL & LUCK SCORING CARD ============
function SkillLuckCard({ skillBreakdown, solvedIn }: { skillBreakdown: SkillBreakdown; solvedIn: number | string }) {
  const getSkillColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-[#6aaa64]/30 overflow-hidden">
      <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[#6aaa64]" />
          <CardTitle className="text-base sm:text-lg">Skill & Luck Breakdown</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 space-y-4">
        {/* Main scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className={`text-3xl font-bold ${getSkillColor(skillBreakdown.skillScore)}`}>
              {skillBreakdown.skillScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Skill Score</div>
            <Badge className="mt-1 text-[10px]" variant="outline">{skillBreakdown.skillLabel}</Badge>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className={`text-3xl font-bold ${getSkillColor(100 - skillBreakdown.luckScore + 50)}`}>
              {skillBreakdown.luckScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Luck Factor</div>
            <Badge className="mt-1 text-[10px]" variant="outline">
              {skillBreakdown.luckScore >= 65 ? 'Lucky' : skillBreakdown.luckScore <= 35 ? 'Unlucky' : 'Average'}
            </Badge>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Efficiency</span>
              <span className="font-medium">{skillBreakdown.efficiency}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${getBarColor(skillBreakdown.efficiency)}`} style={{ width: `${skillBreakdown.efficiency}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Consistency</span>
              <span className="font-medium">{skillBreakdown.consistency}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${getBarColor(skillBreakdown.consistency)}`} style={{ width: `${skillBreakdown.consistency}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Clue Utilization</span>
              <span className="font-medium">{skillBreakdown.clueUtilization}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${getBarColor(skillBreakdown.clueUtilization)}`} style={{ width: `${skillBreakdown.clueUtilization}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ GAME DIFFICULTY SCORECARD ============
function DifficultyCard({ difficulty, answer }: { difficulty: DifficultyMetrics; answer: string }) {
  const getDiffColor = (score: number) => {
    if (score <= 20) return 'bg-emerald-500';
    if (score <= 40) return 'bg-green-500';
    if (score <= 60) return 'bg-yellow-500';
    if (score <= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getDiffTextColor = (score: number) => {
    if (score <= 20) return 'text-emerald-500';
    if (score <= 40) return 'text-green-500';
    if (score <= 60) return 'text-yellow-500';
    if (score <= 80) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-[#c9b458]" />
          <CardTitle className="text-base sm:text-lg">Game Difficulty</CardTitle>
          <Badge className={`ml-auto ${getDiffTextColor(difficulty.overall)} border-current`} variant="outline">
            {difficulty.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 space-y-3">
        <p className="text-xs sm:text-sm text-muted-foreground">{difficulty.description}</p>

        {/* Main score */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <div className={`text-2xl font-bold ${getDiffTextColor(difficulty.overall)}`}>{difficulty.overall}/100</div>
          <div className="flex-1">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${getDiffColor(difficulty.overall)}`} style={{ width: `${difficulty.overall}%` }} />
            </div>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-muted/50 text-center">
            <div className="text-muted-foreground">Letter Freq</div>
            <div className="font-semibold">{difficulty.letterFrequency}/100</div>
          </div>
          <div className="p-2 rounded bg-muted/50 text-center">
            <div className="text-muted-foreground">Position Ambiguity</div>
            <div className="font-semibold">{difficulty.positionalAmbiguity}/100</div>
          </div>
          <div className="p-2 rounded bg-muted/50 text-center">
            <div className="text-muted-foreground">Duplicate Risk</div>
            <div className="font-semibold">{difficulty.duplicateRisk}/100</div>
          </div>
          <div className="p-2 rounded bg-muted/50 text-center">
            <div className="text-muted-foreground">Info Entropy</div>
            <div className="font-semibold">{difficulty.infoEntropy}/100</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ PILLARS OF DOOM ============
function PillarsOfDoomCard({ pillars }: { pillars: PillarOfDoom[] }) {
  const [expanded, setExpanded] = useState(false);

  if (pillars.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-[#6aaa64]" />
            <CardTitle className="text-base sm:text-lg">Pillars of Doom</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <p className="text-sm text-muted-foreground">No critical mistakes detected! Your guesses were reasonably efficient at each turn.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors pb-2 px-4 sm:px-6 pt-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            <CardTitle className="text-base sm:text-lg">Pillars of Doom</CardTitle>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-[10px]">
              {pillars.length} {pillars.length === 1 ? 'fork point' : 'fork points'}
            </Badge>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="px-4 sm:px-6 pb-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            These are the critical turns where your guess left significantly more possibilities than the AI&apos;s recommendation. Each &quot;pillar&quot; represents a fork in the road where a different choice could have led to a faster solve.
          </p>
          {pillars.map((pillar, i) => (
            <div key={i} className={`border rounded-lg p-3 space-y-2 ${pillar.isCritical ? 'border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20' : 'border-orange-200 dark:border-orange-800'}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className={pillar.isCritical ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}>
                    Guess {pillar.turnIndex + 1}
                  </Badge>
                  {pillar.isCritical && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                  +{pillar.delta} words
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-muted-foreground">You played</div>
                  <div className="font-bold text-base">{pillar.guess}</div>
                  <div className="text-muted-foreground">{pillar.yourRemaining} remaining</div>
                </div>
                <div className="text-center p-2 rounded bg-muted/50 border-dashed">
                  <div className="text-muted-foreground">AI would play</div>
                  <div className="font-bold text-base">{pillar.aiGuess}</div>
                  <div className="text-muted-foreground">{pillar.aiRemaining} remaining</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

// ============ SOLVER COMPARISON ============
function SolverComparisonCard({ methods, playerGuesses }: { methods: SolverMethod[]; playerGuesses: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors pb-2 px-4 sm:px-6 pt-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-base sm:text-lg">5-Method Solver Comparison</CardTitle>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="px-4 sm:px-6 pb-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            See how different solving strategies would have performed on this word. Your result is shown for comparison.
          </p>
          <div className="space-y-2">
            {/* Player row */}
            <div className="flex items-center gap-3 p-2 rounded-lg bg-[#6aaa64]/10 border border-[#6aaa64]/20">
              <div className="w-8 h-8 rounded-full bg-[#6aaa64] text-white flex items-center justify-center text-xs font-bold">
                You
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Your Play</div>
                <div className="text-[10px] text-muted-foreground">Actual gameplay</div>
              </div>
              <div className="text-lg font-bold">{playerGuesses}/6</div>
            </div>
            {/* Solver rows */}
            {methods.map((method, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{method.name}</div>
                  <div className="text-[10px] text-muted-foreground">{method.description}</div>
                </div>
                <div className="text-lg font-bold">
                  {method.solved ? `${method.totalGuesses}/6` : 'X/6'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// ============ UNUSED CLUE DETAILS ============
function UnusedClueDetailsCard({ details }: { details: UnusedClueDetail[] }) {
  if (details.length === 0) return null;

  const typeIcons: Record<string, React.ReactNode> = {
    yellow_not_repositioned: <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />,
    green_not_used: <AlertTriangle className="h-3.5 w-3.5 text-red-500" />,
    absent_letter_used: <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />,
    duplicate_not_tested: <Lightbulb className="h-3.5 w-3.5 text-blue-500" />,
  };

  return (
    <div className="mt-2 p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Lightbulb className="h-3.5 w-3.5 text-yellow-600" />
        <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-300">Missed Clue Opportunities</span>
      </div>
      {details.map((detail, i) => (
        <div key={i} className="flex items-start gap-1.5 text-xs text-yellow-700 dark:text-yellow-400 mb-1 last:mb-0">
          {typeIcons[detail.type]}
          <span>{detail.message}</span>
        </div>
      ))}
    </div>
  );
}

// ============ TURN COMPARISON TABLE ============
function ComparisonTable({ turn, turnNumber }: { turn: TurnAnalysis; turnNumber: number }) {
  const formatNum = (n: number) => n % 1 === 0 ? n.toString() : n.toFixed(2);

  return (
    <>
      {/* Desktop table layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3 text-left text-muted-foreground font-medium w-[120px]"></th>
              <th className="py-2 px-3 text-center font-medium">You played</th>
              <th className="py-2 px-3 text-center font-medium">AI would have played</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Guess</td>
              <td className="py-2 px-3 text-center">
                <div className="flex gap-[3px] justify-center">
                  {turn.clue.map((c, i) => (
                    <TileCell key={i} letter={c.letter} color={c.color} index={i} />
                  ))}
                </div>
              </td>
              <td className="py-2 px-3 text-center">
                <div className="flex gap-[3px] justify-center">
                  {turn.aiClue.map((c, i) => (
                    <TileCell key={`ai-${i}`} letter={c.letter} color={c.color} index={i} />
                  ))}
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Skill / Luck</td>
              <td className="py-2 px-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-medium">{turn.turnSkill}<span className="text-muted-foreground"> skill</span></span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-xs font-medium">{turn.turnLuck}<span className="text-muted-foreground"> luck</span></span>
                </div>
              </td>
              <td className="py-2 px-3 text-center text-muted-foreground">&mdash;</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Strategy</td>
              <td className="py-2 px-3 text-center text-muted-foreground">&mdash;</td>
              <td className="py-2 px-3 text-center">{getStrategyLabel(turn.aiStrategy)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Avg remaining</td>
              <td className="py-2 px-3 text-center">{formatNum(turn.avgRemaining)} words{turn.avgLikelyRemaining > 0 ? `, ${formatNum(turn.avgLikelyRemaining)} likely` : ''}</td>
              <td className="py-2 px-3 text-center">{formatNum(turn.aiAvgRemaining)} words{turn.aiAvgLikelyRemaining > 0 ? `, ${formatNum(turn.aiAvgLikelyRemaining)} likely` : ''}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Guess quality</td>
              <td className="py-2 px-3 text-center font-semibold">{turn.guessQuality}%</td>
              <td className="py-2 px-3 text-center font-semibold">{turn.aiGuessQuality}%</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Actual remaining</td>
              <td className="py-2 px-3 text-center">{turn.remainingAfter} words{turn.remainingLikelyAfter !== turn.remainingAfter ? `, ${turn.remainingLikelyAfter} likely` : ''}</td>
              <td className="py-2 px-3 text-center">
                {turn.aiActualRemaining === 0 ? (
                  <span className="text-[#6aaa64] font-semibold">Correct!</span>
                ) : (
                  `${turn.aiActualRemaining} words${turn.aiActualLikelyRemaining !== turn.aiActualRemaining ? `, ${turn.aiActualLikelyRemaining} likely` : ''}`
                )}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Luck rating</td>
              <td className="py-2 px-3 text-center"><LuckBadge level={turn.luck.level} /></td>
              <td className="py-2 px-3 text-center"><LuckBadge level={turn.aiLuck.level} /></td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Possible answer?</td>
              <td className="py-2 px-3 text-center">
                {turn.isPossibleAnswer ? (
                  <span className="text-[#6aaa64]">&#10003; Yes</span>
                ) : (
                  <span className="text-red-500">&#10007; No</span>
                )}
              </td>
              <td className="py-2 px-3 text-center text-muted-foreground">&mdash;</td>
            </tr>
            {turn.hardModeViolations.length > 0 && (
              <tr className="border-b">
                <td className="py-2 px-3 text-muted-foreground">Valid for hard mode?</td>
                <td className="py-2 px-3 text-center">
                  <span className="text-red-500">&#10007; No</span>
                  <div className="text-xs text-red-400 mt-0.5">
                    {turn.hardModeViolations.map((v, i) => <div key={i}>- {v}</div>)}
                  </div>
                </td>
                <td className="py-2 px-3 text-center text-muted-foreground">&mdash;</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked card layout */}
      <div className="sm:hidden space-y-3">
        <div className="border rounded-lg p-3 space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">You played</h4>
          <div className="flex gap-[2px] justify-center">
            {turn.clue.map((c, i) => (
              <TileCell key={i} letter={c.letter} color={c.color} index={i} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="font-medium">{turn.turnSkill} skill</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{turn.turnLuck} luck</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Avg remaining</div>
              <div className="font-medium">{formatNum(turn.avgRemaining)}{turn.avgLikelyRemaining > 0 ? `, ${formatNum(turn.avgLikelyRemaining)} likely` : ''}</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Guess quality</div>
              <div className="font-semibold">{turn.guessQuality}%</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Actual remaining</div>
              <div className="font-medium">{turn.remainingAfter}{turn.remainingLikelyAfter !== turn.remainingAfter ? `, ${turn.remainingLikelyAfter} likely` : ''}</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Luck</div>
              <div className="flex justify-center"><LuckBadge level={turn.luck.level} /></div>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Possible answer?</span>
            <span>
              {turn.isPossibleAnswer ? (
                <span className="text-[#6aaa64]">&#10003; Yes</span>
              ) : (
                <span className="text-red-500">&#10007; No</span>
              )}
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-3 space-y-2 border-dashed">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI would have played</h4>
          <div className="flex gap-[2px] justify-center">
            {turn.aiClue.map((c, i) => (
              <TileCell key={`ai-${i}`} letter={c.letter} color={c.color} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Strategy</div>
              <div className="font-medium">{getStrategyLabel(turn.aiStrategy)}</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Avg remaining</div>
              <div className="font-medium">{formatNum(turn.aiAvgRemaining)}{turn.aiAvgLikelyRemaining > 0 ? `, ${formatNum(turn.aiAvgLikelyRemaining)} likely` : ''}</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Guess quality</div>
              <div className="font-semibold">{turn.aiGuessQuality}%</div>
            </div>
            <div className="text-center p-1.5 rounded bg-muted/50">
              <div className="text-muted-foreground">Actual remaining</div>
              <div className="font-semibold">
                {turn.aiActualRemaining === 0 ? (
                  <span className="text-[#6aaa64]">Correct!</span>
                ) : (
                  `${turn.aiActualRemaining}${turn.aiActualLikelyRemaining !== turn.aiActualRemaining ? `, ${turn.aiActualLikelyRemaining} likely` : ''}`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ AI PLAYTHROUGH ============
function AIPlaythroughSection({ playthrough }: { playthrough: AIPlayTurn[] }) {
  const [expanded, setExpanded] = useState(false);
  const formatNum = (n: number) => n % 1 === 0 ? n.toString() : n.toFixed(2);

  if (playthrough.length === 0) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#6aaa64]" />
            <CardTitle className="text-base sm:text-lg">AI Playthrough</CardTitle>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 py-2">
            {playthrough.map((turn, i) => (
              <TileRow key={i} clue={turn.clue} />
            ))}
          </div>
          {playthrough.map((turn, i) => (
            <div key={i} className="border rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-sm">AI Guess {i + 1}: {turn.guess}</h4>
                <LuckBadge level={turn.luck.level} />
              </div>
              <div className="flex gap-[2px] sm:gap-[3px] justify-center">
                {turn.clue.map((c, j) => (
                  <TileCell key={j} letter={c.letter} color={c.color} index={j} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <div className="text-center p-1.5 sm:p-2 rounded bg-muted/50">
                  <div className="text-muted-foreground text-[10px] sm:text-xs">Strategy</div>
                  <div className="font-medium text-[10px] sm:text-xs">{getStrategyLabel(turn.strategy)}</div>
                </div>
                <div className="text-center p-1.5 sm:p-2 rounded bg-muted/50">
                  <div className="text-muted-foreground text-[10px] sm:text-xs">Avg remaining</div>
                  <div className="font-medium">{formatNum(turn.avgRemaining)}{turn.avgLikelyRemaining > 0 ? `, ${formatNum(turn.avgLikelyRemaining)} likely` : ''}</div>
                </div>
                <div className="text-center p-1.5 sm:p-2 rounded bg-muted/50">
                  <div className="text-muted-foreground text-[10px] sm:text-xs">Guess quality</div>
                  <div className="font-semibold">{turn.guessQuality}%</div>
                </div>
                <div className="text-center p-1.5 sm:p-2 rounded bg-muted/50">
                  <div className="text-muted-foreground text-[10px] sm:text-xs">Actual remaining</div>
                  <div className="font-semibold">
                    {turn.actualRemaining === 0 ? (
                      <span className="text-[#6aaa64]">Correct!</span>
                    ) : (
                      `${turn.actualRemaining}${turn.actualLikelyRemaining !== turn.actualRemaining ? `, ${turn.actualLikelyRemaining} likely` : ''}`
                    )}
                  </div>
                </div>
              </div>
              {turn.remainingWords.length > 0 && turn.actualRemaining > 0 && turn.actualRemaining <= 10 && (
                <div>
                  <div className="text-xs font-medium mb-1">Remaining words:</div>
                  <div className="flex flex-wrap gap-1">
                    {turn.remainingWords.map((word) => (
                      <Badge key={word} variant="outline" className="text-[10px] sm:text-xs font-mono">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

// ============ SHARE SECTION ============
function ShareSection({ result, solvedIn }: { result: AnalysisResult; solvedIn: number | string }) {
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && result.encodedState) {
      setShareUrl(`${window.location.origin}${window.location.pathname}?s=${result.encodedState}`);
    }
  }, [result.encodedState]);

  const shareText = () => {
    const emojiMap = { correct: '\u{1F7E9}', present: '\u{1F7E8}', absent: '\u2B1B' };
    let text = `Wordle Analyzer Pro ${solvedIn || 'X'}/6${result.hardMode ? '*' : ''}\n\n`;
    result.turns.forEach((turn) => {
      text += turn.clue.map((c) => emojiMap[c.color]).join('') + '\n';
    });
    text += '\u{1F7E9}\u{1F7E9}\u{1F7E9}\u{1F7E9}\u{1F7E9}\n';
    text += `\nSkill: ${result.skillBreakdown.skillScore} | Luck: ${result.skillBreakdown.luckScore}`;
    text += `\nDifficulty: ${result.difficulty.label} (${result.difficulty.overall}/100)`;
    return text.trim();
  };

  const handleShareText = async () => {
    const text = shareText();
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied to clipboard!', description: 'Share your Wordle analysis with friends.' });
    } catch {
      toast({ title: 'Could not copy', description: 'Please copy manually.', variant: 'destructive' });
    }
  };

  const handleShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Shareable link copied!', description: 'Anyone with this link can see your analysis (with spoiler warning).' });
    } catch {
      toast({ title: 'Could not copy', description: 'Please copy the URL manually.', variant: 'destructive' });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-[#6aaa64]" />
          <CardTitle className="text-base sm:text-lg">Share Your Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleShareText} variant="outline" className="gap-2 flex-1" size="sm">
            <Copy className="h-3.5 w-3.5" />
            Copy Emoji Grid
          </Button>
          <Button onClick={handleShareUrl} variant="outline" className="gap-2 flex-1" size="sm">
            <Link2 className="h-3.5 w-3.5" />
            Copy Shareable Link
          </Button>
        </div>

        {/* Shareable URL with spoiler warning */}
        {shareUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowSpoiler(!showSpoiler)}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showSpoiler ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showSpoiler ? 'Hide shareable link' : 'Show shareable link'}
              </button>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-[9px]">
                Contains spoilers
              </Badge>
            </div>
            {showSpoiler && (
              <div className="p-2 rounded bg-muted/50 text-xs break-all font-mono text-muted-foreground">
                {shareUrl}
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        <div className="p-3 rounded-lg bg-muted/30 border">
          <div className="text-[10px] text-muted-foreground mb-1">Preview:</div>
          <pre className="text-xs whitespace-pre-wrap font-mono">{shareText()}</pre>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ MAIN ANALYSIS VIEW ============
export function AnalysisView({ result, onNewAnalysis }: AnalysisViewProps) {
  const lastTurn = result.turns[result.turns.length - 1];
  const totalGuesses = result.turns.length + 1;
  const solvedInLastTurn = lastTurn && lastTurn.remainingAfter <= 1 ? totalGuesses : null;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
      {/* Summary */}
      <Card className="border-[#6aaa64]/30 bg-gradient-to-r from-[#6aaa64]/5 to-transparent">
        <CardContent className="pt-5 sm:pt-6 text-center px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-1">Your play: {solvedInLastTurn || 'X'}/6</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            {solvedInLastTurn
              ? `Solved in ${solvedInLastTurn} guess${solvedInLastTurn > 1 ? 'es' : ''}!`
              : 'Better luck next time!'}
            {result.hardMode && ' (Hard Mode)'}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            The answer was <strong>{result.answer}</strong>
          </p>
          {/* Quick score badges */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <Badge className="bg-[#6aaa64]/10 text-[#6aaa64] border-[#6aaa64]/20 text-xs">
              <Sparkles className="h-3 w-3 mr-1" /> Skill: {result.skillBreakdown.skillScore}
            </Badge>
            <Badge className="bg-[#c9b458]/10 text-[#c9b458] border-[#c9b458]/20 text-xs">
              <Zap className="h-3 w-3 mr-1" /> Luck: {result.skillBreakdown.luckScore}
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
              <Gauge className="h-3 w-3 mr-1" /> Difficulty: {result.difficulty.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Skill & Luck Breakdown */}
      <SkillLuckCard skillBreakdown={result.skillBreakdown} solvedIn={solvedInLastTurn || 'X'} />

      {/* Game Difficulty */}
      <DifficultyCard difficulty={result.difficulty} answer={result.answer} />

      {/* Pillars of Doom */}
      <PillarsOfDoomCard pillars={result.pillarsOfDoom} />

      {/* Turn-by-turn analysis */}
      <div className="space-y-4 sm:space-y-6">
        {result.turns.map((turn, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Badge className="bg-[#6aaa64] text-white px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">
                  Guess {i + 1}
                </Badge>
                <span className="text-base sm:text-lg font-bold tracking-wider">{turn.guess}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px]">
                    Skill {turn.turnSkill}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    Luck {turn.turnLuck}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              {turn.commentary && (
                <div className="text-xs sm:text-sm leading-relaxed bg-muted/30 p-2.5 sm:p-3 rounded-lg" dangerouslySetInnerHTML={{ __html: turn.commentary }} />
              )}

              <ComparisonTable turn={turn} turnNumber={i + 1} />

              {/* Enhanced Unused Clue Detection */}
              {turn.unusedClueDetails.length > 0 && (
                <UnusedClueDetailsCard details={turn.unusedClueDetails} />
              )}

              {/* Remaining Words */}
              {turn.remainingAfter > 0 && turn.remainingWords.length > 0 && (
                <div>
                  <div className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Remaining possible answers ({turn.remainingAfter}{turn.remainingLikelyAfter !== turn.remainingAfter ? `, ${turn.remainingLikelyAfter} likely` : ''}):
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {turn.remainingWords.map((word) => (
                      <Badge
                        key={word}
                        variant={LIKELY_SET.has(word) ? 'default' : 'outline'}
                        className={`text-[10px] sm:text-xs font-mono ${LIKELY_SET.has(word) ? 'bg-[#6aaa64]/10 text-[#6aaa64] border-[#6aaa64]/20' : ''}`}
                      >
                        {word}{LIKELY_SET.has(word) ? ' \u2605' : ''}
                      </Badge>
                    ))}
                    {turn.remainingAfter > turn.remainingWords.length && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs text-muted-foreground">
                        +{turn.remainingAfter - turn.remainingWords.length} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Playthrough */}
      <AIPlaythroughSection playthrough={result.aiPlaythrough} />

      {/* Solver Comparison */}
      <SolverComparisonCard methods={result.solverComparison} playerGuesses={solvedInLastTurn || 7} />

      {/* Share */}
      <ShareSection result={result} solvedIn={solvedInLastTurn || 'X'} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pb-8">
        <Button onClick={onNewAnalysis} className="gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>
    </div>
  );
}
