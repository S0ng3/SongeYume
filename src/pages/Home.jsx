import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Users, Star, ArrowRight } from 'lucide-react'
import BookCardWithReview from '../components/BookCardWithReview'
import QuoteOfTheDay from '../components/QuoteOfTheDay'
import ParallaxBackground from '../components/ParallaxBackground'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import booksData from '../data/books.json'
import { getImagePath } from '../utils/helpers'

const Home = () => {
  const [recentBooks, setRecentBooks] = useState([])

  useEffect(() => {
    // Récupération des lectures récentes (triées par date de lecture)
    const sortedByDate = [...booksData].sort((a, b) => 
      new Date(b.readDate) - new Date(a.readDate)
    )
    setRecentBooks(sortedByDate.slice(0, 4))
  }, [])

  const stats = {
    totalBooks: booksData.length,
    averageRating: (booksData.reduce((acc, book) => acc + book.rating, 0) / booksData.length).toFixed(1),
    uniqueAuthors: new Set(booksData.map(book => book.author)).size
  }

  return (
    <div className="page-transition">
      {/* Hero Section avec Parallaxe */}
      <section className="relative bg-gradient-to-b from-card-bg to-background py-20 overflow-hidden">
        {/* Arrière-plan parallaxe avec couvertures */}
        <ParallaxBackground books={booksData} />
        
        <div className="container-custom relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8 max-w-full mx-auto"
              style={{ maxHeight: '400px', maxWidth: '100%' }}
            >
              <ImageWithPlaceholder
                src={getImagePath('/SongeYume_HomePage.png')} 
                alt="Songe Yume - Ma Bibliothèque Virtuelle"
                className="mx-auto max-w-full h-auto object-contain"
                aspectRatio=""
                placeholderClassName="!bg-transparent"
              />
            </motion.div>
            
            <p className="page-subtitle">
              Découvrez ma collection personnelle de livres, mes critiques et mes favoris
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-base p-6 backdrop-blur-sm bg-card-bg/90"
              >
                <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-light mb-1">
                  {stats.totalBooks}
                </p>
                <p className="text-text-light text-opacity-70 text-sm">
                  Livres disponibles
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-base p-6 backdrop-blur-sm bg-card-bg/90"
              >
                <Star className="w-8 h-8 text-accent mx-auto mb-3 fill-accent" />
                <p className="text-3xl font-bold text-text-light mb-1">
                  {stats.averageRating}/5
                </p>
                <p className="text-text-light text-opacity-70 text-sm">
                  Note moyenne
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-base p-6 backdrop-blur-sm bg-card-bg/90"
              >
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-light mb-1">
                  {stats.uniqueAuthors}
                </p>
                <p className="text-text-light text-opacity-70 text-sm">
                  Auteurs différents
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote of the Day Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card-bg to-opacity-20">
        <div className="container-custom">
          <QuoteOfTheDay />
        </div>
      </section>

      {/* Recent Books Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-light mb-2">
                Mes dernières lectures
              </h2>
              <p className="text-text-light text-opacity-70">
                Mes toutes dernières découvertes littéraires avec mes avis
              </p>
            </div>
            <Link
              to="/library"
              className="hidden md:flex items-center space-x-2 text-accent hover:text-opacity-80 transition-colors group"
            >
              <span className="font-medium">Voir toute la bibliothèque</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recentBooks.map((book) => (
              <BookCardWithReview key={book.id} book={book} />
            ))}
          </motion.div>

          <Link
            to="/library"
            className="md:hidden btn-primary w-full text-center mt-6 inline-block"
          >
            Voir toute la bibliothèque
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="card-base p-12 text-center bg-gradient-to-br from-card-bg to-card-hover"
          >
            <h2 className="text-3xl font-bold text-text-light mb-4">
              Explorez ma bibliothèque complète
            </h2>
            <p className="text-text-light text-opacity-70 mb-8 max-w-2xl mx-auto">
              Plongez dans l'ensemble de mes lectures, filtrez par genre, découvrez mes critiques détaillées et mes citations préférées
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/library" className="btn-primary">
                Parcourir la bibliothèque
              </Link>
              <Link to="/stats" className="btn-secondary">
                Voir les statistiques
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

