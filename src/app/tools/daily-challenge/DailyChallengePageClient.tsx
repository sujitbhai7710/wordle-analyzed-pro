'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Share2,
  Lightbulb,
  ArrowRight,
  Trophy,
  Hash,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';

const WORDLE_START_DATE = new Date(2021, 5, 19); // June 19, 2021

const DAILY_TIPS: string[] = [
  'The most common letter in Wordle answers is E — it appears in over 10% of all positions.',
  'Starting with a word that has two vowels and three common consonants gives you the best opening coverage.',
  'The letter S appears in position 1 of more Wordle answers than any other letter in any single position.',
  'Only about 2% of Wordle answers contain a repeated letter — but they\'re out there!',
  'The most common Wordle answer pattern is _OUND (BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND).',
  'If your first guess gets no hits at all, try a word with completely different letters for your second guess.',
  'The letters A, E, I, O, U appear in roughly 36% of all letter positions in Wordle answers.',
  'CRANE is one of the best starting words because it tests 5 of the most common letters.',
  'The least common letters in Wordle are J, Q, X, Z — avoid them unless you have a strong clue.',
  'Wordle answers rarely end in V or J — only a handful of valid 5-letter words end with these letters.',
  'The middle position (position 3) most often contains a vowel — try to test vowels there early.',
  'About 18% of Wordle answers end in E — it\'s the most common ending letter by far.',
  'The word SLATE tests 5 of the 6 most common consonants plus a vowel — information theory\'s top pick.',
  'Wordle uses a curated list of about 2,309 possible answers, not all valid 5-letter words.',
  'The average Wordle player solves the puzzle in about 4 guesses — can you beat that?',
  'Double letters are rare in Wordle answers: only about 7% contain a repeated letter.',
  'The most common starting letter is S, followed by C, B, T, and P.',
  'Testing both A and E in your first two guesses covers about 55% of all Wordle answers.',
  'Thursday Wordle answers tend to have more uncommon letters — just a fun pattern some players notice!',
  'The longest Wordle winning streak on record is over 500 games. Can you beat it?',
  'Words ending in -IGHT (LIGHT, NIGHT, RIGHT, SIGHT, TIGHT) are a common trap — they share 4 letters.',
  'The letter R appears in almost every position, making it one of the most useful letters to test.',
  'If you get a green letter early, don\'t move it! Focus on finding the other letters instead.',
  'Words with a Q almost always have a U right after it — use this to narrow down possibilities.',
  'The letter Y appears in about 8% of Wordle answers, often at the end as a vowel substitute.',
  'Saturday puzzles often feature less common words — the difficulty seems to trend upward on weekends.',
  'Testing common digraphs like TH, CH, SH, and ST can reveal patterns that individual letters miss.',
  'The word RAISE tests 4 of the 5 most common vowels plus a common consonant — great second guess.',
  'About 30% of Wordle answers have exactly two vowels, making it the most common vowel count.',
  'Never reuse a gray letter — this simple rule eliminates hundreds of possibilities each guess.',
  'The second most common ending letter is Y — keep this in mind for your final guesses.',
];

function getWordleNumber(): number {
  const now = new Date();
  const diffMs = now.getTime() - WORDLE_START_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

function getDaysSinceStart(): number {
  const now = new Date();
  const diffMs = now.getTime() - WORDLE_START_DATE.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function getDailyTip(): string {
  const daysSince = getDaysSinceStart();
  return DAILY_TIPS[daysSince % DAILY_TIPS.length];
}

function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

export function DailyChallengePageClient() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());
  const [copied, setCopied] = useState(false);
  const wordleNumber = getWordleNumber();
  const dailyTip = getDailyTip();
  const today = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleShare = useCallback(async () => {
    const shareText = `Wordle #${wordleNumber} — Daily Tip: ${dailyTip} 🟩⬛🟩⬛🟩 via @WordleAnalyzer`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Wordle Daily Tip', text: shareText });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [wordleNumber, dailyTip]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const quickLinks = [
    {
      href: '/tools/best-words',
      label: 'Best Starting Words',
      description: 'Find optimal opening guesses',
      icon: Trophy,
    },
    {
      href: '/tools/letter-frequency',
      label: 'Letter Frequency',
      description: 'See which letters appear most',
      icon: Hash,
    },
    {
      href: '/tools/stats-calculator',
      label: 'Stats Calculator',
      description: 'Analyze your performance',
      icon: Lightbulb,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="h-6 w-6 text-[#6aaa64]" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Daily <span className="text-[#6aaa64]">Challenge</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your daily Wordle companion — tips, countdown, and quick tools to sharpen your game.
        </p>
        <p className="text-sm text-muted-foreground mt-2">{formattedDate}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Daily Tip Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#c9b458]/10 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-[#c9b458]" />
                </div>
                <div>
                  <CardTitle>Today&apos;s Tip</CardTitle>
                  <CardDescription>Wordle #{wordleNumber}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{dailyTip}</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button
                variant="outline"
                size="default"
                onClick={handleShare}
                className="gap-2 min-h-[44px]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    Share Tip
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="default"
                onClick={async () => {
                  await navigator.clipboard.writeText(dailyTip);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="gap-2 min-h-[44px]"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Countdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#6aaa64]/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-[#6aaa64]" />
                </div>
                <div>
                  <CardTitle>Next Puzzle</CardTitle>
                  <CardDescription>Countdown to midnight</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4">
                {[
                  { value: pad(timeLeft.hours), label: 'HRS' },
                  { value: pad(timeLeft.minutes), label: 'MIN' },
                  { value: pad(timeLeft.seconds), label: 'SEC' },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
                    <div className="text-center">
                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.1, opacity: 0.7 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight"
                      >
                        {unit.value}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">
                        {unit.label}
                      </div>
                    </div>
                    {i < 2 && (
                      <span className="text-3xl sm:text-4xl font-light text-muted-foreground/40 -mt-4">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                New puzzle drops at midnight local time
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Wordle Number + Streak Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {[...String(wordleNumber)].map((digit, i) => (
                    <div
                      key={i}
                      className="w-10 h-12 rounded-lg bg-[#6aaa64] flex items-center justify-center text-white text-xl font-bold shadow-sm"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Wordle Number</p>
                  <p className="text-lg font-semibold">Wordle #{wordleNumber}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs py-1">
                  Day {getDaysSinceStart() + 1} since launch
                </Badge>
                <Badge className="bg-[#6aaa64] hover:bg-[#5a9a54] text-xs py-1">
                  Puzzle #{wordleNumber}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Analyze Your Game</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link href={link.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#6aaa64]/10 flex items-center justify-center shrink-0 group-hover:bg-[#6aaa64]/20 transition-colors">
                        <link.icon className="h-5 w-5 text-[#6aaa64]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{link.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#c9b458]" />
              <CardTitle>Share Today&apos;s Challenge</CardTitle>
            </div>
            <CardDescription>
              Let your friends know about today&apos;s tip and Wordle number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 border text-sm leading-relaxed font-mono">
              Wordle #{wordleNumber} — Daily Tip: {dailyTip} 🟩⬛🟩⬛🟩
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={handleShare} className="gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] min-h-[44px]">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const text = `Wordle #${wordleNumber} — Daily Tip: ${dailyTip} 🟩⬛🟩⬛🟩`;
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="gap-2 min-h-[44px]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
              <Button
                variant="outline"
                asChild
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Wordle #${wordleNumber} — Daily Tip: ${dailyTip} 🟩⬛🟩⬛🟩`
                  )}&url=${encodeURIComponent('https://wordleanalyzer.dev/tools/daily-challenge')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  𝕏 Post
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
