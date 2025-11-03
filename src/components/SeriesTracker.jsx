import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookMarked, CheckCircle2, Circle, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import booksData from '../data/books.json'

/**
 * Composant de suivi de série pour un livre
 * Détecte et affiche les autres tomes de la même série
 */
const SeriesTracker = ({ currentBook }) => {
  // Détection de la série et des volumes
  const seriesInfo = useMemo(() => {
    if (!currentBook) return null

    let seriesName = null
    let currentVolume = null
    let seriesBooks = []

    // PRIORITÉ 1 : Utiliser les champs explicites si présents
    if (currentBook.series && currentBook.seriesOrder) {
      seriesName = currentBook.series
      currentVolume = currentBook.seriesOrder

      // Chercher tous les livres de la même série via le champ explicite
      seriesBooks = booksData
        .filter(book => book.series === seriesName)
        .map(book => ({
          ...book,
          volumeNumber: book.seriesOrder
        }))
    } 
    // PRIORITÉ 2 : Fallback sur détection automatique
    else {
      // Patterns pour détecter les séries
      const patterns = [
        /(.+?),?\s+[Tt]ome\s+(\d+)/,              // "Titre, tome 1"
        /(.+?)\s+[Tt](\d+)/,                       // "Titre T1"
        /(.+?)\s+[-:]\s+[Vv]olume\s+(\d+)/,       // "Titre - Volume 1"
        /(.+?)\s+[-:]\s+[Ll]ivre\s+(\d+)/,        // "Titre - Livre 1"
        /(.+?)\s+(\d+)$/,                          // "Titre 1" (en fin)
      ]

      // Essayer de détecter la série pour le livre actuel
      for (const pattern of patterns) {
        const match = currentBook.title.match(pattern)
        if (match) {
          seriesName = match[1].trim()
          currentVolume = parseInt(match[2])
          break
        }
      }

      // Si pas de série détectée
      if (!seriesName || !currentVolume) return null

      // Chercher tous les livres de la même série via patterns
      booksData.forEach(book => {
        for (const pattern of patterns) {
          const match = book.title.match(pattern)
          if (match && match[1].trim() === seriesName) {
            seriesBooks.push({
              ...book,
              volumeNumber: parseInt(match[2])
            })
            break
          }
        }
      })
    }

    // Si pas de série détectée ou trouvée
    if (!seriesName || !currentVolume) return null

    // S'il n'y a qu'un seul livre, ce n'est pas vraiment une série
    if (seriesBooks.length <= 1) return null

    // Trier par numéro de tome
    seriesBooks.sort((a, b) => a.volumeNumber - b.volumeNumber)

    // Calculer les statistiques
    const readBooks = seriesBooks.filter(b => b.rating > 0).length
    const progress = (readBooks / seriesBooks.length) * 100
    const currentIndex = seriesBooks.findIndex(b => b.id === currentBook.id)
    const nextBook = seriesBooks.find(b => b.volumeNumber > currentVolume && b.rating === 0)
    const previousBook = currentIndex > 0 ? seriesBooks[currentIndex - 1] : null

    return {
      name: seriesName,
      books: seriesBooks,
      totalBooks: seriesBooks.length,
      readBooks,
      progress,
      currentVolume,
      nextBook,
      previousBook
    }
  }, [currentBook])

  if (!seriesInfo) return null

  return (
    <div className="card-base p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-accent bg-opacity-20 rounded-lg p-2">
              <BookMarked className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-light">
                {seriesInfo.name}
              </h2>
              <p className="text-text-light text-opacity-60 text-sm">
                Série en {seriesInfo.totalBooks} {seriesInfo.totalBooks > 1 ? 'tomes' : 'tome'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end space-x-2 mb-2">
            {seriesInfo.progress === 100 ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : seriesInfo.progress > 0 ? (
              <TrendingUp className="w-6 h-6 text-accent" />
            ) : (
              <Circle className="w-6 h-6 text-text-light text-opacity-30" />
            )}
            <span className="text-2xl font-bold text-accent">
              {seriesInfo.readBooks}/{seriesInfo.totalBooks}
            </span>
          </div>
          <p className="text-text-light text-opacity-60 text-sm">
            Tome {seriesInfo.currentVolume}
          </p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-card-hover rounded-full h-3 overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${seriesInfo.progress}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full rounded-full ${
            seriesInfo.progress === 100
              ? 'bg-green-500'
              : seriesInfo.progress > 0
              ? 'bg-accent'
              : 'bg-text-light bg-opacity-20'
          }`}
        />
      </div>

      {/* Suggestions de navigation */}
      {(seriesInfo.previousBook || seriesInfo.nextBook) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {seriesInfo.previousBook && (
            <Link
              to={`/book/${seriesInfo.previousBook.id}`}
              className="card-base bg-card-hover p-4 hover:bg-opacity-80 transition-all group"
            >
              <p className="text-text-light text-opacity-60 text-xs mb-2">
                ← Tome précédent
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={seriesInfo.previousBook.cover}
                  alt={seriesInfo.previousBook.title}
                  className="w-12 h-16 object-cover rounded shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-text-light font-semibold text-sm truncate group-hover:text-accent transition-colors">
                    {seriesInfo.previousBook.title}
                  </p>
                  {seriesInfo.previousBook.rating > 0 && (
                    <p className="text-accent text-xs">
                      ⭐ {seriesInfo.previousBook.rating}/5
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {seriesInfo.nextBook && (
            <Link
              to={`/book/${seriesInfo.nextBook.id}`}
              className="card-base bg-accent bg-opacity-10 border-2 border-accent border-opacity-30 p-4 hover:bg-opacity-20 transition-all group"
            >
              <p className="text-accent text-xs font-semibold mb-2">
                Prochain tome à lire →
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={seriesInfo.nextBook.cover}
                  alt={seriesInfo.nextBook.title}
                  className="w-12 h-16 object-cover rounded shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-text-light font-semibold text-sm truncate group-hover:text-accent transition-colors">
                    {seriesInfo.nextBook.title}
                  </p>
                  <p className="text-text-light text-opacity-60 text-xs">
                    Tome {seriesInfo.nextBook.volumeNumber}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Tous les tomes */}
      <div>
        <h3 className="text-text-light font-semibold mb-3 text-sm">
          Tous les tomes
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {seriesInfo.books.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className={`group relative ${
                book.id === currentBook.id ? 'ring-2 ring-accent rounded-lg' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover rounded shadow-md group-hover:scale-105 transition-transform"
                />
                
                {/* Badge de statut */}
                {book.rating > 0 ? (
                  <div className="absolute top-1 right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="absolute top-1 right-1 bg-card-bg bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    <Circle className="w-4 h-4 text-text-light text-opacity-40" />
                  </div>
                )}

                {/* Indicateur du livre actuel */}
                {book.id === currentBook.id && (
                  <div className="absolute inset-0 bg-accent bg-opacity-20 rounded flex items-center justify-center">
                    <span className="bg-accent text-background text-xs font-bold px-2 py-1 rounded">
                      Actuel
                    </span>
                  </div>
                )}

                {/* Numéro de tome */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-1">
                  <p className="text-text-light text-xs font-semibold text-center">
                    T{book.volumeNumber}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Message de motivation */}
      {seriesInfo.progress < 100 && seriesInfo.progress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-accent bg-opacity-10 rounded-lg border-l-4 border-accent"
        >
          <p className="text-text-light text-sm">
            💪 Vous avez lu <strong className="text-accent">{seriesInfo.readBooks} tome{seriesInfo.readBooks > 1 ? 's' : ''}</strong> sur {seriesInfo.totalBooks}. 
            {seriesInfo.nextBook && (
              <span> Il ne vous reste que <strong className="text-accent">{seriesInfo.totalBooks - seriesInfo.readBooks} tome{(seriesInfo.totalBooks - seriesInfo.readBooks) > 1 ? 's' : ''}</strong> pour terminer la série !</span>
            )}
          </p>
        </motion.div>
      )}

      {seriesInfo.progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-green-500 bg-opacity-10 rounded-lg border-l-4 border-green-500"
        >
          <p className="text-text-light text-sm">
            🎉 Bravo ! Vous avez terminé toute la série <strong className="text-green-500">{seriesInfo.name}</strong> !
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default SeriesTracker


