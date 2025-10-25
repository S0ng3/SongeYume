# 📚 Guide d'Administration - SongeYume

## 🎯 Accès à l'interface

Depuis votre application, cliquez sur **"Admin"** dans la navigation en haut.

Ou accédez directement à : `http://localhost:5173/admin`

---


## ✨ Fonctionnalités

### ➕ Ajouter un livre

1. Cliquez sur **"Ajouter un livre"**
2. Remplissez le formulaire :
   - **Titre** et **Auteur** sont obligatoires
   - Les autres champs sont optionnels
3. Ajoutez des tags et citations avec le bouton `+`
4. Cliquez sur **"Enregistrer"**
5. Le fichier `books.json` sera téléchargé automatiquement
6. **Remplacez** le fichier dans `src/data/books.json`
7. Rechargez l'application

### ✏️ Éditer un livre

1. Cliquez sur l'icône **crayon** du livre à modifier
2. Modifiez les informations souhaitées
3. Cliquez sur **"Enregistrer"**
4. Remplacez le fichier `books.json` téléchargé

### 🗑️ Supprimer un livre

1. Cliquez sur l'icône **corbeille** du livre
2. Confirmez la suppression
3. Remplacez le fichier `books.json` téléchargé

---

## 📝 Champs du formulaire

### Obligatoires ⚠️
- **Titre** : Le titre du livre
- **Auteur** : Le nom de l'auteur

### Optionnels
- **Couverture** : URL de l'image (ex: `/covers/mon-livre.png`)
- **Maison d'édition** : Nom de l'éditeur
- **Note** : De 0 à 5 (décimales autorisées : 4.5)
- **Date de lecture** : Format YYYY-MM-DD
- **Résumé** : Résumé du livre
- **Mon avis** : Votre critique personnelle
- **Tags** : Catégories, genres, thèmes (appuyez sur + pour ajouter)
- **Citations** : Citations favorites (appuyez sur + pour ajouter)
- **Lien Babelio** : URL de la fiche Babelio
- **Lien Instagram** : URL du post Instagram
- **Publié sur...** : Cochez si publié

---

## 🔄 Workflow recommandé

### Ajout d'un livre depuis Babelio

1. Ouvrez la fiche Babelio du livre
2. Ouvrez l'interface Admin de SongeYume
3. Cliquez sur "Ajouter un livre"
4. **Copier-coller** depuis Babelio :
   - Titre
   - Auteur
   - Votre critique
   - Lien Babelio
5. Ajoutez les informations supplémentaires :
   - Note
   - Tags
   - Citations
   - Couverture (si vous l'avez)
6. Enregistrez

**Temps estimé** : ~1 minute par livre

---

## 💾 Gestion du fichier books.json

### Pourquoi télécharger le fichier ?

React ne peut pas modifier directement les fichiers du projet. Le fichier `books.json` est téléchargé automatiquement et vous devez le replacer manuellement.

### Étapes après chaque modification

1. **Téléchargement automatique** : Le fichier `books.json` se télécharge
2. **Sauvegarde** : Gardez une copie de l'ancien fichier (optionnel)
3. **Remplacement** : Copiez le nouveau fichier dans `src/data/books.json`
4. **Rechargement** : Rechargez l'application (F5 ou Ctrl+R)

---

## 📌 Conseils pratiques

### Pour les couvertures

**Option 1 : Héberger localement**
1. Placez les images dans `public/covers/`
2. Utilisez : `/covers/nom-du-livre.png`

**Option 2 : URL externe**
1. Utilisez une URL complète : `https://...`

### Pour les tags

Tags recommandés :
- Genres : Fantasy, Romance, Thriller, Science-Fiction, etc.
- Ambiances : Cozy, Dark, Épique, Slice of life
- Thèmes : Famille, Amitié, Voyage, Magie
- Origines : France, Japon, Anglais

### Pour les citations

- Choisissez vos passages préférés
- Gardez-les courtes et impactantes
- Vous pouvez en ajouter plusieurs par livre

---

## ⚠️ Points d'attention

### Sauvegarde

Le fichier téléchargé **remplace complètement** l'ancien. Assurez-vous :
- D'avoir sauvegardé si nécessaire
- De bien replacer le fichier au bon endroit

### Rechargement

Après avoir remplacé `books.json`, **rechargez l'application** pour voir les changements.

### IDs automatiques

Les nouveaux livres reçoivent automatiquement un ID unique. Ne les modifiez pas manuellement.

---

## 🎨 Interface

L'interface Admin est conçue pour être :
- ✅ **Intuitive** : Formulaire clair et simple
- ✅ **Rapide** : Ajout en ~1 minute
- ✅ **Complète** : Tous les champs disponibles
- ✅ **Élégante** : Design cohérent avec le reste de l'application

---

**Bon ajout de livres ! 📚✨**

