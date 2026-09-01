import { cn } from '../../lib/cn'

type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  captionClassName?: string
  ken?: boolean
  priority?: boolean
  objectPosition?: string
  stretch?: boolean
}

export function Photo({
  src,
  alt,
  caption,
  className,
  imgClassName,
  captionClassName,
  ken = true,
  priority = false,
  objectPosition,
  stretch = false,
}: Props) {
  return (
    <figure className={cn(stretch && 'flex h-full flex-col', className)}>
      <div
        className={
          stretch
            ? 'relative min-h-[50vh] flex-1 overflow-hidden'
            : 'h-full overflow-hidden'
        }
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full max-w-none object-cover',
            stretch ? 'absolute inset-0 h-full' : 'h-full',
            ken && 'photo-drift',
            imgClassName,
          )}
          style={objectPosition ? { objectPosition } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
      {caption ? (
        <figcaption
          className={cn(
            'mt-3 shrink-0 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase',
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
