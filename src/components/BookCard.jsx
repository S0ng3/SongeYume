import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, StarHalf } from 'lucide-react'
import SpicyIndicator from './SpicyIndicator'

const BookCard = ({ book }) => {
  // Calculate stars display
  const renderStars = () => {
    const fullStars = Math.floor(book.rating)
    const hasHalfStar = book.rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-accent text-accent"
        />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-accent text-accent"
        />
      )
    }

    const emptyStars = book.maxRating - Math.ceil(book.rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-accent text-opacity-30"
        />
      )
    }

    return stars
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/book/${book.id}`}>
        <div className="card-base card-hover overflow-hidden h-full flex flex-col group">
          {/* Book Cover */}
          <div className="relative overflow-hidden aspect-[2/3] bg-card-hover">
            <img
              src={book.cover}
              alt={`Couverture de ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full font-bold text-sm shadow-lg">
              {book.rating}/{book.maxRating}
            </div>
          </div>

          {/* Book Info */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-text-light mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {book.title}
            </h3>
            <p className="text-text-light text-opacity-70 text-sm mb-3">
              {book.author}
            </p>

            {/* Stars */}
            <div className="flex items-center space-x-1 mb-3">
              {renderStars()}
            </div>

            {/* Spicy Level */}
            {book.spicyLevel !== undefined && book.spicyLevel !== null && (
              <div className="mb-3">
                <SpicyIndicator level={book.spicyLevel} size="sm" />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {book.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-accent bg-opacity-10 text-accent px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {book.tags.length > 3 && (
                <span className="text-xs text-text-light text-opacity-50 px-2 py-1">
                  +{book.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BookCard

