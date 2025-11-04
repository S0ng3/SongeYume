import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Book, User, Tag, Shuffle, Copy, Check, Share2, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import booksData from '../data/books.json'

const Quotes = () => {
  // Extraire toutes les citations avec leurs métadonnées
  const allQuotes = useMemo(() => {
    const quotes = []
    booksData.forEach(book => {
      if (book.quotes && book.quotes.length > 0) {
        book.quotes.forEach(quote => {
          quotes.push({
            text: quote,
            bookId: book.id,
            bookTitle: book.title,
            author: book.author,
            tags: book.tags,
            cover: book.cover,
            rating: book.rating
          })
        })
      }
    })
    return quotes
  }, [])

  // États
  const [filteredQuotes, setFilteredQuotes] = useState(allQuotes)
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const [randomQuote, setRandomQuote] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const QUOTES_PER_PAGE = 18

  // Listes uniques pour les filtres
  const uniqueBooks = useMemo(() => 
    [...new Set(allQuotes.map(q => q.bookTitle))].sort(),
    [allQuotes]
  )
  
  const uniqueAuthors = useMemo(() => 
    [...new Set(allQuotes.map(q => q.author))].sort(),
    [allQuotes]
  )
  
  const uniqueTags = useMemo(() => {
    const tags = new Set()
    allQuotes.forEach(q => q.tags.forEach(tag => tags.add(tag)))
    return [...tags].sort()
  }, [allQuotes])

  // Filtrer les citations
  useEffect(() => {
    let filtered = allQuotes

    if (selectedBook) {
      filtered = filtered.filter(q => q.bookTitle === selectedBook)
    }
    if (selectedAuthor) {
      filtered = filtered.filter(q => q.author === selectedAuthor)
    }
    if (selectedTag) {
      filtered = filtered.filter(q => q.tags.includes(selectedTag))
    }

    setFilteredQuotes(filtered)
    setCurrentPage(1) // Réinitialiser la page lors d'un changement de filtre
  }, [selectedBook, selectedAuthor, selectedTag, allQuotes])

  // Pagination
  const totalPages = Math.ceil(filteredQuotes.length / QUOTES_PER_PAGE)
  const startIndex = (currentPage - 1) * QUOTES_PER_PAGE
  const endIndex = startIndex + QUOTES_PER_PAGE
  const currentQuotes = filteredQuotes.slice(startIndex, endIndex)

  // Fonctions de navigation
  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Citation aléatoire
  const getRandomQuote = () => {
    const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
    setRandomQuote(random)
  }

  useEffect(() => {
    if (filteredQuotes.length > 0) {
      getRandomQuote()
    }
  }, [filteredQuotes])

  // Copier dans le presse-papier
  const copyToClipboard = async (text, index) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Réinitialiser les filtres
  const clearFilters = () => {
    setSelectedBook(null)
    setSelectedAuthor(null)
    setSelectedTag(null)
  }

  const hasActiveFilters = selectedBook || selectedAuthor || selectedTag

  return (
    <div className="page-transition py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Quote className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="page-title">Mur de Citations</h1>
          <p className="page-subtitle">
            {filteredQuotes.length} {filteredQuotes.length > 1 ? 'citations' : 'citation'} qui m'ont marquée
            {totalPages > 1 && (
              <span className="text-sm text-text-light text-opacity-60 ml-2">
                (Page {currentPage} sur {totalPages})
              </span>
            )}
          </p>
        </motion.div>

        {/* Citation Aléatoire Mise en Avant */}
        {randomQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card-base p-8 mb-12 bg-gradient-to-br from-card-bg to-card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <Quote className="w-8 h-8 text-accent flex-shrink-0 opacity-50" />
                <button
                  onClick={getRandomQuote}
                  className="flex items-center space-x-2 text-accent hover:text-opacity-80 transition-colors"
                >
                  <Shuffle className="w-5 h-5" />
                  <span className="text-sm font-medium">Autre citation</span>
                </button>
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-text-light font-serif italic leading-relaxed mb-6">
                "{randomQuote.text}"
              </blockquote>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link 
                  to={`/book/${randomQuote.bookId}`}
                  className="flex items-center space-x-3 group"
                >
                  <img 
                    src={randomQuote.cover} 
                    alt={randomQuote.bookTitle}
                    className="w-12 h-16 object-cover rounded shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <p className="text-accent font-semibold group-hover:text-opacity-80 transition-colors">
                      {randomQuote.bookTitle}
                    </p>
                    <p className="text-text-light text-opacity-60 text-sm">
                      {randomQuote.author}
                    </p>
                  </div>
                </Link>
                
                <button
                  onClick={() => copyToClipboard(randomQuote.text, 'featured')}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {copiedIndex === 'featured' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-base mb-8"
        >
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-text-light hover:bg-card-hover transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-accent" />
              <span className="text-lg font-semibold text-accent">Filtres</span>
              {hasActiveFilters && (
                <span className="bg-accent bg-opacity-20 text-accent text-xs font-semibold px-2 py-1 rounded-full">
                  {[selectedBook, selectedAuthor, selectedTag].filter(Boolean).length} actif(s)
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.div>
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 space-y-6">
                  {/* Filtre par Livre */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2 text-text-light font-medium">
                        <Book className="w-4 h-4 text-accent" />
                        <span>Par Livre</span>
                      </label>
                      {selectedBook && (
                        <button
                          onClick={() => setSelectedBook(null)}
                          className="text-xs text-accent hover:text-opacity-80"
                        >
                          Effacer
                        </button>
                      )}
                    </div>
                    <select
                      value={selectedBook || ''}
                      onChange={(e) => setSelectedBook(e.target.value || null)}
                      className="input-field"
                    >
                      <option value="">Tous les livres</option>
                      {uniqueBooks.map(book => (
                        <option key={book} value={book}>{book}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filtre par Auteur */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2 text-text-light font-medium">
                        <User className="w-4 h-4 text-accent" />
                        <span>Par Auteur</span>
                      </label>
                      {selectedAuthor && (
                        <button
                          onClick={() => setSelectedAuthor(null)}
                          className="text-xs text-accent hover:text-opacity-80"
                        >
                          Effacer
                        </button>
                      )}
                    </div>
                    <select
                      value={selectedAuthor || ''}
                      onChange={(e) => setSelectedAuthor(e.target.value || null)}
                      className="input-field"
                    >
                      <option value="">Tous les auteurs</option>
                      {uniqueAuthors.map(author => (
                        <option key={author} value={author}>{author}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filtre par Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2 text-text-light font-medium">
                        <Tag className="w-4 h-4 text-accent" />
                        <span>Par Thème</span>
                      </label>
                      {selectedTag && (
                        <button
                          onClick={() => setSelectedTag(null)}
                          className="text-xs text-accent hover:text-opacity-80"
                        >
                          Effacer
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            selectedTag === tag
                              ? 'bg-accent text-background font-semibold'
                              : 'bg-card-hover text-text-light hover:bg-accent hover:bg-opacity-20'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full btn-secondary"
                    >
                      Réinitialiser tous les filtres
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grille de Citations */}
        {filteredQuotes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentQuotes.map((quote, index) => (
                <motion.div
                  key={startIndex + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-base card-hover p-6 flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-accent opacity-50 mb-3" />
                    <blockquote className="text-text-light leading-relaxed italic">
                      "{quote.text}"
                    </blockquote>
                  </div>
                  
                  <div className="space-y-3">
                    <Link 
                      to={`/book/${quote.bookId}`}
                      className="block group"
                    >
                      <p className="text-accent font-semibold text-sm group-hover:text-opacity-80 transition-colors">
                        {quote.bookTitle}
                      </p>
                      <p className="text-text-light text-opacity-60 text-xs">
                        {quote.author}
                      </p>
                    </Link>
                    
                    <button
                      onClick={() => copyToClipboard(quote.text, startIndex + index)}
                      className="flex items-center space-x-2 text-text-light text-opacity-60 hover:text-accent transition-colors text-sm"
                    >
                      {copiedIndex === startIndex + index ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Bouton Précédent */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'bg-card-bg text-text-light text-opacity-30 cursor-not-allowed'
                      : 'bg-card-bg text-accent hover:bg-card-hover'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Précédent</span>
                </button>

                {/* Numéros de pages */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Afficher la première page, la dernière, la page courante et les pages adjacentes
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-lg transition-all ${
                            page === currentPage
                              ? 'bg-accent text-background font-bold'
                              : 'bg-card-bg text-text-light hover:bg-card-hover'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="text-text-light text-opacity-30">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                {/* Bouton Suivant */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'bg-card-bg text-text-light text-opacity-30 cursor-not-allowed'
                      : 'bg-card-bg text-accent hover:bg-card-hover'
                  }`}
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 card-base"
          >
            <Quote className="w-16 h-16 text-text-light text-opacity-30 mx-auto mb-4" />
            <p className="text-text-light text-opacity-60 text-lg">
              Aucune citation ne correspond à vos filtres
            </p>
            <button onClick={clearFilters} className="btn-primary mt-6">
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Quotes

