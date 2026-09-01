import { indexLinks } from '../data/copy'

export function SiteHeader({
  indexOpen,
  onToggleIndex,
}: {
  indexOpen: boolean
  onToggleIndex: () => void
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-dusk/80 to-transparent">
      <div className="flex h-20 items-center justify-between px-6 md:px-20">
        <a
          href="#arrive"
          className="pointer-events-auto font-mark text-[0.82rem] font-semibold tracking-[0.42em] text-bone"
        >
          AKOYA
        </a>
        <nav className="pointer-events-auto hidden items-center gap-9 md:flex">
          {indexLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.72rem] font-light text-bone/70"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="pointer-events-auto text-[0.72rem] text-bone md:hidden"
          onClick={onToggleIndex}
          aria-expanded={indexOpen}
        >
          {indexOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}

export function IndexOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-dusk px-6 pb-16 pt-24 md:hidden">
      <nav className="flex flex-col gap-5">
        {indexLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-display text-5xl italic text-bone"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
