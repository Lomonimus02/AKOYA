import { motion, useSpring, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[70] h-[2px] origin-left bg-aqua"
      style={{ scaleX }}
    />
  )
}
