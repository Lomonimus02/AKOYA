import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { photos } from '../../data/images'
import { useMedia } from '../../hooks/useMedia'
import { cn } from '../../lib/cn'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

const MAX_ANGLE = 270
const VIEW_WIDTH_DESKTOP = 1.4
const VIEW_WIDTH_PHONE = 2.45
const IDLE_SPAN = 16
const IDLE_PERIOD = 20000

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
      <p className="absolute inset-0 flex items-center justify-center font-display text-[clamp(3.4rem,7vw,6.4rem)] leading-none font-light tracking-[-0.04em] text-lagoon tabular-nums">
        {Math.round(span)}°
      </p>
    </div>
  )
}

export function ExperienceLiving() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const windowRef = useRef<HTMLDivElement>(null)
  const restRef = useRef(120)
  const phaseRef = useRef(0)
  const draggingRef = useRef(false)
  const [angle, setAngle] = useState(120)
  const [dragging, setDragging] = useState(false)
  const [inView, setInView] = useState(false)

  const viewWidth = phone ? VIEW_WIDTH_PHONE : VIEW_WIDTH_DESKTOP
  const panMax = -((viewWidth - 1) / viewWidth) * 100

  const nearest = sweep.reduce((best, item) =>
    Math.abs(item.at - angle) < Math.abs(best.at - angle) ? item : best,
  )
  const look = (angle / MAX_ANGLE) * 100

  function lookTo(value: number) {
    const next = Math.min(MAX_ANGLE, Math.max(0, value))
    restRef.current = next
    phaseRef.current = 0
    setAngle(next)
  }

  useEffect(() => {
    draggingRef.current = dragging
  }, [dragging])

  useEffect(() => {
    const node = windowRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || !inView) return

    let raf = 0
    let last = performance.now()
    let lastPaint = 0

    const loop = (now: number) => {
      const dt = now - last
      last = now
      if (!draggingRef.current) {
        phaseRef.current += dt / IDLE_PERIOD
        if (now - lastPaint >= 32) {
          lastPaint = now
          const wave = Math.sin(phaseRef.current * Math.PI * 2)
          const rest = restRef.current
          setAngle(
            Math.min(MAX_ANGLE, Math.max(0, rest + IDLE_SPAN * wave)),
          )
        }
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce, inView])

  return (
    <section id="experience" className="experience-wash scroll-mt-24">
      <PagePad className="pt-32 md:pt-44 lg:pt-56">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <SectionCopy
              kicker="47"
              label="Experience"
              title="The horizon follows you"
              body="Living and dining behind a single wrap of glass. From morning coffee to dinner, Miami stays in the room with you."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SweepGraphic
              angle={angle}
              className="relative h-[10rem] w-[10rem] text-lagoon md:h-[14rem] md:w-[14rem] lg:h-[17.5rem] lg:w-[17.5rem]"
            />
          </Reveal>
        </div>
      </PagePad>

      <div className="mt-24 px-6 pb-24 md:mt-32 md:px-12 md:pb-32 lg:mt-36 lg:px-20">
        <Reveal>
          <figure>
            <div
              ref={windowRef}
              className="experience-window relative overflow-hidden"
            >
              <img
                src={photos.living}
                alt="Living and dining behind wrap-around glass, Miami at dusk"
                className="experience-view absolute inset-y-0 left-0 h-full object-cover"
                style={{
                  width: `${viewWidth * 100}%`,
                  objectPosition: '46% 58%',
                  transform: `translate3d(${(panMax * angle) / MAX_ANGLE}%, 0, 0)`,
                }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent px-5 pb-4 pt-20 md:px-8 md:pb-5">
                <div className="mb-1 flex justify-between gap-2">
                  {sweep.map((item) => (
                    <button
                      key={item.at}
                      type="button"
                      onClick={() => lookTo(item.at)}
                      className={cn(
                        'min-w-0 bg-transparent p-0 text-left transition-colors',
                        nearest.at === item.at
                          ? 'text-white'
                          : 'text-white/55 hover:text-white/80',
                      )}
                      aria-label={`Look ${item.at} degrees, ${item.mark}`}
                      aria-pressed={nearest.at === item.at}
                    >
                      <span className="font-display text-[0.82rem] leading-none tabular-nums md:text-base">
                        {item.at}°
                      </span>
                      <span className="mt-1.5 hidden text-[0.58rem] tracking-[0.22em] uppercase sm:block">
                        {item.mark}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min={0}
                  max={MAX_ANGLE}
                  step={0.1}
                  value={angle}
                  onChange={(event) => lookTo(Number(event.target.value))}
                  onPointerDown={() => {
                    restRef.current = angle
                    phaseRef.current = 0
                    setDragging(true)
                  }}
                  onPointerUp={() => setDragging(false)}
                  onPointerCancel={() => setDragging(false)}
                  onLostPointerCapture={() => setDragging(false)}
                  aria-label="Panorama around the residence"
                  aria-valuemin={0}
                  aria-valuemax={MAX_ANGLE}
                  aria-valuenow={Math.round(angle)}
                  aria-valuetext={`${Math.round(angle)} degrees, ${nearest.mark}`}
                  className="experience-sweep mt-1"
                  style={{ ['--sweep' as string]: `${look}%` }}
                />
              </div>
            </div>
            <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
              Living & dining · wrap-around glass
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-12 grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-3 md:mt-16 md:pt-12">
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
      </div>
    </section>
  )
}
