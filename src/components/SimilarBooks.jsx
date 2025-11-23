import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import booksData from '../data/books.json'

/**
 * Composant de recommandations de livres similaires
 * Basé sur les tags, l'auteur, et la note
 */
const SimilarBooks = ({ currentBook, maxResults = 4 }) => {
  // Calculer les livres similaires
  const similarBooks = useMemo(() => {
    if (!currentBook) return []

    // Filtrer les livres (exclure le livre actuel)
    const otherBooks = booksData.filter(book => 
      book.id !== currentBook.id && book.rating > 0
    )

    // Calculer un score de similarité pour chaque livre
    const booksWithScore = otherBooks.map(book => {
      let score = 0

      // +3 points par tag en commun
      const commonTags = book.tags.filter(tag => currentBook.tags.includes(tag))
      score += commonTags.length * 3

      // +5 points si même auteur
      if (book.author === currentBook.author) {
        score += 5
      }

      // +2 points si note similaire (différence de moins de 1 étoile)
      const ratingDiff = Math.abs(book.rating - currentBook.rating)
      if (ratingDiff <= 1) {
        score += 2
      }

      // +1 point si même maison d'édition
      if (book.publisher && currentBook.publisher && 
          book.publisher === currentBook.publisher) {
        score += 1
      }

      return {
        ...book,
        similarityScore: score,
        commonTags
      }
    })

    // Trier par score et retourner les meilleurs résultats
    return booksWithScore
      .filter(book => book.similarityScore > 0)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, maxResults)
  }, [currentBook, maxResults])

  if (similarBooks.length === 0) {
    return null
  }

  return (
    <div className="card-base p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-accent bg-opacity-20 rounded-lg p-2">
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-text-light">
          À découvrir également
        </h2>
      </div>

      {/* Grille de livres similaires */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {similarBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/book/${book.id}`} className="group block">
              {/* Couverture */}
              <div className="relative mb-3">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                />
                
                {/* Score de similarité (en dev) */}
                {/* <div className="absolute top-2 right-2 bg-accent rounded-full px-2 py-1 text-xs font-bold text-background">
                  {book.similarityScore}
                </div> */}
                
                {/* Note */}
                <div className="absolute top-2 right-2 bg-background bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-accent text-xs font-bold">
                    {book.rating}
                  </span>
                </div>
              </div>

              {/* Infos */}
              <div>
                <h3 className="text-text-light font-semibold text-sm mb-1 line-clamp-2 group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-text-light text-opacity-60 text-xs mb-2">
                  {book.author}
                </p>
                
                {/* Tags communs */}
                {book.commonTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {book.commonTags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-accent bg-opacity-20 text-accent text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {book.commonTags.length > 2 && (
                      <span className="text-accent text-xs">
                        +{book.commonTags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Raison de la recommandation */}
      <div className="mt-6 pt-6 border-t border-text-light border-opacity-10">
        <p className="text-text-light text-opacity-60 text-sm">
          Ces recommandations sont basées sur les tags communs, l'auteur et les notes similaires.
        </p>
      </div>
    </div>
  )
}

export default SimilarBooks


