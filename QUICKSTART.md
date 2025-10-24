# 🚀 Guide de démarrage rapide - Songe Yume

## Installation et lancement en 3 étapes

### 1️⃣ Installer les dépendances

```bash
npm install
```

Cette commande va installer toutes les bibliothèques nécessaires :
- React & React DOM
- React Router
- TailwindCSS
- Framer Motion
- Recharts
- Lucide React (icônes)
- Vite (serveur de développement)

### 2️⃣ Lancer le serveur de développement

```bash
npm run dev
```

Le site s'ouvrira automatiquement dans votre navigateur à l'adresse : `http://localhost:3000`

### 3️⃣ C'est tout ! 🎉

Votre bibliothèque virtuelle est maintenant accessible et fonctionnelle.

---

## 📝 Modifier les données

Pour ajouter vos propres livres :

1. Ouvrez le fichier `src/data/books.json`
2. Ajoutez vos livres en suivant la structure existante
3. Sauvegardez - les changements s'affichent automatiquement (hot reload)

### Exemple de structure d'un livre :

```json
{
  "id": 9,
  "title": "Votre livre",
  "author": "Nom de l'auteur",
  "cover": "URL de l'image de couverture",
  "summary": "Résumé du livre...",
  "personalReview": "Votre avis personnel...",
  "rating": 4.5,
  "maxRating": 5,
  "quotes": ["Citation 1", "Citation 2"],
  "tags": ["Tag1", "Tag2", "Tag3"],
  "publishedOnInstagram": false,
  "instagramLink": null,
  "publishedOnBabelio": false,
  "babelioLink": "https://www.babelio.com/...",
  "readDate": "2024-03-15"
}
```

---

## 🎨 Personnaliser les couleurs

Ouvrez `tailwind.config.js` et modifiez les couleurs dans la section `colors` :

```js
colors: {
  'background': '#151823',    // Fond principal
  'text-light': '#dde5f2',    // Couleur du texte
  'accent': '#e09e29',        // Couleur d'accent
  'card-bg': '#1e2230',       // Fond des cartes
  'card-hover': '#252938'     // Survol des cartes
}
```

---

## 📦 Build de production

Pour créer une version optimisée à déployer :

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

---

## ❓ Problèmes courants

### Le serveur ne démarre pas
- Vérifiez que Node.js (version 18+) est installé : `node --version`
- Supprimez `node_modules` et lancez `npm install` à nouveau

### Les images ne s'affichent pas
- Vérifiez les URLs dans `books.json`
- Utilisez des URLs publiques d'images (Unsplash, Imgur, etc.)

### Les modifications ne s'affichent pas
- Assurez-vous que le serveur dev tourne (`npm run dev`)
- Rafraîchissez la page (Cmd/Ctrl + R)
- Vérifiez la console du navigateur pour les erreurs

---

## 📚 Structure des pages

- `/` - Page d'accueil (livres récents et top-rated)
- `/library` - Bibliothèque complète avec recherche et filtres
- `/book/:id` - Page détaillée d'un livre
- `/stats` - Statistiques et graphiques
- `/about` - Page à propos

---

**Bon développement ! 📖✨**

