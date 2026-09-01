import { floors, type FloorId } from '../../data/copy'
import { cn } from '../../lib/cn'
import { onHashClick } from '../../lib/scrollTo'

export type { FloorId }

const FLOOR_MARKS = [
  { id: 'suites' as const, cy: 32, top: '13.3%' },
  { id: 'living' as const, cy: 120, top: '50%' },
  { id: 'sky' as const, cy: 208, top: '86.7%' },
] as const

function metaFor(id: FloorId) {
  return floors.find((floor) => floor.id === id)
}

export function AltitudeStave({
  activeFloor = 'suites',
  interactive = false,
  compact = false,
  className,
}: {
  activeFloor?: FloorId | null
  interactive?: boolean
  compact?: boolean
  className?: string
}) {
  const current = activeFloor ?? 'suites'

  return (
    <div
      className={cn('relative', className)}
      aria-hidden={interactive ? undefined : true}
    >
      <svg viewBox="0 0 120 240" className="h-full w-full" aria-hidden="true">
        <line
          x1="38"
          y1="16"
          x2="38"
          y2="224"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="1.5 7"
          className="text-aqua/50"
        />
        {FLOOR_MARKS.map((mark) =>
          current === mark.id ? (
            <circle
              key={mark.id}
              cx="38"
              cy={mark.cy}
              r="4.5"
              className="fill-lagoon"
            />
          ) : (
            <circle
              key={mark.id}
              cx="38"
              cy={mark.cy}
              r="3.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              className="text-aqua"
            />
          ),
        )}
      </svg>
      {FLOOR_MARKS.map((mark) => {
        const floor = metaFor(mark.id)
        const active = current === mark.id
        return (
          <p
            key={mark.id}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute left-[40%] -translate-y-1/2 font-sans leading-none font-medium tracking-[0.16em] uppercase',
              active
                ? compact
                  ? 'text-[0.72rem] text-lagoon'
                  : 'text-[0.82rem] text-lagoon'
                : compact
                  ? 'text-[0.62rem] text-aqua/75'
                  : 'text-[0.68rem] text-aqua/75',
            )}
            style={{ top: mark.top }}
          >
            {floor?.mark}
          </p>
        )
      })}
      {interactive
        ? FLOOR_MARKS.map((mark, i) => {
            const floor = metaFor(mark.id)
            if (!floor) return null
            const active = current === mark.id
            return (
              <a
                key={`${mark.id}-hit`}
                href={floor.href}
                onClick={onHashClick}
                aria-label={floor.title}
                aria-current={active ? 'location' : undefined}
                className="pointer-events-auto absolute z-10 cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lagoon"
                style={{
                  top: `${(i * 100) / FLOOR_MARKS.length}%`,
                  left: '8%',
                  right: '0%',
                  height: `${100 / FLOOR_MARKS.length}%`,
                }}
              />
            )
          })
        : null}
    </div>
  )
}
