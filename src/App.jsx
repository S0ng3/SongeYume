import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Library from './pages/Library'
import BookDetail from './pages/BookDetail'
import Stats from './pages/Stats'
import About from './pages/About'
import Quotes from './pages/Quotes'

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/book/:id/:slug?" element={<BookDetail />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App

