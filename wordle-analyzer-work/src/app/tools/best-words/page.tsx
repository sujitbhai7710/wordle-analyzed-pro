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
    siteName: 'Wordle Analyzer',
    images: [
      {
        url: 'https://wordleanalyzer.dev/og-image.png',
        width: 1152,
        height: 864,
        alt: 'Best Wordle Starting Words - Wordle Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Wordle Starting Words - Ranked by Information Theory',
    description:
      'Discover the top 20 best Wordle starting words ranked by information theory and letter frequency analysis.',
    images: ['https://wordleanalyzer.dev/og-image.png'],
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
      name: 'Dwayne K. Richardson',
      url: 'https://wordleanalyzer.dev/about',
    },
  };

  // HowTo schema removed: rich results deprecated September 2023 per Google guidelines.

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
      <JsonLd data={breadcrumbSchema} />
      <BestWordsPageClient />
    </>
  );
}
