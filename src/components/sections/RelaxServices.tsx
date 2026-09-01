import { services } from '../../data/copy'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

export function RelaxServices() {
  return (
    <section id="relax" className="relax-wash scroll-mt-24">
      <PagePad className="py-24 md:py-32">
        <Reveal>
          <SectionCopy
            label="Relax"
            title="Luxury without the ordinary friction"
            body="Professional cleaning, a welcome basket and 24-hour on-call assistance are included. Concierge services by arrangement."
          />
        </Reveal>
        <ul className="mt-16 grid max-w-3xl gap-0 sm:grid-cols-2">
          {services.map((item, i) => (
            <li
              key={item}
              className="border-t border-lagoon/20 py-5 text-[0.78rem] tracking-[0.16em] text-lagoon uppercase"
            >
              <Reveal delay={0.04 * i}>{item}</Reveal>
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
