# 🔄 Comment changer toutes les images vers vos photos

## 📋 Checklist rapide

### ✅ Préparation
- [ ] J'ai pris/téléchargé les photos de mes 8 livres
- [ ] J'ai renommé les fichiers selon la convention (sans espaces)
- [ ] J'ai copié les images dans `public/covers/`

### ✅ Mise à jour du code
- [ ] J'ai ouvert `src/data/books.json`
- [ ] J'ai changé les URLs pour chaque livre
- [ ] J'ai sauvegardé le fichier
- [ ] J'ai vérifié l'affichage sur le site

---

## 🎯 Modification rapide de books.json

### Livre 1 - L'Étranger
```json
"cover": "/covers/letranger.jpg"
```

### Livre 2 - 1984
```json
"cover": "/covers/1984.jpg"
```

### Livre 3 - Le Petit Prince
```json
"cover": "/covers/le-petit-prince.jpg"
```

### Livre 4 - La Nuit des temps
```json
"cover": "/covers/la-nuit-des-temps.jpg"
```

### Livre 5 - Le Seigneur des Anneaux
```json
"cover": "/covers/seigneur-des-anneaux.jpg"
```

### Livre 6 - Les Misérables
```json
"cover": "/covers/les-miserables.jpg"
```

### Livre 7 - Cent ans de solitude
```json
"cover": "/covers/cent-ans-de-solitude.jpg"
```

### Livre 8 - Dune
```json
"cover": "/covers/dune.jpg"
```

---

## 📝 Instructions étape par étape

### 1. Préparez vos 8 images

Nommez-les exactement comme ci-dessus :
- `letranger.jpg`
- `1984.jpg`
- `le-petit-prince.jpg`
- `la-nuit-des-temps.jpg`
- `seigneur-des-anneaux.jpg`
- `les-miserables.jpg`
- `cent-ans-de-solitude.jpg`
- `dune.jpg`

**Ou utilisez vos propres noms**, puis adaptez le code en conséquence.

### 2. Copiez les images

Placez-les toutes dans :
```
/Users/chloelecointe/Documents/Dev/SongeYume/public/covers/
```

### 3. Ouvrez books.json

Chemin : `src/data/books.json`

### 4. Remplacez les URLs

**Pour chaque livre**, changez la ligne `"cover":` :

**AVANT :**
```json
"cover": "https://images.unsplash.com/photo-xxxxxxxxx?w=400&h=600&fit=crop"
```

**APRÈS :**
```json
"cover": "/covers/nom-de-votre-image.jpg"
```

### 5. Sauvegardez

Utilisez `Cmd+S` (Mac) ou `Ctrl+S` (Windows)

### 6. Vérifiez

Le site se recharge automatiquement. Vos images s'affichent maintenant ! 🎉

---

## 🚨 Si une image ne s'affiche pas

### Vérifications :

1. **Le fichier existe-t-il ?**
   ```bash
   # Dans le terminal, vérifiez :
   ls public/covers/
   ```

2. **Le nom correspond-il exactement ?**
   - Attention aux majuscules/minuscules
   - Attention aux tirets et underscores
   - `letranger.jpg` ≠ `lEtranger.jpg` ≠ `l-etranger.jpg`

3. **Le chemin est-il correct ?**
   - Doit commencer par `/covers/`
   - Ne pas oublier le `/` au début

4. **L'extension est-elle correcte ?**
   - `.jpg` vs `.jpeg` vs `.png`
   - Vérifiez l'extension réelle du fichier

---

## 💡 Exemple complet de modification

### Avant (Unsplash)
```json
{
  "id": 1,
  "title": "L'Étranger",
  "author": "Albert Camus",
  "cover": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  "summary": "...",
  ...
}
```

### Après (Votre image)
```json
{
  "id": 1,
  "title": "L'Étranger",
  "author": "Albert Camus",
  "cover": "/covers/letranger.jpg",
  "summary": "...",
  ...
}
```

---

## 📸 Conseils pour vos photos

### Qualité photo
- 📱 Utilisez la meilleure qualité possible
- ☀️ Prenez les photos avec bonne lumière
- 📐 Tenez le livre bien droit
- 🎯 Cadrez uniquement la couverture

### Édition (optionnel)
Vous pouvez retoucher avec :
- **iPhone** : App Photos (recadrer, ajuster la lumière)
- **Android** : Google Photos ou Snapseed
- **Ordinateur** : Preview (Mac) ou Paint (Windows)

### Compression (pour optimiser)
Si les fichiers sont trop lourds :
- https://tinypng.com
- https://squoosh.app

---

## ✅ Vous avez terminé !

Votre bibliothèque affiche maintenant **vos propres photos** ! 📚✨

C'est encore plus personnel et authentique.

---

**Prochaine étape :** Ajoutez vos propres livres en suivant `TEMPLATE_LIVRE.json` !

