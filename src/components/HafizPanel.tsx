import { hafiz, hafizProgress, knownAyahs, QURAN_AYAH_COUNT } from '../data/quran'
import { Reveal } from './Reveal'

const percentLabel = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
}).format(hafizProgress)

const ayahCount = new Intl.NumberFormat('en-US').format(knownAyahs)
const quranCount = new Intl.NumberFormat('en-US').format(QURAN_AYAH_COUNT)
const barWidth = `${(hafizProgress * 100).toFixed(2)}%`

export function HafizPanel() {
  return (
    <Reveal as="article" className="panel panel--hafiz">
      <div className="hafiz__head">
        <p className="eyebrow">{hafiz.eyebrow}</p>
        <h3 className="panel__title">{hafiz.title}</h3>
        <p className="prose panel__text">{hafiz.description}</p>
      </div>

      <div
        className="hafiz-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={QURAN_AYAH_COUNT}
        aria-valuenow={knownAyahs}
        aria-valuetext={`${ayahCount} of ${quranCount} ayahs memorized, ${percentLabel} of the Qur’an`}
        aria-label="Qur’an memorization progress"
      >
        <div className="hafiz-bar__head">
          <h4 className="panel__label">Qur’an completion</h4>
          <p className="hafiz-bar__value">{percentLabel}</p>
        </div>
        <div className="hafiz-bar__track">
          <div className="hafiz-bar__fill" style={{ width: barWidth }} />
        </div>
        <p className="hafiz-bar__count">
          {ayahCount} of {quranCount} ayahs
        </p>
        <p className="hafiz-bar__note">{hafiz.updateNote}</p>
      </div>
    </Reveal>
  )
}
