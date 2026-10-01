import { Analytics } from '@vercel/analytics/react'
import { Contact } from './components/Contact'
import { Focus } from './components/Focus'
import { Footer } from './components/Footer'
import { HafizPanel } from './components/HafizPanel'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Resume } from './components/Resume'
import { Skills } from './components/Skills'
import { Timeline } from './components/Timeline'
import { Work } from './components/Work'
import { navItems } from './data/site'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSectionFocus } from './hooks/useSectionFocus'

/** Stable identity keeps the section observer from re-subscribing on render. */
const SECTION_IDS = navItems.map((item) => item.id)

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const activeId = useSectionFocus(SECTION_IDS, !prefersReducedMotion)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav activeId={activeId} />

      <main id="main">
        <Hero />
        <Focus />
        <Timeline />
        <section className="stack stack--hafiz" aria-label="Becoming a Hafiz">
          <div className="stack__inner shell">
            <HafizPanel />
          </div>
        </section>
        <Work />
        <Skills />
        <Resume />
        <Contact />
      </main>

      <Footer />
      <Analytics />
    </>
  )
}
