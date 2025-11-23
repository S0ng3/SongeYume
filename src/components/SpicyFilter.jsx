import { motion } from 'framer-motion'
import { Flame, X } from 'lucide-react'

const SpicyFilter = ({ selectedSpicyLevel, onSpicyLevelClick, onClearSpicyLevel }) => {
  const levels = [
    { value: 0, label: 'Sous-entendus' },
    { value: 1, label: 'Doux' },
    { value: 2, label: 'Épicé' },
    { value: 3, label: 'Très épicé' }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-text-light">Niveau Spicy</h3>
        </div>
        {selectedSpicyLevel !== null && (
          <button
            onClick={onClearSpicyLevel}
            className="text-xs text-accent hover:text-opacity-80 transition-colors flex items-center space-x-1"
          >
            <X className="w-3 h-3" />
            <span>Effacer</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {levels.map((level) => (
          <motion.button
            key={level.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSpicyLevelClick(level.value)}
            className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center space-x-2 ${
              selectedSpicyLevel === level.value
                ? 'border-accent bg-accent bg-opacity-20 text-accent'
                : 'border-text-light border-opacity-20 text-text-light hover:border-accent hover:border-opacity-50'
            }`}
          >
            <div className="flex items-center space-x-0.5">
              {[...Array(3)].map((_, index) => (
                <Flame
                  key={index}
                  className={`w-3 h-3 ${
                    index < level.value
                      ? 'text-accent fill-accent'
                      : 'text-accent text-opacity-20 fill-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{level.label}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-text-light text-opacity-50 mt-3">
        Filtre les livres Romance par intensité
      </p>
    </div>
  )
}

export default SpicyFilter

