import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { SectionLabel } from './SectionLabel'

type Props = {
  label: string
  title: ReactNode
  body?: string
  kicker?: string
  onDark?: boolean
}

export function SectionCopy({ label, title, body, kicker, onDark = false }: Props) {
  return (
    <div className="max-w-lg">
      {kicker ? (
        <p
          className={cn(
            'mb-2 font-display text-6xl leading-none font-light md:text-7xl',
            onDark ? 'text-white/45' : 'text-aqua/80',
          )}
        >
          {kicker}
        </p>
      ) : null}
      <SectionLabel light={!onDark} className={onDark ? 'text-aqua' : undefined}>
        {label}
      </SectionLabel>
      <h2
        className={cn(
          'font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.12] font-light',
          onDark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            'mt-6 text-[1.05rem] leading-[1.8]',
            onDark ? 'text-white/85' : 'text-ink/75',
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}
