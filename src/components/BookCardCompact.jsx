import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SpicyIndicator from './SpicyIndicator'
import { isSubgenre } from '../utils/subgenres'
import { getImagePath } from '../utils/helpers'

const BookCardCompact = ({ book }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/book/${book.id}`}>
        <div className="card-base card-hover overflow-hidden h-full flex flex-col group">
          {/* Book Cover - Smaller */}
          <div className="relative overflow-hidden aspect-[2/3] bg-card-hover">
            <img
              src={getImagePath(book.cover)}
              alt={`Couverture de ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            
            {/* Badge Favoris */}
            {book.tags && book.tags.includes('Favoris') && (
              <div className="absolute top-2 left-2 bg-accent text-background p-1.5 rounded-full shadow-lg">
                <Star className="w-4 h-4 fill-accent" />
              </div>
            )}
            
            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-background bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-accent text-xs font-bold">
                {book.rating}
              </span>
            </div>
          </div>

          {/* Book Info - More compact */}
          <div className="p-3 flex flex-col flex-grow">
            <h3 className="text-sm font-bold text-text-light mb-1 line-clamp-2 group-hover:text-accent transition-colors leading-tight">
              {book.title}
            </h3>
            <p className="text-text-light text-opacity-70 text-xs mb-2 line-clamp-1">
              {book.author}
            </p>

            {/* Spicy Level */}
            {book.spicyLevel !== undefined && book.spicyLevel !== null && (
              <div className="mb-2">
                <SpicyIndicator level={book.spicyLevel} size="xs" />
              </div>
            )}

            {/* Tags - Show only 2 */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {book.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSubgenre(tag)
                      ? 'bg-yellow-300 bg-opacity-20 text-yellow-200 font-semibold'
                      : 'bg-accent bg-opacity-10 text-accent'
                  }`}
                >
                  {tag}
                </span>
              ))}
              {book.tags.length > 2 && (
                <span className="text-xs text-text-light text-opacity-50 px-1">
                  +{book.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BookCardCompact

