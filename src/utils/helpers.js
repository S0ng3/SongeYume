// Format date to French locale
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Calculate average rating from books array
export const calculateAverageRating = (books) => {
  if (!books || books.length === 0) return 0
  const total = books.reduce((acc, book) => acc + book.rating, 0)
  return (total / books.length).toFixed(1)
}

// Filter books by search term
export const filterBooksBySearch = (books, searchTerm) => {
  if (!searchTerm) return books
  
  const searchLower = searchTerm.toLowerCase()
  return books.filter(book => 
    book.title.toLowerCase().includes(searchLower) ||
    book.author.toLowerCase().includes(searchLower) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
    book.summary.toLowerCase().includes(searchLower)
  )
}

// Filter books by tags
export const filterBooksByTags = (books, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) return books
  
  return books.filter(book =>
    selectedTags.every(tag => book.tags.includes(tag))
  )
}

// Get all unique tags from books
export const getAllTags = (books) => {
  const tagsSet = new Set()
  books.forEach(book => {
    book.tags.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

// Sort books by rating (descending)
export const sortBooksByRating = (books) => {
  return [...books].sort((a, b) => b.rating - a.rating)
}

// Sort books by date (most recent first)
export const sortBooksByDate = (books) => {
  return [...books].sort((a, b) => 
    new Date(b.readDate) - new Date(a.readDate)
  )
}

// Get books by rating range
export const getBooksByRatingRange = (books, min, max) => {
  return books.filter(book => book.rating >= min && book.rating < max)
}

// Count books by author
export const countBooksByAuthor = (books) => {
  const authorCount = {}
  books.forEach(book => {
    authorCount[book.author] = (authorCount[book.author] || 0) + 1
  })
  return Object.entries(authorCount)
    .sort((a, b) => b[1] - a[1])
    .map(([author, count]) => ({ author, count }))
}

// Count books by tag
export const countBooksByTag = (books) => {
  const tagCount = {}
  books.forEach(book => {
    book.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
}

// Get reading stats by month
export const getReadingStatsByMonth = (books, monthsBack = 6) => {
  const now = new Date()
  const monthsData = []
  
  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('fr-FR', { month: 'short' })
    const count = books.filter(book => {
      const bookDate = new Date(book.readDate)
      return bookDate.getMonth() === date.getMonth() && 
             bookDate.getFullYear() === date.getFullYear()
    }).length
    monthsData.push({ month: monthName, livres: count })
  }
  
  return monthsData
}

// Truncate text to specified length
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Generate star rating array
export const generateStarRating = (rating, maxRating) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = maxRating - Math.ceil(rating)
  
  return {
    fullStars,
    hasHalfStar,
    emptyStars
  }
}

// Obtenir le chemin complet d'une image en tenant compte du BASE_URL
export const getImagePath = (path) => {
  if (!path) return ''
  // Si le chemin commence par /, on ajoute le BASE_URL
  if (path.startsWith('/')) {
    return import.meta.env.BASE_URL + path.substring(1)
  }
  return path
}

// Générer un slug SEO-friendly à partir d'un titre de livre
export const generateSlug = (title) => {
  if (!title) return ''
  
  return title
    .toLowerCase()
    .normalize('NFD') // Décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/['']/g, '') // Supprimer les apostrophes
    .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères non alphanumériques par des tirets
    .replace(/^-+|-+$/g, '') // Supprimer les tirets au début et à la fin
    .substring(0, 60) // Limiter la longueur
}

// Générer l'URL complète d'un livre avec son slug
export const getBookUrl = (bookId, bookTitle) => {
  const slug = generateSlug(bookTitle)
  return `/book/${bookId}/${slug}`
}

