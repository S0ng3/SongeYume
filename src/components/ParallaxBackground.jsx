import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getImagePath } from '../utils/helpers'

/**
 * Composant d'arrière-plan parallaxe avec couvertures de livres
 * Crée un effet de profondeur subtil derrière le contenu principal
 */
const ParallaxBackground = ({ books }) => {
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()
  
  // Désactiver le parallaxe sur mobile pour les performances
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sélectionner 30 livres aléatoires pour l'arrière-plan (divisible par 3, 4, 6, 10)
  const [backgroundBooks] = useState(() => {
    const shuffled = [...books].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 30)
  })

  // Effet parallaxe : mouvement visible mais contrôlé pour éviter les chevauchements
  const y1 = useTransform(scrollY, [0, 1000], [0, 60])   // Lent
  const y2 = useTransform(scrollY, [0, 1000], [0, 90])   // Moyen
  const y3 = useTransform(scrollY, [0, 1000], [0, 120])  // Rapide

  // Sur mobile, pas de parallaxe
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Voile sombre pour lisibilité */}
        <div className="absolute inset-0 bg-background opacity-80 z-10" />
        
        {/* Grille de couvertures statique (mobile) - responsive */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 p-2 opacity-30">
          {backgroundBooks.map((book, index) => (
            <div key={index} className="aspect-[2/3]">
              <img
                src={getImagePath(book.cover)}
                alt=""
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Voile sombre pour garantir la lisibilité du contenu */}
      <div className="absolute inset-0 bg-background opacity-75 z-10" />
      
      {/* Grille de couvertures avec effet parallaxe individuel - responsive */}
      <div className="relative w-full h-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 p-6">
        {backgroundBooks.map((book, index) => {
          // Assigner une vitesse de parallax différente selon la position
          const parallaxSpeed = index % 3
          const yTransform = parallaxSpeed === 0 ? y1 : parallaxSpeed === 1 ? y2 : y3
          const opacity = parallaxSpeed === 0 ? 'opacity-40' : parallaxSpeed === 1 ? 'opacity-35' : 'opacity-30'
          
          return (
            <motion.div
              key={index}
              style={{ y: yTransform }}
              className={`aspect-[2/3] ${opacity} bg-card-bg rounded-lg overflow-hidden shadow-2xl`}
            >
              <img
                src={getImagePath(book.cover)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ParallaxBackground

