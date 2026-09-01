import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  pricingFacts,
  understandMasthead,
  understandStay,
} from '../../data/copy'
import { photos } from '../../data/images'
import { cn } from '../../lib/cn'
import { easeOutLuxury } from '../../lib/motion'
import { onHashClick } from '../../lib/scrollTo'
import { PagePad } from '../ui/PagePad'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const DAYS = understandStay.days

type PricingFact = (typeof pricingFacts)[number]

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

function stayT(v: number) {
  return smoothstep(0.02, 0.94, v)
}

export function UnderstandPricing() {
  const reduce = useReducedMotion()

  return (
    <section id="understand" className="understand-wash scroll-mt-24">
      <Tower still={!!reduce} />
      <TermsFolio still={!!reduce} />
    </section>
  )
}

function Tower({ still = false }: { still?: boolean }) {
  const towerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: towerRef,
    offset: ['start end', 'end start'],
  })
  const photoX = useTransform(scrollYProgress, (v) =>
    still ? '0%' : `${mix(0, -28, v)}%`,
  )

  return (
    <figure ref={towerRef} className="understand-tower">
      <motion.div className="understand-plate" style={{ x: photoX }}>
        <img
          src={photos.living}
          alt="Living room behind curved glass, Miami and the bay beyond"
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          style={{ objectPosition: '28% 54%' }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
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
  )
}

function TermsFolio({ still = false }: { still?: boolean }) {
  const stayRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stayRef,
    offset: ['start 0.9', 'end 0.38'],
  })
  const [day, setDay] = useState(() => (still ? DAYS : 1))
  const dayRef = useRef(day)
  const rule = useTransform(scrollYProgress, (v) => (still ? 1 : stayT(v)))

  useLayoutEffect(() => {
    if (still) return
    const next = Math.max(1, Math.round(stayT(scrollYProgress.get()) * DAYS))
    dayRef.current = next
    setDay(next)
  }, [still, scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (still) return
    const next = Math.max(1, Math.round(stayT(v) * DAYS))
    if (next === dayRef.current) return
    dayRef.current = next
    setDay(next)
  })

  return (
    <PagePad className="understand-folio pt-10 pb-16 md:pt-14 md:pb-20 lg:pb-[calc(18vh+5rem)]">
      <div className="understand-sheet">
        <div ref={stayRef} className="understand-stay">
          <StayScale day={day} still={still} />
          <StayLockup day={day} />
        </div>
        <motion.span
          className="understand-stay-rule"
          style={{ scaleX: rule }}
          aria-hidden="true"
        />

        <MastTitle still={still} />
        <MastAside still={still} />

        <ul className="understand-ledger">
          {pricingFacts.map((fact, index) => (
            <FactItem
              key={fact.title}
              fact={fact}
              index={index}
              still={still}
            />
          ))}
        </ul>

        <BleedPhoto />
      </div>
    </PagePad>
  )
}

function StayScale({ day, still }: { day: number; still: boolean }) {
  return (
    <div className="understand-stay-scale" aria-hidden="true">
      <div className="understand-days">
        {Array.from({ length: DAYS }, (_, index) => {
          const n = index + 1
          return (
            <span
              key={n}
              className={cn('understand-day', (still || n <= day) && 'is-ink')}
            />
          )
        })}
      </div>
    </div>
  )
}

function StayLockup({ day }: { day: number }) {
  return (
    <div className="understand-stay-lockup">
      <p className="understand-stay-label">{understandStay.label}</p>
      <p className="understand-nights" aria-live="polite">
        <span className="understand-nights-num">
          {String(day).padStart(2, '0')}
        </span>
        <span className="understand-nights-unit">{understandStay.unit}</span>
      </p>
    </div>
  )
}

function MastTitle({ still }: { still: boolean }) {
  const title = (
    <h2 className="understand-mast-heading">
      <span className="block">{understandMasthead.titleLines[0]}</span>
      <span className="block">{understandMasthead.titleLines[1]}</span>
    </h2>
  )

  return (
    <div className="understand-mast-title">
      {still ? (
        <Reveal>
          <SectionLabel light>{understandMasthead.label}</SectionLabel>
          {title}
        </Reveal>
      ) : (
        <>
          <SectionLabel light>{understandMasthead.label}</SectionLabel>
          <div className="understand-mast-mask">
            <motion.h2
              className="understand-mast-heading"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.95, ease: easeOutLuxury }}
            >
              <span className="block">{understandMasthead.titleLines[0]}</span>
              <span className="block">{understandMasthead.titleLines[1]}</span>
            </motion.h2>
          </div>
        </>
      )}
    </div>
  )
}

function MastAside({ still }: { still: boolean }) {
  const aside = (
    <>
      <p className="understand-mast-tagline">{understandMasthead.tagline}</p>
      <p className="understand-mast-index">
        <span className="understand-mast-index-num">
          {understandMasthead.index}
        </span>
        <span className="understand-mast-index-name">
          {understandMasthead.indexName}
        </span>
      </p>
    </>
  )

  return (
    <div className="understand-mast-aside">
      {still ? <Reveal delay={0.08}>{aside}</Reveal> : aside}
    </div>
  )
}

function FactItem({
  fact,
  index,
  still,
}: {
  fact: PricingFact
  index: number
  still: boolean
}) {
  const href = 'href' in fact ? fact.href : undefined
  const hero = 'hero' in fact && fact.hero
  const delay = index * 0.08
  const mark = String(index + 1).padStart(2, '0')

  const body = (
    <>
      <motion.p
        className="understand-fact-num"
        variants={still ? undefined : fadeNum}
        custom={delay}
      >
        {mark}
      </motion.p>
      <div className="understand-fact-copy">
        <motion.p
          className={cn(
            'understand-fact-title',
            hero && 'understand-fact-title-hero',
          )}
          variants={still ? undefined : clipTitle}
          custom={delay}
        >
          {fact.title}
        </motion.p>
        <motion.p
          className="understand-fact-line"
          variants={still ? undefined : fadeLine}
          custom={delay}
        >
          {fact.line}
        </motion.p>
        <motion.span
          className="understand-fact-rule"
          variants={still ? undefined : growRule}
          custom={delay}
          aria-hidden="true"
        />
      </div>
      <span className="understand-fact-plus" aria-hidden="true">
        +
      </span>
    </>
  )

  const className = cn('understand-fact', hero && 'is-hero')

  if (still) {
    return (
      <li>
        <Reveal delay={index * 0.04}>
          {href ? (
            <a href={href} className={className} onClick={onHashClick}>
              {body}
            </a>
          ) : (
            <div className={className}>{body}</div>
          )}
        </Reveal>
      </li>
    )
  }

  return (
    <li>
      {href ? (
        <motion.a
          href={href}
          className={className}
          onClick={onHashClick}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {body}
        </motion.a>
      ) : (
        <motion.div
          className={className}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {body}
        </motion.div>
      )}
    </li>
  )
}

const fadeNum = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeOutLuxury },
  }),
}

const growRule = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.85, delay: delay + 0.12, ease: easeOutLuxury },
  }),
}

const clipTitle = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: (delay: number) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.9, delay: delay + 0.22, ease: easeOutLuxury },
  }),
}

const fadeLine = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: delay + 0.4, ease: easeOutLuxury },
  }),
}

function BleedPhoto() {
  return (
    <figure className="understand-bleed">
      <img
        src={photos.terraceWalk}
        alt="Private Sky Terrace walk above Miami Beach"
        className="understand-bleed-img"
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
