import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type MotionValue = {
  reduce: boolean
  phone: boolean
}

const MotionContext = createContext<MotionValue>({ reduce: false, phone: false })

function readMotion(): MotionValue {
  if (typeof window === 'undefined') return { reduce: false, phone: false }
  return {
    reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    phone: window.innerWidth < 768,
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<MotionValue>(readMotion)

  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setValue(readMotion())
    reduceMq.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    return () => {
      reduceMq.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  const memo = useMemo(() => value, [value.reduce, value.phone])
  return <MotionContext.Provider value={memo}>{children}</MotionContext.Provider>
}

export function useMotion() {
  return useContext(MotionContext)
}
