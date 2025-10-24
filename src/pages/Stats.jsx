import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BookOpen, Star, TrendingUp, Award, Users, Tag } from 'lucide-react'
import booksData from '../data/books.json'

const Stats = () => {
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

    return {
      totalBooks,
      averageRating,
      ratingDistribution,
      topAuthors,
      topTags,
      publishedOnInstagram,
      publishedOnBabelio,
      monthsData
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
              {statistics.topAuthors.length}
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

        {/* Top Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-base p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-text-light mb-6">
            Tags les plus utilisés
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics.topTags} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
              <XAxis type="number" stroke="#dde5f2" />
              <YAxis dataKey="tag" type="category" stroke="#dde5f2" width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#e09e29" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

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

