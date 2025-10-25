import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BookCardCompact from '../components/BookCardCompact'
import SearchBar from '../components/SearchBar'
import TagList from '../components/TagList'
import CategoryFilter from '../components/CategoryFilter'
import RatingFilter from '../components/RatingFilter'
import PublisherFilter from '../components/PublisherFilter'
import Pagination from '../components/Pagination'
import { filterBooksByCategory, getCategoryNames } from '../data/categories'
import booksData from '../data/books.json'

const BOOKS_PER_PAGE = 48 // 4 rows of 12 on large screens

const Library = () => {
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPublisher, setSelectedPublisher] = useState(null)
  const [allTags, setAllTags] = useState([])
  const [allPublishers, setAllPublishers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Extract all unique tags, excluding only the exact category names
    const categoryNames = getCategoryNames()
    const tagsSet = new Set()
    booksData.forEach(book => {
      book.tags.forEach(tag => {
        // Only exclude tags that are exactly category names (Fantasy, Classique, etc.)
        // Keep specific tags like "Science-Fiction", "Romance", etc.
        if (!categoryNames.includes(tag)) {
          tagsSet.add(tag)
        }
      })
    })
    setAllTags(Array.from(tagsSet).sort())

    // Extract all unique publishers with their counts
    const publisherCount = {}
    booksData.forEach(book => {
      if (book.publisher && book.publisher.trim() !== '') {
        publisherCount[book.publisher] = (publisherCount[book.publisher] || 0) + 1
      }
    })
    const publishersList = Object.entries(publisherCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count) // Tri par nombre de livres (descendant)
    setAllPublishers(publishersList)
  }, [])

  useEffect(() => {
    // Filter books based on category, search term, tags, rating and publisher
    let filtered = booksData

    // 1. Filter by category (highest level)
    if (selectedCategory) {
      filtered = filterBooksByCategory(filtered, selectedCategory)
    }

    // 2. Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book => {
        const searchLower = searchTerm.toLowerCase()
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          book.summary.toLowerCase().includes(searchLower) ||
          book.rating.toString().includes(searchLower) ||
          (book.publisher && book.publisher.toLowerCase().includes(searchLower))
        )
      })
    }

    // 3. Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(book =>
        selectedTags.every(tag => book.tags.includes(tag))
      )
    }

    // 4. Filter by rating (inclut la note et la note +0.5)
    if (selectedRating !== null) {
      filtered = filtered.filter(book => 
        book.rating === selectedRating || book.rating === selectedRating + 0.5
      )
    }

    // 5. Filter by publisher
    if (selectedPublisher) {
      filtered = filtered.filter(book => book.publisher === selectedPublisher)
    }

    setBooks(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedTags, selectedCategory, selectedRating, selectedPublisher])

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleClearTags = () => {
    setSelectedTags([])
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
      // Clear tags when changing category for cleaner UX
      setSelectedTags([])
    }
  }

  const handleClearCategory = () => {
    setSelectedCategory(null)
  }

  const handleRatingClick = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null)
    } else {
      setSelectedRating(rating)
    }
  }

  const handleClearRating = () => {
    setSelectedRating(null)
  }

  const handlePublisherClick = (publisher) => {
    if (selectedPublisher === publisher) {
      setSelectedPublisher(null)
    } else {
      setSelectedPublisher(publisher)
    }
  }

  const handleClearPublisher = () => {
    setSelectedPublisher(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate pagination
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE)
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
  const endIndex = startIndex + BOOKS_PER_PAGE
  const currentBooks = books.slice(startIndex, endIndex)

  return (
    <div className="page-transition py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="page-title">Ma Bibliothèque</h1>
          <p className="page-subtitle">
            {books.length} {books.length > 1 ? 'livres' : 'livre'} dans ma collection
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-base p-6 mb-6"
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Rechercher par titre, auteur, tag, note, maison d'édition..."
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-base p-6 mb-12 space-y-6"
        >
          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onClearCategory={handleClearCategory}
          />

          {/* Tags Filter */}
          <div className="border-t border-text-light border-opacity-10 pt-6">
            <TagList
              tags={allTags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
              onClearTags={handleClearTags}
            />
          </div>

          {/* Rating Filter */}
          <div className="border-t border-text-light border-opacity-10 pt-6">
            <RatingFilter
              selectedRating={selectedRating}
              onRatingClick={handleRatingClick}
              onClearRating={handleClearRating}
            />
          </div>

          {/* Publisher Filter */}
          <div className="border-t border-text-light border-opacity-10 pt-6">
            <PublisherFilter
              publishers={allPublishers}
              selectedPublisher={selectedPublisher}
              onPublisherClick={handlePublisherClick}
              onClearPublisher={handleClearPublisher}
            />
          </div>
        </motion.div>

        {/* Results Info */}
        {(searchTerm || selectedTags.length > 0 || selectedCategory || selectedRating !== null || selectedPublisher) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between card-base p-4">
              <p className="text-text-light">
                <span className="font-semibold text-accent">{books.length}</span>{' '}
                {books.length > 1 ? 'résultats trouvés' : 'résultat trouvé'}
              </p>
              {(searchTerm || selectedTags.length > 0 || selectedCategory || selectedRating !== null || selectedPublisher) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTags([])
                    setSelectedCategory(null)
                    setSelectedRating(null)
                    setSelectedPublisher(null)
                  }}
                  className="text-sm text-accent hover:text-opacity-80 transition-colors"
                >
                  Réinitialiser tous les filtres
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Books Grid - Compact view with pagination */}
        {books.length > 0 ? (
          <>
            {/* Show pagination info */}
            <div className="mb-4 text-center text-text-light text-opacity-70 text-sm">
              Affichage de {startIndex + 1} à {Math.min(endIndex, books.length)} sur {books.length} livres
            </div>

            {/* Books Grid - 6 columns on large screens for compact view */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 mb-8">
              {currentBooks.map((book) => (
                <BookCardCompact key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="card-base p-12 max-w-md mx-auto">
              <p className="text-text-light text-lg mb-4">
                Aucun livre ne correspond à votre recherche
              </p>
              <p className="text-text-light text-opacity-60 mb-6">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTags([])
                  setSelectedCategory(null)
                  setSelectedRating(null)
                  setSelectedPublisher(null)
                }}
                className="btn-primary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Library

