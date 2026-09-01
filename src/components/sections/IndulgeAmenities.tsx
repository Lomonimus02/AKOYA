import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { cn } from '../../lib/cn'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const HOLD_MS = 4800

const grounds = [
  {
    src: photos.poolHigh,
    alt: 'Pool deck, palms and the ocean from above',
    name: 'Pool & ocean',
    note: 'The Atlantic at the edge of the deck',
    position: '48% 38%',
    phonePosition: '50% 32%',
  },
  {
    src: photos.aerialAmenities,
    alt: 'Amenity deck with tennis court and palm landscaping',
    name: 'Tennis & lawn',
    note: 'A court held in the palms',
    position: '68% 72%',
    phonePosition: '62% 68%',
  },
  {
    src: photos.terraceDining,
    alt: 'Dining beneath a timber canopy',
    name: 'Dining terrace',
    note: 'Shade, a grill, long afternoons',
    position: '50% 42%',
    phonePosition: '50% 40%',
  },
  {
    src: photos.squash,
    alt: 'Squash court through glass doors',
    name: 'Squash & wellness',
    note: 'Through the glass doors',
    position: '50% 48%',
    phonePosition: '50% 46%',
  },
] as const

export function IndulgeAmenities() {
  const phone = useMedia('(max-width: 767px)')
  const reduce = useReducedMotion()
  const arcadeRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(0)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  )

  useEffect(() => {
    const node = arcadeRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (reduce || !inView || !pageVisible) return
    const tick = window.setTimeout(() => {
      setOpen((index) => (index + 1) % grounds.length)
    }, HOLD_MS)
    return () => window.clearTimeout(tick)
  }, [reduce, inView, pageVisible, open])

  return (
    <section id="indulge" className="indulge-wash scroll-mt-24">
      <PagePad className="pt-32 pb-10 md:pt-44 md:pb-14 lg:pt-56 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <SectionCopy
              label="Indulge"
              title={
                <>
                  A residence with a resort at its{' '}
                  <span className="italic text-lagoon">door</span>
                </>
              }
              body="Private beach access, pool, wellness, tennis and outdoor living — the ocean and the amenities of Akoya at the door of the residence."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4.5rem,10vw,7rem)] leading-none font-light text-aqua/80"
            >
              04
            </p>
          </Reveal>
        </div>
      </PagePad>

      <figure className="indulge-stage">
        <div ref={arcadeRef} className="indulge-arcade">
          {grounds.map((door, i) => {
            const isOpen = open === i
            const grow = isOpen ? (phone ? 2.18 : 2.82) : phone ? 0.72 : 0.62

            return (
              <button
                key={door.src}
                type="button"
                aria-pressed={isOpen}
                aria-label={`${door.name}. ${door.note}`}
                className={cn('indulge-door touch-manipulation', isOpen && 'is-open')}
                style={{ flexGrow: grow }}
                onClick={() => setOpen(i)}
              >
                <img
                  src={door.src}
                  alt={door.alt}
                  className="absolute inset-0 h-full w-full max-w-none object-cover"
                  style={{
                    objectPosition: phone ? door.phonePosition : door.position,
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none',
                    isOpen ? 'bg-ink/10' : 'bg-ink/46',
                  )}
                />
                <div
                  className={cn(
                    'door-sill pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/62 via-ink/18 to-transparent px-5 pt-20 pb-5 md:px-7 md:pb-6',
                    isOpen ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <p className="text-[0.62rem] tracking-[0.26em] text-white uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)]">
                    {String(i + 1).padStart(2, '0')} · {door.name}
                  </p>
                  <p className="mt-2 max-w-sm text-left font-display text-[1.35rem] leading-snug font-light text-white [text-shadow:0_8px_28px_rgba(20,52,58,0.4)] md:text-[1.55rem]">
                    {door.note}
                  </p>
                </div>
                <div
                  className={cn(
                    'door-spine pointer-events-none absolute inset-0',
                    isOpen ? 'opacity-0' : 'opacity-100',
                  )}
                >
                  {phone ? (
                    <p className="absolute bottom-4 left-5 text-[0.62rem] tracking-[0.24em] text-white uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)]">
                      {String(i + 1).padStart(2, '0')} · {door.name}
                    </p>
                  ) : (
                    <p className="absolute bottom-7 left-5 origin-left text-[0.62rem] tracking-[0.28em] text-white uppercase [writing-mode:vertical-rl] rotate-180 [text-shadow:0_8px_24px_rgba(20,52,58,0.45)]">
                      {String(i + 1).padStart(2, '0')} · {door.name}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
        <figcaption className="indulge-caption px-6 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase md:px-12 lg:px-20">
          The grounds · at the door
        </figcaption>
      </figure>
    </section>
  )
}
