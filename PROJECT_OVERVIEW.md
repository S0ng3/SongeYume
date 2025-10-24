# 📖 Songe Yume - Vue d'ensemble du projet

## 🎯 Objectif

Une bibliothèque virtuelle personnelle moderne et élégante permettant de :
- Archiver et présenter vos livres lus
- Partager vos critiques et avis
- Organiser votre collection avec des tags
- Visualiser vos statistiques de lecture

---

## 📂 Structure complète du projet

```
SongeYume/
│
├── 📄 Configuration Files
│   ├── package.json              # Dépendances et scripts NPM
│   ├── vite.config.js            # Configuration Vite
│   ├── tailwind.config.js        # Configuration TailwindCSS (thème personnalisé)
│   ├── postcss.config.js         # Configuration PostCSS
│   ├── .eslintrc.cjs             # Configuration ESLint
│   ├── .gitignore                # Fichiers ignorés par Git
│   └── index.html                # Point d'entrée HTML
│
├── 📚 Documentation
│   ├── README.md                 # Documentation principale
│   ├── QUICKSTART.md             # Guide de démarrage rapide
│   └── PROJECT_OVERVIEW.md       # Ce fichier
│
├── 🎨 Public Assets
│   └── public/
│       └── book-icon.svg         # Favicon du site
│
└── 💻 Source Code
    └── src/
        │
        ├── 🎯 Entry Points
        │   ├── main.jsx          # Point d'entrée React
        │   ├── App.jsx           # Composant principal avec routing
        │   └── index.css         # Styles globaux + TailwindCSS
        │
        ├── 🧩 Components (Composants réutilisables)
        │   ├── Layout.jsx        # Layout principal (header/footer/nav)
        │   ├── BookCard.jsx      # Carte d'affichage d'un livre
        │   ├── BookShelf.jsx     # Grille de livres
        │   ├── SearchBar.jsx     # Barre de recherche
        │   └── TagList.jsx       # Liste de tags avec filtrage
        │
        ├── 📄 Pages
        │   ├── Home.jsx          # Page d'accueil
        │   ├── Library.jsx       # Bibliothèque complète
        │   ├── BookDetail.jsx    # Page détaillée d'un livre
        │   ├── Stats.jsx         # Page de statistiques
        │   └── About.jsx         # Page à propos
        │
        ├── 📊 Data
        │   └── books.json        # Base de données des livres (8 exemples)
        │
        └── 🛠️ Utils
            ├── constants.js      # Constantes de l'application
            └── helpers.js        # Fonctions utilitaires
```

---

## 🎨 Design System

### Couleurs principales
| Usage              | Couleur   | Hex Code   |
|-------------------|-----------|------------|
| Fond principal    | Sombre    | `#151823`  |
| Texte clair       | Blanc     | `#dde5f2`  |
| Accent/CTA        | Orange    | `#e09e29`  |
| Cartes (fond)     | Sombre+   | `#1e2230`  |
| Cartes (hover)    | Sombre++  | `#252938`  |

### Typographie
- **Titres** : Merriweather (serif) - élégant et lisible
- **Corps** : Inter (sans-serif) - moderne et clean

### Composants UI
- Cards avec ombres et hover effects
- Boutons primaires et secondaires
- Input fields avec focus states
- Tags avec hover effects
- Rating stars (étoiles)

---

## 🔌 Technologies utilisées

### Core
- **React 18.2** - Framework UI
- **Vite 5.1** - Build tool ultra-rapide
- **React Router DOM 6.22** - Navigation multi-pages

### Styling
- **TailwindCSS 3.4** - Utility-first CSS
- **PostCSS** - Transformations CSS
- **Autoprefixer** - Compatibilité cross-browser

### UI/UX
- **Framer Motion 11.0** - Animations fluides
- **Lucide React 0.344** - Icônes modernes
- **Recharts 2.12** - Graphiques interactifs

### Quality
- **ESLint** - Linting JavaScript/React

---

## 📊 Structure de données (Book)

