import { services } from '../../data/copy'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

export function RelaxServices() {
  return (
    <section id="relax" className="relax-wash scroll-mt-24">
      <PagePad className="pt-32 pb-10 md:pt-44 md:pb-14 lg:pt-56 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <SectionCopy
              label="Relax"
              title="Luxury without the ordinary friction"
              body="Professional cleaning, a welcome basket and 24-hour on-call assistance are included. Concierge services by arrangement."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4.5rem,10vw,7rem)] leading-none font-light text-aqua/80"
            >
              06
            </p>
          </Reveal>
        </div>
      </PagePad>

      <PagePad className="pt-6 pb-24 md:pt-10 md:pb-32">
        <ul className="grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:pt-12">
          {services.map((item, i) => (
            <li key={item}>
              <Reveal delay={0.05 * i}>
                <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-display text-[1.35rem] leading-snug font-light text-ink md:text-[1.5rem]">
                  {item}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
