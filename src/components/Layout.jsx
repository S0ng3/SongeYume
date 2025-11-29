import { Link, useLocation } from 'react-router-dom'
import { Book, Library, BarChart3, User, BookOpen, Quote, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Layout = ({ children }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Accueil', icon: BookOpen },
    { path: '/library', label: 'Bibliothèque', icon: Library },
    { path: '/quotes', label: 'Citations', icon: Quote },
    { path: '/stats', label: 'Statistiques', icon: BarChart3 },
    { path: '/about', label: 'À propos', icon: User }
  ]

  const isActive = (path) => location.pathname === path

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background bg-opacity-95 backdrop-blur-sm border-b border-accent border-opacity-20">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Book className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-text-light group-hover:text-accent transition-colors">
                  Songe Yume
                </h1>
                <p className="text-xs text-text-light text-opacity-60">
                  Ma bibliothèque virtuelle
                </p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <ul className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-accent text-background font-semibold'
                          : 'text-text-light hover:bg-card-bg hover:text-accent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Navigation Mobile - Hamburger menu */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="md:hidden p-2 rounded-lg hover:bg-card-bg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text-light" />
              ) : (
                <Menu className="w-6 h-6 text-text-light" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 space-y-2 overflow-hidden"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-accent text-background font-semibold'
                          : 'text-text-light hover:bg-card-bg'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card-bg border-t border-accent border-opacity-20 py-8 mt-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-text-light text-opacity-80">
                © 2025 SongeYume - Tous droits réservés
              </p>
              <p className="text-text-light text-opacity-60 text-sm mt-1">
                Ma bibliothèque virtuelle personnelle
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Book className="w-6 h-6 text-accent" />
              <span className="text-text-light text-opacity-70">
                Créé avec passion pour les livres
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

