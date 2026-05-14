import type { Metadata } from 'next';
import { StatsCalculatorPageClient } from './StatsCalculatorPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Wordle Statistics Calculator - Analyze Your Performance',
  description:
    'Input your Wordle stats and get deep analysis: average guesses, consistency score, improvement trend, guess distribution visualization, and personalized tips to improve.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/tools/stats-calculator',
  },
  openGraph: {
    title: 'Wordle Statistics Calculator - Analyze Your Performance',
    description:
      'Input your Wordle stats and get deep analysis: average guesses, consistency score, improvement trend, and personalized tips.',
    url: 'https://wordleanalyzer.dev/tools/stats-calculator',
    type: 'website',
    siteName: 'Wordle Analyzer',
    images: [
      {
        url: 'https://wordleanalyzer.dev/og-image.png',
        width: 1152,
        height: 864,
        alt: 'Wordle Statistics Calculator - Wordle Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wordle Statistics Calculator - Analyze Your Performance',
    description: 'Input your Wordle stats and get deep analysis with personalized improvement tips.',
    images: ['https://wordleanalyzer.dev/og-image.png'],
  },
};

export default function StatsCalculatorPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Wordle Statistics Calculator',
    description: 'Analyze your Wordle performance with advanced stats and visualizations.',
    url: 'https://wordleanalyzer.dev/tools/stats-calculator',
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
        name: 'Stats Calculator',
        item: 'https://wordleanalyzer.dev/tools/stats-calculator',
      },
    ],
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />
      <StatsCalculatorPageClient />
    </>
  );
}
