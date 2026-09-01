import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutLuxury, reveal } from '../../lib/motion'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={reveal}
      transition={{ duration: 1.15, delay, ease: easeOutLuxury }}
    >
      {children}
    </motion.div>
  )
}
