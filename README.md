# 📚 Songe Yume - Bibliothèque Virtuelle

Bibliothèque virtuelle personnelle moderne et élégante construite avec React, TailwindCSS et Framer Motion.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fonctionnalités

- 🎨 **Design moderne** : Thème sombre élégant avec couleurs chaleureuses
- 📖 **Gestion de livres** : Couvertures, notes, critiques et citations
- 🔍 **Recherche intelligente** : Par titre, auteur ou mots-clés
- 🏷️ **Filtres multiples** : Catégories, éditeurs, plateformes, notes, niveau "spicy"
- 📊 **Tableau de bord** : Statistiques visuelles avec graphiques (Recharts)
- 📱 **Responsive** : Optimisé mobile, tablette et desktop
- ✨ **Animations fluides** : Transitions élégantes (Framer Motion)
- 🌐 **Multi-pages** : Navigation React Router
- ⚡ **Images optimisées** : Compression automatique (-68% de taille)

## 🚀 Installation & Lancement

### Prérequis

- Node.js 18+ et npm installés

### Démarrage rapide (3 commandes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Le site s'ouvre automatiquement à http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production avec optimisation des images
npm run preview  # Prévisualiser le build
npm run lint     # Vérifier le code
```

## ⚡ Optimisation Automatique des Images

Le projet inclut **l'optimisation automatique des images** lors du build.

### Résultats

- **Réduction de 65-75%** de la taille des images
- **Site 10× plus rapide** sur GitHub Pages
- **Économie totale** : ~30 Mo économisés

**Exemple :**
```
Image originale  : 2.0 Mo → Image optimisée : 650 Ko (-68%)
```

### Fonctionnement

**Mode développement** (`npm run dev`) :
- Images NON optimisées (chargement rapide en dev)

**Mode production** (`npm run build`) :
- Images **automatiquement compressées** sans perte visible
- Cache intelligent (optimise uniquement les images modifiées)
- Prêt pour le déploiement

### Aucune action requise

L'optimisation est **entièrement automatique** ! Continuez à :
1. Ajouter vos images PNG/JPG dans `public/covers/`
2. Développer avec `npm run dev`
3. Builder avec `npm run build` avant chaque déploiement

Les images dans `dist/` seront **automatiquement optimisées** à chaque build.

## 📁 Structure du Projet

```
SongeYume/
├── public/
│   ├── covers/              # Images de couvertures
│   └── categories/          # Icônes de catégories
├── src/
│   ├── components/          # Composants réutilisables
│   ├── pages/               # Pages de l'application
│   ├── data/
│   │   └── books.json       # Base de données des livres
│   ├── utils/               # Utilitaires
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📚 Structure des Données

Chaque livre dans `src/data/books.json` :

```json
{
  "id": 1,
  "title": "Titre du livre",
  "author": "Auteur",
  "cover": "/covers/nom-du-livre.png",
  "summary": "Résumé...",
  "personalReview": "Critique personnelle...",
  "rating": 5,
  "maxRating": 5,
  "quotes": ["Citation 1", "Citation 2"],
  "tags": ["Fantasy", "Romance"],
  "spicyLevel": 0,
  "format": "Poche",
  "series": "Nom de la série",
  "seriesOrder": 1,
  "publisher": "Éditeur",
  "platform": "Kindle",
  "category": "fantasy",
  "readDate": "2024-11-30"
}
```

## 🛠️ Technologies

- **React** 18.2 - Framework frontend
- **Vite** 5.1 - Build tool ultra-rapide
- **TailwindCSS** 3.4 - Styling utilitaire
- **Framer Motion** 11.0 - Animations
- **Recharts** 2.12 - Graphiques
- **Lucide React** 0.344 - Icônes
- **React Router** 6.22 - Routing
- **vite-plugin-image-optimizer** - Optimisation automatique des images

## 🎨 Personnalisation

### Ajouter un livre

1. Ajoutez l'image dans `public/covers/`
2. Ajoutez l'entrée dans `src/data/books.json`
3. Le livre apparaît automatiquement

📖 **Guide complet** : [GUIDE_IMAGES.md](./GUIDE_IMAGES.md)

### Changer les couleurs

Modifiez `tailwind.config.js` :

```js
colors: {
  'background': '#151823',
  'text-light': '#dde5f2',
  'accent': '#e09e29',
  'card-bg': '#1e2230',
  'card-hover': '#252938'
}
```

## 🌐 Déploiement sur GitHub Pages

Le projet est configuré pour un déploiement automatique sur GitHub Pages.

### Déploiement en 3 étapes

1. **Configurez `vite.config.js`** :
   ```js
   base: '/SongeYume/',  // Nom de votre dépôt
   ```

2. **Activez GitHub Pages** :
   - Settings → Pages → Source : "GitHub Actions"

3. **Poussez sur GitHub** :
   ```bash
   git push origin main
   ```

**C'est tout !** Votre site sera en ligne en 2-3 minutes à :
```
https://votreusername.github.io/SongeYume/
```

Chaque `git push` sur `main` redéploie automatiquement le site avec les images optimisées.

📖 **Guide complet** : [DEPLOIEMENT.md](./DEPLOIEMENT.md)

## 🔧 Résolution de Problèmes

### `npm install` échoue

```bash
rm -rf node_modules package-lock.json
npm install
```

### Les images ne s'affichent pas

- Vérifiez que les images sont dans `public/covers/`
- Vérifiez les chemins dans `books.json` : `/covers/nom.png`
- Noms de fichiers : minuscules, sans espaces, sans accents

### Le site est lent

- Lancez `npm run build` pour optimiser les images
- Les images sont automatiquement compressées à -68%

### Modifications non visibles

- Assurez-vous que `npm run dev` est actif
- Rafraîchissez avec Cmd+Shift+R (vider le cache)

## 📖 Pages de l'Application

- **/** - Accueil avec livres récents et top-rated
- **/library** - Bibliothèque complète avec recherche et filtres
- **/book/:id** - Page détaillée d'un livre
- **/quotes** - Citations favorites
- **/stats** - Statistiques et graphiques
- **/about** - À propos

## 📝 License

MIT License - Utilisez librement pour votre propre bibliothèque !

## 🙏 Remerciements

- Icônes : Lucide React
- Polices : Google Fonts (Inter, Merriweather)

---

**Bonne lecture ! 📖✨**
