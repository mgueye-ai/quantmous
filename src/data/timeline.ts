import { media } from '../lib/media'
import { links } from './site'

/**
 * Single source of truth for "The Journey So Far".
 *
 * Add a new entry by appending an object to `timeline` in chronological order.
 * Every field except `id`, `date`, `title`, `categories` and `description` is
 * optional, so partial entries render cleanly.
 *
 * Nothing here should be invented.
 */

export type TimelineCategory =
  | 'Education'
  | 'Business'
  | 'Professional Experience'
  | 'Leadership'
  | 'Athletics'
  | 'Travel'
  | 'Professional Development'
  | 'Technology'
  | 'Personal Development'

export interface TimelineMedia {
  /** Visual treatment of the slot. */
  kind: 'image' | 'video'
  /** Label used only if the image is missing. */
  filename: string
  /** Alt text used once a real asset is dropped in. */
  alt: string
  /** Short label shown on the placeholder frame. */
  caption: string
  /** Bundled image URL. */
  src?: string
  /** Aspect ratio of the media frame. */
  ratio?: '16 / 9' | '4 / 3' | '3 / 2' | '1 / 1'
  /** `object-position`, for portrait photos that need a higher crop. */
  focalPoint?: string
  /** Logos use `contain` so the mark is not cropped. */
  fit?: 'cover' | 'contain'
  /** Dark frame behind a contained logo. */
  tone?: 'dark'
}

export interface TimelineLink {
  href: string
  label: string
}

export interface TimelineMeta {
  label: string
  value: string
}

export interface TimelineEntry {
  id: string
  /** Human-readable date range, shown verbatim. */
  date: string
  /** Short form used by the compact rail on small screens. */
  dateShort: string
  title: string
  role?: string
  achievement?: string
  location?: string
  categories: TimelineCategory[]
  description: string
  /** Extra labelled facts, e.g. credential or expected graduation. */
  meta?: TimelineMeta[]
  media?: TimelineMedia
  links?: TimelineLink[]
  /** Known, verified supporting details. */
  details?: string[]
}

