import { useEffect, useRef, useState } from 'react'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { cn } from '../../lib/cn'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

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
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(0)

  const intend = (index: number | null) => {
    if (intent.current) clearTimeout(intent.current)
    intent.current = setTimeout(
      () => setOpen(index ?? 0),
      index === null ? 180 : 55,
    )
  }

  useEffect(() => {
    return () => {
      if (intent.current) clearTimeout(intent.current)
    }
  }, [])

  return (
    <section id="indulge" className="indulge-wash scroll-mt-24">
      <PagePad className="pt-28 pb-10 md:pt-40 md:pb-12 lg:pt-52 lg:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,24rem)] lg:gap-16">
          <Reveal>
            <SectionLabel light>Indulge</SectionLabel>
            <h2 className="font-display font-light text-ink">
              <span className="block max-w-xl text-[clamp(2.05rem,4.2vw,3.35rem)] leading-[1.08]">
                A residence with a
                <br />
                resort at its
              </span>
              <span className="indulge-door-word mt-1 block tracking-[-0.055em] text-lagoon">
                door
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[1.05rem] leading-[1.8] text-ink/75 lg:mb-3 lg:border-l lg:border-lagoon/25 lg:pl-6">
              Private beach access, pool, wellness, tennis and outdoor living —
              the ocean and the amenities of Akoya at the door of the residence.
            </p>
          </Reveal>
        </div>
      </PagePad>

      <div className="px-6 pb-24 md:px-12 md:pr-28 md:pb-32 lg:px-20 lg:pr-32">
        <Reveal>
          <figure>
            <div
              className="indulge-arcade"
              onMouseLeave={() => {
                if (fine) intend(null)
              }}
            >
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
                    onMouseEnter={() => {
                      if (fine) intend(i)
                    }}
                    onFocus={() => setOpen(i)}
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
            <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
              The grounds · at the door
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
