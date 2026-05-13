import type { Metadata } from 'next';
import { BestWordsPageClient } from './BestWordsPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Wordle Starting Words - Ranked by Information Theory',
  description:
    'Discover the top 20 best Wordle starting words ranked by information theory and letter frequency analysis. Find out why SLATE, CRANE, and SALET dominate.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/tools/best-words',
  },
  openGraph: {
    title: 'Best Wordle Starting Words - Ranked by Information Theory',
    description:
      'Discover the top 20 best Wordle starting words ranked by information theory and letter frequency analysis.',
    url: 'https://wordleanalyzer.dev/tools/best-words',
    type: 'website',
  },
};

export default function BestWordsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Best Wordle Starting Words',
    description: 'Find the best Wordle starting words ranked by information theory.',
    url: 'https://wordleanalyzer.dev/tools/best-words',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    author: {
      '@type': 'Person',
      name: 'Alex Mitchell',
      url: 'https://wordleanalyzer.dev/about',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Choose the Best Wordle Starting Word',
    description: 'A guide to selecting optimal starting words in Wordle based on information theory and letter frequency.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Understand Letter Frequency',
        text: 'The most common letters in Wordle answers are E, A, R, O, T, L, I, S, N. Starting words that use these letters give you the most information.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose a Word with Common Letters',
        text: 'Select a starting word like SLATE, CRANE, or TRACE that combines multiple high-frequency letters in common positions.',
      },
      {
        '@type': 'HowToStep',
        name: 'Test Multiple Vowels',
        text: 'Good starting words test at least two vowels (A, E, I, O) since most Wordle answers contain 2-3 vowels.',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://wordleanalyzer.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://wordleanalyzer.dev/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Best Starting Words',
        item: 'https://wordleanalyzer.dev/tools/best-words',
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BestWordsPageClient />
    </>
  );
}
