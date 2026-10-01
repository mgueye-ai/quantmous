/**
 * Hafiz progress.
 *
 * `passages` is the only list that should be edited when new ayahs are
 * committed. The completion bar is derived from it, so the percentage cannot
 * drift from what is written here.
 *
 * `knownAyahs` is never estimated. Partial surahs use the count Moustapha
 * listed. Juz 1 uses the standard Uthmani length of that juz.
 */

/** Standard Uthmani count of the 114 surahs, not counting Bismillah as a verse except in Al-Fatiha. */
export const QURAN_AYAH_COUNT = 6236

export interface MemorizedPassage {
  id: string
  /** Name as it should appear on the page. */
  name: string
  /** Ayahs currently memorized. */
  knownAyahs: number
  /** Full length of the unit, when only part of it is memorized. */
  ofAyahs?: number
}

export const hafiz = {
  title: 'Becoming a Hafiz',
  eyebrow: 'Qur’an',
  description:
    'Moustapha is memorizing the Qur’an with the goal of becoming a Hafiz before graduating from college. He works toward about five ayahs a day and updates this record about once a week as new ayahs are committed to memory.',
  updateNote: 'Updated about once a week. Only committed ayahs are counted — nothing is estimated or projected.',
  media: {
    filename: 'hafiz-makkah',
    src: '/images/hafiz-makkah.webp',
    alt: 'Moustapha Gueye standing before the Kaaba in Masjid al-Haram, Makkah',
    caption: 'Makkah',
    ratio: '1 / 1' as const,
    focalPoint: '50% 62%',
  },
} as const

/**
 * What is currently memorized.
 *
 * Juz 1 is Al-Fatiha (7) plus Al-Baqarah 1–141 (141) = 148 ayahs.
 * Partial surah counts are exactly as listed; full short surahs use their
 * official lengths.
 */
export const memorizedPassages: MemorizedPassage[] = [
  {
    id: 'juz-1',
    name: 'Juz 1',
    knownAyahs: 148,
    ofAyahs: 148,
  },
  {
    id: 'al-furqan',
    name: 'Al-Furqan',
    knownAyahs: 10,
    ofAyahs: 77,
  },
  {
    id: 'al-kahf',
    name: 'Al-Kahf',
    knownAyahs: 30,
    ofAyahs: 110,
  },
  {
    id: 'an-nas',
    name: 'An-Nas',
    knownAyahs: 6,
    ofAyahs: 6,
  },
  {
    id: 'al-falaq',
    name: 'Al-Falaq',
    knownAyahs: 5,
    ofAyahs: 5,
  },
  {
    id: 'al-ikhlas',
    name: 'Al-Ikhlas',
    knownAyahs: 4,
    ofAyahs: 4,
  },
  {
    id: 'al-masad',
    name: 'Al-Masad',
    knownAyahs: 5,
    ofAyahs: 5,
  },
  {
    id: 'an-nasr',
    name: 'An-Nasr',
    knownAyahs: 3,
    ofAyahs: 3,
  },
  {
    id: 'al-kafirun',
    name: 'Al-Kafirun',
    knownAyahs: 6,
    ofAyahs: 6,
  },
  {
    id: 'al-kawthar',
    name: 'Al-Kawthar',
    knownAyahs: 3,
    ofAyahs: 3,
  },
  {
    id: 'nuh',
    name: 'Nuh',
    knownAyahs: 10,
    ofAyahs: 28,
  },
]

export const knownAyahs = memorizedPassages.reduce(
  (total, passage) => total + passage.knownAyahs,
  0,
)

export const hafizProgress = knownAyahs / QURAN_AYAH_COUNT

export function passageLabel(passage: MemorizedPassage): string {
  if (passage.ofAyahs && passage.knownAyahs < passage.ofAyahs) {
    return `${passage.knownAyahs} of ${passage.ofAyahs} ayahs`
  }
  if (passage.id === 'juz-1') {
    return 'Al-Fatiha and Al-Baqarah 1–141'
  }
  return `${passage.knownAyahs} ayahs`
}
