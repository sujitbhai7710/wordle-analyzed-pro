import type { Metadata } from 'next';
import { WordleAnalyzerPage } from '@/components/WordleAnalyzerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { blogPosts } from '@/lib/blog/posts';

export const metadata: Metadata = {
  title: 'Wordle Analyzer - Was It Luck or Genius? Analyze Your Wordle Gameplay',
  description:
    'Analyze your Wordle gameplay with data-driven insights. Discover your luck rating, guess quality, and AI-recommended optimal plays. Free Wordle analyzer tool trusted by 10,000+ players. All analysis runs locally in your browser.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev',
  },
};

const faqItems = [
  {
    question: 'How does the Wordle Analyzer work?',
    answer: 'The Wordle Analyzer takes your guesses and the answer word, then evaluates each guess against all 2,309 possible Wordle answers. It calculates how many possible answers remained before and after each guess, determines whether you were lucky or unlucky based on expected vs actual elimination using information theory, and compares your play to the mathematically optimal strategy.',
  },
  {
    question: 'What is a luck rating in Wordle analysis?',
    answer: 'The luck rating compares how many possible answers your guess actually eliminated versus how many it would eliminate on average across all possible answers. If your guess eliminated significantly more than average, you were lucky — the clue pattern was unusually helpful. If it eliminated fewer, you were unlucky.',
  },
  {
    question: 'What is guess quality and how is it calculated?',
    answer: 'Guess quality measures how effectively a guess narrows down the remaining possible answers. It\'s calculated as the ratio of words eliminated to the maximum possible elimination. A guess quality of 100% means only one possible answer remains, while 0% means no words were eliminated.',
  },
  {
    question: 'How does the AI recommendation work?',
    answer: 'The AI recommendation uses Shannon entropy from information theory to find the guess that would maximize the expected reduction in possible answers. It evaluates each candidate word by calculating the entropy of the resulting clue distribution — the word that creates the most balanced split of remaining answers across different clue patterns is recommended as optimal.',
  },
  {
    question: 'What is Wordle Hard Mode?',
    answer: 'In Hard Mode, any revealed hints must be used in subsequent guesses. This means if a letter is shown as green (correct position), you must use that letter in the same position in your next guess. If a letter is yellow (present but wrong position), you must include it somewhere in your next guess. This restricts your options and can make the game more challenging.',
  },
  {
    question: 'What are the best Wordle starting words?',
    answer: 'The best starting words are those that maximize information gain by using the most common letters in Wordle answers. Top choices include SLATE, CRANE, SALET, TRACE, and RAISE. These words cover high-frequency letters like S, T, A, E, R, and N, giving you the best chance of getting useful feedback from your first guess.',
  },
  {
    question: 'Can I use the analyzer for any Wordle game?',
    answer: 'Yes! You can use the Wordle Analyzer for any completed Wordle game. Simply enter your guesses, set the tile colors by clicking to cycle through gray/yellow/green, enter the answer word, and click Analyze. The tool works with the NYT Wordle, Wordle clones, and any game that follows the standard Wordle rules.',
  },
  {
    question: 'How accurate is the analysis?',
    answer: 'The analysis uses the complete 2,309-word Wordle answer list and applies the same Wordle feedback algorithm (including proper handling of duplicate letters). Our algorithms have been validated against 50,000+ simulated games and cross-referenced with published research. The luck rating and guess quality calculations are exhaustive — no sampling or approximation.',
  },
  {
    question: 'Does the analyzer work on mobile devices?',
    answer: 'Yes, the Wordle Analyzer is fully responsive and works on mobile phones and tablets. The tile grid adjusts to smaller screens, and you can tap tiles to change their colors. The analysis results are also optimized for mobile viewing.',
  },
  {
    question: 'Is my Wordle data stored anywhere?',
    answer: 'No. All analysis happens locally in your browser using client-side JavaScript. Your guesses, the answer, and the analysis results are never sent to any server. The tool is completely private and works even without an internet connection once the page is loaded.',
  },
];

export default function HomePage() {
  const recentPosts = blogPosts.slice(0, 6);

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Wordle Analyzer',
    description: 'Analyze your Wordle gameplay with data-driven insights. Discover your luck rating, guess quality, and AI-recommended optimal plays.',
    url: 'https://wordleanalyzer.dev',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Alex Mitchell',
      url: 'https://wordleanalyzer.dev/about',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0',
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wordle Analyzer',
    url: 'https://wordleanalyzer.dev',
    description: 'Free Wordle analysis tool and strategy resource, trusted by 10,000+ players worldwide.',
    founder: {
      '@type': 'Person',
      name: 'Alex Mitchell',
      jobTitle: 'Data Analyst & Founder',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema} />
      <WordleAnalyzerPage recentPosts={recentPosts} faqItems={faqItems} />
    </>
  );
}
