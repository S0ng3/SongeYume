import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import BookCardCompact from '../components/BookCardCompact'
import SearchBar from '../components/SearchBar'
import TagList from '../components/TagList'
import CategoryFilter from '../components/CategoryFilter'
import PublisherFilter from '../components/PublisherFilter'
import SpicyFilter from '../components/SpicyFilter'
import SortSelector from '../components/SortSelector'
import Pagination from '../components/Pagination'
import { filterBooksByCategory, getCategoryNames, CATEGORIES } from '../data/categories'
import booksData from '../data/books.json'

const BOOKS_PER_PAGE = 24 // 2 rows of 12 on large screens

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedPublisher, setSelectedPublisher] = useState(null)
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState(null)
  const [allTags, setAllTags] = useState([])
  const [allPublishers, setAllPublishers] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('readDate') // Par défaut : date de lecture

  // Charger le filtre de tag depuis l'URL au montage du composant
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    if (tagFromUrl) {
      setSelectedTags([tagFromUrl])
      setIsFiltersOpen(true) // Ouvrir les filtres pour montrer le tag sélectionné
      // Nettoyer l'URL après avoir appliqué le filtre
      setSearchParams({})
    }
  }, []) // Uniquement au montage

  // Mettre à jour les options de filtres disponibles en fonction des filtres actifs
  useEffect(() => {
    // Calculer le nombre de livres par catégorie (sans filtres)
    const categoryCountMap = {}
    Object.keys(CATEGORIES).forEach(categoryKey => {
      const booksInCategory = filterBooksByCategory(booksData, categoryKey)
      categoryCountMap[categoryKey] = booksInCategory.length
    })
    setCategoryCounts(categoryCountMap)

    // Filtrer les livres disponibles en fonction des filtres déjà appliqués
    let availableBooks = booksData

    // 1. Appliquer le filtre de catégorie
    if (selectedCategory) {
      availableBooks = filterBooksByCategory(availableBooks, selectedCategory)
    }

    // 2. Appliquer le filtre de recherche
    if (searchTerm) {
      availableBooks = availableBooks.filter(book => {
        const searchLower = searchTerm.toLowerCase()
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          book.summary.toLowerCase().includes(searchLower) ||
          book.rating.toString().includes(searchLower) ||
          (book.publisher && book.publisher.toLowerCase().includes(searchLower)) ||
          (book.series && book.series.toLowerCase().includes(searchLower))
        )
      })
    }

    // 3. Appliquer le filtre de tags
    if (selectedTags.length > 0) {
      availableBooks = availableBooks.filter(book =>
        selectedTags.every(tag => book.tags.includes(tag))
      )
    }

    // Extraire les tags disponibles avec leur fréquence d'utilisation
    const categoryNames = getCategoryNames()
    const tagFrequency = {}
    availableBooks.forEach(book => {
      book.tags.forEach(tag => {
        if (!categoryNames.includes(tag)) {
          tagFrequency[tag] = (tagFrequency[tag] || 0) + 1
        }
      })
    })
    
    // Trier les tags par fréquence décroissante, puis alphabétiquement
    const sortedTags = Object.keys(tagFrequency).sort((a, b) => {
      const freqDiff = tagFrequency[b] - tagFrequency[a]
      if (freqDiff !== 0) return freqDiff
      return a.localeCompare(b)
    })
    
    setAllTags(sortedTags)

    // Extraire les éditeurs disponibles dans les livres filtrés
    const publisherCount = {}
    availableBooks.forEach(book => {
      if (book.publisher && book.publisher.trim() !== '') {
        publisherCount[book.publisher] = (publisherCount[book.publisher] || 0) + 1
      }
    })
    const publishersList = Object.entries(publisherCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
    setAllPublishers(publishersList)

    // Réinitialiser l'éditeur sélectionné s'il n'est plus disponible
    if (selectedPublisher) {
      const availablePublisherNames = publishersList.map(p => p.name)
      if (!availablePublisherNames.includes(selectedPublisher)) {
        setSelectedPublisher(null)
      }
    }
  }, [selectedCategory, searchTerm, selectedTags, selectedPublisher])

  useEffect(() => {
    // Filter books based on category, search term, tags, rating, publisher and platforms
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
          (book.publisher && book.publisher.toLowerCase().includes(searchLower)) ||
          (book.series && book.series.toLowerCase().includes(searchLower))
        )
      })
    }

    // 3. Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(book =>
        selectedTags.every(tag => book.tags.includes(tag))
      )
    }

    // 4. Filter by publisher
    if (selectedPublisher) {
      filtered = filtered.filter(book => book.publisher === selectedPublisher)
    }

    // 5. Filter by spicy level
    if (selectedSpicyLevel !== null) {
      filtered = filtered.filter(book => book.spicyLevel === selectedSpicyLevel)
    }

    // Appliquer le tri
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'readDate':
          // Tri par date de lecture (récent → ancien)
          return new Date(b.readDate) - new Date(a.readDate)
        case 'rating':
          // Tri par note (meilleure → moins bonne)
          return b.rating - a.rating
        case 'title':
          // Tri par titre (A → Z)
          return a.title.localeCompare(b.title, 'fr')
        case 'author':
          // Tri par auteur (A → Z)
          return a.author.localeCompare(b.author, 'fr')
        default:
          return 0
      }
    })

    setBooks(sorted)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedTags, selectedCategory, selectedPublisher, selectedSpicyLevel, sortBy])

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
      // Clear tags and other filters when changing category for cleaner UX
      setSelectedTags([])
      setSelectedPublisher(null)
    }
  }

  const handleClearCategory = () => {
    setSelectedCategory(null)
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

  const handleSpicyLevelClick = (level) => {
    if (selectedSpicyLevel === level) {
      setSelectedSpicyLevel(null)
    } else {
      setSelectedSpicyLevel(level)
    }
  }

  const handleClearSpicyLevel = () => {
    setSelectedSpicyLevel(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
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

        {/* Search Bar and Sort Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-base p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1 w-full">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                placeholder="Rechercher par titre, auteur, série, tags..."
              />
            </div>
            <div className="w-full lg:w-auto">
              <SortSelector
                selectedSort={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </motion.div>

        {/* Advanced Filters - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-base mb-12"
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-text-light hover:bg-card-hover transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-accent">Filtres</span>
              {(selectedCategory || selectedTags.length > 0 || selectedPublisher || selectedSpicyLevel !== null) && (
                <span className="bg-accent bg-opacity-20 text-accent text-xs font-semibold px-2 py-1 rounded-full">
                  {[
                    selectedCategory ? 1 : 0,
                    selectedTags.length,
                    selectedPublisher ? 1 : 0,
                    selectedSpicyLevel !== null ? 1 : 0
                  ].reduce((a, b) => a + b, 0)} actif(s)
                </span>
              )}
            </div>
            {isFiltersOpen ? (
              <ChevronUp className="w-5 h-5 text-accent" />
            ) : (
              <ChevronDown className="w-5 h-5 text-accent" />
            )}
          </button>

          {/* Filters Content */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 space-y-6">
                  {/* Category Filter */}
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                    onClearCategory={handleClearCategory}
                    categoryCounts={categoryCounts}
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

                  {/* Publisher Filter */}
                  <div className="border-t border-text-light border-opacity-10 pt-6">
                    <PublisherFilter
                      publishers={allPublishers}
                      selectedPublisher={selectedPublisher}
                      onPublisherClick={handlePublisherClick}
                      onClearPublisher={handleClearPublisher}
                    />
                  </div>

                  {/* Spicy Level Filter */}
                  <div className="border-t border-text-light border-opacity-10 pt-6">
                    <SpicyFilter
                      selectedSpicyLevel={selectedSpicyLevel}
                      onSpicyLevelClick={handleSpicyLevelClick}
                      onClearSpicyLevel={handleClearSpicyLevel}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Info */}
        {(searchTerm || selectedTags.length > 0 || selectedCategory || selectedPublisher || selectedSpicyLevel !== null) && (
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
              {(searchTerm || selectedTags.length > 0 || selectedCategory || selectedPublisher || selectedSpicyLevel !== null) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTags([])
                    setSelectedCategory(null)
                    setSelectedPublisher(null)
                    setSelectedSpicyLevel(null)
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
                Aucun livre ne correspond à cette recherche
              </p>
              <p className="text-text-light text-opacity-60 mb-6">
                Essayez de modifier les critères de recherche ou de filtrage
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTags([])
                  setSelectedCategory(null)
                  setSelectedPublisher(null)
                  setSelectedSpicyLevel(null)
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

