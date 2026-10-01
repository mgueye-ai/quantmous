import { links } from './site'

export interface SkillItem {
  label: string
  note?: string
}

export interface SkillGroup {
  id: string
  title: string
  items: SkillItem[]
}

export interface FeaturedFocus {
  id: string
  index: string
  title: string
  text: string
  href?: string
  linkLabel?: string
  linkAria?: string
}

export const skillsIntro = {
  title: 'What I Build. What I’m Chasing.',
  lead: 'A mix of technology, entrepreneurship, endurance, and interests that keep me moving.',
} as const

export const featuredFocus: FeaturedFocus[] = [
  {
    id: 'founder',
    index: '01',
    title: 'Founder & Developer',
    text: 'Founded Mous Apps and independently built Hudā and Styld — products used by thousands of people.',
    href: links.mousApps,
    linkLabel: 'mousapps.com',
    linkAria: 'Visit Mous Apps',
  },
  {
    id: 'ironman',
    index: '02',
    title: 'Ironman in Training',
    text: 'Training across swimming, cycling, and running with the goal of completing an Ironman before turning 21.',
    href: links.strava,
    linkLabel: 'Training on Strava',
    linkAria: "Follow Moustapha Gueye's Ironman training on Strava",
  },
  {
    id: 'study',
    index: '03',
    title: 'Computer & Data Science',
    text: 'Studying Computer and Data Science at NYU, with a growing focus on mathematics and quantitative development.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'technical',
    title: 'Technical',
    items: [
      { label: 'Python' },
      { label: 'C++' },
      { label: 'JavaScript' },
      { label: 'Swift' },
      { label: 'HTML' },
      { label: 'CSS' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [{ label: 'Cursor' }, { label: 'n8n' }],
  },
  {
    id: 'languages',
    title: 'Languages',
    items: [
      { label: 'Wolof', note: 'Fluent' },
      { label: 'Arabic', note: 'Intermediate' },
      { label: 'French', note: 'Conversational' },
    ],
  },
  {
    id: 'music',
    title: 'Music',
    items: [{ label: 'Alto Saxophone' }, { label: 'Clarinet' }, { label: 'Ukulele' }],
  },
  {
    id: 'athletic-background',
    title: 'Athletic Background',
    items: [
      { label: 'Football' },
      { label: 'Wrestling' },
      { label: 'Powerlifting' },
      { label: 'Basketball' },
    ],
  },
  {
    id: 'current-training',
    title: 'Current Training',
    items: [{ label: 'Swimming' }, { label: 'Cycling' }, { label: 'Running' }],
  },
  {
    id: 'interests',
    title: 'Interests',
    items: [
      { label: 'Quantitative development' },
      { label: 'Software engineering' },
      { label: 'Data-driven systems' },
      { label: 'Entrepreneurship' },
      { label: 'Financial markets' },
      { label: 'Qur’an memorization' },
      { label: 'Travel' },
    ],
  },
]
