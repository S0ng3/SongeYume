import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BookOpen, Star, TrendingUp, Award, Users, Tag, Building2, Calendar, Book, BookMarked, BookCopy } from 'lucide-react'
import booksData from '../data/books.json'
import { CATEGORIES, getCategoryFromTags } from '../data/categories'

const Stats = () => {
  // État pour l'année sélectionnée
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  // Obtenir les années disponibles dans les données
  const availableYears = useMemo(() => {
    const years = new Set()
    booksData.forEach(book => {
      const year = new Date(book.readDate).getFullYear()
      years.add(year)
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [])

  // Calculer les livres par mois pour l'année sélectionnée
  const booksByMonth = useMemo(() => {
    const monthsData = []
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    
    for (let month = 0; month < 12; month++) {
      const books = booksData.filter(book => {
        const bookDate = new Date(book.readDate)
        return bookDate.getMonth() === month && bookDate.getFullYear() === selectedYear
      }).sort((a, b) => new Date(a.readDate) - new Date(b.readDate))
      
      monthsData.push({
        month: monthNames[month],
        monthIndex: month,
        books: books,
        count: books.length
      })
    }
    
    return monthsData
  }, [selectedYear])

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalBooks = booksData.length
    const averageRating = (booksData.reduce((acc, book) => acc + book.rating, 0) / totalBooks).toFixed(1)
    
    // Books by rating category
    const ratingDistribution = {
      'Excellent (4.5-5)': booksData.filter(b => b.rating >= 4.5).length,
      'Très bon (3.5-4.4)': booksData.filter(b => b.rating >= 3.5 && b.rating < 4.5).length,
      'Bon (2.5-3.4)': booksData.filter(b => b.rating >= 2.5 && b.rating < 3.5).length,
      'Moyen (0-2.4)': booksData.filter(b => b.rating < 2.5).length
    }

    // Top authors (by number of books)
    const authorCount = {}
    booksData.forEach(book => {
      authorCount[book.author] = (authorCount[book.author] || 0) + 1
    })
    const uniqueAuthorsCount = Object.keys(authorCount).length
    const topAuthors = Object.entries(authorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([author, count]) => ({ author, count }))

    // Tag distribution (top 8)
    const tagCount = {}
    booksData.forEach(book => {
      book.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    const topTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }))

    // Publisher distribution (top 8, excluding empty publishers)
    const publisherCount = {}
    booksData.forEach(book => {
      if (book.publisher && book.publisher.trim() !== '') {
        publisherCount[book.publisher] = (publisherCount[book.publisher] || 0) + 1
      }
    })
    const topPublishers = Object.entries(publisherCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([publisher, count]) => ({ publisher, count }))

    // Instagram vs Babelio
    const publishedOnInstagram = booksData.filter(b => b.publishedOnInstagram).length
    const publishedOnBabelio = booksData.filter(b => b.publishedOnBabelio).length

    // Books per month (last 6 months)
    const now = new Date()
    const monthsData = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString('fr-FR', { month: 'short' })
      const count = booksData.filter(book => {
        const bookDate = new Date(book.readDate)
        return bookDate.getMonth() === date.getMonth() && 
               bookDate.getFullYear() === date.getFullYear()
      }).length
      monthsData.push({ month: monthName, livres: count })
    }

    // Répartition par catégories
    const categoryCount = {}
    booksData.forEach(book => {
      const categoryKey = getCategoryFromTags(book.tags)
      const categoryName = CATEGORIES[categoryKey].name
      categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1
    })
    
    const categoryDistribution = Object.entries(categoryCount)
      .map(([category, count]) => ({
        category,
        count,
        icon: Object.values(CATEGORIES).find(c => c.name === category)?.icon || '/categories/autre.png'
      }))
      .sort((a, b) => b.count - a.count)

    // Répartition par format
    const formatCount = {}
    booksData.forEach(book => {
      if (book.format) {
        formatCount[book.format] = (formatCount[book.format] || 0) + 1
      }
    })
    
    const formatDistribution = Object.entries(formatCount)
      .map(([format, count]) => ({ format, count }))
      .sort((a, b) => b.count - a.count)

    return {
      totalBooks,
      averageRating,
      ratingDistribution,
      uniqueAuthorsCount,
      topAuthors,
      topTags,
      topPublishers,
      publishedOnInstagram,
      publishedOnBabelio,
      monthsData,
      categoryDistribution,
      formatDistribution
    }
  }, [])

  // Colors for charts
  const COLORS = ['#e09e29', '#f5b557', '#f8c978', '#fbd899', '#151823', '#2a2f45', '#3d4463', '#505881']

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card-base p-3">
          <p className="text-text-light font-semibold">{label}</p>
          <p className="text-accent">
            {payload[0].value} {payload[0].value > 1 ? 'livres' : 'livre'}
          </p>
        </div>
      )
    }
    return null
  }

  // Prepare data for rating distribution pie chart
  const ratingPieData = Object.entries(statistics.ratingDistribution)
    .filter(([_, count]) => count > 0)
    .map(([category, count]) => ({ name: category, value: count }))

  return (
    <div className="page-transition py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="page-title">Statistiques</h1>
          <p className="page-subtitle">
            Analyse détaillée de ma bibliothèque personnelle
          </p>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-base card-hover p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-accent" />
              <div className="bg-accent bg-opacity-10 rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-text-light mb-1">
              {statistics.totalBooks}
            </h3>
            <p className="text-text-light text-opacity-60 text-sm">
              Livres lus au total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-base card-hover p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-accent fill-accent" />
              <div className="bg-accent bg-opacity-10 rounded-full p-2">
                <Award className="w-5 h-5 text-accent" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-text-light mb-1">
              {statistics.averageRating}/5
            </h3>
            <p className="text-text-light text-opacity-60 text-sm">
              Note moyenne
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-base card-hover p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-accent" />
              <div className="bg-accent bg-opacity-10 rounded-full p-2">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-text-light mb-1">
              {statistics.uniqueAuthorsCount}
            </h3>
            <p className="text-text-light text-opacity-60 text-sm">
              Auteurs différents
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-base card-hover p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Tag className="w-8 h-8 text-accent" />
              <div className="bg-accent bg-opacity-10 rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-text-light mb-1">
              {statistics.topTags.length}+
            </h3>
            <p className="text-text-light text-opacity-60 text-sm">
              Tags différents
            </p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Reading over time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card-base p-6"
          >
            <h2 className="text-2xl font-bold text-text-light mb-6">
              Lectures des 6 derniers mois
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.monthsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
                <XAxis dataKey="month" stroke="#dde5f2" />
                <YAxis stroke="#dde5f2" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="livres" fill="#e09e29" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Rating Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card-base p-6"
          >
            <h2 className="text-2xl font-bold text-text-light mb-6">
              Répartition par notes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ratingPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Lectures par mois pour l'année sélectionnée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-base p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-text-light">
                Lectures mensuelles
              </h2>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-card-hover text-text-light px-4 py-2 rounded-lg border border-accent border-opacity-30 focus:outline-none focus:border-accent transition-colors"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {booksByMonth.map((monthData, index) => (
              monthData.count > 0 && (
                <motion.div
                  key={monthData.monthIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="card-hover p-4 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-accent border-opacity-30 pb-2">
                    <h3 className="text-base font-bold text-text-light">
                      {monthData.month}
                    </h3>
                    <span className="text-accent text-xs font-semibold bg-accent bg-opacity-10 px-2 py-1 rounded-full">
                      {monthData.count}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {monthData.books.map(book => (
                      <motion.div
                        key={book.id}
                        whileHover={{ scale: 1.05 }}
                        className="group relative"
                      >
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-16 h-24 object-cover rounded shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-accent/30"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 rounded transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="text-center px-1">
                            <p className="text-text-light text-[10px] font-semibold line-clamp-3 leading-tight">
                              {book.title}
                            </p>
                            <p className="text-accent text-[9px] mt-1">
                              {new Date(book.readDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>

          {booksByMonth.every(m => m.count === 0) && (
            <div className="text-center py-8 text-text-light text-opacity-60">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune lecture pour l'année {selectedYear}</p>
            </div>
          )}
        </motion.div>

        {/* Répartition par catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-base p-6 mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-text-light">
              Répartition par catégories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statistics.categoryDistribution.map((categoryData, index) => {
              const percentage = ((categoryData.count / statistics.totalBooks) * 100).toFixed(1)
              return (
                <motion.div
                  key={categoryData.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="card-hover p-4 flex items-center space-x-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={categoryData.icon}
                      alt={categoryData.category}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-text-light font-semibold text-lg">
                      {categoryData.category}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-accent font-bold">
                        {categoryData.count} {categoryData.count > 1 ? 'livres' : 'livre'}
                      </span>
                      <span className="text-text-light text-opacity-60 text-sm">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-card-base rounded-full h-2 mt-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Répartition par format */}
        {statistics.formatDistribution.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="card-base p-6 mb-12"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Book className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-text-light">
                Répartition par format
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statistics.formatDistribution.map((formatData, index) => {
                const percentage = ((formatData.count / statistics.totalBooks) * 100).toFixed(1)
                
                // Définir l'icône selon le format
                let FormatIcon = BookOpen
                if (formatData.format === 'Poche') FormatIcon = BookCopy
                if (formatData.format === 'Broché') FormatIcon = Book
                if (formatData.format === 'Relié') FormatIcon = BookMarked
                
                return (
                  <motion.div
                    key={formatData.format}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="card-hover p-6 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-accent bg-opacity-20 rounded-full p-4">
                        <FormatIcon className="w-12 h-12 text-accent" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text-light mb-2">
                      {formatData.format}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="text-3xl font-bold text-accent">
                        {formatData.count}
                      </span>
                      <span className="text-text-light text-opacity-60">
                        {formatData.count > 1 ? 'livres' : 'livre'}
                      </span>
                    </div>
                    <div className="text-text-light text-opacity-60 text-sm mb-3">
                      {percentage}% de la collection
                    </div>
                    <div className="w-full bg-card-base rounded-full h-3">
                      <div
                        className="bg-accent h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Top Publishers */}
        {statistics.topPublishers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="card-base p-6 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-text-light">
                Maisons d'édition
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.topPublishers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
                <XAxis type="number" stroke="#dde5f2" />
                <YAxis dataKey="publisher" type="category" stroke="#dde5f2" width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#f5b557" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Top Authors and Publication Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Authors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-base p-6"
          >
            <h2 className="text-2xl font-bold text-text-light mb-6">
              Auteurs favoris
            </h2>
            <div className="space-y-4">
              {statistics.topAuthors.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-text-light font-medium">
                      {item.author}
                    </span>
                  </div>
                  <span className="text-accent font-bold">
                    {item.count} {item.count > 1 ? 'livres' : 'livre'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Publication Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="card-base p-6"
          >
            <h2 className="text-2xl font-bold text-text-light mb-6">
              Statut de publication
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-light">Publiés sur Instagram</span>
                  <span className="text-accent font-bold">
                    {statistics.publishedOnInstagram}/{statistics.totalBooks}
                  </span>
                </div>
                <div className="w-full bg-card-hover rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(statistics.publishedOnInstagram / statistics.totalBooks) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-light">Publiés sur Babelio</span>
                  <span className="text-accent font-bold">
                    {statistics.publishedOnBabelio}/{statistics.totalBooks}
                  </span>
                </div>
                <div className="w-full bg-card-hover rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(statistics.publishedOnBabelio / statistics.totalBooks) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Stats

