import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, Sparkles, Shuffle } from 'lucide-react'
import { Link } from 'react-router-dom'
import booksData from '../data/books.json'
import { getImagePath, getBookUrl } from '../utils/helpers'

/**
 * Composant Citation du Jour
 * Affiche une citation aléatoire qui change chaque jour
 */
const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null)

  // Obtenir toutes les citations disponibles
  const getAllQuotes = () => {
    const quotes = []
    booksData.forEach(book => {
      if (book.quotes && book.quotes.length > 0) {
        book.quotes.forEach(quoteText => {
          quotes.push({
            text: quoteText,
            bookId: book.id,
            bookTitle: book.title,
            author: book.author,
            cover: book.cover
          })
        })
      }
    })
    return quotes
  }

  // Obtenir la citation du jour (basée sur la date pour cohérence)
  const getQuoteOfTheDay = () => {
    const quotes = getAllQuotes()
    if (quotes.length === 0) return null

    // Créer un seed basé sur la date du jour
    const today = new Date()
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    
    // Fonction de hash pour pseudo-randomisation déterministe
    // Garantit la même citation toute la journée mais avec distribution aléatoire
    let hash = 0
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i)
      hash = hash & hash // Convert to 32bit integer
    }
    
    // Index pseudo-aléatoire mais déterministe pour la journée
    const index = Math.abs(hash) % quotes.length
    
    return quotes[index]
  }

  // Forcer une nouvelle citation aléatoire
  const shuffleQuote = () => {
    const quotes = getAllQuotes()
    if (quotes.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  useEffect(() => {
    setQuote(getQuoteOfTheDay())
  }, [])

  if (!quote) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card-base p-8 relative overflow-hidden"
    >
      {/* Décoration d'arrière-plan */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent opacity-5 rounded-full -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent opacity-5 rounded-full -ml-16 -mb-16"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-accent bg-opacity-20 rounded-lg p-2">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-accent">
              Citation du jour
            </h3>
          </div>
          <button
            onClick={shuffleQuote}
            className="text-text-light text-opacity-60 hover:text-accent transition-colors p-2 hover:bg-accent hover:bg-opacity-10 rounded-lg"
            title="Changer de citation"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>

        {/* Citation */}
        <div className="mb-6">
          <Quote className="w-8 h-8 text-accent opacity-30 mb-3" />
          <blockquote className="text-xl md:text-2xl text-text-light font-serif italic leading-relaxed">
            "{quote.text}"
          </blockquote>
        </div>

        {/* Source */}
        <Link 
          to={getBookUrl(quote.bookId, quote.bookTitle)}
          className="flex items-center space-x-3 group w-fit"
        >
          <img 
            src={getImagePath(quote.cover)} 
            alt={quote.bookTitle}
            className="w-10 h-14 object-cover rounded shadow-md group-hover:scale-105 transition-transform"
          />
          <div>
            <p className="text-accent font-semibold group-hover:text-opacity-80 transition-colors">
              {quote.bookTitle}
            </p>
            <p className="text-text-light text-opacity-60 text-sm">
              {quote.author}
            </p>
          </div>
        </Link>

        {/* Lien vers toutes les citations */}
        <div className="mt-6 pt-6 border-t border-text-light border-opacity-10">
          <Link 
            to="/quotes"
            className="text-accent hover:text-opacity-80 transition-colors text-sm font-medium flex items-center space-x-2 group w-fit"
          >
            <span>Voir toutes les citations</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default QuoteOfTheDay

