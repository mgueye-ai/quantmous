import { useState } from 'react'
import { ImageIcon, PlayIcon } from './Icons'

interface MediaFrameProps {
  kind?: 'image' | 'video'
  /** Unused in production; kept so older call sites still type-check. */
  filename?: string
  alt: string
  caption: string
  /** Bundled image URL. Falls back to the placeholder. */
  src?: string
  ratio?: string
  className?: string
  /** Shown instead of the generic icon, e.g. initials on the portrait frame. */
  monogram?: string
  /** Drops the caption for small thumbnail slots. */
  compact?: boolean
  /** Loads eagerly — use for above-the-fold images such as the hero portrait. */
  priority?: boolean
  /**
   * `object-position` for the image. Portrait source photos need the crop
   * pulled upward so faces survive a landscape frame.
   */
  focalPoint?: string
  /** Logos sit inside the frame instead of being cropped. */
  fit?: 'cover' | 'contain'
  tone?: 'dark'
}

/**
 * Renders a real image when one exists and a deliberate, labelled placeholder
 * when it does not, so the layout is identical before and after assets land.
 */
export function MediaFrame({
  kind = 'image',
  alt,
  caption,
  src,
  ratio = '3 / 2',
  className,
  monogram,
  compact = false,
  priority = false,
  focalPoint,
  fit = 'cover',
  tone,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure
      className={[
        'media',
        compact ? 'media--compact' : null,
        fit === 'contain' ? 'media--contain' : null,
        tone === 'dark' ? 'media--dark' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio: ratio }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          style={focalPoint ? { objectPosition: focalPoint } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="media__placeholder">
          <span
            className={`media__mark${monogram ? ' media__mark--monogram' : ''}`}
            aria-hidden="true"
          >
            {monogram ?? (kind === 'video' ? <PlayIcon size={24} /> : <ImageIcon size={24} />)}
          </span>
          {compact ? (
            <span className="visually-hidden">Placeholder for {caption}</span>
          ) : (
            <>
              <span className="media__caption">{caption}</span>
              <span className="media__badge">Placeholder</span>
            </>
          )}
        </div>
      )}
    </figure>
  )
}
