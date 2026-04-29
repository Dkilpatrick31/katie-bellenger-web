export type Mode = 'nutrition' | 'yoga'

export type Program = {
  id: string
  label: string
  description: string
  duration: string
  price: string
}

export type Palette = {
  bg: string
  accent: string
  highlight: string
  text: string
  textMuted: string
  border: string
  ctaBg: string
  ctaText: string
}

export type ModeConfig = {
  label: string
  headline: string
  subtext: string
  cta: string
  palette: Palette
  programs: Program[]
}

export const services: Record<Mode, ModeConfig> = {
  nutrition: {
    label: 'Nutrition',
    headline: 'Nourish your body from the inside out.',
    subtext:
      'Personalized meal plans, 1-on-1 coaching, and sustainable nutrition habits built around your life.',
    cta: 'Start My Nutrition Plan',
    palette: {
      bg: '#FAF8F4',
      accent: '#A8B5A0',
      highlight: '#8F6E5A',
      text: '#2C2420',
      textMuted: '#7A6B62',
      border: '#E8E0D8',
      ctaBg: '#8F6E5A',
      ctaText: '#FAF8F4',
    },
    programs: [
      {
        id: '1-on-1-coaching',
        label: '1-on-1 Coaching',
        description:
          'A fully personalized experience — weekly check-ins, custom meal plans, and ongoing support tailored to your goals.',
        duration: '3 months',
        price: 'From $350/mo',
      },
      {
        id: 'custom-meal-plan',
        label: 'Custom Meal Plan',
        description:
          'A detailed, flexible meal plan built around your preferences, lifestyle, and nutritional needs.',
        duration: 'One-time',
        price: 'From $149',
      },
      {
        id: 'group-program',
        label: 'Group Program',
        description:
          'Learn alongside a small cohort — combines live workshops, shared meal guides, and community accountability.',
        duration: '6 weeks',
        price: 'From $97',
      },
      {
        id: 'free-consultation',
        label: 'Free Consultation',
        description:
          'Not sure where to start? Book a free 20-minute call to explore which program fits your life.',
        duration: '20 min',
        price: 'Free',
      },
    ],
  },

  yoga: {
    label: 'Yoga',
    headline: 'Find stillness. Build strength. Come home to yourself.',
    subtext:
      'Live and on-demand yoga classes for all levels — from gentle morning flow to dynamic vinyasa.',
    cta: 'Join a Yoga Class',
    palette: {
      bg: '#F5EAE8',
      accent: '#C4B8D0',
      highlight: '#C4998A',
      text: '#2C1F1C',
      textMuted: '#7A6068',
      border: '#E8D8D4',
      ctaBg: '#C4998A',
      ctaText: '#F5EAE8',
    },
    programs: [
      {
        id: 'live-classes',
        label: 'Live Classes',
        description:
          'Join Katie live — morning flows, evening wind-downs, and themed workshops streamed directly to you.',
        duration: 'Ongoing',
        price: 'From $39/mo',
      },
      {
        id: 'on-demand-library',
        label: 'On-Demand Library',
        description:
          'Access 100+ classes across all styles and lengths. Practice at your own pace, on your own schedule.',
        duration: 'Anytime',
        price: 'From $19/mo',
      },
      {
        id: 'private-sessions',
        label: 'Private Sessions',
        description:
          'One-on-one sessions focused on your body, your goals, and your practice — done your way.',
        duration: '60 min',
        price: 'From $120',
      },
      {
        id: 'beginner-series',
        label: 'Beginner Series',
        description:
          'Never done yoga before? This 4-week foundations series builds confidence, breath, and basic postures.',
        duration: '4 weeks',
        price: 'From $49',
      },
    ],
  },
}
