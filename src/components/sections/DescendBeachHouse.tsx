import { photos } from '../../data/images'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const rooms = [
  { title: 'Living', body: 'A room of your own below' },
  { title: 'Kitchenette', body: 'Coffee after the swim' },
  { title: 'Bathroom', body: 'Sand, then water, then rest' },
  { title: 'Television', body: 'Shade when the light is high' },
  { title: 'Wi-Fi', body: 'The sky residence, continued' },
] as const

export function DescendBeachHouse() {
  return (
    <section id="descend" className="descend-wash scroll-mt-24">
      <PagePad className="pt-32 pb-10 md:pt-44 md:pb-14 lg:pt-56 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <SectionCopy
              kicker="0"
              label="Descend"
              title="Your private Beach House at sea level"
              body="A separate cabana beside the pool and beach — bathroom, living area, kitchenette, television and Wi-Fi. Your residence in the sky. Your beach house below."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="descend-span">
              <div>
                <p className="text-[0.62rem] tracking-[0.22em] text-lagoon uppercase">
                  Sky
                </p>
                <p className="mt-1.5 font-display text-[2.35rem] leading-none font-light tracking-[-0.04em] text-ink md:text-[2.75rem]">
                  48
                </p>
              </div>
              <div className="descend-span-line" aria-hidden="true" />
              <div className="text-right">
                <p className="text-[0.62rem] tracking-[0.22em] text-lagoon uppercase">
                  Sea
                </p>
                <p className="mt-1.5 font-display text-[2.35rem] leading-none font-light tracking-[-0.04em] text-ink md:text-[2.75rem]">
                  0
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </PagePad>

      <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-20">
        <Reveal>
          <figure>
            <div className="descend-view relative">
              <img
                src={photos.poolBeach}
                alt="Pool and palms at sea level, the Atlantic beyond"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{ objectPosition: '50% 48%' }}
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent px-5 pt-16 pb-5 md:px-8 md:pb-6">
                <p className="text-[0.62rem] tracking-[0.22em] text-white uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)]">
                  Two addresses · the sky and the sand
                </p>
              </div>
            </div>
            <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
              Private Beach House · sea level
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <PagePad className="pt-6 pb-24 md:pt-10 md:pb-32">
        <ul className="grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:pt-12">
          {rooms.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={0.06 * i}>
                <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
                  {item.title}
                </p>
                <p className="mt-2 font-display text-[1.35rem] leading-snug font-light text-ink md:text-[1.5rem]">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
