import { cn } from '../../lib/cn'

type Props = {
  children: string
  light?: boolean
  className?: string
}

export function SectionLabel({ children, light = false, className }: Props) {
  return (
    <p
      className={cn(
        'mb-6 font-sans text-[0.72rem] font-medium uppercase tracking-[0.38em]',
        light ? 'text-lagoon' : 'text-aqua',
        className,
      )}
    >
      {children}
    </p>
  )
}
