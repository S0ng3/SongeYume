import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SpicyIndicator from './SpicyIndicator'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import { isSubgenre } from '../utils/subgenres'
import { getImagePath } from '../utils/helpers'

const BookCardWithReview = ({ book }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/book/${book.id}`}>
        <div className="card-base card-hover overflow-hidden h-full flex flex-col group">
          {/* Couverture du livre */}
          <div className="relative">
            <ImageWithPlaceholder
              src={getImagePath(book.cover)}
              alt={`Couverture de ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              aspectRatio="aspect-[2/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            
            {/* Badge Favoris */}
            {book.tags && book.tags.includes('Favoris') && (
              <div className="absolute top-3 left-3 bg-accent text-background p-2 rounded-full shadow-lg">
                <Star className="w-5 h-5 fill-accent" />
              </div>
            )}
            
            {/* Badge de note */}
            <div className="absolute top-3 right-3 bg-background bg-opacity-90 rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-accent text-sm font-bold">
                {book.rating}
              </span>
            </div>
          </div>

          {/* Informations du livre */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-text-light mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {book.title}
            </h3>
            <p className="text-text-light text-opacity-70 text-sm mb-3">
              {book.author}
            </p>

            {/* Spicy Level */}
            {book.spicyLevel !== undefined && book.spicyLevel !== null && (
              <div className="mb-3">
                <SpicyIndicator level={book.spicyLevel} size="sm" />
              </div>
            )}

            {/* Avis personnel */}
            {book.personalReview && (
              <div className="mb-3 flex-grow">
                <h4 className="text-accent font-semibold mb-2 text-xs uppercase tracking-wide">
                  Mon avis
                </h4>
                <p className="text-text-light text-opacity-90 leading-relaxed text-sm line-clamp-4">
                  {book.personalReview}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {book.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isSubgenre(tag)
                      ? 'bg-yellow-300 bg-opacity-20 text-yellow-200 font-semibold'
                      : 'bg-accent bg-opacity-10 text-accent'
                  }`}
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

export default BookCardWithReview

