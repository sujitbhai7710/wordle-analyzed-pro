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
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Wordle Daily Challenge Tracker',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    description: 'Track daily Wordle challenges with tips, countdowns, and social sharing.',
    url: 'https://wordleanalyzer.dev/tools/daily-challenge',
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={softwareSchema} />
      <DailyChallengePageClient />
    </>
  );
}
