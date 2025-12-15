// Main categories mapping
export const CATEGORIES = {
  fantasy: {
    name: 'Fantasy',
    icon: '/categories/fantasy.png',
    tags: ['Fantasy', 'Fantastique', 'Science-Fiction']
  },
  classique: {
    name: 'Classique',
    icon: '/categories/classique.png',
    tags: ['Classique', 'Philosophie', 'Existentialisme', 'Poésie']
  },
  drame: {
    name: 'Drame',
    icon: '/categories/drame.png',
    tags: ['Drame', 'Famille', 'Social', 'Romance', 'Historique', 'Roman-fleuve']
  },
  jeunesse: {
    name: 'Jeunesse',
    icon: '/categories/jeunesse.png',
    tags: ['Jeunesse']
  },
  policier: {
    name: 'Policier',
    icon: '/categories/policier.png',
    tags: ['Policier', 'Thriller', 'Mystère', 'Suspense', 'Crime']
  },
  factuel: {
    name: 'Factuel',
    icon: '/categories/factuel.png',
    tags: ['Biographie', 'Histoire', 'Essai', 'Documentaire', 'Science', 'Géographie']
  },
  voyage: {
    name: 'Voyage',
    icon: '/categories/voyage.png',
    tags: ['Voyage', 'Exploration', 'Carnet de voyage', "Guide de voyage"]
  },
  favorite: {
    name: 'Favoris',
    icon: '/categories/favorite.png',
    description: 'Mes coups de cœur',
    tags: ['Favoris']
  },
  autre: {
    name: 'Autre',
    icon: '/categories/autre.png',
    tags: ['Autre', 'Divers', 'Politique', 'Écologie']
  }
}

// Get only the category names (to filter them out from tag list)
// We only exclude the exact category names, not all their associated tags
export const getCategoryNames = () => {
  return Object.values(CATEGORIES).map(category => category.name)
}

// Helper function to get category from tags
export const getCategoryFromTags = (bookTags) => {
  // Parcourir toutes les catégories sauf "autre" et "favorite" en premier
  for (const [key, category] of Object.entries(CATEGORIES)) {
    if (key === 'autre' || key === 'favorite') continue
    if (category.tags && bookTags.some(tag => category.tags.includes(tag))) {
      return key
    }
  }
  
  // Si aucune catégorie spécifique ne correspond, vérifier "autre"
  if (CATEGORIES.autre.tags && bookTags.some(tag => CATEGORIES.autre.tags.includes(tag))) {
    return 'autre'
  }
  
  // Par défaut, retourner "autre"
  return 'autre'
}

// Helper function to filter books by category
export const filterBooksByCategory = (books, categoryKey) => {
  if (!categoryKey) return books
  
  const category = CATEGORIES[categoryKey]
  
  // Filter by tags
  if (category.tags) {
    return books.filter(book =>
      book.tags.some(tag => category.tags.includes(tag))
    )
  }
  
  return books
}

