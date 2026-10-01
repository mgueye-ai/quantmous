/**
 * Site-wide constants: identity, external profiles and navigation.
 * Update links here and every reference across the site follows.
 */

export const person = {
  name: 'Moustapha Gueye',
  tagline:
    'Computer & Data Science Student · Mathematics Minor · Software Builder · Aspiring Quantitative Developer · Ironman in Training',
  introLead:
    'Moustapha Gueye is a Computer and Data Science student at New York University pursuing a minor in Mathematics.',
  intro:
    'Driven by a passion for technology, mathematics, and quantitative problem-solving, he enjoys building software, studying financial markets, and developing the skills needed to become a quantitative developer. Above all, Moustapha has a passion for defying the odds, taking on difficult challenges, and constantly pushing himself beyond his limits. This mindset extends beyond academics: he is also an entrepreneur and endurance athlete training to complete an Ironman before turning 21. Whether he is building a new project, studying complex systems, memorizing the Qur’an, or training across swimming, cycling, and running, he approaches every goal with discipline, ambition, and a relentless commitment to growth.',
  email: 'Moustapha@mousholdings.com',
  quote: 'It won’t always be 70 and sunny',
} as const

export const links = {
  linkedin: 'https://www.linkedin.com/in/moustapha-gueye-292951383',
  strava: 'https://strava.app.link/LK0uHgyTR6b',
  mousApps: 'https://mousapps.com',
  hillWebWorks: 'https://hillwebworks.com',
  tedxTalk: 'https://www.youtube.com/watch?v=PAPNFz32_Hg&t=1s',
  synchronyDeck: 'https://canva.link/qyx4phlmu6f2xl6',
  resume: '/Moustapha-Gueye-Resume.pdf',
} as const

export interface NavItem {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'focus', label: 'Focus' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]
