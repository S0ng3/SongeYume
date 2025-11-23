import { motion } from 'framer-motion'
import { X, Tag } from 'lucide-react'
import { isSubgenre } from '../utils/subgenres'

const TagList = ({ tags, selectedTags, onTagClick, onClearTags }) => {
  const isSelected = (tag) => selectedTags.includes(tag)

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
        {tags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagClick(tag)}
            className={`tag ${
              isSelected(tag)
                ? isSubgenre(tag)
                  ? 'bg-yellow-300 bg-opacity-100 text-background font-bold'
                  : 'bg-accent bg-opacity-100 text-background font-semibold'
                : isSubgenre(tag)
                ? 'bg-yellow-300 bg-opacity-20 text-yellow-200 font-semibold'
                : ''
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>

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

