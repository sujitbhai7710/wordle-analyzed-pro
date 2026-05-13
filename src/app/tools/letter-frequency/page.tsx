import type { Metadata } from 'next';
import { LetterFrequencyPageClient } from './LetterFrequencyPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Letter Frequency in Wordle - Interactive Visualization',
  description:
    'Explore letter frequency in Wordle answers with interactive charts. See which letters appear most often and in which positions for smarter guessing.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/tools/letter-frequency',
  },
  openGraph: {
    title: 'Letter Frequency in Wordle - Interactive Visualization',
    description:
      'Explore letter frequency in Wordle answers with interactive charts. See which letters appear most often and in which positions.',
    url: 'https://wordleanalyzer.dev/tools/letter-frequency',
    type: 'website',
  },
};

export default function LetterFrequencyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Wordle Letter Frequency Tool',
    description: 'Interactive letter frequency visualization for Wordle answers.',
    url: 'https://wordleanalyzer.dev/tools/letter-frequency',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    author: {
      '@type': 'Person',
      name: 'Alex Mitchell',
      url: 'https://wordleanalyzer.dev/about',
    },
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
        name: 'Letter Frequency',
        item: 'https://wordleanalyzer.dev/tools/letter-frequency',
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
      <LetterFrequencyPageClient />
    </>
  );
}
