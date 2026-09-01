import { useActiveFloor } from '../../hooks/useActiveFloor'
import { cn } from '../../lib/cn'
import { AltitudeStave } from '../ui/AltitudeStave'

export function FloorNav() {
  const { active, visible } = useActiveFloor()

  return (
    <nav
      aria-label="Residence floors"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        'pointer-events-none fixed top-1/2 right-1 z-[60] hidden -translate-y-1/2 md:block md:right-2 lg:right-3',
        'transition-opacity duration-500',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <AltitudeStave
        compact
        interactive={visible}
        activeFloor={active}
        className="h-[14rem] w-[5.5rem] [filter:drop-shadow(0_2px_14px_rgba(245,251,250,0.72))] lg:h-[17.5rem] lg:w-[6.25rem]"
      />
    </nav>
  )
}
