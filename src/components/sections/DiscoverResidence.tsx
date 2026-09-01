import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
    src: photos.office,
    alt: 'Private office with aviator desk above the bay',
    position: '34% 44%',
    phonePosition: '40% 40%',
    desktopClass:
      'absolute inset-y-0 left-[14%] h-full w-[200%] min-h-full max-w-none object-cover',
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

const bladeDesktop = [
  'linear-gradient(105deg, transparent 36%, rgba(255,255,255,0.28) 38.4%, transparent 41%)',
  'linear-gradient(105deg, transparent 68%, rgba(255,255,255,0.22) 70.4%, transparent 73%)',
  'linear-gradient(-75deg, transparent 34%, rgba(255,255,255,0.16) 36.5%, transparent 39%)',
] as const

function shouldTapToReveal() {
  return (
    window.matchMedia('(max-width: 767px)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

export function DiscoverResidence() {
  const reduce = useReducedMotion()
  const phone = useMedia('(max-width: 767px)')
  const [open, setOpen] = useState<number | null>(null)
  const openRef = useRef<number | null>(null)
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setFloor = (index: number | null) => {
    openRef.current = index
    setOpen(index)
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
    }
  }, [])

  if (phone) {
    return (
      <section
        id="discover"
        className="discover-wash relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-ink"
        data-discover-photo="true"
      >
        {floors.map((floor, i) => {
          const shot = shots[i]
          const isOpen = open === i
          const dimmed = open !== null && !isOpen
          const grow = reduce ? 1 : isOpen ? 2.4 : dimmed ? 0.7 : 1

          return (
            <motion.div
              key={floor.number}
              initial={false}
              animate={{ flexGrow: grow }}
              transition={reduce ? { duration: 0 } : phoneGrowTransition}
              className="relative min-h-0 w-full overflow-hidden"
              style={{ flexBasis: 0, zIndex: isOpen ? 5 : 3 - i }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <img
                  src={shot.src}
                  alt=""
                  className="absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover"
                  style={{ objectPosition: shot.phonePosition }}
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
                <div className="w-full max-w-[20.5rem] pr-2">
                  <p
                    className={cn(
                      'font-display text-[2.75rem] leading-none font-light [text-shadow:0_10px_36px_rgba(20,52,58,0.45)]',
                      dimmed ? 'text-white/55' : 'text-white/92',
                    )}
                  >
                    {floor.number}
                  </p>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: reduce || isOpen ? 1 : 0,
                      maxHeight: reduce || isOpen ? 220 : 0,
                    }}
                    transition={reduce ? { duration: 0 } : fadeTransition}
                    className="overflow-hidden"
                  >
                    <p className="mt-2.5 font-display text-[1.35rem] leading-[1.15] font-light text-white [text-shadow:0_8px_28px_rgba(20,52,58,0.4)]">
                      {floor.title}
                    </p>
                    <p className="mt-2.5 text-[0.9rem] leading-[1.55] text-white/88 [text-shadow:0_8px_24px_rgba(20,52,58,0.35)]">
                      {floor.body}
                    </p>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          )
        })}
      </section>
    )
  }

  return (
    <section
      id="discover"
      className="discover-wash relative h-dvh min-h-[640px] overflow-hidden bg-ink"
      data-discover-photo="true"
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
            animate={{ clipPath: desktopClip }}
            transition={reduce ? { duration: 0 } : clipTransition}
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ zIndex: 3 - i, willChange: 'clip-path' }}
          >
            <img
              src={shot.src}
              alt=""
              className={shot.desktopClass}
              style={{ objectPosition: shot.position }}
              decoding="async"
            />
            <motion.div
              className="discover-shade absolute inset-0"
              initial={false}
              animate={{ opacity: isOpen ? 0.5 : dimmed ? 0.7 : 0.36 }}
              transition={reduce ? { duration: 0 } : fadeTransition}
            />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{ backgroundImage: bladeDesktop[i] }}
            />
            <div className={cn('absolute z-10', copyClassDesktop[i])}>
              <p
                className={cn(
                  'font-display text-5xl leading-none font-light transition-colors duration-1000 ease-out [text-shadow:0_10px_36px_rgba(20,52,58,0.45)] lg:text-7xl',
                  dimmed ? 'text-white/55' : 'text-white/92',
                )}
              >
                {floor.number}
              </p>
              <motion.div
                initial={false}
                animate={{
                  opacity: reduce || isOpen ? 1 : 0,
                  y: reduce || isOpen ? 0 : 10,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { ...fadeTransition, delay: isOpen ? 0.12 : 0 }
                }
                className="mt-3"
              >
                <p className="font-display text-[clamp(1.25rem,2.2vw,2.15rem)] leading-[1.12] font-light text-white [text-shadow:0_8px_28px_rgba(20,52,58,0.4)]">
                  {floor.title}
                </p>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-white/86 [text-shadow:0_8px_24px_rgba(20,52,58,0.35)]">
                  {floor.body}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )
      })}

      {floors.map((floor, i) => (
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
      ))}
    </section>
  )
}
