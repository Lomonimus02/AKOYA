import { floors } from '../../data/copy'
import { cn } from '../../lib/cn'
import { onHashClick } from '../../lib/scrollTo'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const skyStops = [...floors].reverse()

const rooms = [
  'Living area',
  'Kitchenette',
  'Bathroom',
  'Television',
  'Wi-Fi',
] as const

function WaveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 14"
      className={cn('w-[3.75rem] text-lagoon/45', className)}
      aria-hidden="true"
    >
      <path
        d="M0 8 Q9 2 18 8 T36 8 T54 8 T72 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      />
    </svg>
  )
}

export function DescendBeachHouse() {
  return (
    <section id="descend" className="descend-wash scroll-mt-24">
      <PagePad className="pt-32 md:pt-44 lg:pt-56">
        <Reveal>
          <SectionCopy
            label="Descend"
            title={
              <>
                Your private Beach House
                <br />
                at sea level
              </>
            }
            body="Your residence in the sky. Your beach house below."
          />
        </Reveal>
      </PagePad>

      <PagePad className="pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-28">
        <Reveal>
          <div className="descend-chart mx-auto max-w-3xl">
            {skyStops.map((floor) => (
              <a
                key={floor.number}
                href={floor.href}
                onClick={onHashClick}
                aria-label={`${floor.number}. ${floor.title}`}
                className="flex min-h-11 gap-6 text-ink/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lagoon md:gap-10"
              >
                <div className="flex w-12 shrink-0 flex-col items-center self-stretch md:w-16">
                  <p className="font-display text-[1.45rem] leading-none font-light text-lagoon tabular-nums md:text-[1.7rem]">
                    {floor.number}
                  </p>
                  <div className="mt-3 w-px min-h-7 flex-1 bg-lagoon/20" />
                </div>
                <p className="min-w-0 flex-1 pt-1 pb-8 font-display text-[1.25rem] leading-snug font-light md:pb-10 md:text-[1.4rem]">
                  {floor.title}
                </p>
              </a>
            ))}

            <div className="flex gap-6 md:gap-10" aria-hidden="true">
              <div className="flex w-12 justify-center md:w-16">
                <div className="descend-drop w-px" />
              </div>
              <div className="flex-1" />
            </div>

            <div
              className="mb-8 flex items-center gap-6 md:mb-10 md:gap-10"
              aria-hidden="true"
            >
              <div className="w-12 md:w-16" />
              <div className="h-px flex-1 bg-lagoon/20" />
            </div>

            <div className="flex gap-6 md:gap-10">
              <div className="flex w-12 shrink-0 flex-col items-center pt-2 md:w-16">
                <WaveMark className="mb-3" />
                <span className="size-2.5 rounded-full bg-lagoon" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[clamp(3.8rem,9vw,6.8rem)] leading-none font-light tracking-[-0.05em] text-lagoon tabular-nums">
                  0
                </p>
                <p className="mt-5 text-[0.62rem] tracking-[0.28em] text-lagoon uppercase">
                  Sea level
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.7rem,3.2vw,2.35rem)] leading-[1.12] font-light text-ink">
                  Beach House
                </h3>
                <p className="mt-4 max-w-md text-[1.05rem] leading-[1.75] text-ink/70">
                  A separate cabana beside the pool and beach — bathroom,
                  living area, kitchenette, television and Wi-Fi.
                </p>
                <ul className="mt-8 max-w-lg">
                  {rooms.map((room) => (
                    <li
                      key={room}
                      className="border-t border-lagoon/15 py-3.5 text-[0.72rem] tracking-[0.2em] text-lagoon uppercase last:border-b"
                    >
                      {room}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-14 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase md:mt-16">
          Two addresses · the sky and the sand
        </p>
      </PagePad>
    </section>
  )
}
