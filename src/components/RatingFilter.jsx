import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Composant de filtre par note (étoiles)
 * Permet de sélectionner une note pour filtrer les livres
 */
const RatingFilter = ({ selectedRating, onRatingClick, onClearRating }) => {
  const ratings = [5, 4, 3, 2, 1]

  // Fonction pour afficher les étoiles selon la note
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-accent text-accent"
        />
      )
    }

    // Demi-étoile
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-accent absolute" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-accent text-accent" />
          </div>
        </div>
      )
    }

    // Étoiles vides
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-text-light text-opacity-30"
        />
      )
    }

    return stars
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-text-light flex items-center space-x-2">
          <Star className="w-5 h-5 text-accent" />
          <span>Filtrer par note</span>
        </h3>
        {selectedRating !== null && (
          <button
            onClick={onClearRating}
            className="text-sm text-accent hover:text-opacity-80 transition-colors"
          >
            Effacer
          </button>
        )}
      </div>
      <p className="text-xs text-text-light text-opacity-50 mb-4 italic">
        Chaque note inclut aussi les demi-étoiles (ex: 4⭐ = 4 et 4.5)
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {ratings.map((rating) => (
          <motion.button
            key={rating}
            onClick={() => onRatingClick(rating)}
            className={`
              px-4 py-3 rounded-lg transition-all duration-200
              flex items-center justify-between space-x-2
              ${
                selectedRating === rating
                  ? 'bg-accent bg-opacity-20 border-2 border-accent text-accent'
                  : 'bg-card-hover border-2 border-transparent text-text-light hover:border-accent hover:border-opacity-30'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-semibold text-sm">{rating}</span>
            <div className="flex items-center space-x-0.5">
              {renderStars(rating)}
            </div>
          </motion.button>
        ))}
      </div>

      {selectedRating !== null && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-text-light text-opacity-60"
        >
          Filtré par note : <span className="text-accent font-medium">{selectedRating} et {selectedRating}.5 ⭐</span>
        </motion.p>
      )}
    </div>
  )
}

export default RatingFilter

