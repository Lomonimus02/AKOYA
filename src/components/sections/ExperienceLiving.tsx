import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { easeHeroSettle } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'

const MAX_ANGLE = 270
const VIEW_WIDTH_DESKTOP = 1.48
const VIEW_WIDTH_PHONE = 2.45
const VIEW_HEIGHT_DESKTOP = 1.22
const VIEW_HEIGHT_PHONE = 1.3
const IDLE_SPAN_X = 0.055
const IDLE_SPAN_Y = 0.032
const IDLE_PERIOD = 24000
const KEY_STEP = 0.045
const START_X = 120 / MAX_ANGLE
const START_Y = 0.5

const sweep = [
  { at: 0, mark: 'Bay' },
  { at: 90, mark: 'City' },
  { at: 180, mark: 'Living' },
  { at: 270, mark: 'Atlantic' },
] as const

const moments = [
  { title: 'Morning', body: 'Coffee behind curved glass' },
  { title: 'Evening', body: 'Dinner with the skyline' },
  { title: 'Always', body: 'The Atlantic just beyond' },
] as const

const followSpring = {
  stiffness: 14,
  damping: 20,
  mass: 1.85,
  restDelta: 0.0004,
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function panExtent(view: number) {
  return -((view - 1) / view) * 100
}

function arcPoint(deg: number) {
  const r = 108
  const rad = (deg * Math.PI) / 180
  return {
    x: 120 + r * Math.sin(rad),
    y: 120 - r * Math.cos(rad),
  }
}

function SweepGraphic({
  angle,
  className,
}: {
  angle: number
  className?: string
}) {
  const span = Math.max(Math.min(angle, MAX_ANGLE), 0)
  const end = arcPoint(Math.max(span, 0.2))
  const d = `M 120 12 A 108 108 0 ${span > 180 ? 1 : 0} 1 ${end.x} ${end.y}`

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 240 240" className="h-full w-full">
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="1.5 7"
          className="text-aqua/50"
        />
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-lagoon/70"
        />
        <circle cx="120" cy="12" r="3" className="fill-lagoon" />
        <circle cx={end.x} cy={end.y} r="3" className="fill-lagoon" />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center font-display text-[clamp(3rem,6.2vw,5.6rem)] leading-none font-light tracking-[-0.04em] text-lagoon tabular-nums">
        {Math.round(span)}°
      </p>
    </div>
  )
}

