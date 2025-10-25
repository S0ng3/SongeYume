import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Composant de nuage de tags personnalisé
 * Affiche les tags avec des tailles proportionnelles à leur fréquence
 * et un effet de nuage avec rotations variées
 */
const TagCloud = ({ tags, minSize = 14, maxSize = 60 }) => {
  // Calcul des tailles de police et rotations pour chaque tag
  const tagData = useMemo(() => {
    if (!tags || tags.length === 0) return []

    // Trouver le min et max des occurrences
    const counts = tags.map(tag => tag.count)
    const minCount = Math.min(...counts)
    const maxCount = Math.max(...counts)
    
    // Mélanger les tags pour un effet plus naturel
    const shuffledTags = [...tags].sort(() => Math.random() - 0.5)
    
    // Calculer la taille de police et rotation pour chaque tag
    return shuffledTags.map((tag, index) => {
      const ratio = maxCount === minCount 
        ? 1 
        : (tag.count - minCount) / (maxCount - minCount)
      const fontSize = minSize + ratio * (maxSize - minSize)
      
      // Rotations variées pour effet nuage
      const rotations = [0, 0, 0, -15, 15, -10, 10] // Plus de tags horizontaux
      const rotation = rotations[index % rotations.length]
      
      return {
        ...tag,
        fontSize: Math.round(fontSize),
        rotation,
        index
      }
    })
  }, [tags, minSize, maxSize])

  // Palette de couleurs dorées
  const colors = [
    '#e09e29',
    '#f5b557', 
    '#f8c978',
    '#fbd899',
    '#daa520',
    '#b8860b'
  ]

  return (
    <div className="tag-cloud-wrapper-organic">
      {tagData.map((tag, idx) => {
        const color = colors[idx % colors.length]
        
        return (
          <motion.span
            key={tag.value}
            className="tag-cloud-item-organic"
            style={{
              fontSize: `${tag.fontSize}px`,
              color: color,
              transform: `rotate(${tag.rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: tag.rotation }}
            transition={{ 
              delay: idx * 0.03,
              duration: 0.4,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.15,
              backgroundColor: `${color}20`,
              rotate: 0,
              transition: { duration: 0.2 }
            }}
            title={`${tag.value}: ${tag.count} ${tag.count > 1 ? 'livres' : 'livre'}`}
          >
            {tag.value}
          </motion.span>
        )
      })}
    </div>
  )
}

export default TagCloud

