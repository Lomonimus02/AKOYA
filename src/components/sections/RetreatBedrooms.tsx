import { photos } from '../../data/images'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const views = [
  {
    src: photos.bedroomOcean,
    alt: 'King bedroom looking out to ocean and coastline',
    caption: 'Ocean light',
    position: '50% 42%',
  },
  {
    src: photos.bedroomCity,
    alt: 'King bedroom with city skyline beyond the glass',
    caption: 'City light',
    position: '50% 42%',
  },
] as const

function RetreatPane({
  src,
  alt,
  caption,
  position,
  className,
  captionAt,
}: {
  src: string
  alt: string
  caption: string
  position: string
  className: string
  captionAt: 'top' | 'bottom'
}) {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full max-w-none object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
        decoding="async"
      />
      <div
        className={
          captionAt === 'top'
            ? 'pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ink/40 via-ink/8 to-transparent px-6 pt-5 pb-12 md:px-8 md:pt-6 lg:px-10 lg:pt-8'
            : 'pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 via-ink/12 to-transparent px-6 pt-16 pb-5 md:px-8 md:pb-6'
        }
      >
        <p className="text-[0.62rem] tracking-[0.22em] text-white uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)] md:text-[0.68rem]">
          {caption}
        </p>
      </div>
    </div>
  )
}

export function RetreatBedrooms() {
  return (
    <section id="retreat" className="retreat-wash scroll-mt-24">
      <PagePad className="pt-24 pb-6 md:pt-32 md:pb-8 lg:pt-40">
        <Reveal>
          <SectionCopy
            kicker="46"
            label="Retreat"
            title="White rooms, open horizons"
            body="Three bedrooms on the 46th floor — calm white interiors opened to ocean, city and sky. Marriott mattresses, and private outdoor access from the suite level."
          />
        </Reveal>
      </PagePad>

      <div className="pb-24 md:pb-32">
        <Reveal>
          <figure>
            <div className="retreat-stage">
              <RetreatPane
                src={photos.bedroomMain}
                alt="Primary suite with panoramic coastal light"
                caption="Primary suite"
                position="50% 55%"
                className="retreat-hero"
                captionAt="top"
              />
              <div className="retreat-pair">
                {views.map((view) => (
                  <RetreatPane
                    key={view.src}
                    src={view.src}
                    alt={view.alt}
                    caption={view.caption}
                    position={view.position}
                    className="retreat-view"
                    captionAt="bottom"
                  />
                ))}
              </div>
            </div>
            <figcaption className="mt-3 px-6 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase md:px-12 lg:px-20">
              Primary suite · two views
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
