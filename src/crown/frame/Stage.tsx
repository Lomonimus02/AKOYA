import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Film } from './Film'
import { useMotion } from '../cinema/motion'
import { cn } from '../../lib/cn'

type StageProps = {
  id?: string
  src: string
  alt: string
  position?: string
  priority?: boolean
  children?: ReactNode
  className?: string
}

export function Stage({
  id,
  src,
  alt,
  position = '50% 50%',
  priority = false,
  children,
  className,
}: StageProps) {
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const { reduce } = useMotion()

  useGSAP(
    () => {
      if (reduce || !img.current || !root.current) return
      gsap.fromTo(
        img.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        },
      )
    },
    { dependencies: [reduce, src], revertOnUpdate: true },
  )

  return (
    <section
      id={id}
      ref={root}
      className={cn('relative min-h-dvh overflow-hidden bg-dusk scroll-mt-20', className)}
    >
      <div className="absolute inset-0">
        <Film ref={img} src={src} alt={alt} position={position} priority={priority} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-dusk via-dusk/50 to-transparent" />
      {children ? (
        <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-16 md:px-20 md:pb-24">
          <div className="max-w-5xl text-bone">{children}</div>
        </div>
      ) : null}
    </section>
  )
}

export function Still({
  src,
  alt,
  position = '50% 50%',
  className,
  reveal = true,
}: {
  src: string
  alt: string
  position?: string
  className?: string
  reveal?: boolean
}) {
  const root = useRef<HTMLElement>(null)
  const { reduce } = useMotion()

  useGSAP(
    () => {
      if (!reveal || reduce || !root.current) return
      gsap.fromTo(
        root.current,
        { clipPath: 'inset(6% 6% 6% 6%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'top 42%',
            scrub: 0.8,
          },
        },
      )
    },
    { dependencies: [reduce, reveal, src], revertOnUpdate: true },
  )

  return (
    <figure ref={root} className={cn('w-full overflow-hidden bg-dusk', className)}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </figure>
  )
}
