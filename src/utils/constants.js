// App Configuration
export const APP_CONFIG = {
  name: 'Songe Yume',
  description: 'Ma bibliothèque virtuelle personnelle',
  version: '1.0.0'
}

// Theme Colors
export const COLORS = {
  background: '#151823',
  textLight: '#dde5f2',
  accent: '#e09e29',
  cardBg: '#1e2230',
  cardHover: '#252938'
}

// Rating Configuration
export const RATING = {
  min: 0,
  max: 5,
  step: 0.5
}

// Chart Colors for Statistics
export const CHART_COLORS = [
  '#e09e29',
  '#f5b557',
  '#f8c978',
  '#fbd899',
  '#151823',
  '#2a2f45',
  '#3d4463',
  '#505881'
]

// Navigation Items
export const NAV_ITEMS = [
  { path: '/', label: 'Accueil' },
  { path: '/library', label: 'Bibliothèque' },
  { path: '/stats', label: 'Statistiques' },
  { path: '/about', label: 'À propos' }
]

// Book Status
export const BOOK_STATUS = {
  PUBLISHED_INSTAGRAM: 'publishedOnInstagram',
  PUBLISHED_BABELIO: 'publishedOnBabelio'
}

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0 }
  },
  stagger: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}

// Date Format Options
export const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

