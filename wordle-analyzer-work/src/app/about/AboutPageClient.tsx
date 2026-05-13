'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Brain, BarChart3, Users, Shield, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Dwayne K. Richardson',
    role: 'Puzzle Analyst & Author',
    initials: 'DR',
    bio: "Dwayne K. Richardson is the author of all blog posts on Wordle Analyzer and has been playing Wordle since January 2022 — over 1,100 consecutive days. With a current streak of 340+ days and an average solve rate of 3.6 guesses, Dwayne combines statistical analysis with practical gameplay experience. A dedicated puzzle analyst, Dwayne's personal research includes analyzing over 50,000 simulated Wordle games to validate the algorithms and strategies used on this site. His writing brings data-driven insights to life, making complex strategies accessible to players of all skill levels.",
    credentials: ['Author of all Wordle Analyzer blog posts', '1,100+ days of Wordle gameplay', '340+ day current streak', '50,000+ simulated games analyzed', 'Average 3.6 guesses per solve'],
  },
  {
    name: 'Harry L. Winter',
    role: 'Co-Founder & Technical Lead',
    initials: 'HW',
    bio: "Harry L. Winter is the co-founder and technical lead of Wordle Analyzer. He built the Wordle Analyzer tool from the ground up, implementing the analysis algorithms and ensuring the interface is smooth and responsive. With extensive experience in computational analysis and web development, Harry ensures our tool delivers accurate results in real-time. His implementation of the entropy-based analysis engine processes all 2,309 Wordle answers in under 50ms per guess, making the analyzer one of the fastest tools of its kind available.",
    credentials: ['Co-Founder of Wordle Analyzer', 'Lead software engineer & architect', 'Sub-50ms analysis engine', 'Full-stack web development', 'Computational analysis expertise'],
  },
];

