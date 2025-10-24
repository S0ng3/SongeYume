// Main categories mapping
export const CATEGORIES = {
  fantasy: {
    name: 'Fantasy',
    icon: '/categories/fantasy.png',
    tags: ['Fantasy', 'Épique', 'Science-Fiction', 'Cosmère', 'Sanderson', 'Anticipation', 'Grimdark', 'Militaire']
  },
  classique: {
    name: 'Classique',
    icon: '/categories/classique.png',
    tags: ['Classique', 'Philosophie', 'Existentialisme', 'Conte', 'Poésie']
  },
  drame: {
    name: 'Drame',
    icon: '/categories/drame.png',
    tags: ['Drame', 'Famille', 'Social', 'Romance', 'Historique', 'Roman-fleuve']
  },
  jeunesse: {
    name: 'Jeunesse',
    icon: '/categories/jeunesse.png',
    tags: ['Jeunesse', 'Aventure', 'Conte']
  },
  policier: {
    name: 'Policier',
    icon: '/categories/policier.png',
    tags: ['Policier', 'Thriller', 'Mystère', 'Suspense', 'Crime']
  },
  factuel: {
    name: 'Factuel',
    icon: '/categories/factuel.png',
    tags: ['Biographie', 'Histoire', 'Essai', 'Documentaire', 'Science']
  },
  voyage: {
    name: 'Voyage',
    icon: '/categories/voyage.png',
    tags: ['Voyage', 'Exploration', 'Littérature japonaise', 'Slice of life', 'Cozy', 'Librairie', 'Livres']
  },
  favorite: {
    name: 'Favoris',
    icon: '/categories/favorite.png',
    description: 'Mes coups de cœur',
    special: 'rating >= 4.5' // Filtre spécial pour les favoris
  },
  autre: {
    name: 'Autre',
    icon: '/categories/autre.png',
    tags: ['Autre', 'Divers', 'Politique', 'Écologie', 'Arts Martiaux', 'Réalisme magique']
  }
}

// Helper function to get category from tags
export const getCategoryFromTags = (bookTags) => {
  for (const [key, category] of Object.entries(CATEGORIES)) {
    if (category.tags && bookTags.some(tag => category.tags.includes(tag))) {
      return key
    }
  }
  return 'autre'
}

// Helper function to filter books by category
export const filterBooksByCategory = (books, categoryKey) => {
  if (!categoryKey) return books
  
  const category = CATEGORIES[categoryKey]
  
  // Special case for favorites
  if (category.special === 'rating >= 4.5') {
    return books.filter(book => book.rating >= 4.5)
  }
  
  // Filter by tags
  if (category.tags) {
    return books.filter(book =>
      book.tags.some(tag => category.tags.includes(tag))
    )
  }
  
  return books
}

