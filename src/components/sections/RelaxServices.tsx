import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { services } from '../../data/copy'
import { useMedia } from '../../hooks/useMedia'
import { PagePad } from '../ui/PagePad'
import { SectionCopy } from '../ui/SectionCopy'

const COUNT = services.length

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function protocolT(v: number) {
  return smoothstep(0.02, 0.94, v)
}

function writeT(v: number, i: number) {
  const p = protocolT(v)
  if (i === 0) return smoothstep(-0.18, 0.09, p)
  const start = i / COUNT
  return smoothstep(start, start + 0.68 / COUNT, p)
}

function waitT(v: number, i: number) {
  const p = protocolT(v)
  const start = i === 0 ? -0.08 : i / COUNT
  return smoothstep(start - 0.06, start, p)
}

export function RelaxServices() {
  const reduce = useReducedMotion()
  const pin = !reduce

  return (
    <section id="relax" className="relax-wash scroll-mt-24">
      {pin ? <ProtocolPin /> : <ProtocolStatic />}
    </section>
  )
}

function ProtocolPin() {
  const phone = useMedia('(max-width: 767px)')
  const trackRef = useRef<HTMLDivElement>(null)
  const markRef = useRef(1)
  const [mark, setMark] = useState(1)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(COUNT, Math.max(1, Math.floor(protocolT(v) * COUNT) + 1))
    if (next === markRef.current) return
    markRef.current = next
    setMark(next)
  })

  const ink = useTransform(scrollYProgress, (v) => protocolT(v))
  const bead = useTransform(scrollYProgress, (v) => `${protocolT(v) * 100}%`)
  const deskGlow = useTransform(scrollYProgress, (v) => {
    const phase = (protocolT(v) * COUNT) % 1
    return mix(0.16, 0.48, Math.sin(phase * Math.PI))
  })
  const deskTop = useTransform(scrollYProgress, (v) => {
    const i = Math.min(COUNT - 1, protocolT(v) * COUNT)
    return `${(i / COUNT) * 100 + 100 / COUNT / 2}%`
  })

  return (
    <div ref={trackRef} className="relative h-[240vh] md:h-[280vh]">
      <div className="relax-stage sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-24 pb-8">
        <PagePad className="md:pr-28 lg:pr-32">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <SectionCopy
              label="Relax"
              title="Luxury without the ordinary friction"
              body={
                phone
                  ? undefined
                  : 'Professional cleaning, a welcome basket and 24-hour on-call assistance are included. Concierge services by arrangement.'
              }
              className="max-w-xl"
              titleClassName="text-[clamp(1.7rem,3.4vw,2.7rem)]"
            />
            <p
              aria-hidden="true"
              className="hidden font-display text-[clamp(3.5rem,9vw,7rem)] leading-none font-light text-aqua/80 md:block"
            >
              {String(mark).padStart(2, '0')}
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <ProtocolStage
              progress={scrollYProgress}
              ink={ink}
              bead={bead}
              deskGlow={deskGlow}
              deskTop={deskTop}
            />
          </div>
        </PagePad>
      </div>
    </div>
  )
}

function ProtocolStage({
  progress,
  ink,
  bead,
  deskGlow,
  deskTop,
}: {
  progress: MotionValue<number>
  ink: MotionValue<number>
  bead: MotionValue<string>
  deskGlow: MotionValue<number>
  deskTop: MotionValue<string>
}) {
  return (
    <div className="relax-stage-grid">
      <div className="relax-stave-col" aria-hidden="true">
        <div className="relax-stave">
          <span className="relax-stave-rail" />
          <motion.span className="relax-stave-ink" style={{ scaleY: ink }} />
          <motion.span className="relax-stave-bead" style={{ top: bead }} />
        </div>
      </div>
      <div className="relax-ledger-wrap">
        <motion.span
          className="relax-desk"
          style={{ opacity: deskGlow, top: deskTop }}
          aria-hidden="true"
        />
        <ul aria-label="Included services" className="relax-ledger">
          {services.map((item, i) => (
            <ProtocolRow key={item} item={item} index={i} progress={progress} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProtocolRow({
  item,
  index,
  progress,
}: {
  item: string
  index: number
  progress: MotionValue<number>
}) {
  const clip = useTransform(progress, (v) => {
    return `inset(0 ${(1 - writeT(v, index)) * 100}% 0 0)`
  })
  const opacity = useTransform(progress, (v) => {
    return mix(0.14, 1, waitT(v, index))
  })
  const rule = useTransform(progress, (v) => writeT(v, index))
  const tracking = useTransform(progress, (v) => {
    return `${mix(0.2, 0.01, writeT(v, index))}em`
  })
  const titleY = useTransform(progress, (v) => mix(18, 0, writeT(v, index)))
  const focus = useTransform(progress, (v) => {
    const dist = Math.abs(protocolT(v) * COUNT - (index + 0.45))
    return mix(1, 1.06, 1 - clamp01(dist / 0.85))
  })

  return (
    <motion.li
      className="relax-row"
      style={{ top: `${(index / COUNT) * 100}%`, opacity }}
    >
      <p className="text-[0.62rem] tracking-[0.28em] text-lagoon uppercase">
        {String(index + 1).padStart(2, '0')}
      </p>
      <motion.p
        className="relax-row-title"
        style={{
          clipPath: clip,
          letterSpacing: tracking,
          y: titleY,
          scale: focus,
          transformOrigin: 'left center',
        }}
      >
        {item}
      </motion.p>
      <motion.span className="relax-rule" style={{ scaleX: rule }} aria-hidden="true" />
    </motion.li>
  )
}

function ProtocolStatic() {
  return (
    <PagePad className="pt-32 pb-24 md:pt-44 md:pb-32 lg:pt-56">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <SectionCopy
          label="Relax"
          title="Luxury without the ordinary friction"
          body="Professional cleaning, a welcome basket and 24-hour on-call assistance are included. Concierge services by arrangement."
        />
        <p
          aria-hidden="true"
          className="font-display text-[clamp(4.5rem,10vw,7rem)] leading-none font-light text-aqua/80"
        >
          06
        </p>
      </div>
      <ul
        aria-label="Included services"
        className="mt-16 grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-20 md:pt-12"
      >
        {services.map((item, i) => (
          <li key={item}>
            <p className="text-[0.68rem] tracking-[0.28em] text-lagoon uppercase">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-2 font-display text-[1.35rem] leading-snug font-light text-ink md:text-[1.5rem]">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </PagePad>
  )
}
