# 🚀 Guide de Déploiement GitHub Pages - SongeYume

Ce guide vous accompagne pour héberger votre bibliothèque virtuelle gratuitement sur GitHub Pages.

## 📋 Prérequis

- Compte GitHub
- Code versionné sur GitHub
- Node.js 18+ installé localement

## 🌟 Pourquoi GitHub Pages ?

- ✅ **Gratuit et illimité**
- ✅ **Intégré à GitHub** (aucune inscription supplémentaire)
- ✅ **HTTPS automatique** avec certificat SSL
- ✅ **Déploiement automatique** à chaque push
- ✅ **Workflow CI/CD** configuré automatiquement
- ✅ **Parfait pour les projets open-source**

---

## 🚀 Déploiement en 5 étapes

### Étape 1 : Vérifier la configuration

Le fichier `vite.config.js` doit être configuré avec le bon chemin de base.

**Ouvrez `vite.config.js` et modifiez la ligne `base`** :

```js
export default defineConfig({
  plugins: [react()],
  base: '/SongeYume/',  // ⚠️ Remplacez par le nom exact de votre dépôt GitHub
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false
  }
})
```

**Important** : Si votre dépôt s'appelle différemment, ajustez le chemin :
- Dépôt : `MonProjet` → `base: '/MonProjet/'`
- Dépôt : `ma-bibliotheque` → `base: '/ma-bibliotheque/'`

### Étape 2 : Activer GitHub Pages

1. **Allez sur votre dépôt GitHub** : `https://github.com/VotreUsername/SongeYume`

2. **Cliquez sur "Settings"** (⚙️ Paramètres)

3. **Dans le menu latéral, cliquez sur "Pages"**

4. **Dans la section "Source"** :
   - Sélectionnez : **"GitHub Actions"**
   - (Pas "Deploy from a branch")

### Étape 3 : Pousser le workflow

Le workflow GitHub Actions est déjà configuré dans `.github/workflows/deploy.yml`.

**Poussez-le sur GitHub** :

```bash
git add .
git commit -m "ci: configuration du déploiement GitHub Pages"
git push origin main
```

### Étape 4 : Vérifier le déploiement

1. **Allez dans l'onglet "Actions"** de votre dépôt GitHub

2. **Vous verrez le workflow "Déploiement GitHub Pages" en cours**
   - 🟡 En cours d'exécution
   - ✅ Succès (après 2-3 minutes)
   - ❌ Échec (vérifiez les logs)

3. **Une fois terminé avec succès**, votre site est en ligne ! 🎉

### Étape 5 : Accéder à votre site

Votre site sera accessible à l'URL suivante :

```
https://VotreUsername.github.io/SongeYume/
```

**Exemple** :
- Username : `SongeYume`
- Dépôt : `SongeYume`
- URL : `https://songeyume.github.io/SongeYume/`

---

## 🔄 Mises à jour automatiques

C'est le grand avantage ! Une fois configuré, **chaque push sur la branche `main` redéploie automatiquement** votre site.

### Workflow quotidien

```bash
# 1. Ajoutez un nouveau livre dans src/data/books.json
# 2. Testez localement
npm run dev

# 3. Commitez et poussez
git add .
git commit -m "feat: ajout de 3 nouveaux livres"
git push origin main

# 🎉 GitHub Actions va automatiquement :
#    - Installer les dépendances
#    - Construire le projet
#    - Déployer sur GitHub Pages
#    - Votre site est à jour en 2-3 minutes !
```

---

## 🔍 Comprendre le workflow

Le fichier `.github/workflows/deploy.yml` automatise tout le processus :

```yaml
# Déclencheurs
on:
  push:
    branches: ['main']  # À chaque push sur main
  workflow_dispatch:     # Ou manuellement depuis Actions

# Jobs
jobs:
  build:
    # Installe Node.js, npm, construit le projet
  deploy:
    # Déploie sur GitHub Pages
```

### Exécution manuelle

Vous pouvez aussi déclencher le déploiement manuellement :

1. Allez dans **Actions**
2. Cliquez sur **"Déploiement GitHub Pages"**
3. Cliquez sur **"Run workflow"** → **"Run workflow"**

---

## 🛠️ Commandes utiles

### Build local

Toujours tester avant de pousser :

```bash
# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

Le site sera accessible à `http://localhost:4173`

### Vérifications avant déploiement

```bash
# Vérifier le linting
npm run lint

# Vérifier que le build fonctionne
npm run build

# Si tout est OK, pousser
git push origin main
```

### Nettoyage

```bash
# Supprimer les artefacts de build
rm -rf dist

# Windows PowerShell
Remove-Item -Recurse -Force dist
```

---

## 🔧 Configuration avancée

### Domaine personnalisé

Vous pouvez utiliser votre propre domaine (ex : `www.ma-bibliotheque.fr`) :

1. **Dans les paramètres GitHub Pages** :
   - Ajoutez votre domaine dans "Custom domain"
   - GitHub créera un fichier `CNAME` automatiquement

