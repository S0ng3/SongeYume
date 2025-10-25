import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, BookOpen } from 'lucide-react'
import booksData from '../data/books.json'

/**
 * Page d'administration pour gérer la bibliothèque
 * Permet d'ajouter, éditer et supprimer des livres
 */
const Admin = () => {
  const [books, setBooks] = useState(booksData)
  const [editingBook, setEditingBook] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  
  // Formulaire vide pour un nouveau livre
  const emptyBook = {
    title: '',
    author: '',
    cover: '',
    summary: '',
    personalReview: '',
    rating: 0,
    maxRating: 5,
    quotes: [],
    tags: [],
    publishedOnInstagram: false,
    instagramLink: '',
    publishedOnBabelio: false,
    babelioLink: '',
    readDate: new Date().toISOString().split('T')[0],
    publisher: ''
  }
  
  const [formData, setFormData] = useState(emptyBook)
  const [newTag, setNewTag] = useState('')
  const [newQuote, setNewQuote] = useState('')
  
  // Gestion du formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }
  
  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }
  
  const handleAddQuote = () => {
    if (newQuote.trim()) {
      setFormData(prev => ({
        ...prev,
        quotes: [...prev.quotes, newQuote.trim()]
      }))
      setNewQuote('')
    }
  }
  
  const handleRemoveQuote = (index) => {
    setFormData(prev => ({
      ...prev,
      quotes: prev.quotes.filter((_, i) => i !== index)
    }))
  }
  
  // Actions CRUD
  const handleEdit = (book) => {
    setEditingBook(book.id)
    setFormData(book)
    setIsAdding(false)
  }
  
  const handleAdd = () => {
    setIsAdding(true)
    setEditingBook(null)
    setFormData(emptyBook)
  }
  
  const handleCancel = () => {
    setIsAdding(false)
    setEditingBook(null)
    setFormData(emptyBook)
  }
  
  const handleSave = () => {
    if (!formData.title || !formData.author) {
      alert('Le titre et l\'auteur sont obligatoires')
      return
    }
    
    const dataToSave = {
      ...formData,
      rating: parseFloat(formData.rating) || 0
    }
    
    if (isAdding) {
      // Nouveau livre
      const newId = Math.max(...books.map(b => b.id), 0) + 1
      const newBook = { ...dataToSave, id: newId }
      const updatedBooks = [...books, newBook]
      setBooks(updatedBooks)
      downloadJSON(updatedBooks)
    } else {
      // Édition
      const updatedBooks = books.map(b => 
        b.id === editingBook ? dataToSave : b
      )
      setBooks(updatedBooks)
      downloadJSON(updatedBooks)
    }
    
    handleCancel()
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûre de vouloir supprimer ce livre ?')) {
      const updatedBooks = books.filter(b => b.id !== id)
      setBooks(updatedBooks)
      downloadJSON(updatedBooks)
    }
  }
  
  // Télécharger le JSON mis à jour
  const downloadJSON = (booksToDownload) => {
    const dataStr = JSON.stringify(booksToDownload, null, 4)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'books.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    alert(`✅ Fichier books.json téléchargé !\n\n📁 Remplacez le fichier dans src/data/books.json`)
  }
  
  const isFormOpen = isAdding || editingBook !== null

  return (
    <div className="page-transition py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="page-title">Administration</h1>
          <p className="page-subtitle">
            Gérez votre bibliothèque - {books.length} livre(s)
          </p>
        </motion.div>

        {/* Bouton Ajouter */}
        {!isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Ajouter un livre</span>
            </button>
          </motion.div>
        )}

        {/* Formulaire d'ajout/édition */}
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-base p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-light flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-accent" />
                <span>{isAdding ? 'Ajouter un livre' : 'Éditer le livre'}</span>
              </h2>
              <button onClick={handleCancel} className="text-text-light hover:text-accent transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-light mb-2 font-semibold">
                    Titre <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Le titre du livre"
                  />
                </div>
                
                <div>
                  <label className="block text-text-light mb-2 font-semibold">
                    Auteur <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Nom de l'auteur"
                  />
                </div>
              </div>

              {/* Couverture et éditeur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Couverture (URL)</label>
                  <input
                    type="text"
                    name="cover"
                    value={formData.cover}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="/covers/mon-livre.png"
                  />
                </div>
                
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Maison d'édition</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Gallimard, J'ai Lu..."
                  />
                </div>
              </div>

              {/* Note et date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Note (sur 5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="5"
                    step="0.5"
                  />
                </div>
                
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Date de lecture</label>
                  <input
                    type="date"
                    name="readDate"
                    value={formData.readDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Résumé */}
              <div>
                <label className="block text-text-light mb-2 font-semibold">Résumé</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="input-field resize-none"
                  rows="3"
                  placeholder="Un résumé du livre..."
                />
              </div>

              {/* Critique personnelle */}
              <div>
                <label className="block text-text-light mb-2 font-semibold">Mon avis</label>
                <textarea
                  name="personalReview"
                  value={formData.personalReview}
                  onChange={handleInputChange}
                  className="input-field resize-none"
                  rows="5"
                  placeholder="Votre critique personnelle..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-text-light mb-2 font-semibold">Tags</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="input-field flex-1"
                    placeholder="Ajouter un tag..."
                  />
                  <button onClick={handleAddTag} className="btn-primary">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag flex items-center space-x-2">
                      <span>{tag}</span>
                      <button onClick={() => handleRemoveTag(index)} className="hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Citations */}
              <div>
                <label className="block text-text-light mb-2 font-semibold">Citations</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddQuote()}
                    className="input-field flex-1"
                    placeholder="Ajouter une citation..."
                  />
                  <button onClick={handleAddQuote} className="btn-primary">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.quotes.map((quote, index) => (
                    <div key={index} className="card-base p-3 flex items-start justify-between">
                      <p className="text-text-light text-sm italic flex-1">"{quote}"</p>
                      <button onClick={() => handleRemoveQuote(index)} className="text-text-light hover:text-red-400 ml-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Lien Babelio</label>
                  <input
                    type="text"
                    name="babelioLink"
                    value={formData.babelioLink}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://www.babelio.com/..."
                  />
                  <label className="flex items-center mt-2 text-text-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="publishedOnBabelio"
                      checked={formData.publishedOnBabelio}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Publié sur Babelio</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-text-light mb-2 font-semibold">Lien Instagram</label>
                  <input
                    type="text"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://instagram.com/p/..."
                  />
                  <label className="flex items-center mt-2 text-text-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="publishedOnInstagram"
                      checked={formData.publishedOnInstagram}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Publié sur Instagram</span>
                  </label>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex space-x-4 pt-4">
                <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Enregistrer</span>
                </button>
                <button onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                  <X className="w-5 h-5" />
                  <span>Annuler</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Liste des livres */}
        {!isFormOpen && (
          <div className="space-y-4">
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-base p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4 flex-1">
                  {book.cover && (
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-light">{book.title}</h3>
                    <p className="text-text-light text-opacity-70">{book.author}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-accent font-bold">{book.rating}/5</span>
                      <span className="text-text-light text-opacity-50">•</span>
                      <span className="text-text-light text-opacity-70 text-sm">{book.readDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(book)}
                    className="p-2 text-text-light hover:text-accent transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(book.id)}
                    className="p-2 text-text-light hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

