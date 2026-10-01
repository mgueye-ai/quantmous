import { media } from '../lib/media'

/** Content for the "What I'm Building Toward" section. */

export const quantFocus = {
  title: 'Quantitative Development',
  eyebrow: 'Career Goal',
  /** Shown as a small credential line directly under the panel title. */
  study: 'New York University — Computer and Data Science, minoring in Mathematics',
  description:
    'Moustapha is combining computer science, data, mathematics, and software development to prepare for a career in quantitative development. Right now that looks less like a finished resume line and more like a compiler, a problem set, and another LeetCode tab.',
  /** Framing note so the goal is never mistaken for a current job title. */
  clarification:
    'He is not a practicing quantitative developer. He is a Computer and Data Science student doing the unglamorous part first — the foundation.',
  areas: [
    'C++',
    'Python',
    'Data structures and algorithms',
    'Mathematics',
    'Probability and statistics',
    'Software engineering',
    'Performance-focused systems',
    'Financial-market technology',
  ],
  now: [
    {
      title: 'First large C++ project',
      status: 'In progress',
      text: 'Currently working on his first big C++ project. It is not published yet, so it stays unnamed here until it can stand on its own.',
    },
    {
      title: 'LeetCode',
      status: 'Daily',
      text: 'Grinding LeetCode like it personally challenged him. Data structures, algorithms, and the occasional problem that looks friendly until the constraints arrive.',
    },
  ],
} as const

export const ironmanFocus = {
  title: 'Ironman Journey',
  eyebrow: 'Endurance Goal',
  description:
    'Moustapha is training across swimming, cycling, and running to become an Ironman before turning 21, with a stretch goal of finishing under 10 hours. The weather is not expected to cooperate.',
} as const

export interface RaceLeg {
  id: 'swim' | 'bike' | 'run'
  name: string
  distanceKm: number
  distanceMi: number
  /** Moustapha's goal time for the leg, in seconds. */
  goalSeconds: number
}

/** Official full-distance IRONMAN legs, paired with Moustapha's goal splits. */
export const raceLegs: RaceLeg[] = [
  {
    id: 'swim',
    name: 'Swim',
    distanceKm: 3.86,
    distanceMi: 2.4,
    goalSeconds: 50 * 60,
  },
  {
    id: 'bike',
    name: 'Bike',
    distanceKm: 180.25,
    distanceMi: 112,
    goalSeconds: 4 * 60 * 60 + 55 * 60,
  },
  {
    id: 'run',
    name: 'Run',
    distanceKm: 42.2,
    distanceMi: 26.2,
    goalSeconds: 3 * 60 * 60 + 55 * 60,
  },
]

/**
 * The target race.
 *
 * `targetDate` is provisional: IRONMAN had not published a 2027 Cozumel date
 * when this page was built, so it is set to the Sunday before US Thanksgiving,
 * which is when the race has historically been held. Update this single value
 * once the official date is announced and the countdown follows.
 */
export const race = {
  series: 'IRONMAN',
  event: 'Cozumel',
  location: 'Cozumel, Mexico',
  window: 'November 2027',
  targetDate: '2027-11-21T07:00:00-05:00',
  logoSrc: media.ironmanWordmark,
  logoAlt: 'IRONMAN',
  /** The stretch goal the splits are measured against, in seconds. */
  stretchGoalSeconds: 10 * 60 * 60,
} as const
