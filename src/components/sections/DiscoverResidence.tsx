import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { floors } from '../../data/copy'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { cn } from '../../lib/cn'
import { onHashClick } from '../../lib/scrollTo'

const shots = [
  {
    src: photos.bedroomMain,
    alt: 'Primary suite with panoramic coastal light',
    position: '48% 46%',
    phonePosition: '58% 42%',
    desktopClass:
      'absolute inset-y-0 left-[-28%] h-full w-[160%] min-h-full max-w-none object-cover',
  },
  {
    src: photos.living,
    alt: 'Living residence behind curved glass, Miami at dusk',
    position: '50% 48%',
    phonePosition: '50% 48%',
    desktopClass:
      'absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover',
  },
  {
    src: photos.officeAlt,
    alt: 'Private office with aviator desk above the bay',
    position: '42% 38%',
    phonePosition: '48% 36%',
    desktopClass:
      'absolute inset-y-0 left-[38%] h-full w-[90%] min-h-full max-w-none object-cover',
  },
] as const

const restClipDesktop = [
  'polygon(0% 0%, 40% 0%, 28% 100%, 0% 100%)',
  'polygon(36% 0%, 72% 0%, 64% 100%, 24% 100%)',
  'polygon(68% 0%, 100% 0%, 100% 100%, 60% 100%)',
] as const

const hoverClipDesktop = [
  'polygon(0% 0%, 45% 0%, 33% 100%, 0% 100%)',
  'polygon(33% 0%, 75% 0%, 67% 100%, 21% 100%)',
  'polygon(64% 0%, 100% 0%, 100% 100%, 56% 100%)',
] as const

const easeSilk = [0.16, 1, 0.3, 1] as const
const clipTransition = { type: 'tween' as const, duration: 1.55, ease: easeSilk }
const fadeTransition = { type: 'tween' as const, duration: 1.05, ease: easeSilk }
const phoneGrowTransition = { type: 'tween' as const, duration: 1.15, ease: easeSilk }

const copyClassDesktop = [
  'left-8 bottom-12 max-w-sm',
  'left-[38%] bottom-12 max-w-sm',
  'right-8 bottom-12 max-w-sm text-right',
] as const

