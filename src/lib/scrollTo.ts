import type { MouseEvent as ReactMouseEvent } from 'react'

const EASE_X1 = 0.22
const EASE_Y1 = 1
const EASE_X2 = 0.36
const EASE_Y2 = 1

const INTERRUPT_KEYS = new Set([
  ' ',
  'Spacebar',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  'ArrowUp',
  'ArrowDown',
])

let rafId = 0
let detachInterrupt: (() => void) | null = null

function bezierCoeffs(p1: number, p2: number) {
  const c = 3 * p1
  const b = 3 * (p2 - p1) - c
  const a = 1 - c - b
  return { a, b, c }
}

const xCoeff = bezierCoeffs(EASE_X1, EASE_X2)
const yCoeff = bezierCoeffs(EASE_Y1, EASE_Y2)

function sampleBezier(coeff: { a: number; b: number; c: number }, t: number) {
  return ((coeff.a * t + coeff.b) * t + coeff.c) * t
}

function sampleBezierDerivative(coeff: { a: number; b: number; c: number }, t: number) {
  return (3 * coeff.a * t + 2 * coeff.b) * t + coeff.c
}

export function easeOutLuxuryProgress(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1

  let u = t
  for (let i = 0; i < 8; i++) {
    const x = sampleBezier(xCoeff, u) - t
    const dx = sampleBezierDerivative(xCoeff, u)
    if (Math.abs(x) < 1e-6) break
    if (Math.abs(dx) < 1e-6) break
    u -= x / dx
    if (u < 0 || u > 1) {
      u = Math.min(1, Math.max(0, u))
      break
    }
  }

  if (Math.abs(sampleBezier(xCoeff, u) - t) > 1e-6) {
    let lo = 0
    let hi = 1
    u = t
    for (let i = 0; i < 12; i++) {
      const x = sampleBezier(xCoeff, u)
      if (Math.abs(x - t) < 1e-6) break
      if (x < t) lo = u
      else hi = u
      u = (lo + hi) / 2
    }
  }

  return sampleBezier(yCoeff, u)
}

function clamp(min: number, preferred: number, max: number) {
  return Math.min(max, Math.max(min, preferred))
}

function toId(hash: string): string {
  const trimmed = hash.trim()
  const id = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed
  if (!id) return ''
  try {
    return decodeURIComponent(id)
  } catch {
    return id
  }
}

function samePageHash(anchor: HTMLAnchorElement): string | null {
  const raw = anchor.getAttribute('href')
  if (!raw) return null
  if (raw.startsWith('#')) return raw.length > 1 ? raw : null

  try {
    const url = new URL(raw, window.location.href)
    if (url.origin !== window.location.origin) return null
    if (url.pathname !== window.location.pathname) return null
    if (url.hash.length < 2) return null
    return url.hash
  } catch {
    return null
  }
}

function isModifiedClick(event: ReactMouseEvent<HTMLAnchorElement> | MouseEvent) {
  if ('button' in event && event.button !== 0) return true
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

/** Same-page hash from a primary unmodified click, else null (let the browser handle it). */
export function hashFromClick(
  event: ReactMouseEvent<HTMLAnchorElement> | MouseEvent,
): string | null {
  if (isModifiedClick(event)) return null
  const anchor = anchorFromEvent(event)
  if (!anchor) return null
  return samePageHash(anchor)
}

function anchorFromEvent(
  event: ReactMouseEvent<HTMLAnchorElement> | MouseEvent,
): HTMLAnchorElement | null {
  const current = event.currentTarget
  if (current instanceof HTMLAnchorElement) return current
  const target = event.target
  if (target instanceof Element) return target.closest('a')
  return null
}

function maxScrollY() {
  const el = document.scrollingElement ?? document.documentElement
  return Math.max(0, el.scrollHeight - window.innerHeight)
}

function syncHash(id: string) {
  const next = `#${id}`
  if (window.location.hash !== next) {
    history.pushState(null, '', next)
  }
}

function cancelInFlight() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  if (detachInterrupt) {
    const detach = detachInterrupt
    detachInterrupt = null
    detach()
  }
}

function onInterruptKey(event: Event) {
  if (!(event instanceof KeyboardEvent)) return
  if (INTERRUPT_KEYS.has(event.key)) cancelInFlight()
}

function attachInterrupt() {
  const ac = new AbortController()
  const opts: AddEventListenerOptions = { passive: true, signal: ac.signal }
  window.addEventListener('wheel', cancelInFlight, opts)
  window.addEventListener('touchstart', cancelInFlight, opts)
  window.addEventListener('pointerdown', cancelInFlight, opts)
  window.addEventListener('keydown', onInterruptKey, opts)
  detachInterrupt = () => ac.abort()
}

function animateScroll(start: number, end: number) {
  const delta = Math.abs(end - start)
  const duration = Math.round(clamp(1100, 720 + delta * 0.42, 1900))
  let startTime = 0

  attachInterrupt()

  const tick = (now: number) => {
    if (!startTime) startTime = now
    const t = Math.min(1, (now - startTime) / duration)
    const y = start + (end - start) * easeOutLuxuryProgress(t)
    window.scrollTo(window.scrollX, y)
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
      return
    }
    rafId = 0
    cancelInFlight()
  }

  rafId = requestAnimationFrame(tick)
}

export function scrollToHash(hash: string): void {
  const id = toId(hash)
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return

  cancelInFlight()

  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })

  const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const unclamped = el.getBoundingClientRect().top + window.scrollY - offset
  const end = clamp(0, unclamped, maxScrollY())
  const start = window.scrollY || window.pageYOffset

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: end, left: window.scrollX, behavior: 'auto' })
    syncHash(id)
    return
  }

  if (Math.abs(end - start) < 1) {
    syncHash(id)
    return
  }

  syncHash(id)
  animateScroll(start, end)
}

export function onHashClick(
  event: ReactMouseEvent<HTMLAnchorElement> | MouseEvent,
): void {
  const hash = hashFromClick(event)
  if (!hash) return
  event.preventDefault()
  scrollToHash(hash)
}
