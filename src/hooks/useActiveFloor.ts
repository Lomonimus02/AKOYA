import { useEffect, useState } from 'react'
import type { FloorNumber } from '../data/copy'

const SECTIONS = [
  { id: 'retreat', number: '46' as const },
  { id: 'experience', number: '47' as const },
  { id: 'ascend', number: '48' as const },
] as const

export function useActiveFloor() {
  const [active, setActive] = useState<FloorNumber | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const first = document.getElementById(SECTIONS[0].id)
      const probe = window.innerHeight * 0.36
      const showAt = window.innerHeight * 0.78
      const visibleNow = first
        ? first.getBoundingClientRect().top < showAt
        : false

      let next: FloorNumber | null = null
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) next = section.number
      }

      if (visibleNow && !next) next = SECTIONS[0].number

      setVisible(visibleNow)
      setActive(next)
    }

    let ticking = false
    let cancelled = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (!cancelled) update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelled = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { active, visible }
}
