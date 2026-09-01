export const easeOutLuxury = [0.22, 1, 0.36, 1] as const

/** Linear travel with a soft landing in the last quarter */
export const easeHeroSettle = [0.22, 0.22, 0.75, 1] as const

export const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
}
