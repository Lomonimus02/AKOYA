export const ENQUIRY_EMAIL = 'enquiries@akoyapenthouse.com'

export const nav = [
  { href: '#discover', label: 'Residence' },
  { href: '#ascend', label: 'Sky Terrace' },
  { href: '#descend', label: 'Beach House' },
  { href: '#indulge', label: 'Amenities' },
] as const

export const floors = [
  {
    number: '46',
    title: 'The Private Suites',
    href: '#retreat',
    body: 'The bedroom level is designed as a retreat above the city. Three bedrooms, expansive views, and private outdoor access.',
  },
  {
    number: '47',
    title: 'The Living Residence',
    href: '#experience',
    body: 'The social heart of the home. Living and dining behind curved glass, with the Miami horizon continuously in view.',
  },
  {
    number: '48',
    title: 'Office & Sky Terrace',
    href: '#ascend',
    body: 'A private world at the highest level: glass-wrapped office, outdoor lounge, wet bar, and dedicated bathroom.',
  },
] as const

export type FloorNumber = (typeof floors)[number]['number']

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

export const pricingFacts = [
  'Furnished',
  'Three bedrooms',
  'Five bathrooms',
  'Private rooftop',
  'Private Beach House',
  'Three parking spaces',
] as const
