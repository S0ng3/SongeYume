// Groupement des sous-genres par catégorie principale
// SOURCE UNIQUE : tous les sous-genres sont définis ici
export const SUBGENRE_CATEGORIES = {
  'Fantasy': [
    'High fantasy',
    'Urban Fantasy',
    'Fantasy historique',
    'Fantasy asiatique',
    'Fantastique',
    'Science-Fiction',
    'Gunpowder',
    'Dark fantasy',
    'Fantasy historique',
    'Grimdark'
  ],
  'Drame': [
    'Romance',
    'Young Adult',
    'Cosy',
    'Historique'
  ],
  'Factuel': [
    'Biographie',
    'Essai'
  ]
}

// Liste plate de tous les sous-genres (générée automatiquement)
export const SUBGENRE_TAGS = Object.values(SUBGENRE_CATEGORIES).flat()

// Fonction pour vérifier si un tag est un sous-genre
export const isSubgenre = (tag) => {
  return SUBGENRE_TAGS.includes(tag)
}

// Fonction pour obtenir la catégorie d'un sous-genre
export const getSubgenreCategory = (tag) => {
  for (const [category, subgenres] of Object.entries(SUBGENRE_CATEGORIES)) {
    if (subgenres.includes(tag)) {
      return category
    }
  }
  return null
}

