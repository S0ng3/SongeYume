import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page, current page with neighbors, and last page
      pages.push(1)
      
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      if (start > 2) pages.push('...')
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages - 1) pages.push('...')
      
      pages.push(totalPages)
    }
    
    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 my-8">
      {/* Previous button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
          currentPage === 1
            ? 'bg-card-bg text-text-light text-opacity-30 cursor-not-allowed'
            : 'bg-card-bg text-text-light hover:bg-accent hover:text-background'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Précédent</span>
      </motion.button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-text-light text-opacity-50">
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <motion.button
              key={page}
              whileHover={{ scale: isActive ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageClick(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-accent text-background shadow-lg'
                  : 'bg-card-bg text-text-light hover:bg-card-hover'
              }`}
            >
              {page}
            </motion.button>
          )
        })}
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'bg-card-bg text-text-light text-opacity-30 cursor-not-allowed'
            : 'bg-card-bg text-text-light hover:bg-accent hover:text-background'
        }`}
      >
        <span className="hidden sm:inline">Suivant</span>
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

export default Pagination

