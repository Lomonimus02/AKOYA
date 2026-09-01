import { photos } from '../../data/images'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const rooms = [
  { name: 'Office', note: 'Wrap-around glass' },
  { name: 'Sky Terrace', note: 'Among the crown' },
  { name: 'This floor', note: 'Lounge, wet bar, bathroom' },
] as const

export function AscendSky() {
  return (
    <section id="ascend" className="ascend-wash scroll-mt-24">
      <div className="flex flex-col lg:grid lg:min-h-dvh lg:grid-cols-[minmax(20rem,24rem)_1fr]">
        <figure className="ascend-office relative order-1 lg:order-2">
          <img
            src={photos.office}
            alt="Private glass office with aviator desk, sunset over Biscayne Bay"
            className="absolute inset-0 h-full w-full max-w-none object-cover"
            style={{ objectPosition: '54% 42%' }}
            loading="lazy"
            decoding="async"
          />
          <div
            className="ascend-arrive pointer-events-none absolute inset-x-0 top-0 z-[3] h-28 md:h-36 lg:h-40"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-6 left-6 z-10 hidden text-[0.68rem] tracking-[0.22em] text-white/90 uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)] lg:block lg:left-8">
            Inside · the glass office
          </figcaption>
        </figure>

        <div className="ascend-panel relative z-10 order-2 -mt-36 flex flex-col justify-between px-6 pt-28 pb-16 md:px-12 md:-mt-44 md:pt-32 md:pb-20 lg:order-1 lg:mt-0 lg:h-full lg:px-10 lg:pt-36 lg:pb-24 xl:px-12">
          <Reveal>
            <p className="font-display text-[6.75rem] leading-[0.78] font-light tracking-[-0.06em] text-white/40 md:text-[8rem] lg:text-[8.5rem]">
              48
            </p>
            <SectionLabel className="mt-7">Ascend</SectionLabel>
            <h2 className="max-w-sm font-display text-[clamp(2.2rem,3.6vw,3.45rem)] leading-[1.08] font-light text-white">
              The last light
            </h2>
            <p className="mt-6 max-w-sm text-[1.05rem] leading-[1.8] text-white/78">
              Sunset in a glass office, then the door to your own Sky Terrace.
              Lounge, wet bar and bathroom — this floor alone.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 max-w-sm border-t border-white/12 lg:mt-0">
              {rooms.map((room) => (
                <li key={room.name} className="border-b border-white/10 py-3.5">
                  <p className="text-[0.62rem] tracking-[0.26em] text-aqua uppercase">
                    {room.name}
                  </p>
                  <p className="mt-1.5 font-display text-[1.2rem] leading-snug font-light text-white/90">
                    {room.note}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:min-h-[90vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,28rem)]">
        <figure className="ascend-terrace relative">
          <img
            src={photos.twilight}
            alt="Akoya's white triangular crown fins at dusk, seen from the Sky Terrace"
            className="absolute inset-0 h-full w-full max-w-none object-cover"
            style={{ objectPosition: '22% 36%' }}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute bottom-28 left-6 z-10 text-[0.68rem] tracking-[0.22em] text-white/90 uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)] md:bottom-32 md:left-8">
            Among the crown
          </figcaption>
        </figure>

        <div className="ascend-outside flex flex-col justify-end px-6 py-16 md:px-12 md:py-20 lg:justify-center lg:px-12 lg:py-24 xl:px-16">
          <Reveal>
            <p className="text-[0.72rem] font-medium tracking-[0.38em] text-lagoon uppercase">
              Outside
            </p>
            <h3 className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.08] font-light text-ink">
              The Sky Terrace
            </h3>
            <p className="mt-6 max-w-sm text-[1.05rem] leading-[1.8] text-ink/72">
              Private air among the white fins that crown Akoya.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
