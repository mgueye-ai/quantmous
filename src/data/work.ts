import { links } from './site'

/**
 * Selected Work.
 *
 * App names, domains, user counts and status labels below are taken from
 * mousapps.com, and the Hill Web Works details from hillwebworks.com, so the
 * site stays consistent with what those companies publish about themselves.
 */

export interface WorkProduct {
  name: string
  /** One-line positioning, in the product's own terms. */
  tagline: string
  /** Short third-person description. */
  description: string
  href: string
  /** Domain shown under the preview. */
  domain: string
  /** Preview image in `public/images/`. */
  preview: string
  /** Reach as published on mousapps.com, when there is a figure. */
  reach?: string
  status: 'Live' | 'In development'
}

export interface WorkProject {
  id: string
  name: string
  role: string
  summary: string
  /** Verified facts only. */
  facts: string[]
  media: { filename: string; alt: string; caption: string; src?: string }
  href: string
  linkLabel: string
  products?: WorkProduct[]
  capabilities?: string[]
  /** Client work published on the company's own site. */
  clients?: { name: string; sector: string }[]
}

export const projects: WorkProject[] = [
  {
    id: 'mous-apps',
    name: 'Mous Apps',
    role: 'Founder',
    summary:
      'Mous Apps LLC is a software company founded by Moustapha that develops original applications and provides freelance app-development services. The collection spans faith, fitness, AI-assisted learning, savings, events, and business tools, and he owns, builds, and maintains every product in it.',
    facts: [
      'Founded by Moustapha Gueye',
      'Six products across faith, fitness, learning, events, savings and business',
      'Active apps range from 1K to 5K+ users',
    ],
    media: {
      filename: 'mous-apps-site',
      alt: 'The Mous Apps collection page listing every app Moustapha has built',
      caption: 'mousapps.com',
      src: '/images/mous-apps-site.jpg',
    },
    href: links.mousApps,
    linkLabel: 'Visit mousapps.com',
    products: [
      {
        name: 'Hudā',
        tagline: 'The app for Muslims',
        description:
          'Brings prayer tracking, Islamic lessons, a Quran and hadith library, and home-screen widgets into a single app.',
        href: 'https://huda-app.com',
        domain: 'huda-app.com',
        preview: '/images/app-huda.jpg',
        reach: '3K+ users',
        status: 'Live',
      },
      {
        name: 'Samba',
        tagline: 'Event ticketing across Africa',
        description:
          'A ticketing platform for concerts, festivals, and cultural events, with a dashboard for organisers to sell tickets and manage check-ins.',
        href: 'https://samba-site-woad.vercel.app',
        domain: 'samba-site-woad.vercel.app',
        preview: '/images/app-samba.jpg',
        reach: '5K+ users',
        status: 'Live',
      },
      {
        name: 'Genius',
        tagline: 'Learning with AI',
        description:
          'An academic study assistant built around a student’s actual classes, with AI help and a built-in document editor.',
        href: 'https://genius-site.com',
        domain: 'genius-site.com',
        preview: '/images/app-genius.jpg',
        reach: '1.5K+ users',
        status: 'Live',
      },
      {
        name: 'Plates',
        tagline: 'Calorie and gym tracker',
        description:
          'Combines calorie logging, workout planning, and progress tracking, including barcode and photo food scanning.',
        href: 'https://plates-site.com',
        domain: 'plates-site.com',
        preview: '/images/app-plates.jpg',
        reach: '1K+ users',
        status: 'Live',
      },
      {
        name: 'Styld',
        tagline: 'CRM for beauty professionals',
        description:
          'A booking and client-management app for stylists, braiders, barbers, and lash and makeup artists, with a hosted booking site for each pro.',
        href: 'https://styldd.com',
        domain: 'styldd.com',
        preview: '/images/app-styld.jpg',
        status: 'Live',
      },
      {
        name: 'Stackd',
        tagline: 'A savings jar, rebuilt',
        description:
          'A connected savings device and companion app: deposit cash or tap a card, and an LED bar on the device fills as the goal gets closer.',
        href: 'https://toostackd.com',
        domain: 'toostackd.com',
        preview: '/images/app-stackd.jpg',
        status: 'In development',
      },
    ],
  },
  {
    id: 'hill-web-works',
    name: 'Hill Web Works',
    role: 'Co-founder',
    summary:
      'Hill Web Works is a brand-scaling agency Moustapha co-founded with Pearson Hill. The team builds high-converting websites, backend systems, paid advertising, and business automation for companies across the United States.',
    facts: [
      'Co-founded with Pearson Hill',
      'Serves companies across the United States',
      '80+ brands scaled, as published on hillwebworks.com',
    ],
    media: {
      filename: 'hill-web-works-site',
      alt: 'The Hill Web Works homepage, showing the agency’s brand-scaling services',
      caption: 'hillwebworks.com',
      src: '/images/hill-web-works-site.jpg',
    },
    href: links.hillWebWorks,
    linkLabel: 'Visit hillwebworks.com',
    capabilities: ['Website development', 'Backend systems', 'Paid advertising', 'Automation'],
    clients: [
      { name: 'ATL Property Perfections', sector: 'Home services' },
      { name: 'Greater Denver Auto Detailing', sector: 'Auto detailing' },
      { name: 'Legacy Iron Art', sector: 'Metal art and fabrication' },
      { name: 'Gadget Quick Fix', sector: 'Electronics repair' },
      { name: 'Limestone Salt', sector: 'E-commerce' },
      { name: 'A Vision', sector: 'Flooring and remodeling' },
    ],
  },
]