Chaque livre contient :
```javascript
{
  id: Number,                    // Identifiant unique
  title: String,                 // Titre du livre
  author: String,                // Nom de l'auteur
  cover: String (URL),           // URL de la couverture
  summary: String,               // Résumé du livre
  personalReview: String,        // Avis personnel
  rating: Number (0-10),         // Note sur 10
  maxRating: Number (10),        // Note maximale
  quotes: Array<String>,         // Citations favorites
  tags: Array<String>,           // Tags/mots-clés
  publishedOnInstagram: Boolean, // Statut Instagram
  instagramLink: String|null,    // Lien Instagram
  publishedOnBabelio: Boolean,   // Statut Babelio
  babelioLink: String,           // Lien Babelio
  readDate: String (ISO date)    // Date de lecture
}
```

---

## 🎯 Fonctionnalités par page

### 🏠 Page d'accueil (`/`)
- Hero section avec présentation
- Statistiques rapides (cards)
- Section "Lectures récentes" (4 derniers livres)
- Section "Meilleurs coups de cœur" (top 4)
- CTA vers bibliothèque et statistiques

### 📚 Bibliothèque (`/library`)
- Affichage de tous les livres (grille responsive)
- Barre de recherche multi-critères
- Filtrage par tags (sélection multiple)
- Compteur de résultats
- Réinitialisation des filtres

### 📖 Détail livre (`/book/:id`)
- Grande couverture du livre
- Informations complètes
- Note avec étoiles
- Résumé
- Avis personnel (mis en avant)
- Citations favorites
- Tags
- Liens externes (Instagram, Babelio)
- Date de lecture

### 📊 Statistiques (`/stats`)
- 4 cartes de stats rapides
- Graphique lectures/mois (BarChart)
- Distribution des notes (PieChart)
- Tags les plus utilisés (BarChart horizontal)
- Top auteurs
- Statut de publication (barres de progression)

### ℹ️ À propos (`/about`)
- Présentation personnelle
- Philosophie de lecture
- Features du site
- Technologies utilisées
- Call-to-action réseaux sociaux

---

## 🚀 Commandes disponibles

```bash
# Installation
npm install

# Développement (port 3000)
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

---

## 🎨 Personnalisation facile

### Ajouter un livre
→ Éditez `src/data/books.json`

### Changer les couleurs
→ Modifiez `tailwind.config.js`

### Modifier les pages
→ Éditez les fichiers dans `src/pages/`

### Créer un composant
→ Ajoutez-le dans `src/components/`

---

## ✨ Points forts du projet

✅ **Design soigné** - Interface élégante et moderne  
✅ **100% Responsive** - Mobile, tablette, desktop  
✅ **Animations fluides** - Expérience utilisateur immersive  
✅ **Performance** - Build optimisé avec Vite  
✅ **Maintenabilité** - Code structuré et commenté  
✅ **Extensibilité** - Facile d'ajouter de nouvelles features  
✅ **Accessibilité** - Contrastes et navigation au clavier  

---

## 🔄 Évolutions possibles

### Court terme
- [ ] Système de favoris
- [ ] Export des données (PDF, CSV)
- [ ] Mode d'affichage alternatif (liste vs grille)

### Moyen terme
- [ ] Backend avec authentification
- [ ] Base de données (MongoDB/PostgreSQL)
- [ ] API REST pour CRUD operations
- [ ] Upload d'images de couvertures

### Long terme
- [ ] Multi-utilisateurs
- [ ] Recommandations de livres
- [ ] Intégration API externe (Google Books, Open Library)
- [ ] Partage social automatisé
- [ ] PWA (Progressive Web App)

---

## 🎓 Points d'apprentissage

Ce projet démontre la maîtrise de :
- ✅ Architecture React moderne (hooks, routing)
- ✅ State management local
- ✅ Responsive design avec TailwindCSS
- ✅ Animations déclaratives (Framer Motion)
- ✅ Data visualization (Recharts)
- ✅ Code organization et best practices
- ✅ Git workflow

---

## 📝 Notes de développement

### Dépendances principales (package.json)
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "framer-motion": "^11.0.3",
  "recharts": "^2.12.0",
  "lucide-react": "^0.344.0"
}
```

### Conventions de code
- Composants en PascalCase
- Fichiers utilitaires en camelCase
- CSS classes avec TailwindCSS utilities
- Commentaires en anglais dans le code
- Documentation en français

---

**Créé avec ❤️ pour les passionnés de lecture**

_Version 1.0.0 - Mars 2024_

