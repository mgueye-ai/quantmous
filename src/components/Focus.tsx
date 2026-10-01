import { IronmanPanel } from './IronmanPanel'
import { QuantPanel } from './QuantPanel'

export function Focus() {
  return (
    <>
      <section id="focus" className="stack stack--quant">
        <div className="stack__inner shell">
          <QuantPanel />
        </div>
      </section>

      <section className="stack stack--ironman" aria-label="Ironman Journey">
        <div className="stack__inner shell">
          <IronmanPanel />
        </div>
      </section>
    </>
  )
}