export function ExperienceLiving() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const pin = !reduce
  const trackRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const restXRef = useRef(START_X)
  const restYRef = useRef(START_Y)
  const phaseRef = useRef(0)
  const hoveringRef = useRef(false)
  const inViewRef = useRef(false)
  const pinRef = useRef(pin)
  const phoneRef = useRef(phone)
  const lastAnglePaint = useRef(0)
  const dockedRef = useRef(!pin)
  const dockAnim = useRef<AnimationPlaybackControls | null>(null)
  pinRef.current = pin
  phoneRef.current = phone

  const [angle, setAngle] = useState(120)
  const [inView, setInView] = useState(false)
  const [copyDocked, setCopyDocked] = useState(!pin)
  inViewRef.current = inView

  const viewWidth = phone ? VIEW_WIDTH_PHONE : VIEW_WIDTH_DESKTOP
  const viewHeight = phone ? VIEW_HEIGHT_PHONE : VIEW_HEIGHT_DESKTOP

  const aimX = useMotionValue(START_X)
  const aimY = useMotionValue(START_Y)
  const springX = useSpring(aimX, followSpring)
  const springY = useSpring(aimY, followSpring)

  const imgX = useTransform(springX, (t) => {
    const width = phoneRef.current ? VIEW_WIDTH_PHONE : VIEW_WIDTH_DESKTOP
    return `${panExtent(width) * t}%`
  })
  const imgY = useTransform(springY, (t) => {
    const height = phoneRef.current ? VIEW_HEIGHT_PHONE : VIEW_HEIGHT_DESKTOP
    return `${panExtent(height) * t}%`
  })

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const grow = useTransform(scrollYProgress, (v) =>
    pinRef.current ? smoothstep(0.02, 0.28, v) : 1,
  )
  const windowWidth = useTransform(grow, (t) => {
    const width = phoneRef.current ? mix(86, 96, t) : mix(74, 96, t)
    return `${width}vw`
  })
  const windowHeight = useTransform(grow, (t) => {
    const height = phoneRef.current ? mix(56, 88, t) : mix(70, 92, t)
    return `${height}dvh`
  })
  const windowRadius = useTransform(grow, (t) =>
    mix(phoneRef.current ? 28 : 40, phoneRef.current ? 18 : 24, t),
  )
  const windowShadow = useTransform(grow, (t) => {
    const a = mix(0.18, 0.12, t)
    const y = mix(28, 18, t)
    const blur = mix(70, 48, t)
    return `0 ${Math.round(y)}px ${Math.round(blur)}px rgba(18, 42, 58, ${a.toFixed(3)})`
  })

  const veil = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return 0
    const up = smoothstep(0.3, 0.44, v)
    const down = smoothstep(0.58, 0.8, v)
    return 0.58 * up * (1 - down)
  })
  const copyIn = useTransform(scrollYProgress, (v) =>
    pinRef.current ? smoothstep(0.4, 0.52, v) : 1,
  )
  const dock = useMotionValue(pin ? 0 : 1)
  const copyLeft = useTransform(dock, (t) => `${mix(50, 0, t)}%`)
  const copyTop = useTransform(dock, (t) => `${mix(50, 100, t)}%`)
  const copyX = useTransform(dock, (t) => `${mix(-50, 0, t)}%`)
  const copyY = useTransform(dock, (t) => `${mix(-50, -100, t)}%`)
  const copyScale = useTransform(dock, (t) => mix(1.06, 1, t))
  const markFade = useTransform(scrollYProgress, (v) => {
    if (!pinRef.current) return 1
    const hide = smoothstep(0.4, 0.52, v)
    const show = smoothstep(0.72, 0.88, v)
    return 1 - hide * (1 - show)
  })
  const floorWash = useTransform(dock, (t) => t)

  const nearest = sweep.reduce((best, item) =>
    Math.abs(item.at - angle) < Math.abs(best.at - angle) ? item : best,
  )

  function aimFromPointer(clientX: number, clientY: number) {
    const node = windowRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    aimX.set(clamp01((clientX - rect.left) / rect.width))
    aimY.set(clamp01((clientY - rect.top) / rect.height))
  }

  function beginHover(clientX: number, clientY: number) {
    hoveringRef.current = true
    aimFromPointer(clientX, clientY)
  }

  function endHover() {
    hoveringRef.current = false
    restXRef.current = aimX.get()
    restYRef.current = aimY.get()
    phaseRef.current = 0
  }

  function nudge(dx: number, dy = 0) {
    const nextX = clamp01(aimX.get() + dx)
    const nextY = clamp01(aimY.get() + dy)
    aimX.set(nextX)
    aimY.set(nextY)
    restXRef.current = nextX
    restYRef.current = nextY
    phaseRef.current = 0
  }

  useMotionValueEvent(springX, 'change', (value) => {
    const now = performance.now()
    if (now - lastAnglePaint.current < 80) return
    lastAnglePaint.current = now
    setAngle(value * MAX_ANGLE)
  })

  useMotionValueEvent(dock, 'change', (value) => {
    setCopyDocked(value > 0.42)
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const shouldDock = !pinRef.current || value >= 0.58
    if (shouldDock === dockedRef.current) return
    dockedRef.current = shouldDock
    dockAnim.current?.stop()
    if (reduce) {
      dock.set(shouldDock ? 1 : 0)
      return
    }
    dockAnim.current = animate(dock, shouldDock ? 1 : 0, {
      duration: phoneRef.current ? 2.05 : 2.85,
      ease: easeHeroSettle,
    })
  })

  useEffect(() => {
    if (!pin) {
      dockedRef.current = true
      dock.set(1)
      setCopyDocked(true)
    }
  }, [pin, dock])

  useEffect(() => {
    return () => {
      dockAnim.current?.stop()
    }
  }, [])

  useEffect(() => {
    const node = windowRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useAnimationFrame((_, dt) => {
    if (!inViewRef.current || hoveringRef.current || reduce) return
    phaseRef.current += dt / IDLE_PERIOD
    const wave = Math.sin(phaseRef.current * Math.PI * 2)
    aimX.set(clamp01(restXRef.current + IDLE_SPAN_X * wave))
    aimY.set(
      clamp01(
        restYRef.current +
          IDLE_SPAN_Y * Math.sin(phaseRef.current * Math.PI * 2 * 0.82 + 1.15),
      ),
    )
  })

  const windowMotion = pin
    ? {
        width: windowWidth,
        height: windowHeight,
        borderRadius: windowRadius,
        boxShadow: windowShadow,
      }
    : undefined

  return (
    <section id="experience" className="experience-wash scroll-mt-24">
      <PagePad className="pt-28 pb-2 md:pt-36 md:pb-2 lg:pt-44 lg:pb-2">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between">
          <Reveal>
            <p className="font-display text-[clamp(2.35rem,4.2vw,3.6rem)] leading-none font-light text-aqua/80">
              Living
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <SweepGraphic
              angle={angle}
              className="relative h-[9rem] w-[9rem] text-lagoon md:h-[12.5rem] md:w-[12.5rem] lg:h-[15.5rem] lg:w-[15.5rem]"
            />
          </Reveal>
        </div>
      </PagePad>

      <div
        ref={trackRef}
        className={
          pin
            ? 'relative -mt-16 h-[320vh] md:-mt-24 lg:-mt-32'
            : 'mt-10 px-6 pb-24 md:mt-12 md:px-12 md:pb-32 lg:mt-14 lg:px-20'
        }
      >
        <div
          className={
            pin
              ? 'sticky top-0 flex h-dvh items-center justify-center overflow-visible'
              : 'relative'
          }
        >
          <figure
            className={
              pin ? 'flex h-full w-full items-center justify-center' : undefined
            }
          >
            <motion.div
              ref={windowRef}
              role="slider"
              tabIndex={0}
              aria-label="Panorama around the residence"
              aria-valuemin={0}
              aria-valuemax={MAX_ANGLE}
              aria-valuenow={Math.round(angle)}
              aria-valuetext={`${Math.round(angle)} degrees, ${nearest.mark}`}
              className={cn(
                'experience-window relative overflow-hidden touch-pan-y outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70',
                pin && 'experience-window-pin shrink-0',
              )}
              style={windowMotion}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') {
                  beginHover(event.clientX, event.clientY)
                }
              }}
              onPointerMove={(event) => {
                if (event.pointerType === 'mouse') {
                  if (hoveringRef.current) {
                    aimFromPointer(event.clientX, event.clientY)
                  }
                  return
                }
                if (hoveringRef.current) {
                  aimFromPointer(event.clientX, event.clientY)
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') endHover()
              }}
              onPointerDown={(event) => {
                if (event.pointerType === 'mouse') return
                beginHover(event.clientX, event.clientY)
              }}
              onPointerUp={(event) => {
                if (event.pointerType === 'mouse') return
                endHover()
              }}
              onPointerCancel={(event) => {
                if (event.pointerType === 'mouse') return
                endHover()
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                  event.preventDefault()
                  nudge(-KEY_STEP)
                } else if (event.key === 'ArrowRight') {
                  event.preventDefault()
                  nudge(KEY_STEP)
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  nudge(0, -KEY_STEP)
                } else if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  nudge(0, KEY_STEP)
                }
              }}
            >
              <motion.img
                src={photos.living}
                alt="Living and dining behind wrap-around glass, Miami at dusk"
                className="experience-view pointer-events-none absolute top-0 left-0 object-cover"
                style={{
                  width: `${viewWidth * 100}%`,
                  height: `${viewHeight * 100}%`,
                  objectPosition: '46% 54%',
                  x: imgX,
                  y: imgY,
                }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[5] bg-ink"
                style={{ opacity: veil }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42%] bg-gradient-to-t from-ink/55 to-transparent"
                style={{ opacity: floorWash }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-5 right-4 z-10 text-right text-white md:top-7 md:right-6 lg:right-8"
                style={{ opacity: markFade }}
              >
                <p className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-none font-light tabular-nums [text-shadow:0_10px_32px_rgba(18,42,58,0.5)]">
                  {Math.round(angle)}°
                </p>
                <p className="mt-2 text-[0.62rem] tracking-[0.26em] text-white/80 uppercase [text-shadow:0_6px_18px_rgba(18,42,58,0.4)]">
                  {nearest.mark}
                </p>
              </motion.div>

              <motion.div
                className={cn(
                  'pointer-events-none absolute z-20 max-w-lg origin-center px-8 py-8 md:max-w-xl md:px-12 md:py-10',
                  copyDocked ? 'text-left' : 'text-center',
                )}
                style={{
                  left: copyLeft,
                  top: copyTop,
                  x: copyX,
                  y: copyY,
                  scale: copyScale,
                  opacity: copyIn,
                  willChange: 'transform',
                }}
              >
                <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.12] font-light text-white [text-shadow:0_10px_32px_rgba(18,42,58,0.45)]">
                  The horizon follows you
                </h2>
                <p className="mt-4 text-[1.05rem] leading-[1.8] text-white/85 [text-shadow:0_8px_24px_rgba(18,42,58,0.35)]">
                  Living and dining behind a single wrap of glass. From morning
                  coffee to dinner, Miami stays in the room with you.
                </p>
              </motion.div>
            </motion.div>
            {pin ? null : (
              <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
                Living & dining · wrap-around glass
              </figcaption>
            )}
          </figure>
        </div>
      </div>

      <PagePad className="pt-6 pb-24 md:pt-10 md:pb-32">
        <ul className="grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-3 md:pt-12">
          {moments.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={0.06 * i}>
                <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
                  {item.title}
                </p>
                <p className="mt-2 font-display text-[1.35rem] leading-snug font-light text-ink md:text-[1.5rem]">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </PagePad>
    </section>
  )
}
