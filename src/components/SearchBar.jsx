import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Rechercher par titre, auteur ou mot-clé..." }) => {
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-text-light text-opacity-50" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-12 pr-12"
        />
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSearchChange('')}
              className="absolute right-4 text-text-light text-opacity-50 hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {searchTerm && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-text-light text-opacity-60"
        >
          Recherche : <span className="text-accent font-medium">"{searchTerm}"</span>
        </motion.p>
      )}
    </div>
  )
}

export default SearchBar

