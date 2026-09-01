import { floors, type FloorNumber } from '../../data/copy'
import { cn } from '../../lib/cn'
import { onHashClick } from '../../lib/scrollTo'

export type { FloorNumber }

const FLOOR_MARKS = [
  { number: '46' as const, cy: 32, top: '13.3%' },
  { number: '47' as const, cy: 120, top: '50%' },
  { number: '48' as const, cy: 208, top: '86.7%' },
] as const

function metaFor(number: FloorNumber) {
  return floors.find((floor) => floor.number === number)
}

export function AltitudeStave({
  activeFloor = '46',
  interactive = false,
  compact = false,
  className,
}: {
  activeFloor?: FloorNumber | null
  interactive?: boolean
  compact?: boolean
  className?: string
}) {
  const current = activeFloor ?? '46'

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
          current === mark.number ? (
            <circle
              key={mark.number}
              cx="38"
              cy={mark.cy}
              r="4.5"
              className="fill-lagoon"
            />
          ) : (
            <circle
              key={mark.number}
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
        const active = current === mark.number
        return (
          <p
            key={mark.number}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute left-[42%] -translate-y-1/2 font-display leading-none font-light tabular-nums',
              active
                ? compact
                  ? 'text-[1.55rem] tracking-[-0.04em] text-lagoon md:text-[1.85rem] lg:text-[2.2rem]'
                  : 'text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-[-0.04em] text-lagoon'
                : compact
                  ? 'text-[1.05rem] tracking-[-0.03em] text-aqua/75 md:text-[1.2rem] lg:text-[1.45rem]'
                  : 'text-[clamp(1.25rem,2.4vw,1.85rem)] tracking-[-0.03em] text-aqua/75',
            )}
            style={{ top: mark.top }}
          >
            {mark.number}
          </p>
        )
      })}
      {interactive
        ? FLOOR_MARKS.map((mark, i) => {
            const floor = metaFor(mark.number)
            if (!floor) return null
            const active = current === mark.number
            return (
              <a
                key={`${mark.number}-hit`}
                href={floor.href}
                onClick={onHashClick}
                aria-label={`${floor.number}. ${floor.title}`}
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
