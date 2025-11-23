// Liste des tags représentant des sous-genres littéraires
// Ces tags seront affichés avec une couleur distinctive
export const SUBGENRE_TAGS = [
  // Fantasy & Science-Fiction
  'High fantasy',
  'Urban Fantasy',
  'Fantasy épique',
  'Fantasy historique',
  'Fantastique',
  'Science-Fiction',
  'Gunpowder',
  
  // Littérature générale
  'Romance',
  'Young Adult',
  'Cosy',
  
  // Autres
  'Historique',
  'Biographie',
  'Essai'
]

// Fonction pour vérifier si un tag est un sous-genre
export const isSubgenre = (tag) => {
  return SUBGENRE_TAGS.includes(tag)
}

