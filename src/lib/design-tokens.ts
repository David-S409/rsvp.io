/**
 * Design Tokens
 *
 * Central location for brand colors, spacing, and design decisions
 */

export const brandColors = {
  primary: 'orange-600', // Primary brand color
  primaryHover: 'orange-700',
  primaryLight: 'orange-500',
  primaryDark: 'orange-800',
  accent: 'orange-50',
  accentHover: 'orange-100',
} as const

export const spacing = {
  section: 'py-20 lg:py-28',
  container: 'container mx-auto px-4 lg:px-6',
  cardGap: 'gap-6',
  contentGap: 'gap-12',
} as const

export const typography = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm',
  lead: 'text-lg md:text-xl lg:text-2xl',
} as const

export const logoDefaults = {
  color: 'orange' as const,
  size: 'md' as const,
} as const

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
} as const
