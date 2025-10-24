import BookCard from './BookCard'
import { motion } from 'framer-motion'

const BookShelf = ({ books, title, subtitle }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="mb-12">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-light mb-2">{title}</h2>
          {subtitle && (
            <p className="text-text-light text-opacity-70">{subtitle}</p>
          )}
        </div>
      )}

      {books.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-light text-opacity-50 text-lg">
            Aucun livre trouvé dans cette catégorie
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {books.map((book) => (
            <motion.div key={book.id} variants={item}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default BookShelf

