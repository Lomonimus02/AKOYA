import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

type FilmProps = {
  src: string
  alt: string
  className?: string
  position?: string
  priority?: boolean
}

export const Film = forwardRef<HTMLImageElement, FilmProps>(function Film(
  { src, alt, className, position = '50% 50%', priority = false },
  ref,
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn('film-plate', className)}
      style={{ objectPosition: position }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
    />
  )
})

