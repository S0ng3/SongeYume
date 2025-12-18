import { ArrowUpDown } from 'lucide-react'

/**
 * Composant de sélection du tri pour la bibliothèque
 */
const SortSelector = ({ selectedSort, onSortChange }) => {
  const sortOptions = [
    { value: 'readDate', label: 'Date de lecture (récent)' },
    { value: 'rating', label: 'Note (meilleure)' },
    { value: 'title', label: 'Titre (A → Z)' },
    { value: 'author', label: 'Auteur (A → Z)' }
  ]

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-text-light text-opacity-70">
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm font-medium">Trier par :</span>
      </div>
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-card-bg text-text-light border border-accent border-opacity-20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent focus:border-opacity-50 transition-colors cursor-pointer hover:border-opacity-30"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortSelector

