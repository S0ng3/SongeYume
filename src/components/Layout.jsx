import { Link, useLocation } from 'react-router-dom'
import { Book, Library, BarChart3, User, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Accueil', icon: BookOpen },
    { path: '/library', label: 'Bibliothèque', icon: Library },
    { path: '/stats', label: 'Statistiques', icon: BarChart3 },
    { path: '/about', label: 'À propos', icon: User }
  ]

  const isActive = (path) => location.pathname === path

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
            <div className="md:hidden">
              <details className="dropdown">
                <summary className="btn btn-ghost">
                  <svg
                    className="w-6 h-6 text-text-light"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </summary>
              </details>
            </div>
          </div>

          {/* Mobile Navigation */}
          <ul className="md:hidden mt-4 space-y-2">
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
          </ul>
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
                © 2024 Songe Yume - Tous droits réservés
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

