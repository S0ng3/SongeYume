import { Star, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Composant de filtre par note (étoiles)
 * Permet de sélectionner une note maximale pour filtrer les livres
 */
const RatingFilter = ({ selectedRating, onRatingClick, onClearRating }) => {
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

  const displayRating = selectedRating !== null ? selectedRating : 5

  return (
    <div className="filter-section">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-light flex items-center space-x-2">
          <Star className="w-5 h-5 text-accent" />
          <span>Filtrer par note</span>
        </h3>
        {selectedRating !== null && selectedRating < 5 && (
          <button
            onClick={onClearRating}
            className="text-sm text-accent hover:text-opacity-80 transition-colors flex items-center space-x-1"
          >
            <XCircle className="w-4 h-4" />
            <span>Effacer</span>
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="text-text-light text-sm font-medium mb-3 block">
          Note maximale : {displayRating < 5 ? `${displayRating}⭐` : 'Toutes'}
        </label>
        <div className="relative">
          {/* Barre de progression jaune */}
          <div className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full pointer-events-none w-full">
            <div 
              className="absolute h-full bg-accent rounded-full transition-all duration-200"
              style={{
                left: '0%',
                width: `${(displayRating / 5) * 100}%`
              }}
            />
          </div>
          {/* Slider */}
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={displayRating}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              onRatingClick(value === 5 ? null : value)
            }}
            className="rating-slider relative z-10"
          />
        </div>
        <div className="flex justify-between text-xs text-text-light text-opacity-50 mt-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {displayRating < 5 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base bg-card-hover p-4 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            {renderStars(displayRating)}
          </div>
          <p className="text-center text-sm text-text-light text-opacity-70">
            Livres avec une note <span className="text-accent font-semibold">≤ {displayRating}⭐</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default RatingFilter

