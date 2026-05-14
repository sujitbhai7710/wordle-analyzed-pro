import type { Metadata } from 'next';
import { DailyChallengePageClient } from './DailyChallengePageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Daily Wordle Challenge - Tips, Stats & Countdown',
  description:
    'Get your daily Wordle tip, find today\'s Wordle number, countdown to the next puzzle, and share insights with friends. Your daily Wordle companion.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/tools/daily-challenge',
  },
  openGraph: {
    title: 'Daily Wordle Challenge - Tips, Stats & Countdown',
    description:
      'Get your daily Wordle tip, find today\'s Wordle number, and countdown to the next puzzle.',
    url: 'https://wordleanalyzer.dev/tools/daily-challenge',
    type: 'website',
    siteName: 'Wordle Analyzer',
    images: [
      {
        url: 'https://wordleanalyzer.dev/og-image.png',
        width: 1152,
        height: 864,
        alt: 'Daily Wordle Challenge - Wordle Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Wordle Challenge - Tips, Stats & Countdown',
    description: 'Get your daily Wordle tip and countdown to the next puzzle.',
    images: ['https://wordleanalyzer.dev/og-image.png'],
  },
};

export default function DailyChallengePage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Daily Wordle Challenge',
    description: 'Daily Wordle tips, puzzle countdown, and stats tracker.',
    url: 'https://wordleanalyzer.dev/tools/daily-challenge',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    author: {
      '@type': 'Person',
      name: 'Dwayne K. Richardson',
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
        name: 'Daily Challenge',
        item: 'https://wordleanalyzer.dev/tools/daily-challenge',
      },
    ],
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DailyChallengePageClient />
    </>
  );
}
