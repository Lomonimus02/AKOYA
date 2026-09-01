import { pricingFacts } from '../../data/copy'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const stay = [10, 10, 10] as const

export function UnderstandPricing() {
  const phone = useMedia('(max-width: 767px)')

  return (
    <section id="understand" className="understand-wash scroll-mt-24">
      <figure className="understand-tower">
        <img
          src={photos.facade}
          alt="Akoya's white tower from the street, triangular canopy and palms"
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          style={{ objectPosition: phone ? '50% 42%' : '52% 72%' }}
          loading="lazy"
          decoding="async"
        />
        <div className="understand-shade" aria-hidden="true" />
        <div className="understand-sumblock">
          <p className="mb-4 text-[0.62rem] tracking-[0.22em] text-white uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)]">
            The residence
          </p>
          <p className="understand-sum">$40,000</p>
          <p className="mt-3 text-[0.72rem] tracking-[0.28em] text-white/80 uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.4)]">
            Per month
          </p>
        </div>
      </figure>

      <PagePad className="understand-folio pt-10 pb-24 md:pt-14 md:pb-32">
        <div className="understand-stay" aria-hidden="true">
          {stay.map((days, decade) => (
            <div key={decade} className="understand-decade">
              {Array.from({ length: days }, (_, day) => (
                <span key={day} className="understand-day" />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
          Thirty days · the shortest stay
        </p>

        <div className="mt-16 md:mt-20">
          <Reveal>
            <SectionCopy
              label="Understand"
              title={
                <>
                  The terms
                  <br />
                  of residence
                </>
              }
              body="A furnished private residence for those seeking Miami Beach without the permanence of ownership."
            />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:pt-12">
          {pricingFacts.map((fact, index) => (
            <li key={fact}>
              <Reveal delay={0.04 * index}>
                <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-display text-[1.35rem] leading-snug font-light text-ink md:text-[1.5rem]">
                  {fact}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
