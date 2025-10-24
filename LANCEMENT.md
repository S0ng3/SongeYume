# 🚀 Instructions de lancement - Songe Yume

## ⚡ Lancement rapide (3 commandes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Le site s'ouvre automatiquement à http://localhost:3000
```

---

## ✅ Checklist de vérification

### Avant le premier lancement

- [ ] Node.js version 18+ installé (`node --version`)
- [ ] NPM ou Yarn installé (`npm --version`)
- [ ] Terminal ouvert dans le dossier du projet

### Après installation

- [ ] Le dossier `node_modules/` a été créé
- [ ] Aucune erreur dans le terminal
- [ ] Le serveur démarre sur le port 3000

### Vérification du site

- [ ] La page d'accueil s'affiche correctement
- [ ] Les 4 livres récents sont visibles
- [ ] La navigation fonctionne (Header)
- [ ] La page Bibliothèque affiche 8 livres
- [ ] La recherche fonctionne
- [ ] Les filtres par tags fonctionnent
- [ ] Le clic sur un livre ouvre la page détaillée
- [ ] La page Statistiques affiche les graphiques
- [ ] La page À propos s'affiche
- [ ] Le site est responsive (tester en redimensionnant)

---

## 🔧 Résolution de problèmes

### Problème : `npm install` échoue

**Solution :**
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller
npm install
```

### Problème : Le port 3000 est déjà utilisé

**Solution :**
```bash
# Le site s'ouvrira sur un autre port (ex: 3001)
# ou
# Arrêter le processus sur le port 3000
lsof -ti:3000 | xargs kill -9
```

### Problème : Les images ne s'affichent pas

**Cause :** URLs d'images dans `books.json` non accessibles

**Solution :**
- Vérifier votre connexion internet
- Remplacer par d'autres URLs d'images valides

### Problème : Page blanche

**Solution :**
```bash
# Vérifier la console du navigateur (F12)
# Souvent dû à une erreur JavaScript
# Vérifier que tous les fichiers sont bien présents
```

### Problème : Modifications non visibles

**Solution :**
- Vérifier que `npm run dev` est en cours d'exécution
- Sauvegarder le fichier modifié
- Rafraîchir le navigateur (Cmd+R ou Ctrl+R)
- Vider le cache (Cmd+Shift+R ou Ctrl+Shift+R)

---

## 📝 Personnalisation immédiate

### 1. Modifier le titre du site

**Fichier :** `index.html`
```html
<title>Votre Titre Ici</title>
```

### 2. Ajouter vos propres livres

**Fichier :** `src/data/books.json`

Copiez cette structure et ajoutez vos livres :
```json
{
  "id": 9,
  "title": "Titre de votre livre",
  "author": "Auteur",
  "cover": "https://url-de-limage.jpg",
  "summary": "Résumé...",
  "personalReview": "Votre avis...",
  "rating": 8.5,
  "maxRating": 10,
  "quotes": ["Citation 1", "Citation 2"],
  "tags": ["Genre1", "Genre2"],
  "publishedOnInstagram": false,
  "instagramLink": null,
  "publishedOnBabelio": false,
  "babelioLink": "https://...",
  "readDate": "2024-03-20"
}
```

### 3. Changer les couleurs

**Fichier :** `tailwind.config.js`

```js
colors: {
  'background': '#VotreCouleur',
  'text-light': '#VotreCouleur',
  'accent': '#VotreCouleur',
  // etc.
}
```

Après modification, le site se recharge automatiquement !

---

## 🎯 Où trouver les images de couvertures ?

### Sources gratuites recommandées

1. **Unsplash** (https://unsplash.com)
   - Chercher : "book cover", "vintage book"
   - Clic droit → Copier l'adresse de l'image

2. **Google Books**
   - Chercher votre livre
   - Clic droit sur la couverture → Copier l'adresse

3. **Amazon**
   - Chercher le livre
   - Clic droit sur l'image → Copier l'adresse

4. **Babelio**
   - Page du livre
   - Clic droit sur la couverture → Copier l'adresse

⚠️ **Important :** Assurez-vous d'avoir le droit d'utiliser les images.

---

## 📦 Build de production

Quand vous êtes prêt à déployer :

```bash
# Créer le build optimisé
npm run build

# Tester le build localement
npm run preview
```

Les fichiers optimisés seront dans le dossier `dist/`.

---

## 🌐 Déploiement

### Option 1 : Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

### Option 2 : Netlify

1. Créer un compte sur netlify.com
2. Drag & drop le dossier `dist/` après `npm run build`

### Option 3 : GitHub Pages

```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Ajouter dans package.json
"homepage": "https://votre-username.github.io/SongeYume",
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Déployer
npm run deploy
```

---

## 🆘 Besoin d'aide ?

### Ressources utiles

- **React Docs** : https://react.dev
- **TailwindCSS** : https://tailwindcss.com/docs
- **Vite** : https://vitejs.dev
- **Framer Motion** : https://www.framer.com/motion

### Vérifier les erreurs

1. **Dans le terminal** : Erreurs de compilation
2. **Console du navigateur** (F12) : Erreurs JavaScript
3. **Network tab** (F12) : Problèmes de chargement

---

## 🎉 Prêt à commencer ?

```bash
npm install
npm run dev
```

**Votre bibliothèque virtuelle vous attend ! 📚✨**

---

_Dernière mise à jour : Mars 2024_

