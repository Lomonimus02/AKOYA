import { useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(useGSAP, ScrollTrigger)

let lenis: Lenis | null = null

function isIos() {
  return (
    /iP(ad|hone|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export function scrollToScene(id: string, instant = false) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, { duration: instant ? 0 : 1.05, immediate: instant, offset: -8 })
    return
  }

  el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' })
}

export function EngineProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    const ios = isIos()

    document.documentElement.dataset.motion = reduce ? 'reduce' : 'full'

    let ticker: ((time: number) => void) | undefined

    if (!reduce && fine && !ios) {
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
      })
      lenis.on('scroll', ScrollTrigger.update)
      ticker = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)
      document.documentElement.dataset.engine = 'lenis'
    } else {
      document.documentElement.dataset.engine = 'native'
    }

    const refresh = () => ScrollTrigger.refresh()
    const consumeHash = () => {
      const id = window.location.hash.replace('#', '')
      if (!id) return
      scrollToScene(id, true)
    }

    const ready = () => {
      refresh()
      consumeHash()
    }

    void document.fonts.ready.then(ready)
    window.addEventListener('load', ready)

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const id = link.hash.slice(1)
      if (!id) return
      event.preventDefault()
      history.pushState(null, '', `#${id}`)
      scrollToScene(id, reduce)
    }

    const onPop = () => {
      const id = window.location.hash.replace('#', '')
      if (id) scrollToScene(id, true)
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('load', ready)
      if (ticker) gsap.ticker.remove(ticker)
      gsap.ticker.lagSmoothing(500, 33)
      lenis?.destroy()
      lenis = null
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return children
}
