import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Composant d'image avec placeholder coloré pendant le chargement
 * Utilise la couleur du thème (#1e2230) comme fond de chargement
 */
const ImageWithPlaceholder = ({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = '',
  aspectRatio = 'aspect-[2/3]',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${aspectRatio} overflow-hidden`}>
      {/* Placeholder avec la couleur du thème */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 bg-card-bg animate-pulse ${placeholderClassName}`}
          aria-hidden="true"
        >
          {/* Effet de shimmer subtil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-card-hover to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Image avec fallback en cas d'erreur */}
      {!hasError ? (
        <motion.img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          {...props}
        />
      ) : (
        // Fallback en cas d'erreur de chargement
        <div className="absolute inset-0 bg-card-bg flex items-center justify-center">
          <div className="text-center text-text-light text-opacity-50 p-4">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Image indisponible</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageWithPlaceholder

