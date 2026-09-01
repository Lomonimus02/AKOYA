import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMotion } from '../cinema/motion'

export function AltitudeRail() {
  const fill = useRef<HTMLDivElement>(null)
  const { reduce, phone } = useMotion()

  useGSAP(
    () => {
      if (reduce || phone || !fill.current) return
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
          },
        },
      )
    },
    { dependencies: [reduce, phone], revertOnUpdate: true },
  )

  if (phone) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-[16vh] left-5 z-40 h-[68vh] w-px origin-top bg-bone/10 md:left-7"
    >
      <div ref={fill} className="h-full origin-top bg-gilt" />
    </div>
  )
}
