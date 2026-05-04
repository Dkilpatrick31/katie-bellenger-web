import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://trainwithkatie.fit'
const DESCRIPTION =
  'Work with Katie Bellenger — certified nutrition coach and strength trainer in [city]. Personalized meal plans, 1-on-1 coaching, and strength programs for sustainable weight loss and a lifestyle you love.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Katie Bellenger | Certified Nutrition Coach & Strength Training',
    template: '%s | Katie Bellenger',
  },
  description: DESCRIPTION,
  keywords: [
    'nutrition coach',
    'certified nutrition coach',
    'strength training',
    'personal trainer',
    'meal planning',
    'weight loss coaching',
    'Katie Bellenger',
    '1-on-1 coaching',
    'strength coach',
    'sustainable weight loss',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Katie Bellenger',
    title: 'Katie Bellenger | Certified Nutrition Coach & Strength Training',
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Katie Bellenger — Certified Nutrition Coach & Strength Trainer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katie Bellenger | Certified Nutrition Coach & Strength Training',
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Katie Bellenger',
    url: SITE_URL,
    jobTitle: 'Certified Nutrition Coach & Strength Trainer',
    description:
      'Certified nutrition coach and strength trainer helping clients build sustainable habits for weight loss, strength, and a lifestyle they love.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Katie Bellenger — Nutrition & Strength Coaching',
    url: SITE_URL,
    description:
      'Personalized nutrition coaching and strength training for sustainable weight loss and a lifestyle you love.',
    provider: { '@type': 'Person', name: 'Katie Bellenger' },
    serviceType: [
      'Nutrition Coaching',
      'Strength Training',
      'Personal Training',
      'Custom Meal Planning',
      'Weight Loss Coaching',
    ],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-white font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-stone-900"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="border-t border-stone-100 py-8 text-center">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Katie Bellenger. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}
