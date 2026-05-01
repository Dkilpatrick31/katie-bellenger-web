export type Mode = 'nutrition' | 'strength' | 'bundle'

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
  eyebrow: string
  headline: string
  subtext: string
  cta: string
  palette: Palette
  programs: Program[]
}

export const KATIE_BIO =
  "I'm Katie — a certified nutritionist and strength coach who believes wellness should fit your actual life. I'm not here to put you on a diet or have you live in the gym. My philosophy is simple: work hard, play hard, and build habits that are genuinely sustainable. Whether your goal is weight loss, building strength, improving energy, or just feeling confident in your skin — I'll meet you where you are and build a plan around how you actually live. Real food. Real training. Real results."

export const services: Record<Mode, ModeConfig> = {
  nutrition: {
    label: 'Nutrition',
    eyebrow: 'Certified Nutritionist',
    headline: 'Nourish your body. Fuel your life.',
    subtext:
      'Sustainable eating habits built around your lifestyle — not a crash diet. Real food, real results, and a plan you\'ll actually stick to.',
    cta: 'Start My Nutrition Plan',
    palette: {
      bg: '#FAF8F4',
      accent: '#A8B5A0',
      highlight: '#8F6E5A',
      text: '#2C2820',
      textMuted: '#7A6B62',
      border: '#E8E3DA',
      ctaBg: '#2C2820',
      ctaText: '#FAF8F4',
    },
    programs: [
      {
        id: '1-on-1-coaching',
        label: '1-on-1 Coaching',
        description:
          'A fully personalized experience with weekly check-ins, custom meal plans, and ongoing support tailored to your goals and lifestyle.',
        duration: '3 months',
        price: 'From $350/mo',
      },
      {
        id: 'custom-meal-plan',
        label: 'Custom Meal Plan',
        description:
          'A detailed, flexible meal plan built around your preferences, dietary needs, and daily routine — no cookie-cutter templates.',
        duration: 'One-time',
        price: 'From $149',
      },
      {
        id: 'weight-loss-program',
        label: 'Weight Loss Program',
        description:
          'A structured program combining nutrition strategy, habit tracking, and accountability to help you lose weight and keep it off for good.',
        duration: '8 weeks',
        price: 'From $249',
      },
      {
        id: 'free-consultation',
        label: 'Free Consultation',
        description:
          'Not sure where to start? Book a free 20-minute call to explore which program fits your life and goals — no pressure, no commitment.',
        duration: '20 min',
        price: 'Free',
      },
    ],
  },

  strength: {
    label: 'Strength',
    eyebrow: 'Certified Strength Coach',
    headline: 'Train hard. Recover smart. Live well.',
    subtext:
      'Work hard, play hard — and build a body that keeps up with your life. Progressive strength programming designed to burn fat, build muscle, and last long-term.',
    cta: 'Build My Strength Plan',
    palette: {
      bg: '#F4F4F2',
      accent: '#4A6FA5',
      highlight: '#2C3E50',
      text: '#1A1A2E',
      textMuted: '#5A6A7A',
      border: '#D0D8E4',
      ctaBg: '#1A1A2E',
      ctaText: '#F4F4F2',
    },
    programs: [
      {
        id: 'personal-training',
        label: 'Personal Training',
        description:
          'One-on-one sessions with Katie built around your schedule, your goals, and your body — available in-person or remote.',
        duration: 'Ongoing',
        price: 'From $120/session',
      },
      {
        id: 'strength-program',
        label: 'Strength Program',
        description:
          'A fully designed progressive training plan with video demos, tracking sheets, and weekly programming updates to keep you improving.',
        duration: '12 weeks',
        price: 'From $199',
      },
      {
        id: 'weight-loss-toning',
        label: 'Weight Loss + Toning',
        description:
          'Strategic programming that combines fat-burning circuits with strength work to reshape your body and boost your metabolism.',
        duration: '8 weeks',
        price: 'From $179',
      },
      {
        id: 'free-intro-session',
        label: 'Free Intro Session',
        description:
          'Come move, ask questions, and see if we\'re a great fit. A no-pressure 30-minute intro to explore your goals and what\'s possible.',
        duration: '30 min',
        price: 'Free',
      },
    ],
  },

  bundle: {
    label: 'Bundle',
    eyebrow: 'Nutrition + Strength — Complete Transformation',
    headline: 'The complete package for a life you love.',
    subtext:
      'Pair expert nutrition coaching with progressive strength training for the ultimate sustainable lifestyle transformation. Work hard, eat well, and feel incredible.',
    cta: 'Get the Full Bundle',
    palette: {
      bg: '#F9F5F0',
      accent: '#C9A84C',
      highlight: '#8F6E5A',
      text: '#2C2820',
      textMuted: '#7A6B62',
      border: '#E8D8C0',
      ctaBg: '#2C2820',
      ctaText: '#F9F5F0',
    },
    programs: [
      {
        id: '3-month-transformation',
        label: '3-Month Transformation',
        description:
          'A focused 3-month program combining custom nutrition planning and progressive strength training to kick-start your lifestyle reset.',
        duration: '3 months',
        price: 'From $699',
      },
      {
        id: '6-month-lifestyle-reset',
        label: '6-Month Lifestyle Reset',
        description:
          'The full experience — six months of evolving nutrition and training programs with bi-weekly check-ins and complete lifestyle integration.',
        duration: '6 months',
        price: 'From $1,199',
      },
      {
        id: 'vip-coaching',
        label: 'VIP Coaching',
        description:
          'Nutrition + Strength + unlimited check-ins. Katie\'s most comprehensive offering for clients who want the full white-glove transformation.',
        duration: 'Ongoing',
        price: 'From $599/mo',
      },
      {
        id: 'custom-bundle',
        label: 'Custom Bundle',
        description:
          'Not sure which bundle fits? Let\'s build something around you. Reach out and Katie will design a plan for your goals and schedule.',
        duration: 'Flexible',
        price: 'Custom pricing',
      },
    ],
  },
}
