import { Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Composant de filtre par maison d'édition
 * Permet de sélectionner une maison d'édition pour filtrer les livres
 */
const PublisherFilter = ({ publishers, selectedPublisher, onPublisherClick, onClearPublisher }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-light flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-accent" />
          <span>Filtrer par maison d'édition</span>
        </h3>
        {selectedPublisher && (
          <button
            onClick={onClearPublisher}
            className="text-sm text-accent hover:text-opacity-80 transition-colors"
          >
            Effacer
          </button>
        )}
      </div>

      {publishers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
            {publishers.map((publisher) => (
              <motion.button
                key={publisher.name}
                onClick={() => onPublisherClick(publisher.name)}
                className={`
                  px-4 py-2.5 rounded-lg transition-all duration-200 text-left
                  flex items-center justify-between space-x-2
                  ${
                    selectedPublisher === publisher.name
                      ? 'bg-accent bg-opacity-20 border-2 border-accent text-accent'
                      : 'bg-card-hover border-2 border-transparent text-text-light hover:border-accent hover:border-opacity-30'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-sm truncate">{publisher.name}</span>
                <span className="text-xs opacity-70 font-semibold bg-accent bg-opacity-20 px-2 py-1 rounded-full flex-shrink-0">
                  {publisher.count}
                </span>
              </motion.button>
            ))}
          </div>

          {selectedPublisher && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-text-light text-opacity-60"
            >
              Filtré par : <span className="text-accent font-medium">{selectedPublisher}</span>
            </motion.p>
          )}
        </>
      ) : (
        <p className="text-text-light text-opacity-50 text-sm italic">
          Aucune maison d'édition renseignée
        </p>
      )}
    </div>
  )
}

export default PublisherFilter