function shouldTapToReveal() {
  return (
    window.matchMedia('(max-width: 767px)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function blade46Clip(expand: number, hover: number) {
  const t = Math.min(1, Math.max(0, expand))
  const h = Math.min(1, Math.max(0, hover)) * (1 - t)
  const top = 40 + 5 * h + (60 - 5 * h) * t
  const bot = 28 + 5 * h + (72 - 5 * h) * t
  return `polygon(0% 0%, ${top}% 0%, ${bot}% 100%, 0% 100%)`
}

function FloorCopy({
  floor,
  dimmed,
  compact = false,
}: {
  floor: (typeof floors)[number]
  dimmed: boolean
  compact?: boolean
}) {
  return (
    <>
      <p
        className={cn(
          'font-display leading-none font-light transition-colors duration-1000 ease-out [text-shadow:0_10px_36px_rgba(20,52,58,0.45)]',
          compact ? 'text-[2.75rem]' : 'text-5xl lg:text-7xl',
          dimmed ? 'text-white/55' : 'text-white/92',
        )}
      >
        {floor.number}
      </p>
      <div className={compact ? 'mt-2.5' : 'mt-3'}>
        <p
          className={cn(
            'font-display leading-[1.12] font-light text-white [text-shadow:0_8px_28px_rgba(20,52,58,0.4)]',
            compact ? 'text-[1.35rem]' : 'text-[clamp(1.25rem,2.2vw,2.15rem)]',
          )}
        >
          {floor.title}
        </p>
        <p
          className={cn(
            'text-white/86 [text-shadow:0_8px_24px_rgba(20,52,58,0.35)]',
            compact
              ? 'mt-2.5 text-[0.9rem] leading-[1.55]'
              : 'mt-3 text-[0.92rem] leading-[1.7]',
          )}
        >
          {floor.body}
        </p>
      </div>
    </>
  )
}

export function DiscoverResidence() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const pin = !reduce
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceRef = useRef(!!reduce)
  reduceRef.current = !!reduce
  const pinRef = useRef(pin)
  pinRef.current = pin

  const [open, setOpen] = useState<number | null>(null)
  const openRef = useRef<number | null>(null)
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverAnim = useRef<ReturnType<typeof animate> | null>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const hover46 = useMotionValue(0)
  const expand = useTransform(scrollYProgress, (v) =>
    pinRef.current ? smoothstep(0.02, 0.7, v) : 0,
  )
  const bleach = useTransform(scrollYProgress, (v) =>
    pinRef.current ? smoothstep(0.08, 0.64, v) : 0,
  )
  const stageOut = useTransform(scrollYProgress, (v) =>
    pinRef.current ? smoothstep(0.76, 0.94, v) : 0,
  )
  const stageFade = useTransform(stageOut, (t) => 1 - t)
  const copyFade = useTransform(bleach, (t) => 1 - t)
  const clip46 = useTransform([expand, hover46], (latest) => {
    const [t, h] = latest as number[]
    return blade46Clip(t, h)
  })
  const shot46Left = useTransform(expand, (t) => `${-28 * (1 - t)}%`)
  const shot46Width = useTransform(expand, (t) => `${160 - 60 * t}%`)
  const othersHide = useTransform(expand, (t) => 1 - smoothstep(0.2, 0.62, t))
  const phoneGrow46 = useTransform(expand, (t) => 1 + t * 12)
  const phoneGrowRest = useTransform(expand, (t) => Math.max(0.001, 1 - t))
  const stageBg = useTransform(expand, (t) => {
    const u = Math.min(1, Math.max(0, t / 0.18))
    const r = Math.round(18 + 237 * u)
    const g = Math.round(42 + 213 * u)
    const b = Math.round(58 + 197 * u)
    return `rgb(${r}, ${g}, ${b})`
  })
  const [passThrough, setPassThrough] = useState(false)

  useMotionValueEvent(stageOut, 'change', (value) => {
    setPassThrough(value > 0.92)
  })

  const setFloor = (index: number | null) => {
    openRef.current = index
    setOpen(index)
    hoverAnim.current?.stop()
    hoverAnim.current = animate(
      hover46,
      index === 0 ? 1 : 0,
      reduceRef.current
        ? { duration: 0 }
        : { duration: 1.55, ease: easeSilk },
    )
  }

  const intendFloor = (index: number | null) => {
    if (intent.current) clearTimeout(intent.current)
    intent.current = setTimeout(() => {
      setFloor(index)
    }, index === null ? 160 : 70)
  }

  useEffect(() => {
    return () => {
      if (intent.current) clearTimeout(intent.current)
      hoverAnim.current?.stop()
    }
  }, [])

  if (phone) {
    return (
      <section
        id="discover"
        ref={trackRef}
        className={cn(
          'relative',
          pin ? 'discover-pin pointer-events-none' : 'h-dvh min-h-[640px] bg-ink',
        )}
      >
        <motion.div
          className={cn(
            'discover-wash relative flex h-dvh flex-col overflow-hidden bg-ink',
            pin && 'sticky top-0',
            pin && (passThrough ? 'pointer-events-none' : 'pointer-events-auto'),
          )}
          data-discover-photo="true"
          style={
            pin ? { backgroundColor: stageBg, opacity: stageFade } : undefined
          }
        >
          {floors.map((floor, i) => {
            const shot = shots[i]
            const isOpen = open === i
            const dimmed = open !== null && !isOpen
            const tapGrow = reduce ? 1 : isOpen ? 2.4 : dimmed ? 0.7 : 1

            return (
              <motion.div
                key={floor.number}
                initial={false}
                animate={pin ? undefined : { flexGrow: tapGrow }}
                transition={reduce ? { duration: 0 } : phoneGrowTransition}
                className="relative min-h-0 w-full overflow-hidden"
                style={{
                  flexBasis: 0,
                  flexGrow: pin ? (i === 0 ? phoneGrow46 : phoneGrowRest) : undefined,
                  zIndex: i === 0 ? 5 : 3 - i,
                  opacity: i === 0 ? 1 : othersHide,
                }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <img
                    src={shot.src}
                    alt=""
                    className="absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover"
                    style={{ objectPosition: shot.phonePosition, maxWidth: 'none' }}
                    decoding="async"
                  />
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : dimmed ? 0.88 : 0.72 }}
                    transition={reduce ? { duration: 0 } : fadeTransition}
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(20,52,58,0.1) 0%, rgba(20,52,58,0.06) 42%, rgba(20,52,58,0.7) 100%)',
                    }}
                  />
                </div>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={`${floor.number}. ${floor.title}`}
                  className="absolute inset-0 z-10 flex items-end px-5 pt-5 pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1.25rem))] text-left"
                  onClick={() => setFloor(openRef.current === i ? null : i)}
                >
                  <motion.div
                    className="w-full max-w-[20.5rem] pr-2"
                    style={{ opacity: i === 0 ? copyFade : 1 }}
                  >
                    <FloorCopy floor={floor} dimmed={dimmed} compact />
                  </motion.div>
                </button>
                {i === 0 ? (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 bg-white"
                    style={{ opacity: bleach }}
                  />
                ) : null}
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    )
  }

  return (
    <section
      id="discover"
      ref={trackRef}
      className={cn(
        'relative',
        pin ? 'discover-pin pointer-events-none' : 'h-dvh min-h-[640px] bg-ink',
      )}
    >
      <motion.div
        className={cn(
          'discover-wash relative h-dvh overflow-hidden',
          pin ? 'sticky top-0' : 'bg-ink',
          pin && (passThrough ? 'pointer-events-none' : 'pointer-events-auto'),
        )}
        data-discover-photo="true"
        style={
          pin ? { backgroundColor: stageBg, opacity: stageFade } : undefined
        }
        onMouseLeave={() => {
          if (!shouldTapToReveal()) intendFloor(null)
        }}
      >
        {floors.map((floor, i) => {
          const shot = shots[i]
          const isOpen = open === i
          const dimmed = open !== null && !isOpen
          const desktopClip = reduce
            ? restClipDesktop[i]
            : isOpen
              ? hoverClipDesktop[i]
              : restClipDesktop[i]

          return (
            <motion.div
              key={floor.number}
              aria-hidden="true"
              initial={false}
              animate={i === 0 ? undefined : { clipPath: desktopClip }}
              transition={reduce ? { duration: 0 } : clipTransition}
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                zIndex: i === 0 ? 8 : 3 - i,
                willChange: 'clip-path',
                clipPath: i === 0 ? clip46 : undefined,
                opacity: i === 0 ? 1 : othersHide,
              }}
            >
              {i === 0 ? (
                <motion.img
                  src={shot.src}
                  alt=""
                  className="absolute inset-y-0 h-full min-h-full object-cover"
                  style={{
                    objectPosition: shot.position,
                    left: shot46Left,
                    width: shot46Width,
                    maxWidth: 'none',
                  }}
                  decoding="async"
                />
              ) : (
                <img
                  src={shot.src}
                  alt=""
                  className={shot.desktopClass}
                  style={{ objectPosition: shot.position, maxWidth: 'none' }}
                  decoding="async"
                />
              )}
              <motion.div
                className="discover-shade absolute inset-0"
                initial={false}
                animate={{ opacity: isOpen ? 0.5 : dimmed ? 0.7 : 0.36 }}
                transition={reduce ? { duration: 0 } : fadeTransition}
              />
              <motion.div
                className={cn('absolute z-10', copyClassDesktop[i])}
                style={{ opacity: i === 0 ? copyFade : 1 }}
              >
                <FloorCopy floor={floor} dimmed={dimmed} />
              </motion.div>
              {i === 0 ? (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-white"
                  style={{ opacity: bleach }}
                />
              ) : null}
            </motion.div>
          )
        })}

        {floors.map((floor, i) =>
          i === 0 ? (
            <motion.a
              key={`${floor.number}-hit`}
              href={floor.href}
              aria-label={`${floor.number}. ${floor.title}`}
              className="absolute inset-0 outline-offset-[-6px]"
              style={{ clipPath: clip46, zIndex: 12 }}
              onClick={onHashClick}
              onMouseEnter={() => {
                if (!shouldTapToReveal()) intendFloor(i)
              }}
              onFocus={() => setFloor(i)}
              onBlur={() => {
                if (!shouldTapToReveal()) intendFloor(null)
              }}
            />
          ) : (
            <a
              key={`${floor.number}-hit`}
              href={floor.href}
              aria-label={`${floor.number}. ${floor.title}`}
              className="absolute inset-0 outline-offset-[-6px]"
              style={{ clipPath: restClipDesktop[i], zIndex: 12 - i }}
              onClick={onHashClick}
              onMouseEnter={() => {
                if (!shouldTapToReveal()) intendFloor(i)
              }}
              onFocus={() => setFloor(i)}
              onBlur={() => {
                if (!shouldTapToReveal()) intendFloor(null)
              }}
            />
          ),
        )}
      </motion.div>
    </section>
  )
}
