import { pricingFacts } from '../../data/copy'
import { photos } from '../../data/images'
import { PagePad } from '../ui/PagePad'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

export function UnderstandPricing() {
  return (
    <section id="understand" className="understand-wash scroll-mt-24">
      <PagePad className="pt-16 md:pt-20">
        <Photo
          src={photos.poolBeach}
          alt="Pool, palms and turquoise water at Akoya"
          caption="A furnished private residence"
          imgClassName="aspect-[21/9] max-md:aspect-[16/10]"
        />
      </PagePad>
      <PagePad className="py-20 md:py-28">
        <Reveal>
          <SectionCopy
            label="Understand"
            title="The terms of residence"
            body="A furnished private residence for those seeking Miami Beach without the permanence of ownership."
          />
          <p className="mt-10 font-display text-[clamp(3.2rem,8vw,5.8rem)] leading-none font-light text-lagoon">
            $40,000
          </p>
          <p className="mt-3 text-[0.8rem] tracking-[0.28em] text-ink/55 uppercase">
            Per month · 30-day minimum stay
          </p>
        </Reveal>
        <ul className="mt-12 flex max-w-2xl flex-wrap gap-x-8 gap-y-3">
          {pricingFacts.map((fact) => (
            <li
              key={fact}
              className="text-[0.7rem] tracking-[0.2em] text-lagoon uppercase"
            >
              {fact}
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
