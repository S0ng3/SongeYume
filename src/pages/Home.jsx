import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Star, ArrowRight } from 'lucide-react'
import BookShelf from '../components/BookShelf'
import booksData from '../data/books.json'

const Home = () => {
  const [recentBooks, setRecentBooks] = useState([])
  const [topRatedBooks, setTopRatedBooks] = useState([])

  useEffect(() => {
    // Get recent books (sorted by read date)
    const sortedByDate = [...booksData].sort((a, b) => 
      new Date(b.readDate) - new Date(a.readDate)
    )
    setRecentBooks(sortedByDate.slice(0, 4))

    // Get top rated books
    const sortedByRating = [...booksData].sort((a, b) => b.rating - a.rating)
    setTopRatedBooks(sortedByRating.slice(0, 4))
  }, [])

  const stats = {
    totalBooks: booksData.length,
    averageRating: (booksData.reduce((acc, book) => acc + book.rating, 0) / booksData.length).toFixed(1),
    publishedOnInstagram: booksData.filter(book => book.publishedOnInstagram).length
  }

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card-bg to-background py-20">
        <div className="container-custom">
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
              className="mb-8"
            >
              <img 
                src="/SongeYume_HomePage.png" 
                alt="Songe Yume - Ma Bibliothèque Virtuelle"
                className="mx-auto max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </motion.div>
            
            <p className="page-subtitle">
              Découvrez ma collection personnelle de livres, mes critiques et mes coups de cœur
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-base p-6"
              >
                <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-light mb-1">
                  {stats.totalBooks}
                </p>
                <p className="text-text-light text-opacity-70 text-sm">
                  Livres lus
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-base p-6"
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
                className="card-base p-6"
              >
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-light mb-1">
                  {stats.publishedOnInstagram}
                </p>
                <p className="text-text-light text-opacity-70 text-sm">
                  Publiés sur Instagram
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Books Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-light mb-2">
                Lectures récentes
              </h2>
              <p className="text-text-light text-opacity-70">
                Mes dernières découvertes littéraires
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

          <BookShelf books={recentBooks} />

          <Link
            to="/library"
            className="md:hidden btn-primary w-full text-center mt-6 inline-block"
          >
            Voir toute la bibliothèque
          </Link>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-16 bg-card-bg bg-opacity-30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-light mb-2">
                Mes meilleurs coups de cœur
              </h2>
              <p className="text-text-light text-opacity-70">
                Les livres qui ont marqué mon parcours
              </p>
            </div>
          </div>

          <BookShelf books={topRatedBooks} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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

