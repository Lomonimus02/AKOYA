export const ENQUIRY_EMAIL = 'enquiries@akoyapenthouse.com'

export const nav = [
  { href: '#discover', label: 'Residence' },
  { href: '#ascend', label: 'Sky Terrace' },
  { href: '#descend', label: 'Beach House' },
  { href: '#indulge', label: 'Amenities' },
] as const

export const floors = [
  {
    id: 'suites',
    mark: 'Suites',
    title: 'The Suites',
    href: '#retreat',
    body: 'The bedroom level is designed as a retreat above the city. Three bedrooms, expansive views, and private outdoor access.',
  },
  {
    id: 'living',
    mark: 'Living',
    title: 'Living & Dining',
    href: '#experience',
    body: 'The social heart of the home. Living and dining behind curved glass, with the Miami horizon continuously in view.',
  },
  {
    id: 'sky',
    mark: 'Sky',
    title: 'Sky Terrace',
    href: '#ascend',
    body: 'A private world at the highest level: glass-wrapped office, outdoor lounge, wet bar, and dedicated bathroom.',
  },
] as const

export type FloorId = (typeof floors)[number]['id']

export const heroFacts = [
  '$40,000 per month',
  '30-day minimum stay',
  'Furnished private residence',
  'Private rooftop Sky Terrace',
  'Private Beach House',
] as const

export const services = [
  'Professional cleaning service',
  'Welcome basket',
  '24-hour on-call assistance',
  'Bespoke concierge by arrangement',
  'Three allocated valet parking spaces',
  'Secured building access & front desk',
] as const

export const understandStay = {
  label: 'Minimum stay',
  unit: 'nights',
  days: 30,
}

export const understandMasthead = {
  label: 'Understand',
  titleLines: ['The terms', 'of residence'] as const,
  tagline: "Everything you need. Nothing you don't.",
  index: '02',
  indexName: 'Residence',
}

export const pricingFacts = [
  { title: 'Furnished', line: 'Fully furnished private residence' },
  { title: 'Three bedrooms', line: 'City, ocean, and a quieter third' },
  { title: 'Five bathrooms', line: 'Proportioned for guests who stay' },
  {
    title: 'Private rooftop',
    line: 'The Sky Terrace, yours alone',
    hero: true,
    href: '#ascend',
  },
  {
    title: 'Private Beach House',
    line: 'The Atlantic, a level below',
    hero: true,
    href: '#descend',
  },
  { title: 'Three parking spaces', line: 'Valet-held, always waiting' },
] as const
