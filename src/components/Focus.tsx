import { HafizPanel } from './HafizPanel'
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

      <section className="stack stack--hafiz" aria-label="Becoming a Hafiz">
        <div className="stack__inner shell">
          <HafizPanel />
        </div>
      </section>
    </>
  )
}
