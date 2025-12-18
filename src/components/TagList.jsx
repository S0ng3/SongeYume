import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Tag, ChevronDown, ChevronUp } from 'lucide-react'
import { isSubgenre } from '../utils/subgenres'

const TagList = ({ tags, selectedTags, onTagClick, onClearTags }) => {
  const [showAllTags, setShowAllTags] = useState(false)
  const isSelected = (tag) => selectedTags.includes(tag)

  // Séparer les sous-genres des tags normaux
  const subgenres = tags.filter(tag => isSubgenre(tag))
  const normalTags = tags.filter(tag => !isSubgenre(tag))
  
  // Limiter l'affichage des tags normaux à 12 par défaut
  const MAX_TAGS_DEFAULT = 12
  const displayedNormalTags = showAllTags ? normalTags : normalTags.slice(0, MAX_TAGS_DEFAULT)
  const hiddenTagsCount = normalTags.length - MAX_TAGS_DEFAULT

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-text-light">
            Filtrer par tags
          </h3>
        </div>
        {selectedTags.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearTags}
            className="flex items-center space-x-2 text-sm text-accent hover:text-opacity-80 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Effacer ({selectedTags.length})</span>
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Afficher d'abord tous les sous-genres */}
        {subgenres.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagClick(tag)}
            className={`tag ${
              isSelected(tag)
                ? 'bg-yellow-300 bg-opacity-100 text-background font-bold'
                : 'bg-yellow-300 bg-opacity-20 text-yellow-200 font-semibold'
            }`}
          >
            {tag}
          </motion.button>
        ))}
        
        {/* Puis afficher les tags normaux (limités ou tous) */}
        <AnimatePresence>
          {displayedNormalTags.map((tag) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagClick(tag)}
              className={`tag ${
                isSelected(tag)
                  ? 'bg-accent bg-opacity-100 text-background font-semibold'
                  : ''
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Bouton Voir plus / Voir moins */}
      {normalTags.length > MAX_TAGS_DEFAULT && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowAllTags(!showAllTags)}
          className="mt-4 flex items-center space-x-2 text-sm text-accent hover:text-opacity-80 transition-colors mx-auto"
        >
          {showAllTags ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Voir moins de tags</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Voir {hiddenTagsCount} tags supplémentaires</span>
            </>
          )}
        </motion.button>
      )}

      {selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-card-bg rounded-lg"
        >
          <p className="text-sm text-text-light text-opacity-70">
            Tags actifs :{' '}
            <span className="text-accent font-medium">
              {selectedTags.join(', ')}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default TagList

