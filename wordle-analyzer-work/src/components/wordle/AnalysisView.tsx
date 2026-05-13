'use client';

import { TileCell } from './TileCell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalysisResult, TurnAnalysis, AIPlayTurn, LuckLevel, AIStrategy } from '@/lib/wordle/types';
import { getStrategyLabel } from '@/lib/wordle/analyzer';
import { LIKELY_SET } from '@/lib/wordle/word-list';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Copy, RotateCcw, Lightbulb, Bot, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="flex gap-[2px] sm:gap-[3px]">
      {clue.map((c, i) => (
        <TileCell key={i} letter={c.letter} color={c.color} index={i} />
      ))}
    </div>
  );
}

function ComparisonTable({ turn, turnNumber }: { turn: TurnAnalysis; turnNumber: number }) {
  const formatNum = (n: number) => n % 1 === 0 ? n.toString() : n.toFixed(2);

  return (
    <>
      {/* Desktop table layout - hidden on mobile */}
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
                <div className="flex gap-[2px] justify-center">
                  {turn.clue.map((c, i) => (
                    <TileCell key={i} letter={c.letter} color={c.color} index={i} />
                  ))}
                </div>
              </td>
              <td className="py-2 px-3 text-center">
                <div className="flex gap-[2px] justify-center">
                  {turn.aiClue.map((c, i) => (
                    <TileCell key={`ai-${i}`} letter={c.letter} color={c.color} index={i} />
                  ))}
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-3 text-muted-foreground">Strategy</td>
              <td className="py-2 px-3 text-center text-muted-foreground">—</td>
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
                  <span className="text-[#6aaa64]">✓ Yes</span>
                ) : (
                  <span className="text-red-500">✗ No</span>
                )}
                {turn.unusedClues.length > 0 && (
                  <div className="text-xs text-red-400 mt-0.5">
                    {turn.unusedClues.map((c, i) => <div key={i}>- {c}</div>)}
                  </div>
                )}
              </td>
              <td className="py-2 px-3 text-center text-muted-foreground">—</td>
            </tr>
            {turn.hardModeViolations.length > 0 && (
              <tr className="border-b">
                <td className="py-2 px-3 text-muted-foreground">Valid for hard mode?</td>
                <td className="py-2 px-3 text-center">
                  <span className="text-red-500">✗ No</span>
                  <div className="text-xs text-red-400 mt-0.5">
                    {turn.hardModeViolations.map((v, i) => <div key={i}>- {v}</div>)}
                  </div>
                </td>
                <td className="py-2 px-3 text-center text-muted-foreground">—</td>
              </tr>
            )}
            <tr>
              <td className="py-2 px-3 text-muted-foreground">Likely word?</td>
              <td className="py-2 px-3 text-center">
                {turn.isLikelyWord ? (
                  <span className="text-[#6aaa64]">✓ Yes</span>
                ) : (
                  <span className="text-muted-foreground">✗ No</span>
                )}
              </td>
              <td className="py-2 px-3 text-center text-muted-foreground">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked card layout - hidden on desktop */}
      <div className="sm:hidden space-y-3">
        {/* You played section */}
        <div className="border rounded-lg p-3 space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">You played</h4>
          <div className="flex gap-[2px] justify-center">
            {turn.clue.map((c, i) => (
              <TileCell key={i} letter={c.letter} color={c.color} index={i} />
            ))}
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
                <span className="text-[#6aaa64]">✓ Yes</span>
              ) : (
                <span className="text-red-500">✗ No</span>
              )}
            </span>
          </div>
          {turn.unusedClues.length > 0 && (
            <div className="text-xs text-red-400">
              {turn.unusedClues.map((c, i) => <div key={i}>- {c}</div>)}
            </div>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Likely word?</span>
            <span>
              {turn.isLikelyWord ? (
                <span className="text-[#6aaa64]">✓ Yes</span>
              ) : (
                <span className="text-muted-foreground">✗ No</span>
              )}
            </span>
          </div>
          {turn.hardModeViolations.length > 0 && (
            <>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Valid for hard mode?</span>
                <span className="text-red-500">✗ No</span>
              </div>
              <div className="text-xs text-red-400">
                {turn.hardModeViolations.map((v, i) => <div key={i}>- {v}</div>)}
              </div>
            </>
          )}
        </div>

        {/* AI would have played section */}
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
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Luck</span>
            <LuckBadge level={turn.aiLuck.level} />
          </div>
        </div>
      </div>
    </>
  );
}

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
          {/* Compact guess display */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 py-2">
            {playthrough.map((turn, i) => (
              <TileRow key={i} clue={turn.clue} />
            ))}
          </div>

          {/* Detailed per-guess breakdown */}
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

export function AnalysisView({ result, onNewAnalysis }: AnalysisViewProps) {
  const lastTurn = result.turns[result.turns.length - 1];
  const totalGuesses = result.turns.length + 1; // +1 for the answer row
  const solvedInLastTurn = lastTurn && lastTurn.remainingAfter <= 1
    ? totalGuesses
    : null;

  const shareText = () => {
    const emojiMap = { correct: '🟩', present: '🟨', absent: '⬛' };
    let text = `Wordle Analyzer ${solvedInLastTurn || 'X'}/6${result.hardMode ? '*' : ''}\n\n`;
    result.turns.forEach((turn) => {
      text += turn.clue.map((c) => emojiMap[c.color]).join('') + '\n';
    });
    // Add the answer row (all green)
    text += '🟩🟩🟩🟩🟩\n';
    return text.trim();
  };

  const handleShare = async () => {
    const text = shareText();
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Your Wordle analysis has been copied in share format.",
      });
    } catch {
      toast({
        title: "Could not copy",
        description: "Please copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
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
        </CardContent>
      </Card>

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
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              {/* Commentary */}
              {turn.commentary && (
                <div className="text-xs sm:text-sm leading-relaxed bg-muted/30 p-2.5 sm:p-3 rounded-lg" dangerouslySetInnerHTML={{ __html: turn.commentary }} />
              )}

              {/* Comparison Table */}
              <ComparisonTable turn={turn} turnNumber={i + 1} />

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
                        {word}{LIKELY_SET.has(word) ? ' ★' : ''}
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
        <Button onClick={handleShare} variant="outline" className="gap-2 w-full sm:w-auto">
          <Copy className="h-4 w-4" />
          Share Results
        </Button>
        <Button onClick={onNewAnalysis} className="gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>
    </div>
  );
}
