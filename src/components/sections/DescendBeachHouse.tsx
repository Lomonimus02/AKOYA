import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { photos } from '../../data/images'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'

const rooms = [
  { title: 'Living', body: 'A room of your own below' },
  { title: 'Kitchenette', body: 'Coffee after the swim' },
  { title: 'Bathroom', body: 'Sand, then water, then rest' },
  { title: 'Television', body: 'Shade when the light is high' },
  { title: 'Wi-Fi', body: 'The sky residence, continued' },
] as const

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function FolioRow({
  item,
  index,
  progress,
  pin,
}: {
  item: (typeof rooms)[number]
  index: number
  progress: MotionValue<number>
  pin: boolean
}) {
  const start = 0.78 + index * 0.035
  const opacity = useTransform(progress, (v) =>
    pin ? smoothstep(start, Math.min(1, start + 0.16), v) : 1,
  )
  const y = useTransform(progress, (v) =>
    pin ? mix(20, 0, smoothstep(start, Math.min(1, start + 0.16), v)) : 0,
  )

  return (
    <motion.li className="descend-entry" style={{ opacity, y }}>
      <p className="descend-entry-mark">
        {String(index + 1).padStart(2, '0')}
      </p>
      <p className="descend-entry-title">{item.title}</p>
      <p className="descend-entry-body">{item.body}</p>
    </motion.li>
  )
}

function BeachHouseFolio({
  progress,
  pin,
}: {
  progress: MotionValue<number>
  pin: boolean
}) {
  const kickerOpacity = useTransform(progress, (v) =>
    pin ? smoothstep(0.74, 0.9, v) : 1,
  )
  const kickerY = useTransform(progress, (v) =>
    pin ? mix(12, 0, smoothstep(0.74, 0.9, v)) : 0,
  )

  return (
    <div className="descend-folio">
      <p aria-hidden="true" className="descend-folio-mark">
        0
      </p>
      <motion.p
        className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase"
        style={{ opacity: kickerOpacity, y: kickerY }}
      >
        Private Beach House · sea level
      </motion.p>
      <ul className="descend-ledger">
        {rooms.map((item, i) => (
          <FolioRow
            key={item.title}
            item={item}
            index={i}
            progress={progress}
            pin={pin}
          />
        ))}
      </ul>
    </div>
  )
}

function WindowCopy({
  style,
}: {
  style?: { opacity: MotionValue<number> | number }
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20 w-[min(100%,36rem)] max-w-xl px-8 py-8 text-center md:px-12 md:py-10"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        ...style,
      }}
    >
      <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.12] font-light text-white [text-shadow:0_10px_32px_rgba(18,42,58,0.45)]">
        Your private Beach House at sea level
      </h2>
      <p className="mt-4 text-[1.05rem] leading-[1.8] text-white/85 [text-shadow:0_8px_24px_rgba(18,42,58,0.35)]">
        A separate cabana beside the pool and beach — bathroom, living area,
        kitchenette, television and Wi-Fi. Your residence in the sky. Your
        beach house below.
      </p>
    </motion.div>
  )
}

export function DescendBeachHouse() {
  const reduce = useReducedMotion()
  const pin = !reduce
  const pinRef = useRef(pin)
  pinRef.current = pin
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const copyFade = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return 1
    return 1 - smoothstep(0.1, 0.32, v)
  })

  const veilY = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return '100%'
    return `${mix(100, 0, smoothstep(0.1, 0.62, v))}%`
  })

  const foamOpacity = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return 0
    return smoothstep(0.56, 0.78, v)
  })

  const photoFade = useTransform(foamOpacity, (o) => 1 - o)

  const folioOpacity = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return 1
    return smoothstep(0.72, 0.92, v)
  })

  const folioPointer = useTransform(folioOpacity, (o) =>
    o > 0.2 ? 'auto' : 'none',
  )

  return (
    <section id="descend" className="descend-wash scroll-mt-24">
      <PagePad className="pt-28 pb-8 md:pt-36 md:pb-12 lg:pt-44 lg:pb-14">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between">
          <Reveal>
            <p className="font-display text-[clamp(2.35rem,4.2vw,3.6rem)] leading-none font-light text-aqua/80">
              Descend
            </p>
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

      {pin ? (
        <div ref={trackRef} className="relative h-[520vh]">
          <div className="sticky top-0 h-dvh overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
              <motion.figure
                className="descend-window relative shrink-0 overflow-hidden"
                style={{ opacity: photoFade }}
              >
                <img
                  src={photos.poolBeach}
                  alt="Pool and palms at sea level, the Atlantic beyond"
                  className="absolute inset-0 h-full w-full max-w-none object-cover"
                  style={{ objectPosition: '50% 48%' }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[5] bg-ink/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42%] bg-gradient-to-t from-ink/55 to-transparent"
                />
                <WindowCopy style={{ opacity: copyFade }} />
              </motion.figure>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            >
              <motion.div
                className="descend-tide absolute right-0 bottom-0 left-0 h-[240vh] will-change-transform"
                style={{ y: veilY }}
              />
            </div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-white"
              style={{ opacity: foamOpacity }}
            />

            <motion.div
              className="absolute inset-0 z-40 flex items-center overflow-y-auto px-6 py-[max(2.75rem,env(safe-area-inset-top))] md:px-12 lg:px-20"
              style={{
                opacity: folioOpacity,
                pointerEvents: folioPointer,
              }}
            >
              <BeachHouseFolio progress={scrollYProgress} pin={pin} />
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-10 px-6 pb-12 md:mt-12 md:px-12 md:pb-16 lg:mt-14 lg:px-20">
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
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[5] bg-ink/25"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42%] bg-gradient-to-t from-ink/55 to-transparent"
                  />
                  <WindowCopy />
                </div>
                <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
                  Private Beach House · sea level
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <PagePad className="pt-6 pb-24 md:pt-10 md:pb-32">
            <BeachHouseFolio progress={scrollYProgress} pin={false} />
          </PagePad>
        </>
      )}
    </section>
  )
}
