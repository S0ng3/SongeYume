import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/categories'

const CategoryFilter = ({ selectedCategory, onCategoryClick, onClearCategory }) => {
  const categories = Object.entries(CATEGORIES)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-light">
          Filtrer par catégorie
        </h3>
        {selectedCategory && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearCategory}
            className="text-sm text-accent hover:text-opacity-80 transition-colors"
          >
            ✕ Effacer
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {categories.map(([key, category]) => {
          const isSelected = selectedCategory === key
          
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryClick(key)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                isSelected
                  ? 'bg-accent bg-opacity-20 ring-2 ring-accent'
                  : 'bg-card-bg hover:bg-card-hover'
              }`}
            >
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                <img
                  src={category.icon}
                  alt={category.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isSelected ? 'brightness-110' : 'brightness-90 hover:brightness-100'
                  }`}
                />
              </div>
              <span className={`text-xs text-center font-medium ${
                isSelected ? 'text-accent' : 'text-text-light text-opacity-80'
              }`}>
                {category.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-card-bg rounded-lg"
        >
          <p className="text-sm text-text-light text-opacity-70">
            Catégorie active :{' '}
            <span className="text-accent font-medium">
              {CATEGORIES[selectedCategory].name}
            </span>
            {CATEGORIES[selectedCategory].description && (
              <span className="text-text-light text-opacity-50">
                {' '}• {CATEGORIES[selectedCategory].description}
              </span>
            )}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default CategoryFilter

