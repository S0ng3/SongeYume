import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, StarHalf, Quote, Instagram, ExternalLink, Calendar, BookMarked } from 'lucide-react'
import booksData from '../data/books.json'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = booksData.find(b => b.id === parseInt(id))

  if (!book) {
    return (
      <div className="page-transition py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-text-light mb-4">
            Livre non trouvé
          </h1>
          <p className="text-text-light text-opacity-70 mb-8">
            Ce livre n'existe pas dans la bibliothèque
          </p>
          <Link to="/library" className="btn-primary">
            Retour à la bibliothèque
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = () => {
    const fullStars = Math.floor(book.rating)
    const hasHalfStar = book.rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-6 h-6 fill-accent text-accent"
        />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-6 h-6 fill-accent text-accent"
        />
      )
    }

    const emptyStars = book.maxRating - Math.ceil(book.rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-6 h-6 text-accent text-opacity-30"
        />
      )
    }

    return stars
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="page-transition">
      {/* Back Button */}
      <div className="bg-card-bg border-b border-accent border-opacity-20">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-text-light hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>
      </div>

      {/* Book Header */}
      <section className="py-12 bg-gradient-to-b from-card-bg to-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-book-hover">
                  <img
                    src={book.cover}
                    alt={`Couverture de ${book.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  {book.babelioLink && (
                    <a
                      href={book.babelioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Voir sur Babelio</span>
                    </a>
                  )}
                  
                  {book.publishedOnInstagram && book.instagramLink && (
                    <a
                      href={book.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full flex items-center justify-center space-x-2"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Voir sur Instagram</span>
                    </a>
                  )}
                </div>

                {/* Publication Status */}
                <div className="mt-6 card-base p-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-light text-opacity-70">Instagram</span>
                    <span className={book.publishedOnInstagram ? 'text-green-400' : 'text-text-light text-opacity-50'}>
                      {book.publishedOnInstagram ? '✓ Publié' : '✗ Non publié'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-light text-opacity-70">Babelio</span>
                    <span className={book.publishedOnBabelio ? 'text-green-400' : 'text-text-light text-opacity-50'}>
                      {book.publishedOnBabelio ? '✓ Publié' : '✗ Non publié'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {/* Title and Author */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-3">
                  {book.title}
                </h1>
                <p className="text-xl text-text-light text-opacity-80 mb-4">
                  Par {book.author}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars()}
                  </div>
                  <span className="text-2xl font-bold text-accent">
                    {book.rating}/{book.maxRating}
                  </span>
                </div>

                {/* Read Date */}
                <div className="flex items-center space-x-2 text-text-light text-opacity-60">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Lu le {formatDate(book.readDate)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {book.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <div className="card-base p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <BookMarked className="w-5 h-5 text-accent" />
                  <h2 className="text-2xl font-bold text-text-light">Résumé</h2>
                </div>
                <p className="text-text-light text-opacity-80 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              {/* Personal Review */}
              <div className="card-base p-6 mb-6 bg-accent bg-opacity-5 border-2 border-accent border-opacity-20">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <h2 className="text-2xl font-bold text-text-light">Mon avis</h2>
                </div>
                <p className="text-text-light text-opacity-90 leading-relaxed italic">
                  {book.personalReview}
                </p>
              </div>

              {/* Quotes */}
              {book.quotes && book.quotes.length > 0 && (
                <div className="card-base p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Quote className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-bold text-text-light">Citations favorites</h2>
                  </div>
                  <div className="space-y-4">
                    {book.quotes.map((quote, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-6 border-l-4 border-accent py-2"
                      >
                        <p className="text-text-light text-opacity-90 italic leading-relaxed">
                          "{quote}"
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="py-12 bg-card-bg bg-opacity-30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-light mb-8">
            Autres livres du même auteur
          </h2>
          <div className="text-center text-text-light text-opacity-60">
            <p>Fonctionnalité à venir</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookDetail

