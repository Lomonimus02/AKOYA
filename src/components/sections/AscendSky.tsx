import { useRef, type RefObject } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { cn } from '../../lib/cn'
import { SectionCopy } from '../ui/SectionCopy'

const rooms = [
  { name: 'Office', note: 'Wrap-around glass' },
  { name: 'Sky Terrace', note: 'Among the crown' },
  { name: 'This floor', note: 'Lounge, wet bar, bathroom' },
] as const

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smootherstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * t * (t * (t * 6 - 15) + 10)
}

const cinemaSpring = {
  stiffness: 38,
  damping: 24,
  mass: 1.35,
} as const

export function AscendSky() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const pin = !reduce
  const pinRef = useRef(pin)
  const phoneRef = useRef(phone)
  pinRef.current = pin
  phoneRef.current = phone

  return (
    <section id="ascend" className="ascend-wash scroll-mt-24">
      <OfficeAct pin={pin} phone={phone} pinRef={pinRef} phoneRef={phoneRef} />
      <TerraceAct pin={pin} pinRef={pinRef} phoneRef={phoneRef} />
    </section>
  )
}

function OfficeAct({
  pin,
  phone,
  pinRef,
  phoneRef,
}: {
  pin: boolean
  phone: boolean
  pinRef: RefObject<boolean>
  phoneRef: RefObject<boolean>
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.9', 'end end'],
  })
  const progress = useSpring(scrollYProgress, cinemaSpring)

  const photoX = useTransform(progress, (v) => {
    if (!pinRef.current) return '0%'
    return `${mix(70, 0, smootherstep(0.12, 0.78, v))}%`
  })
  const copyX = useTransform(progress, (v) => {
    if (!pinRef.current) return '0vw'
    const travel = phoneRef.current ? -100 : -58
    return `${mix(travel, 0, smootherstep(0.28, 0.86, v))}vw`
  })
  const roomsY = useTransform(progress, (v) => {
    if (!pinRef.current) return 0
    return mix(phoneRef.current ? 20 : 40, 0, smootherstep(0.46, 0.94, v))
  })
  const roomsOpacity = useTransform(progress, (v) => {
    if (!pinRef.current) return 1
    return smootherstep(0.46, 0.88, v)
  })
  const captionOpacity = useTransform(progress, (v) => {
    if (!pinRef.current) return 1
    return smootherstep(0.34, 0.82, v)
  })
  const captionY = useTransform(progress, (v) => {
    if (!pinRef.current) return 0
    return mix(10, 0, smootherstep(0.56, 0.96, v))
  })

  return (
    <div ref={trackRef} className={pin ? 'relative h-[280vh]' : undefined}>
      <div
        className={
          pin
            ? 'ascend-office-stage sticky top-0 h-dvh overflow-hidden'
            : 'ascend-office-stage relative'
        }
      >
        <div
          className="ascend-arrive pointer-events-none absolute inset-x-0 top-0 z-20 h-52 md:h-72 lg:h-80"
          aria-hidden="true"
        />

        <div
          className={
            pin
              ? 'relative h-full lg:grid lg:grid-cols-[minmax(28rem,38%)_minmax(0,1fr)]'
              : 'flex flex-col lg:grid lg:min-h-dvh lg:grid-cols-[minmax(28rem,38%)_minmax(0,1fr)]'
          }
        >
          <figure
            className={cn(
              'ascend-office relative',
              pin ? 'is-pinned lg:order-2' : 'order-1 lg:order-2',
            )}
          >
            <motion.div className="absolute inset-0" style={{ x: photoX }}>
              <img
                src={photos.officeAlt}
                alt="Private glass office with aviator desk, sunset over Biscayne Bay"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{ objectPosition: '48% 38%' }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.figcaption
              className="absolute top-[8.5rem] left-6 z-[15] text-[0.68rem] tracking-[0.22em] text-white/90 uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)] md:top-44 md:left-8 lg:top-auto lg:bottom-8"
              style={{ opacity: captionOpacity, y: captionY }}
            >
              Inside · the glass office
            </motion.figcaption>
          </figure>

          <motion.div
            className={cn(
              'ascend-panel z-10',
              pin
                ? 'is-pinned absolute inset-x-0 bottom-0 flex flex-col justify-end px-6 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-12 md:pt-16 lg:relative lg:inset-auto lg:order-1 lg:h-full lg:justify-between lg:px-12 lg:pt-36 lg:pb-24 xl:px-16'
                : 'relative px-6 pt-16 pb-16 md:px-12 md:pt-20 md:pb-20 lg:flex lg:h-full lg:flex-col lg:justify-between lg:px-12 lg:pt-36 lg:pb-24 xl:px-16',
            )}
            style={{ x: copyX }}
          >
            <SectionCopy
              kicker={phone ? undefined : 'Sky'}
              label="Ascend"
              title="The last light"
              body="Sunset in a glass office, then the door to your own Sky Terrace. Lounge, wet bar and bathroom — this floor alone."
              className={
                phone
                  ? 'max-w-lg [&_h2]:text-[1.65rem] [&_h2+p]:mt-3 [&_h2+p]:text-[0.95rem] [&_h2+p]:leading-relaxed'
                  : undefined
              }
              titleClassName={phone ? 'text-[1.65rem]' : undefined}
            />

            <motion.ul
              className={cn(
                'max-w-lg border-t border-lagoon/15',
                phone
                  ? 'mt-4 [&_li]:py-1.5 [&_li_.font-display]:text-[1.15rem]'
                  : 'mt-8 lg:mt-16',
              )}
              style={{ y: roomsY, opacity: roomsOpacity }}
            >
              {rooms.map((room) => (
                <li
                  key={room.name}
                  className={cn(
                    'border-b border-lagoon/10',
                    phone ? 'py-1.5' : 'py-4',
                  )}
                >
                  <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
                    {room.name}
                  </p>
                  <p
                    className={cn(
                      'mt-2 font-display leading-snug font-light text-ink',
                      phone ? 'text-[1.15rem]' : 'text-[1.35rem] md:text-[1.5rem]',
                    )}
                  >
                    {room.note}
                  </p>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function TerraceAct({
  pin,
  pinRef,
  phoneRef,
}: {
  pin: boolean
  pinRef: RefObject<boolean>
  phoneRef: RefObject<boolean>
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.9', 'end end'],
  })
  const progress = useSpring(scrollYProgress, cinemaSpring)

  const photoX = useTransform(progress, (v) => {
    if (!pinRef.current) return '0%'
    return `${mix(-70, 0, smootherstep(0.12, 0.78, v))}%`
  })
  const copyX = useTransform(progress, (v) => {
    if (!pinRef.current) return '0vw'
    const travel = phoneRef.current ? 100 : 58
    return `${mix(travel, 0, smootherstep(0.28, 0.86, v))}vw`
  })
  const foamOpacity = useTransform(progress, (v) => {
    if (!pinRef.current) return 1
    return smootherstep(0.72, 0.96, v)
  })
  const captionOpacity = useTransform(progress, (v) => {
    if (!pinRef.current) return 1
    return smootherstep(0.34, 0.82, v)
  })
  const captionY = useTransform(progress, (v) => {
    if (!pinRef.current) return 0
    return mix(10, 0, smootherstep(0.56, 0.96, v))
  })

  return (
    <div ref={trackRef} className={pin ? 'relative h-[280vh]' : undefined}>
      <div
        className={
          pin
            ? 'ascend-terrace-stage sticky top-0 h-dvh overflow-hidden'
            : 'ascend-terrace-stage relative'
        }
      >
        <div
          className={
            pin
              ? 'flex h-full flex-col lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(28rem,38%)]'
              : 'flex flex-col lg:grid lg:min-h-[90vh] lg:grid-cols-[minmax(0,1.2fr)_minmax(28rem,38%)]'
          }
        >
          <figure
            className={cn(
              'ascend-terrace relative',
              pin ? 'is-pinned min-h-0 flex-1' : undefined,
            )}
          >
            <motion.div className="absolute inset-0" style={{ x: photoX }}>
              <img
                src={photos.twilight}
                alt="Akoya's white triangular crown fins at dusk, seen from the Sky Terrace"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{ objectPosition: '22% 36%' }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="ascend-terrace-foam pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
              style={{ opacity: foamOpacity }}
            />

            <motion.figcaption
              className="absolute bottom-6 left-6 z-10 text-[0.68rem] tracking-[0.22em] text-white/90 uppercase [text-shadow:0_8px_24px_rgba(20,52,58,0.45)] md:left-8 lg:bottom-8"
              style={{ opacity: captionOpacity, y: captionY }}
            >
              Among the crown
            </motion.figcaption>
          </figure>

          <motion.div
            className={cn(
              'ascend-outside flex flex-col justify-end px-6 py-16 md:px-12 md:py-20 lg:justify-center lg:px-12 lg:py-24 xl:px-16',
              pin &&
                'shrink-0 max-lg:pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:h-full',
            )}
            style={{ x: copyX }}
          >
            <SectionCopy
              label="Outside"
              title="The Sky Terrace"
              body="Private air among the white fins that crown Akoya."
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
