import { useLayoutEffect, useRef } from 'react'
import { DiscoverResidence } from './DiscoverResidence'
import { RetreatBedrooms } from './RetreatBedrooms'

export function DiscoverRetreatStack() {
  const stackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const apply = () => {
      const discover = stack.querySelector<HTMLElement>('#discover')
      const retreat = stack.querySelector<HTMLElement>('#retreat')
      if (!discover || !retreat) return

      if (!discover.classList.contains('discover-pin')) {
        stack.style.removeProperty('--stack-h')
        return
      }

      const extra = Math.max(0, discover.offsetHeight - window.innerHeight)
      stack.style.setProperty('--stack-h', `${retreat.scrollHeight + extra}px`)
    }

    apply()
    const retreat = stack.querySelector('#retreat')
    const discover = stack.querySelector('#discover')
    const observer = new ResizeObserver(apply)
    if (retreat) observer.observe(retreat)
    if (discover) observer.observe(discover)
    window.addEventListener('resize', apply)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [])

  return (
    <div ref={stackRef} className="discover-retreat-stack">
      <DiscoverResidence />
      <RetreatBedrooms />
    </div>
  )
}
