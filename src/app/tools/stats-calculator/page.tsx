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
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Wordle Stats Analyzer',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    description: 'Calculate derived Wordle statistics including average guesses, consistency scores, and improvement trends.',
    url: 'https://wordleanalyzer.dev/tools/stats-calculator',
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={softwareSchema} />
      <StatsCalculatorPageClient />
    </>
  );
}
