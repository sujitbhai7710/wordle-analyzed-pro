'use client';

import { motion } from 'framer-motion';
import { WordleAnalyzer } from '@/components/wordle/WordleAnalyzer';
import { BlogCard } from '@/components/blog/BlogCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { BlogPost } from '@/lib/blog/posts';
import { ArrowRight, BarChart3, Brain, Target, Zap, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface WordleAnalyzerPageProps {
  recentPosts: BlogPost[];
  faqItems: { question: string; answer: string }[];
}

export function WordleAnalyzerPage({ recentPosts, faqItems }: WordleAnalyzerPageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#6aaa64]/5 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Wordle{' '}
              <span className="text-[#6aaa64]">Analyzer</span>{' '}
              <span className="text-[#c9b458]">Pro</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Was it luck or genius? Analyze your Wordle gameplay with Skill & Luck scoring, Difficulty Scorecard, 5-Method Solver Comparison, and more
            </p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              Last updated: May 2026 · Trusted by 25,000+ players · Now with Pro features
            </p>
          </motion.div>

          {/* Tool */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md sm:max-w-xl mx-auto"
          >
            <WordleAnalyzer />
          </motion.div>
        </div>
      </section>

      {/* SEO Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* How to Use */}
        <section className="py-12 sm:py-16" aria-labelledby="how-to-use-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="how-to-use-heading" className="text-2xl sm:text-3xl font-bold mb-6">
              How to Use the Wordle Analyzer
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Our free Wordle analysis tool evaluates your completed games in three simple steps. All processing happens locally in your browser — your game data is never sent to any server. For a deeper dive, see our <Link href="/blog/analyze-wordle-gameplay" className="text-[#6aaa64] hover:underline">guide on how to analyze your Wordle gameplay</Link>.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#6aaa64]/10 flex items-center justify-center">
                  <span className="text-[#6aaa64] font-bold" aria-hidden="true">1</span>
                </div>
                <h3 className="font-semibold">Enter Your Guesses</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Type each word you guessed in your Wordle game into the grid above. Use your keyboard to fill in the letters across each row, just like playing Wordle. Press Enter or Tab to move to the next row. You can enter up to 6 guesses.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9b458]/10 flex items-center justify-center">
                  <span className="text-[#c9b458] font-bold" aria-hidden="true">2</span>
                </div>
                <h3 className="font-semibold">Enter the Answer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enter the actual Wordle answer in the last row. The analyzer will automatically compute the tile colors (green, yellow, gray) for all your guesses based on the answer. There is no need to manually set any colors — everything is calculated for you.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#787c7e]/10 flex items-center justify-center">
                  <span className="text-[#787c7e] font-bold" aria-hidden="true">3</span>
                </div>
                <h3 className="font-semibold">Analyze & Learn</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Click the Analyze button to see a detailed breakdown of your gameplay. For each guess, you will see the remaining possible answers, your luck rating, guess quality score, and the AI-recommended optimal play. Use these insights to <Link href="/blog/improve-wordle-average" className="text-[#6aaa64] hover:underline">improve your Wordle average</Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Understanding Analysis */}
        <section className="py-12 sm:py-16 border-t" aria-labelledby="understanding-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="understanding-heading" className="text-2xl sm:text-3xl font-bold mb-2">
              Understanding Your Wordle Analysis
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Our analyzer produces three key metrics for each guess. These are grounded in information theory — the same mathematical framework behind data compression and communication systems. Learn more in our <Link href="/blog/math-behind-wordle" className="text-[#6aaa64] hover:underline">detailed guide to the math behind Wordle</Link>.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Luck Rating</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The luck rating tells you whether the clue pattern you received was more or less helpful than average. When you make a guess in Wordle, the feedback you get can vary dramatically depending on the actual answer. Sometimes a guess eliminates 90% of possibilities (lucky!), and sometimes it barely narrows things down (unlucky). Our analyzer calculates the expected average number of remaining answers for your guess across all possible solutions, then compares it to your actual result. A &quot;lucky&quot; rating means your clue eliminated significantly more words than expected, while &quot;unlucky&quot; means it eliminated fewer. This is not a judgment on your word choice — it is simply measuring the random variance in how helpful the feedback happened to be.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Guess Quality</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Guess quality measures how effectively your word choice narrowed down the possible answers, independent of luck. It is calculated as the ratio of words eliminated to the total words that could have been eliminated. A high guess quality means your word was excellent at partitioning the remaining possibilities, regardless of which answer was actually correct. This metric helps you understand whether your strategic word selection was sound, even if the particular feedback you received was not the most helpful. A guess quality above 80% is considered excellent, while below 40% suggests there may have been better word choices available. Remember that guess quality is contextual — what makes a good guess depends heavily on how many possible answers remain and what you already know. For more on choosing effective guesses, see our <Link href="/blog/best-second-words" className="text-[#6aaa64] hover:underline">guide to the best second words in Wordle</Link>.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Recommendations</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The AI recommendation shows you the mathematically optimal word you could have played at each turn. Our algorithm uses information theory to evaluate every possible guess, calculating which word would maximize the expected reduction in uncertainty. The key insight is that the best guess is not always a word that could be the answer — sometimes a word you know is wrong provides more information by testing multiple letter positions simultaneously. The AI considers all possible clue patterns a guess could produce and chooses the word that creates the most balanced distribution of remaining answer counts. When the AI recommendation matches your actual play, it means you independently chose the optimal strategy. When it differs, comparing the two can reveal strategic insights you can apply in future games. Explore our <Link href="/tools/best-words" className="text-[#6aaa64] hover:underline">best starting words tool</Link> to see this in action.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Strategy Tips */}
        <section className="py-12 sm:py-16 border-t" aria-labelledby="strategy-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="strategy-heading" className="text-2xl sm:text-3xl font-bold mb-2">
              Wordle Strategy Tips
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Whether you are a casual player looking to improve or a dedicated Wordle fan chasing a long streak, these data-backed strategies will help you solve Wordle puzzles more consistently and in fewer guesses. These tips are drawn from statistical analysis of the complete 2,309-word answer list and the experiences of players with streaks exceeding 300 days. For comprehensive strategy coverage, read our <Link href="/blog/wordle-strategy-guide" className="text-[#6aaa64] hover:underline">Wordle strategy guide from a 340+ day streak player</Link>.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 not-prose">
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">1. Start With a High-Information Word</h3>
                <p className="text-sm text-muted-foreground">
                  Your first guess sets the tone for the entire game. Words like SLATE, CRANE, or TRACE are excellent openers because they contain the most common letters in Wordle answers (S, T, A, E, R, N). These letters appear in the majority of five-letter English words, so testing them early gives you the most information. Avoid starting with unusual letters like Q, X, Z, or J — while they might feel clever, they rarely appear in Wordle answers and waste a valuable guess. See our <Link href="/tools/best-words" className="text-[#6aaa64] hover:underline">full ranking of the best Wordle starting words</Link> for data-driven recommendations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">2. Test Vowels Early</h3>
                <p className="text-sm text-muted-foreground">
                  Most Wordle answers contain two or three vowels. If your opener reveals one vowel, your second guess should test the remaining common vowels (A, E, I, O, U). For example, if your first guess reveals an A but no E, a word like RISEN or OATER can quickly identify which other vowels are present. Knowing the vowel profile of the answer dramatically narrows the possibilities. Our <Link href="/tools/letter-frequency" className="text-[#6aaa64] hover:underline">letter frequency tool</Link> shows you exactly which letters appear most often.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">3. Do Not Fixate on Green Letters</h3>
                <p className="text-sm text-muted-foreground">
                  A common mistake is to immediately try to solve around green letters. While it is tempting to build words using your confirmed letters, this often leads to narrow thinking. Instead, consider using your second or third guess to eliminate more possibilities, even if it means not using all your green letters. A guess that eliminates 80% of remaining words is better than a guess that might solve it but leaves 50% if wrong. This is one of the <Link href="/blog/common-wordle-mistakes" className="text-[#6aaa64] hover:underline">7 common mistakes even experienced players make</Link>.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">4. Think About Common Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Wordle answers follow English language patterns. Common endings include -IGHT words: LIGHT, NIGHT, FIGHT, RIGHT, MIGHT, SIGHT, TIGHT. Common starting letters include S, C, B, T, P, F, and M. Position your guesses to test these patterns when you have partial information.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">5. Handle Duplicates Carefully</h3>
                <p className="text-sm text-muted-foreground">
                  Duplicate letters are one of the trickiest aspects of Wordle. About 7% of Wordle answers contain a repeated letter (like LLAMA, SIZES, or GUESS). When you get a yellow letter, do not forget it might appear twice in the answer. If you have confirmed a letter is present but cannot find its correct position, consider that it might appear in multiple positions. Testing for duplicates when you are stuck can save you from wasting guesses. Learn more in our analysis of <Link href="/blog/why-some-answers-harder" className="text-[#6aaa64] hover:underline">why some Wordle answers are harder than others</Link>.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <h3 className="font-semibold text-sm">6. Use Elimination Strategically</h3>
                <p className="text-sm text-muted-foreground">
                  When you are down to a few possibilities, do not guess randomly. Instead, choose a word that distinguishes between the remaining options, even if it is not one of the possible answers. For example, if the answer could be BATCH, CATCH, HATCH, MATCH, PATCH, or WATCH, guessing a word like CHAMP would test multiple possibilities at once. Our <Link href="/blog/wordle-elimination-science" className="text-[#6aaa64] hover:underline">guide to the science of elimination</Link> covers this technique in depth.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-t" aria-labelledby="faq-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Common questions about how the Wordle Analyzer works and how to interpret your results. Can&apos;t find your answer? <Link href="/contact" className="text-[#6aaa64] hover:underline">Contact our team</Link>.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-12 sm:py-16 border-t" aria-labelledby="blog-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold">Latest Wordle Blog Posts</h2>
              <Link
                href="/blog"
                className="text-sm text-[#6aaa64] hover:underline flex items-center gap-1 font-medium"
              >
                View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* External authoritative reference */}
        <section className="py-12 sm:py-16 border-t">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Authoritative Sources</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Our analysis methodology is grounded in established research and verified against the official Wordle game:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">The New York Times Wordle</a> — Official Wordle game. Our word list and feedback algorithm match the NYT version.
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <a href="https://en.wikipedia.org/wiki/Wordle" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Wikipedia: Wordle</a> — Verified historical and gameplay information about Wordle.
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <a href="https://en.wikipedia.org/wiki/Information_theory" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Shannon, C.E. (1948) &quot;A Mathematical Theory of Communication&quot;</a> — Foundational information theory that powers our analysis engine.
                </span>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 border-t" aria-labelledby="cta-heading">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#6aaa64]/10 via-[#c9b458]/10 to-[#6aaa64]/10 rounded-2xl p-8 sm:p-12"
          >
            <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Analyze Your Game?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Jump back to the top, enter your guesses and the answer, and discover whether your Wordle play was luck, skill, or a bit of both. Then read our <Link href="/blog/wordle-strategy-guide" className="text-[#6aaa64] hover:underline">strategy guide</Link> to improve your next game.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              Start Analysis
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
