import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function PagePad({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-6 md:px-12 lg:px-20', className)}>{children}</div>
  )
}
