import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { photos } from '../../data/images'
import { easeHeroSettle } from '../../lib/motion'
import { useMedia } from '../../hooks/useMedia'

export function Hero() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const [settled, setSettled] = useState(!!reduce)

  const hold = phone ? 0.55 : 0.75
  const move = phone ? 2.05 : 2.85
  const start = phone
    ? { opacity: 0, x: 6, y: '-28vh', scale: 1.1 }
    : { opacity: 0, x: '13.5vw', y: '-24vh', scale: 1.4 }
  const rest = { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <section id="arrive" className="relative h-dvh min-h-[640px] overflow-hidden">
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px) and (orientation: portrait)"
          srcSet={photos.facade}
          type="image/webp"
        />
        <img
          src={photos.aerialCabana}
          alt="Akoya Miami Beach — private residence above the Atlantic"
          className="hero-photo photo-drift absolute inset-0 h-full w-full max-w-none object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="photo-veil pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
        <motion.div
          initial={reduce ? false : start}
          animate={rest}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: { duration: phone ? 0.45 : 0.65, ease: 'easeOut' },
                  x: { delay: hold, duration: move, ease: easeHeroSettle },
                  y: { delay: hold, duration: move, ease: easeHeroSettle },
                  scale: { delay: hold, duration: move, ease: easeHeroSettle },
                }
          }
          onAnimationComplete={() => setSettled(true)}
          style={{ willChange: settled ? 'auto' : 'transform' }}
          className="w-fit max-w-4xl origin-center"
        >
          <p className="mb-4 text-[0.72rem] font-medium tracking-[0.38em] text-aqua uppercase">
            Arrive
          </p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.02] font-light text-white [text-shadow:0_8px_32px_rgba(20,52,58,0.45)]">
            A Private Residence Above Miami Beach
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-white/88 [text-shadow:0_8px_24px_rgba(20,52,58,0.4)]">
            Three private floors. A private rooftop. A private Beach House. The
            Atlantic, the bay and the skyline in one uninterrupted view.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
