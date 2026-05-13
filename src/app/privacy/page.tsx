import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy - Wordle Analyzer',
  description:
    'Privacy Policy for Wordle Analyzer. Learn about how we handle your data, cookies, and privacy when using our Wordle analysis tool. All analysis runs locally in your browser — no game data is stored on our servers.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Wordle Analyzer',
    description:
      'Privacy Policy for Wordle Analyzer. All analysis runs locally in your browser — no game data is stored on our servers.',
    url: 'https://wordleanalyzer.dev/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
        name: 'Privacy Policy',
        item: 'https://wordleanalyzer.dev/privacy',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Privacy <span className="text-[#6aaa64]">Policy</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 4, 2025 · Effective: January 1, 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          {/* Summary box for quick reading */}
          <div className="p-4 rounded-lg bg-[#6aaa64]/5 border border-[#6aaa64]/20 not-prose mb-6">
            <h2 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <svg className="h-4 w-4 text-[#6aaa64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Privacy at a Glance
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Your Wordle guesses and answers are processed <strong>entirely in your browser</strong> — never sent to our servers</li>
              <li>✅ We do <strong>not</strong> collect, store, or have access to your game data</li>
              <li>📊 We use <strong>Google Analytics</strong> to understand site usage patterns (anonymized)</li>
              <li>📢 We may display ads via <strong>Google AdSense</strong>, which uses cookies for ad personalization</li>
              <li>🔒 You can opt out of analytics tracking and personalized ads at any time</li>
            </ul>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Wordle Analyzer (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring transparency about how we handle information. This Privacy Policy explains our practices regarding data collection, use, and disclosure when you visit and use our website at wordleanalyzer.dev (the &quot;Service&quot;). By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We want to be completely upfront about what data we collect and why. Wordle Analyzer is designed to work primarily in your browser, which means most of your data never leaves your device.
            </p>
            <h3 className="font-semibold mb-2">2.1 Data Processed Locally (Not Collected)</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you use the Wordle Analyzer tool, your guesses, the answer word, and all analysis results are processed <strong>entirely in your web browser using client-side JavaScript</strong>. This data is <strong>never sent to our servers or stored anywhere outside your device</strong>. When you close the page or navigate away, this data is gone. We have no access to your Wordle games, results, or analysis data. This is a core design principle of our tool.
            </p>
            <h3 className="font-semibold mb-2">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Like most websites, we may automatically collect certain information when you visit our Service through cookies and similar technologies, including:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-3">
              <li>IP address (anonymized by Google Analytics)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages visited and time spent on pages</li>
              <li>Device type (desktop, mobile, tablet)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-3">
              This information is collected through cookies and similar technologies and is used to provide, maintain, and improve the Service. We do not link this automatically collected information to any individual person.
            </p>
            <h3 className="font-semibold mb-2">2.3 Contact Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              If you contact us through our contact form, we collect the information you provide, such as your name, email address, and message content. This information is used solely to respond to your inquiry and is not used for any other purpose without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your experience on our Service. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our Service.
            </p>
            <h3 className="font-semibold mb-2">3.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-3">
              <li><strong>Essential Cookies:</strong> Required for the Service to function properly, such as remembering your theme preference (light/dark mode). These cannot be disabled without affecting core functionality.</li>
              <li><strong>Analytics Cookies:</strong> Used by Google Analytics to understand how visitors interact with our Service, including pages visited, time spent on pages, and navigation patterns. This data is anonymized and aggregated. See Section 4 for details.</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense and its partners to serve relevant advertisements. These cookies may track your browsing activity across different websites to personalize ads. See Section 5 for details.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings and may choose to disable certain types of cookies. However, disabling essential cookies may affect the functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Google Analytics</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use Google Analytics, a web analytics service provided by Google, Inc. (&quot;Google&quot;) to collect and analyze usage data about our Service. Google Analytics uses cookies to help us understand how users interact with our website.
            </p>
            <h3 className="font-semibold mb-2">4.1 What Google Analytics Collects</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-3">
              <li>Pages visited and navigation paths</li>
              <li>Time spent on pages</li>
              <li>Geographic region (country/city level, anonymized)</li>
              <li>Device and browser information</li>
              <li>Traffic source (how you found our site)</li>
            </ul>
            <h3 className="font-semibold mb-2">4.2 How We Use This Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use Google Analytics data to generate aggregated reports on website activity and to improve our Service. We do not use this data to identify individual users. We have configured Google Analytics to anonymize IP addresses (the last octet is set to 0).
            </p>
            <h3 className="font-semibold mb-2">4.3 Your Choices</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of Google Analytics by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                Google Analytics opt-out browser add-on
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              . You can also manage cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Google AdSense and Advertising</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may display advertisements on our Service through Google AdSense, a third-party advertising service provided by Google. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
            </p>
            <h3 className="font-semibold mb-2">5.1 How AdSense Works</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Google AdSense uses the DoubleClick cookie and other tracking technologies to display ads that are relevant to you. These technologies may collect information such as your IP address, browser type, and browsing activity across multiple websites. Google uses this information to serve personalized advertisements.
            </p>
            <h3 className="font-semibold mb-2">5.2 Third-Party Ad Vendors</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Some ads on our site may be served by third-party ad networks that are members of the Network Advertising Initiative (NAI) or follow the Digital Advertising Alliance (DAA) self-regulatory principles. These ad networks may collect information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <h3 className="font-semibold mb-2">5.3 Your Advertising Choices</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of personalized advertising by visiting:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-2">
              <li>
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                  Google Ads Settings
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
              <li>
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                  Network Advertising Initiative opt-out page
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
              <li>
                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                  Digital Advertising Alliance opt-out page
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. How Google Uses Data from Our Site</h2>
            <p className="text-muted-foreground leading-relaxed">
              When users visit our site, Google and its partners may collect data through cookies and similar technologies for the purposes described in{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                Google&apos;s How Google Uses Information from Sites or Apps That Use Our Services
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              . This includes using data to serve personalized ads, measure advertising effectiveness, and report on site usage. You can learn more about how Google collects and processes data at{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline inline-flex items-center gap-0.5">
                Google&apos;s Privacy Policy
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our Service uses the following third-party services that may collect information:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li><strong>Google Analytics</strong> — Web analytics service. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">Privacy Policy</a></li>
              <li><strong>Google AdSense</strong> — Advertising service. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#6aaa64] hover:underline">How Google Uses Data</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to review the privacy policy of any third-party service you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take reasonable measures to protect the information associated with our Service. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. Since most Wordle analysis data is processed locally in your browser and never transmitted to our servers, the risk of data breach for your game data is minimal. The only data that passes through our servers is standard web traffic (page loads) and analytics information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can take appropriate action. Google AdSense does not serve personalized ads to users under 18 in the EEA, UK, and Switzerland, or under 13 in other regions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Your Rights (GDPR & CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the following rights:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-3">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Request your data in a structured, commonly used format</li>
              <li><strong>Right to Object:</strong> Object to our processing of your personal data</li>
              <li><strong>CCPA Right to Opt Out:</strong> California residents may opt out of the sale of personal information</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise any of these rights, please contact us using the information provided below. We will respond to all legitimate requests within 30 days. We do not sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after the posting of changes constitutes your acceptance of such changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have any questions about this Privacy Policy, our data practices, or wish to exercise your data rights, please contact us at:
            </p>
            <ul className="list-none pl-0 text-muted-foreground space-y-1">
              <li><strong>Email:</strong> privacy@wordleanalyzer.dev</li>
              <li><strong>General inquiries:</strong> contact@wordleanalyzer.dev</li>
              <li><strong>Contact Page:</strong> <a href="https://wordleanalyzer.dev/contact" className="text-[#6aaa64] hover:underline">wordleanalyzer.dev/contact</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              For questions specifically about Google Analytics or Google AdSense data practices, you may also contact Google directly through their privacy channels.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
