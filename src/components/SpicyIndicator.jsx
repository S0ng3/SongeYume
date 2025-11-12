import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const SpicyIndicator = ({ level, showLabel = false, size = 'sm' }) => {
  if (level === undefined || level === null) return null

  // Tailles des flammes
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconSize = sizes[size] || sizes.sm

  // Labels pour les niveaux
  const labels = {
    0: 'Sous-entendus',
    1: 'Doux',
    2: 'Épicé',
    3: 'Très épicé'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            title={labels[level]}
          >
            <Flame
              className={`${iconSize} ${
                index < level
                  ? 'text-accent fill-accent'
                  : 'text-accent text-opacity-20 fill-transparent'
              } transition-colors`}
            />
          </motion.div>
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-text-light text-opacity-70">
          {labels[level]}
        </span>
      )}
    </div>
  )
}

export default SpicyIndicator

