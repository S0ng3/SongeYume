import { Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Composant de filtre par plateforme de publication
 * Permet de sélectionner Babelio et/ou Instagram pour filtrer les livres
 */
const PlatformFilter = ({ selectedPlatforms, onPlatformToggle, onClearPlatforms }) => {
  const platforms = [
    { id: 'babelio', label: 'Babelio', color: 'bg-orange-500' },
    { id: 'instagram', label: 'Instagram', color: 'bg-pink-500' }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-light flex items-center space-x-2">
          <Share2 className="w-5 h-5 text-accent" />
          <span>Filtrer par plateforme de publication</span>
        </h3>
        {selectedPlatforms.length > 0 && (
          <button
            onClick={onClearPlatforms}
            className="text-sm text-accent hover:text-opacity-80 transition-colors"
          >
            Effacer
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id)
          
          return (
            <motion.button
              key={platform.id}
              onClick={() => onPlatformToggle(platform.id)}
              className={`
                px-4 py-3 rounded-lg transition-all duration-200 text-left
                flex items-center space-x-3
                ${
                  isSelected
                    ? 'bg-accent bg-opacity-20 border-2 border-accent'
                    : 'bg-card-hover border-2 border-transparent hover:border-accent hover:border-opacity-30'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-3 h-3 rounded-full ${platform.color} ${isSelected ? 'opacity-100' : 'opacity-50'}`} />
              <span className={`font-medium ${isSelected ? 'text-accent' : 'text-text-light'}`}>
                {platform.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-text-light text-opacity-60"
        >
          Plateformes sélectionnées : {' '}
          <span className="text-accent font-medium">
            {selectedPlatforms.map(id => 
              platforms.find(p => p.id === id)?.label
            ).join(', ')}
          </span>
        </motion.p>
      )}
    </div>
  )
}

export default PlatformFilter