export const timeline: TimelineEntry[] = [
  {
    id: 'tedx',
    date: 'January 2019',
    dateShort: "Jan '19",
    title: 'TEDx Speaker',
    role: 'Speaker',
    location: 'New London, Connecticut',
    categories: ['Leadership'],
    description:
      'Moustapha delivered a TEDx presentation in New London, gaining early experience with public speaking and communicating ideas to a live audience.',
    media: {
      kind: 'video',
      filename: 'tedx-talk',
      alt: 'Moustapha Gueye speaking at the microphone on the TEDxYouth@NewLondon stage, with his name on the screen behind him',
      caption: 'TEDx presentation',
      src: media.tedxTalk,
      ratio: '16 / 9',
    },
    links: [{ href: links.tedxTalk, label: 'Watch Presentation' }],
    details: ['TEDxYouth@NewLondon'],
  },
  {
    id: 'football',
    date: 'August 2021 – December 2024',
    dateShort: "'21–'24",
    title: 'Football',
    role: 'Cornerback',
    location: 'Wallingford, Connecticut',
    categories: ['Athletics'],
    description:
      'Moustapha competed as a cornerback for several seasons, developing discipline, resilience, teamwork, and the ability to perform under pressure.',
    meta: [{ label: 'Position', value: 'Cornerback' }],
    media: {
      kind: 'image',
      filename: 'football',
      alt: 'Moustapha Gueye lined up at cornerback in a white and navy uniform, facing a receiver during a game',
      caption: 'Football photography',
      src: media.football,
      ratio: '3 / 2',
      focalPoint: '30% 18%',
    },
  },
  {
    id: 'mystical-math',
    date: 'March 2022',
    dateShort: "Mar '22",
    title: 'Mystical Math',
    role: 'Member',
    location: 'Egypt',
    categories: ['Education', 'Travel'],
    description:
      'Moustapha participated in Mystical Math in Egypt as an international educational experience.',
    media: {
      kind: 'image',
      filename: 'mystical-math',
      alt: 'The Mystical Math group standing in the desert with the Giza pyramids behind them',
      caption: 'Program photography',
      src: media.mysticalMath,
      ratio: '3 / 2',
      focalPoint: 'center 38%',
    },
  },
  {
    id: 'choate',
    date: 'June 2025',
    dateShort: "Jun '25",
    title: 'Choate Rosemary Hall',
    achievement: 'High School Diploma',
    location: 'Wallingford, Connecticut',
    categories: ['Education'],
    description:
      'Moustapha graduated from Choate Rosemary Hall, where he participated in academics, athletics, student leadership, and the Icahn Scholars program.',
    meta: [{ label: 'Credential', value: 'High School Diploma' }],
    media: {
      kind: 'image',
      filename: 'choate-crest',
      alt: 'The Choate Rosemary Hall coat of arms, with the motto Fidelitas et Integritas',
      caption: 'Choate Rosemary Hall',
      src: media.choateCrest,
      ratio: '16 / 9',
      fit: 'contain',
      tone: 'dark',
    },
    details: ['Icahn Scholars program'],
  },
  {
    id: 'mous-apps',
    date: 'June 2025 – Present',
    dateShort: "Jun '25 –",
    title: 'Mous Apps LLC',
    role: 'Founder',
    categories: ['Business', 'Technology'],
    description:
      'Moustapha founded Mous Apps LLC, a software company that develops original applications and provides freelance app-development services. Its collection spans faith, fitness, AI-assisted learning, events, savings, and business tools, with the active apps ranging from 1,000 to 5,000+ users.',
    media: {
      kind: 'image',
      filename: 'mous-apps-site',
      alt: 'The mousapps.com collection page listing the Hudā, Plates, Genius, Samba, Stackd and Styld apps',
      caption: 'mousapps.com',
      src: media.mousAppsSite,
      ratio: '16 / 9',
    },
    links: [{ href: links.mousApps, label: 'Visit Website' }],
    details: [
      'Products: Hudā, Samba, Genius, Plates, Styld, Stackd',
      'Freelance app-development services',
    ],
  },
  {
    id: 'futtuwa-retreat',
    date: 'July – August 2025',
    dateShort: "Jul '25",
    title: 'Futtuwa Retreat',
    role: 'Member',
    location: 'Granada, Spain',
    categories: ['Personal Development', 'Travel'],
    description:
      'Moustapha participated in the Futtuwa Retreat in Granada, Spain, as a personal, cultural, and spiritual development experience.',
    media: {
      kind: 'image',
      filename: 'futtuwa-retreat',
      alt: 'Retreat participants walking a dirt path through an olive grove in the hills outside Granada, Spain',
      caption: 'Retreat photography',
      src: media.futtuwaRetreat,
      ratio: '3 / 2',
      focalPoint: 'center 55%',
    },
  },
  {
    id: 'hill-web-works',
    date: 'August 2025 – Present',
    dateShort: "Aug '25 –",
    title: 'Hill Web Works',
    role: 'Co-founder',
    categories: ['Business', 'Technology'],
    description:
      'Moustapha co-founded Hill Web Works, a digital-solutions company that develops websites, backend systems, and business-automation tools for companies across the United States.',
    media: {
      kind: 'image',
      filename: 'hill-web-works-site',
      alt: 'The hillwebworks.com homepage, headlined “Scale Your Brand”',
      caption: 'hillwebworks.com',
      src: media.hillWebWorksSite,
      ratio: '16 / 9',
    },
    links: [{ href: links.hillWebWorks, label: 'Visit Website' }],
    details: [
      'Co-founded with Pearson Hill',
      'Websites, backend systems, paid advertising, and automation',
    ],
  },
  {
    id: 'synchrony-case-competition',
    date: 'April 2026',
    dateShort: "Apr '26",
    title: 'Synchrony Bank Case Competition',
    achievement: 'Second Place',
    location: 'Stamford, Connecticut',
    categories: ['Professional Development'],
    description:
      'Moustapha and his team earned second place in the Synchrony Bank Case Competition by developing and presenting a solution to a business challenge.',
    meta: [{ label: 'Achievement', value: 'Second Place' }],
    media: {
      kind: 'image',
      filename: 'synchrony-deck',
      alt: 'Title slide of the Synchrony Credit Lifestyle Ecosystem presentation, listing Moustapha Gueye among the presenters',
      caption: 'Presentation preview',
      src: media.synchronyDeck,
      ratio: '16 / 9',
    },
    links: [{ href: links.synchronyDeck, label: 'View Presentation' }],
  },
  {
    id: 'bclc-brazil',
    date: 'May 2026',
    dateShort: "May '26",
    title: 'BCLC Brazil Business Immersion',
    role: 'Member',
    achievement: 'Case Competition Winner',
    location: 'São Paulo and Rio de Janeiro, Brazil',
    categories: ['Professional Development', 'Travel'],
    description:
      'Moustapha participated in an international business immersion in São Paulo and Rio de Janeiro. His team won the program’s case competition for Profile.',
    meta: [
      { label: 'Achievement', value: 'Won the case competition' },
      { label: 'Company', value: 'Profile' },
    ],
    media: {
      kind: 'image',
      filename: 'brazil-immersion',
      alt: 'The BCLC Brazil immersion cohort holding a University of Connecticut Summer Business Connection banner alongside students in São Paulo',
      caption: 'Immersion photography',
      src: media.brazilImmersion,
      ratio: '3 / 2',
      focalPoint: 'center 42%',
    },
    details: ['Won the case competition for Profile'],
  },
  {
    id: 'nyu',
    date: '2026 – Present',
    dateShort: "'26 –",
    title: 'New York University',
    location: 'New York, New York',
    categories: ['Education'],
    description:
      'Moustapha currently studies Computer and Data Science at New York University, where he is also minoring in Mathematics. His primary interests include quantitative development, mathematics, software engineering, data, and building technology products.',
    meta: [
      { label: 'Program', value: 'Computer and Data Science' },
      { label: 'Minor', value: 'Mathematics' },
      { label: 'Expected Graduation', value: 'May 2029' },
    ],
    media: {
      kind: 'image',
      filename: 'nyu-logo',
      alt: 'The New York University torch logo',
      caption: 'New York University',
      src: media.nyuLogo,
      ratio: '16 / 9',
      fit: 'contain',
      tone: 'dark',
    },
  },
]
