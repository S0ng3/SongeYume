import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RotateCw, X, SlidersHorizontal, Star, Book } from 'lucide-react'
import { Link } from 'react-router-dom'
import booksData from '../data/books.json'

/**
 * Roue de la Fortune des Livres
 * Widget interactif pour choisir un livre aléatoirement
 */
const BookWheel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filtres
  const [minRating, setMinRating] = useState(0)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [onlyUnread, setOnlyUnread] = useState(false)

  // Extraire les genres uniques
  const allGenres = [...new Set(booksData.flatMap(book => book.tags))].sort()

  // Filtrer les livres selon les critères
  const getFilteredBooks = () => {
    let filtered = booksData.filter(book => book.rating > 0) // Seulement les livres lus

    if (minRating > 0) {
      filtered = filtered.filter(book => book.rating >= minRating)
    }
    if (selectedGenre) {
      filtered = filtered.filter(book => book.tags.includes(selectedGenre))
    }
    if (onlyUnread) {
      // Pour l'instant, on filtre sur rating === 0 (à adapter selon votre logique)
      filtered = booksData.filter(book => book.rating === 0 || !book.personalReview)
    }

    return filtered
  }

  // Lancer la roue
  const spinWheel = () => {
    setIsSpinning(true)
    setSelectedBook(null)

    // Animation de spin
    setTimeout(() => {
      const filteredBooks = getFilteredBooks()
      if (filteredBooks.length === 0) {
        setIsSpinning(false)
        return
      }

      // Pondération par note (les livres mieux notés ont plus de chances)
      const weightedBooks = []
      filteredBooks.forEach(book => {
        const weight = Math.max(1, Math.floor(book.rating))
        for (let i = 0; i < weight; i++) {
          weightedBooks.push(book)
        }
      })

      const randomBook = weightedBooks[Math.floor(Math.random() * weightedBooks.length)]
      setSelectedBook(randomBook)
      setIsSpinning(false)
    }, 2000)
  }

  // Réinitialiser les filtres
  const resetFilters = () => {
    setMinRating(0)
    setSelectedGenre(null)
    setOnlyUnread(false)
  }

  const hasActiveFilters = minRating > 0 || selectedGenre || onlyUnread

  return (
    <>
      {/* Bouton Flottant */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-accent hover:bg-opacity-90 text-background rounded-full p-4 shadow-2xl flex items-center space-x-3 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Sparkles className="w-6 h-6" />
        <span className="font-semibold hidden sm:inline pr-2">
          Quel livre lire ?
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background bg-opacity-90 backdrop-blur-sm z-50"
            />

            {/* Contenu du Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl z-50"
            >
              <div className="card-base h-full sm:h-auto max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-card-bg z-10 p-6 border-b border-text-light border-opacity-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-accent bg-opacity-20 rounded-lg p-2">
                        <Sparkles className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold text-text-light">
                        Roue de la Fortune
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-text-light hover:text-accent transition-colors p-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-text-light text-opacity-70 mt-2">
                    Laissez le hasard choisir votre prochaine lecture !
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Filtres */}
                  <div className="card-base bg-card-hover p-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="w-full flex items-center justify-between text-text-light hover:text-accent transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="font-semibold">Filtres</span>
                        {hasActiveFilters && (
                          <span className="bg-accent bg-opacity-20 text-accent text-xs font-semibold px-2 py-1 rounded-full">
                            {[minRating > 0, selectedGenre, onlyUnread].filter(Boolean).length}
                          </span>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: showFilters ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showFilters && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 space-y-4 overflow-hidden"
                        >
                          {/* Note minimale */}
                          <div>
                            <label className="text-text-light text-sm font-medium mb-2 block">
                              Note minimale : {minRating > 0 ? `${minRating}⭐` : 'Toutes'}
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="5"
                              step="0.5"
                              value={minRating}
                              onChange={(e) => setMinRating(parseFloat(e.target.value))}
                              className="w-full accent-accent"
                            />
                          </div>

                          {/* Genre */}
                          <div>
                            <label className="text-text-light text-sm font-medium mb-2 block">
                              Genre
                            </label>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                              {allGenres.slice(0, 15).map(genre => (
                                <button
                                  key={genre}
                                  onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                    selectedGenre === genre
                                      ? 'bg-accent text-background font-semibold'
                                      : 'bg-card-bg text-text-light hover:bg-accent hover:bg-opacity-20'
                                  }`}
                                >
                                  {genre}
                                </button>
                              ))}
                            </div>
                          </div>

                          {hasActiveFilters && (
                            <button
                              onClick={resetFilters}
                              className="text-accent hover:text-opacity-80 text-sm font-medium"
                            >
                              Réinitialiser les filtres
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Zone de résultat */}
                  <div className="min-h-[300px] flex flex-col items-center justify-center">
                    {isSpinning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="text-center"
                      >
                        <RotateCw className="w-20 h-20 text-accent mx-auto mb-4" />
                        <p className="text-text-light text-lg">
                          La roue tourne...
                        </p>
                      </motion.div>
                    ) : selectedBook ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center w-full"
                      >
                        <motion.div
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="mb-6"
                        >
                          <Sparkles className="w-12 h-12 text-accent mx-auto mb-3" />
                          <h3 className="text-2xl font-bold text-accent mb-2">
                            Votre prochaine lecture !
                          </h3>
                        </motion.div>

                        <div className="card-base bg-card-hover p-6">
                          <img
                            src={selectedBook.cover}
                            alt={selectedBook.title}
                            className="w-48 h-64 object-cover rounded shadow-lg mx-auto mb-4"
                          />
                          <h4 className="text-xl font-bold text-text-light mb-2">
                            {selectedBook.title}
                          </h4>
                          <p className="text-text-light text-opacity-70 mb-4">
                            {selectedBook.author}
                          </p>
                          
                          <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="flex items-center space-x-1">
                              <Star className="w-5 h-5 text-accent fill-accent" />
                              <span className="text-accent font-semibold">
                                {selectedBook.rating}/5
                              </span>
                            </div>
                            {selectedBook.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="bg-accent bg-opacity-20 text-accent text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                              to={`/book/${selectedBook.id}`}
                              className="btn-primary flex-1 text-center"
                              onClick={() => setIsOpen(false)}
                            >
                              <Book className="w-4 h-4 inline mr-2" />
                              Voir le livre
                            </Link>
                            <button
                              onClick={spinWheel}
                              className="btn-secondary flex-1"
                            >
                              <RotateCw className="w-4 h-4 inline mr-2" />
                              Relancer
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center">
                        <Book className="w-16 h-16 text-text-light text-opacity-30 mx-auto mb-4" />
                        <p className="text-text-light text-opacity-60 mb-6">
                          {getFilteredBooks().length} livre(s) disponible(s)
                        </p>
                        <button
                          onClick={spinWheel}
                          disabled={getFilteredBooks().length === 0}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RotateCw className="w-5 h-5 inline mr-2" />
                          Lancer la roue !
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default BookWheel


