import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { nav } from '../../data/copy'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { easeOutLuxury } from '../../lib/motion'
import { hashFromClick, scrollToHash } from '../../lib/scrollTo'

export function SiteHeader() {
  const scrolled = useScrolled(72)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleHashClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = hashFromClick(event)
    if (!hash) return
    event.preventDefault()
    if (open) {
      const overlay =
        event.currentTarget.closest('[data-mobile-menu]') ??
        document.querySelector('[data-mobile-menu]')
      if (overlay instanceof HTMLElement) overlay.style.pointerEvents = 'none'
      setOpen(false)
      document.body.style.overflow = ''
      void document.body.offsetHeight
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(hash))
      })
      return
    }
    scrollToHash(hash)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[90] transition-[background,box-shadow] duration-500',
          scrolled || open
            ? 'bg-foam/80 shadow-[0_1px_0_rgba(26,95,150,0.12)] backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 lg:px-16">
          <a href="#arrive" className="flex flex-col" onClick={handleHashClick}>
            <span
              className={cn(
                'font-display text-xl tracking-[0.4em]',
                scrolled || open ? 'text-lagoon' : 'text-white',
              )}
            >
              AKOYA
            </span>
            <span
              className={cn(
                'mt-0.5 text-[0.6rem] font-medium tracking-[0.28em] uppercase',
                scrolled || open ? 'text-lagoon/70' : 'text-white/80',
              )}
            >
              Miami Beach
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleHashClick}
                className={cn(
                  'text-[0.68rem] font-medium tracking-[0.24em] uppercase transition-colors',
                  scrolled
                    ? 'text-ink/70 hover:text-lagoon'
                    : 'text-white/85 hover:text-white',
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enquire"
              onClick={handleHashClick}
              className={cn(
                'border px-4 py-2 text-[0.68rem] font-medium tracking-[0.24em] uppercase transition-colors',
                scrolled
                  ? 'border-lagoon text-lagoon hover:bg-lagoon hover:text-white'
                  : 'border-white/80 text-white hover:bg-white hover:text-lagoon',
              )}
            >
              Enquire
            </a>
          </nav>

          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                'absolute right-2 left-2 h-px transition-transform duration-500',
                scrolled || open ? 'bg-lagoon' : 'bg-white',
                open ? 'top-5 rotate-45' : 'top-3.5',
              )}
            />
            <span
              className={cn(
                'absolute top-5 right-2 left-2 h-px transition-opacity duration-300',
                scrolled || open ? 'bg-lagoon' : 'bg-white',
                open ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'absolute right-2 left-2 h-px transition-transform duration-500',
                scrolled || open ? 'bg-lagoon' : 'bg-white',
                open ? 'top-5 -rotate-45' : 'top-[26px]',
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            data-mobile-menu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.35, ease: easeOutLuxury }}
            className="fixed inset-0 z-[80] flex flex-col justify-center bg-foam px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-7">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleHashClick}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i, duration: 0.5, ease: easeOutLuxury }}
                  className="font-display text-4xl text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#enquire"
                onClick={handleHashClick}
                className="mt-2 inline-flex w-fit border border-lagoon px-6 py-3 text-[0.72rem] tracking-[0.24em] text-lagoon uppercase"
              >
                Private Enquiries
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
