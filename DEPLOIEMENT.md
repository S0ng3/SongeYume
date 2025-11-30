# 🚀 Guide de Déploiement GitHub Pages

Guide complet pour héberger SongeYume gratuitement sur GitHub Pages avec déploiement automatique.

## 📋 Prérequis

- Compte GitHub
- Code versionné sur GitHub
- Node.js 18+ installé

## 🌟 Pourquoi GitHub Pages ?

- ✅ **Gratuit et illimité**
- ✅ **HTTPS automatique** avec certificat SSL
- ✅ **Déploiement automatique** à chaque push
- ✅ **CI/CD intégré** via GitHub Actions
- ✅ **Images optimisées automatiquement** (-68% de taille)

---

## 🚀 Configuration Initiale

### Étape 1 : Configurer Vite

Ouvrez `vite.config.js` et vérifiez le `base` :

```js
export default defineConfig({
  base: '/SongeYume/',  // ⚠️ IMPORTANT : Nom exact de votre dépôt GitHub
  // ...
})
```

**Exemples :**
- Dépôt : `MaBibliotheque` → `base: '/MaBibliotheque/'`
- Dépôt : `livres` → `base: '/livres/'`

### Étape 2 : Activer GitHub Pages

1. Allez sur votre dépôt : `https://github.com/VotreUsername/SongeYume`
2. **Settings** → **Pages**
3. **Source** : Sélectionnez **"GitHub Actions"** (pas "Deploy from a branch")

### Étape 3 : Pousser le Workflow

Le workflow `.github/workflows/deploy.yml` est déjà configuré.

```bash
git add .
git commit -m "Configuration déploiement GitHub Pages"
git push origin main
```

### Étape 4 : Vérifier le Déploiement

1. Allez dans l'onglet **Actions**
2. Le workflow "Déploiement GitHub Pages" s'exécute
3. ✅ Succès en 2-3 minutes
4. Site accessible à : `https://votreusername.github.io/SongeYume/`

---

## 🔄 Workflow Quotidien

Une fois configuré, chaque push redéploie automatiquement :

```bash
# 1. Modifier des livres, images, code...

# 2. Tester localement
npm run dev

# 3. Committer et pousser
git add .
git commit -m "Ajout de 3 nouveaux livres"
git push origin main

# 🎉 GitHub Actions va automatiquement :
#    - Installer les dépendances
#    - Builder le projet (avec optimisation des images)
#    - Déployer sur GitHub Pages
#    - Site à jour en 2-3 minutes !
```

---

## 🔍 Comprendre le Workflow

Le fichier `.github/workflows/deploy.yml` automatise :

```yaml
on:
  push:
    branches: ['main']  # Déclenchement à chaque push sur main
  workflow_dispatch:     # Ou manuellement depuis Actions

jobs:
  build:   # Installation Node.js + build du projet
  deploy:  # Déploiement sur GitHub Pages
```

### Exécution Manuelle

1. **Actions** → **"Déploiement GitHub Pages"**
2. **"Run workflow"** → **"Run workflow"**

---

## 🛠️ Commandes Utiles

### Build Local

```bash
# Build de production
npm run build

# Les images sont automatiquement optimisées (-68%)

# Prévisualiser
npm run preview
# → http://localhost:4173
```

### Vérifications Avant Déploiement

```bash
# Linter
npm run lint

# Build (teste aussi l'optimisation des images)
npm run build

# Si OK, pousser
git push origin main
```

---

## 🔧 Configuration Avancée

### Domaine Personnalisé

Pour utiliser votre propre domaine (ex : `www.ma-bibliotheque.fr`) :

1. **GitHub Pages Settings** :
   - Ajoutez votre domaine dans "Custom domain"
   - GitHub crée un fichier `CNAME` automatiquement

2. **Chez votre registrar** :
   - Enregistrement CNAME : `votreusername.github.io`
   - Ou 4 enregistrements A pour les IPs GitHub

3. **Activer "Enforce HTTPS"** (après propagation DNS ~24h)

📚 [Documentation officielle](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Variables d'Environnement

Si besoin de secrets/variables :

1. **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez vos variables
3. Utilisez dans le workflow :

```yaml
env:
  VITE_API_KEY: ${{ secrets.API_KEY }}
```

---

## 🔍 Dépannage

### ❌ Workflow échoue

**Vérifier les logs :**
1. **Actions** → Cliquez sur le workflow échoué
2. Lisez les erreurs détaillées

**Causes fréquentes :**
- Erreur de build → Testez `npm run build` localement
- Erreur de lint → Corrigez avec `npm run lint`
- Dépendances manquantes → Vérifiez `package.json`

### ❌ Page blanche

**Problème :** Assets ne se chargent pas

**Solution :**
- Vérifiez `base: '/NomDepot/'` dans `vite.config.js`
- Le nom doit correspondre **EXACTEMENT** au nom du dépôt
- N'oubliez pas les slashes : `/NomDepot/`

### ❌ Images ne s'affichent pas

**Solution :**
- Images doivent être dans `public/covers/`
- Utilisez des chemins absolus : `/covers/image.png`
- Vérifiez que `npm run build` optimise les images (voir logs)

### ❌ Routing ne fonctionne pas (404)

**Problème :** Erreur 404 en accédant directement à `/library` ou `/stats`

**C'est normal avec GitHub Pages pour les SPA.**

Les utilisateurs doivent :
- Commencer par la page d'accueil
- Naviguer via les liens internes

### ❌ "Permission denied"

**Solution :**
1. **Settings** → **Actions** → **General**
2. **Workflow permissions** : "Read and write permissions"
3. Cochez "Allow GitHub Actions to create and approve pull requests"
4. Sauvegardez

### ⏱️ Déploiement long

- Premier déploiement : 3-5 minutes (normal)
- Suivants : 1-2 minutes (dépendances en cache)

---

## 📊 Monitoring

### Historique des Déploiements

**Actions** → **All workflows**
- Verts = succès
- Rouges = échecs

### Badge de Statut

Ajoutez dans votre README :

```markdown
![Deploy](https://github.com/VotreUsername/SongeYume/actions/workflows/deploy.yml/badge.svg)
```

---

## 📈 Optimisations

### Performance (Déjà Configuré)

✅ Compression automatique des assets
✅ Minification du code (esbuild)
✅ **Optimisation automatique des images (-68%)**
✅ Cache des dépendances npm

### SEO (Optionnel)

**`public/robots.txt`** :
```txt
User-agent: *
Allow: /

Sitemap: https://votreusername.github.io/SongeYume/sitemap.xml
```

**`public/sitemap.xml`** :
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
</urlset>
```

---

## 🎯 Checklist de Déploiement

Avant le premier déploiement :

- [ ] `base` configuré correctement dans `vite.config.js`
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé (Source: GitHub Actions)
- [ ] Permissions du workflow correctes
- [ ] `npm run build` fonctionne localement
- [ ] Pas d'erreurs de lint

---

## 📚 Ressources

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Documentation Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Workflow de déploiement](.github/workflows/deploy.yml)

---

## 🎉 Félicitations !

Votre bibliothèque **SongeYume** est maintenant en ligne avec :
- ✅ Déploiement automatique à chaque push
- ✅ Images optimisées automatiquement (-68%)
- ✅ HTTPS sécurisé
- ✅ Performances optimales

**Chaque mise à jour est automatiquement déployée. Profitez ! 📚✨**
