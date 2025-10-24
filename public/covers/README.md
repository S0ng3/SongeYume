# 📸 Dossier des Couvertures de Livres

## 📂 Structure

Placez vos images de couvertures de livres dans ce dossier.

### 🎯 Convention de nommage recommandée

Pour faciliter l'organisation, utilisez cette convention :

```
titre-du-livre.jpg
ou
titre-du-livre.png
```

**Exemples :**
- `letranger.jpg`
- `1984.png`
- `le-petit-prince.jpg`
- `seigneur-des-anneaux.jpg`

### 📝 Formats d'images supportés

- ✅ `.jpg` / `.jpeg` - Recommandé pour les photos
- ✅ `.png` - Recommandé pour la qualité
- ✅ `.webp` - Moderne et optimisé
- ✅ `.gif` - Si besoin d'animation

### 📐 Taille recommandée

Pour une meilleure qualité d'affichage :
- **Largeur** : 400px minimum (600px idéal)
- **Hauteur** : 600px minimum (900px idéal)
- **Ratio** : 2:3 (format portrait standard de livre)

### 🎨 Optimisation

Pour de meilleures performances :
1. Compressez vos images avant de les ajouter
2. Gardez la taille de fichier < 500KB par image
3. Utilisez des outils comme TinyPNG ou Squoosh

### 📝 Comment utiliser dans books.json

```json
{
  "id": 1,
  "title": "Votre Livre",
  "cover": "/covers/votre-livre.jpg",
  ...
}
```

**Important** : Le chemin commence par `/covers/` (avec le slash au début)

### 📋 Exemples complets

```json
{
  "id": 1,
  "title": "L'Étranger",
  "author": "Albert Camus",
  "cover": "/covers/letranger.jpg"
}
```

```json
{
  "id": 2,
  "title": "1984",
  "author": "George Orwell",
  "cover": "/covers/1984.png"
}
```

---

## 🚀 Workflow recommandé

1. **Prenez des photos** de vos livres (couverture uniquement)
2. **Renommez** les fichiers selon la convention
3. **Copiez** les images dans ce dossier `/public/covers/`
4. **Modifiez** `src/data/books.json` avec les nouveaux chemins
5. **Sauvegardez** - Le site se recharge automatiquement !

---

## 📱 Photos depuis votre téléphone

### iPhone / Android

1. Prenez la photo de la couverture
2. Transférez sur votre ordinateur (AirDrop, USB, Google Photos, etc.)
3. Placez dans ce dossier

### Conseils pour de bonnes photos

- 📷 Lumière naturelle de préférence
- 📐 Tenez le livre bien droit
- 🎯 Cadrez uniquement la couverture
- ✨ Évitez les reflets et ombres

---

## 📂 Structure finale

```
public/
└── covers/
    ├── README.md (ce fichier)
    ├── letranger.jpg
    ├── 1984.png
    ├── le-petit-prince.jpg
    ├── la-nuit-des-temps.jpg
    ├── seigneur-des-anneaux.jpg
    ├── les-miserables.jpg
    ├── cent-ans-de-solitude.jpg
    └── dune.jpg
```

---

**Note** : Les images dans `public/` sont accessibles directement via `/covers/nom-du-fichier.jpg` dans votre application.

