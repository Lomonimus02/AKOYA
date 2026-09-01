import { cn } from '../../lib/cn'

type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  ken?: boolean
  priority?: boolean
  objectPosition?: string
}

export function Photo({
  src,
  alt,
  caption,
  className,
  imgClassName,
  ken = true,
  priority = false,
  objectPosition,
}: Props) {
  return (
    <figure className={className}>
      <div className="h-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full max-w-none object-cover',
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
        <figcaption className="mt-3 text-[0.68rem] tracking-[0.2em] text-lagoon uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
