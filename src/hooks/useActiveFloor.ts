import { useEffect, useState } from 'react'
import type { FloorId } from '../data/copy'

const SECTIONS = [
  { id: 'retreat', floor: 'suites' as const },
  { id: 'experience', floor: 'living' as const },
  { id: 'ascend', floor: 'sky' as const },
] as const

export function useActiveFloor() {
  const [active, setActive] = useState<FloorId | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const first = document.getElementById(SECTIONS[0].id)
      const probe = window.innerHeight * 0.36
      const showAt = window.innerHeight * 0.78
      let visibleNow = first
        ? first.getBoundingClientRect().top < showAt
        : false

      const understand = document.getElementById('understand')
      if (understand && understand.getBoundingClientRect().top < window.innerHeight * 0.82) {
        visibleNow = false
      }

      let next: FloorId | null = null
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) next = section.floor
      }

      if (visibleNow && !next) next = SECTIONS[0].floor

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
