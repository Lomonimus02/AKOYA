import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { photos } from '../../data/images'
import { cn } from '../../lib/cn'

const panes = [
  {
    src: photos.bedroomMain,
    alt: 'Primary suite with panoramic coastal light',
    position: '50% 55%',
    title: 'Primary suite',
    body: 'White rooms, open horizons — three bedrooms opened to ocean, city and sky.',
  },
  {
    src: photos.bedroomOcean,
    alt: 'King bedroom looking out to ocean and coastline',
    position: '50% 42%',
    title: 'Ocean light',
    body: 'A king suite looking out to the Atlantic and the coastline.',
  },
  {
    src: photos.bedroomCity,
    alt: 'King bedroom with city skyline beyond the glass',
    position: '50% 42%',
    title: 'City light',
    body: 'A king suite with Miami beyond the glass.',
  },
] as const

const PHOTO_BEATS = 3
const STEP_SLACK_PX = 16

function stepFromScroll(afterUnlock: number, beat: number, current: number) {
  const raw = afterUnlock <= 0 ? 0 : Math.min(2, Math.floor(afterUnlock / beat))
  if (raw === current) return current
  if (Math.abs(raw - current) > 1) return raw
  const edge = raw > current ? raw * beat : current * beat
  if (raw > current) return afterUnlock > edge + STEP_SLACK_PX ? raw : current
  return afterUnlock < edge - STEP_SLACK_PX ? raw : current
}

function CollagePane({
  className,
  src,
  alt,
  position,
  title,
  body,
  open,
  alwaysShow,
  priority = false,
}: {
  className: string
  src: string
  alt: string
  position: string
  title: string
  body: string
  open: boolean
  alwaysShow: boolean
  priority?: boolean
}) {
  return (
    <div className={cn('retreat-pane', className, open && 'is-open')}>
      <img
        src={src}
        alt={alt}
        className="retreat-shot"
        style={{ objectPosition: position }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <div className="retreat-veil" />
      <div
        className={cn('retreat-copy', (open || alwaysShow) && 'is-visible')}
      >
        <p className="text-[0.68rem] tracking-[0.28em] text-white/90 uppercase [text-shadow:0_8px_28px_rgba(20,52,58,0.55)]">
          {title}
        </p>
        <p className="mt-3 font-display text-[clamp(1.2rem,2.4vw,2rem)] leading-[1.2] font-light text-white [text-shadow:0_10px_36px_rgba(20,52,58,0.5)]">
          {body}
        </p>
      </div>
    </div>
  )
}

export function RetreatBedrooms() {
  const reduce = useReducedMotion()
  const pin = !reduce
  const trackRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!pin) return
    const track = trackRef.current
    if (!track) return

    const sync = () => {
      const stack = track.closest('.discover-retreat-stack')
      const discover = document.getElementById('discover')
      const viewport = window.innerHeight
      const extra =
        discover?.classList.contains('discover-pin')
          ? Math.max(0, discover.offsetHeight - viewport)
          : 0
      const beat = Math.max(1, track.offsetHeight - viewport) / PHOTO_BEATS
      const origin = stack ?? track
      const scrolled = -origin.getBoundingClientRect().top
      const next = stepFromScroll(scrolled - extra, beat, stepRef.current)
      if (next === stepRef.current) return
      stepRef.current = next
      setStep(next)
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [pin])

  return (
    <section
      id="retreat"
      ref={trackRef}
      className={cn(
        'retreat-wash scroll-mt-24',
        pin && 'h-[400vh]',
      )}
    >
      <div
        className={
          pin
            ? 'sticky top-0 h-dvh overflow-hidden'
            : 'h-[min(86vh,720px)] min-h-[28rem] md:h-[min(92vh,1080px)] md:min-h-[36rem]'
        }
      >
        <div
          className="retreat-stage"
          data-step={pin ? String(step) : undefined}
        >
          <CollagePane
            className="retreat-hero"
            src={panes[0].src}
            alt={panes[0].alt}
            position={panes[0].position}
            title={panes[0].title}
            body={panes[0].body}
            open={pin && step === 0}
            alwaysShow={!pin}
            priority
          />
          <div className="retreat-pair">
            <CollagePane
              className="retreat-view"
              src={panes[1].src}
              alt={panes[1].alt}
              position={panes[1].position}
              title={panes[1].title}
              body={panes[1].body}
              open={pin && step === 1}
              alwaysShow={!pin}
            />
            <CollagePane
              className="retreat-view"
              src={panes[2].src}
              alt={panes[2].alt}
              position={panes[2].position}
              title={panes[2].title}
              body={panes[2].body}
              open={pin && step === 2}
              alwaysShow={!pin}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
