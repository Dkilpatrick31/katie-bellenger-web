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

export const metadata: Metadata = {
  title: 'Katie Bellenger — Nutritionist & Yoga Instructor',
  description:
    'Personalized nutrition coaching and yoga classes for every level. Work with Katie Bellenger to nourish your body and find stillness.',
}

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
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