2. **Chez votre registrar de domaine** :
   - Ajoutez un enregistrement CNAME pointant vers `votreusername.github.io`
   - Ou 4 enregistrements A pour les IPs de GitHub

3. **Activez "Enforce HTTPS"** (après propagation DNS)

📚 [Documentation officielle GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Variables d'environnement

Si vous avez besoin de variables d'environnement :

1. **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez vos variables
3. Utilisez-les dans le workflow :

```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

---

## 🔍 Dépannage

### ❌ Le workflow échoue

**Vérifiez les logs dans Actions** :

1. Cliquez sur le workflow qui a échoué
2. Cliquez sur "build" ou "deploy"
3. Lisez les erreurs

**Causes fréquentes** :
- Erreur de build : testez `npm run build` localement
- Erreur de linting : corrigez avec `npm run lint`
- Dépendances manquantes : vérifiez `package.json`

### ❌ Le site affiche une page blanche

**Problème** : Les assets ne se chargent pas

**Solution** :
- Vérifiez que `base: '/SongeYume/'` est correct dans `vite.config.js`
- Le nom doit correspondre **exactement** au nom du dépôt
- N'oubliez pas les slashes : `/NomDepot/`

### ❌ Les images ne s'affichent pas

**Problème** : Images en 404

**Solution** :
- Les images doivent être dans `public/`
- Utilisez des chemins absolus : `/covers/image.png`
- Après modification, reconstruisez : `npm run build`

### ❌ Le routing ne fonctionne pas (404 sur les routes)

**Problème** : Erreur 404 en accédant directement à `/library` ou `/stats`

**Solution** : C'est normal avec GitHub Pages pour les SPA. Les utilisateurs doivent :
- Commencer par la page d'accueil
- Naviguer via les liens internes
- Ou utiliser un service worker (configuration avancée)

### ❌ "Permission denied" lors du déploiement

**Solution** :
1. **Settings** → **Actions** → **General**
2. Section "Workflow permissions"
3. Sélectionnez **"Read and write permissions"**
4. Cochez **"Allow GitHub Actions to create and approve pull requests"**
5. Sauvegardez

### ⚠️ Le déploiement prend beaucoup de temps

C'est normal pour le premier déploiement (3-5 minutes).

Les suivants sont plus rapides (1-2 minutes) car :
- Les dépendances sont en cache
- Seuls les fichiers modifiés sont déployés

---

## 📊 Monitoring et statistiques

### Voir l'historique des déploiements

1. **Actions** → **All workflows**
2. Vous voyez tous les déploiements passés
3. Verts = succès, Rouges = échecs

### Badges de statut

Ajoutez un badge de build dans votre README :

```markdown
![Deploy Status](https://github.com/VotreUsername/SongeYume/actions/workflows/deploy.yml/badge.svg)
```

---

## 📈 Optimisations

### Performance

✅ **Déjà configuré dans le workflow** :
- Compression automatique des assets
- Minification du code (Terser)
- Cache des dépendances npm
- Optimisation des images par Vite

### SEO

Ajoutez un fichier `public/robots.txt` :

```txt
User-agent: *
Allow: /

Sitemap: https://votreusername.github.io/SongeYume/sitemap.xml
```

Ajoutez un fichier `public/sitemap.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votreusername.github.io/SongeYume/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://votreusername.github.io/SongeYume/library</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://votreusername.github.io/SongeYume/stats</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

## 📚 Ressources

- 📖 [Documentation GitHub Pages](https://docs.github.com/en/pages)
- 📖 [Documentation GitHub Actions](https://docs.github.com/en/actions)
- 📖 [Documentation Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- 🛠️ [Workflow de déploiement](.github/workflows/deploy.yml)

---

## 🎯 Checklist finale

Avant de déployer, assurez-vous que :

- [ ] `base` est correctement configuré dans `vite.config.js`
- [ ] Le code est poussé sur GitHub
- [ ] GitHub Pages est activé (Source: GitHub Actions)
- [ ] Les permissions du workflow sont correctes
- [ ] Le build fonctionne localement (`npm run build`)
- [ ] Pas d'erreurs de linting (`npm run lint`)

---

## 🎉 Félicitations !

Votre bibliothèque virtuelle **SongeYume** est maintenant en ligne et accessible au monde entier ! 

### Prochaines étapes

- ✅ Partagez votre site avec vos amis
- ✅ Ajoutez de nouveaux livres régulièrement
- ✅ Personnalisez avec votre domaine (optionnel)
- ✅ Explorez les statistiques dans l'onglet Actions

**Chaque mise à jour est automatiquement déployée. Profitez ! 📚✨**

---

## 📧 Support

En cas de problème :
- 🐛 Ouvrez une issue sur GitHub
- 📚 Consultez la [documentation officielle](https://docs.github.com/en/pages)
- 💬 Vérifiez les logs dans l'onglet Actions

---

**Bonne lecture et bon hébergement ! 📖✨**