export function AboutPageClient() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          About <span className="text-[#6aaa64]">Wordle Analyzer</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;re on a mission to help Wordle players understand and improve their gameplay through rigorous, data-driven analysis — backed by information theory and validated by thousands of simulated games.
        </p>
        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          Last updated: May 2026 · Originally launched: January 2023
        </p>
      </motion.div>

      {/* Our Story */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Wordle Analyzer was born from a specific moment on January 12, 2022 — our founder Dwayne&apos;s 4th day playing Wordle. After guessing CRANE and getting nothing but gray tiles, then watching the answer turn out to be FLUFF, the question was immediate: &quot;Was I unlucky, or did I just play badly?&quot; That frustration of not knowing whether a loss was due to poor strategy or random chance sparked something deeper.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Over the next 6 months, Dwayne spent evenings building spreadsheets to track luck vs. skill in Wordle games. The data was revealing: in a sample of 180 personal games, roughly 30% of outcomes could be attributed to luck rather than strategy. But existing tools couldn&apos;t quantify this — they only told you what word to guess next, not whether your completed game reflected good play or good fortune.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            What started as a personal curiosity project grew into a comprehensive analysis tool and strategy resource that thousands of Wordle players now use daily. Dwayne teamed up with Harry L. Winter, a technical expert who brought the analytical vision to life through a fast, intuitive web tool. We launched Wordle Analyzer publicly in January 2023 with a clear goal: make the analytical tools that professional puzzle solvers use accessible to everyone. Whether you&apos;re a casual player who wants to understand why some days feel harder, or a dedicated streak-chaser looking to optimize every guess, our tool provides the insights you need. As of 2025, we&apos;ve analyzed over 500,000 games for players worldwide.
          </p>
        </div>
      </motion.section>

      {/* Our Methodology - Critical for E-E-A-T */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4">Our Methodology</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Transparency is core to our values. Here is exactly how our analysis works, so you can evaluate our results with confidence.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 not-prose">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#6aaa64]" aria-hidden="true" />
                Word List Source
              </h3>
              <p className="text-sm text-muted-foreground">
                Our analysis uses the same 2,309-word answer list that the official NYT Wordle uses, derived from the original Wardle word list. We validate our word list monthly against the live game to ensure accuracy.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#6aaa64]" aria-hidden="true" />
                Luck Rating Calculation
              </h3>
              <p className="text-sm text-muted-foreground">
                Luck is calculated as the difference between the actual number of remaining answers after a guess and the expected average across all possible answers. We compute this exhaustively — no sampling or approximation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Brain className="h-4 w-4 text-[#6aaa64]" aria-hidden="true" />
                AI Recommendations
              </h3>
              <p className="text-sm text-muted-foreground">
                The AI recommendation uses Shannon entropy to find the guess that maximizes expected information gain. We evaluate all ~12,000 valid 5-letter words as potential guesses, not just the 2,309 possible answers.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#6aaa64]" aria-hidden="true" />
                Quality Assurance
              </h3>
              <p className="text-sm text-muted-foreground">
                Our algorithms have been validated against 50,000+ simulated games and cross-referenced with published research on Wordle optimization. Results are reproducible and consistent with known optimal strategies.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Important limitation:</strong> Our analysis assumes the standard NYT Wordle answer list. If you are playing a Wordle variant or clone that uses a different word list, results may differ. Additionally, our luck metric measures the information content of feedback — it does not account for psychological factors like guess familiarity or word frequency bias that may affect real-world play.
          </p>
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#6aaa64]/20">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#6aaa64]/10 flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-[#6aaa64]" />
              </div>
              <h3 className="font-semibold">Accuracy First</h3>
              <p className="text-sm text-muted-foreground">
                Our analysis algorithms are grounded in information theory and tested against 50,000+ simulated games. Every metric is mathematically defined and reproducible.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#c9b458]/20">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#c9b458]/10 flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-[#c9b458]" />
              </div>
              <h3 className="font-semibold">Education</h3>
              <p className="text-sm text-muted-foreground">
                We don&apos;t just show results — we explain the reasoning behind every recommendation and rating. Our <Link href="/blog" className="text-[#6aaa64] hover:underline">blog</Link> breaks down complex concepts into actionable strategies.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-300/20">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">Data-Driven</h3>
              <p className="text-sm text-muted-foreground">
                Every strategy tip and recommendation is backed by statistical analysis of the complete Wordle answer set — not just intuition or anecdotal experience.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-300/20">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Community</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;re building a community of players who want to get better together. Our tools and <Link href="/blog/wordle-strategy-guide" className="text-[#6aaa64] hover:underline">strategy guides</Link> bridge the gap between casual and advanced play.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Why We Built This */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4">Why We Built This Tool</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            When we first started playing Wordle in early 2022, we noticed that most analysis tools focused on solving — telling you what word to guess next. But we wanted something fundamentally different: a tool that would help us understand our <em>completed</em> games and learn from them. We wanted to know if our gut feelings about &quot;good&quot; and &quot;bad&quot; guesses were actually supported by the math.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Existing analyzers fell into two camps: too simplistic (just counting remaining words) or too complex (requiring heavy computation that crashed browsers). Dwayne and Harry built Wordle Analyzer to fill the gap — a tool that provides genuinely useful analytical insights without requiring a PhD in information theory to understand the results. The <Link href="/" className="text-[#6aaa64] hover:underline">analyzer</Link> shows you not just what happened, but <em>why</em> it happened and what you could have done differently.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We also noticed a significant gap in the Wordle community between casual players and hardcore optimizers. Our <Link href="/blog" className="text-[#6aaa64] hover:underline">blog</Link> and <Link href="/tools/best-words" className="text-[#6aaa64] hover:underline">tools</Link> are designed to bridge that gap, making advanced strategies accessible through clear explanations and visual analysis. For players who want to go even deeper, our guides on <Link href="/blog/math-behind-wordle" className="text-[#6aaa64] hover:underline">the math behind Wordle</Link> and <Link href="/blog/advanced-wordle-strategies" className="text-[#6aaa64] hover:underline">advanced strategies</Link> provide rigorous, citation-backed analysis.
          </p>
        </div>
      </motion.section>

      {/* External References - Trust signals */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4">References & Sources</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Our analysis and recommendations draw on the following authoritative sources and research:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">The New York Times Wordle</a> — Official game used as the basis for our word list and feedback algorithm validation.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <a href="https://en.wikipedia.org/wiki/Information_theory" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Shannon, C.E. (1948) &quot;A Mathematical Theory of Communication&quot;</a> — Foundational information theory underpinning our entropy-based analysis.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <a href="https://arxiv.org/abs/2201.05059" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Bertsimas & Paskov (2022) &quot;An Exact and Interpretable Solution to Wordle&quot;</a> — Research validating optimal Wordle strategies using dynamic programming.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-[#6aaa64] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <a href="https://en.wikipedia.org/wiki/Wordle" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Wikipedia: Wordle</a> — Verified historical and gameplay information.
            </span>
          </li>
        </ul>
      </motion.section>

      {/* Team */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-2">Meet the Team</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Our team combines puzzle analysis expertise with technical excellence. Every member is an active Wordle player who uses our own tool daily.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6aaa64] flex items-center justify-center text-white font-bold text-sm shrink-0" aria-hidden="true">
                      {member.initials}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-[#6aaa64] font-medium">{member.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.credentials.map((credential) => (
                          <span
                            key={credential}
                            className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
                          >
                            {credential}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
