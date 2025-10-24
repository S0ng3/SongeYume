# 📸 Guide : Utiliser vos propres images de couvertures

## 🎯 Objectif

Remplacer les images Unsplash par vos propres photos de livres.

---

## 📁 Étape 1 : Préparer vos images

### Option A : Prendre des photos 📱

**Avec votre smartphone :**
1. Trouvez un endroit bien éclairé (lumière naturelle idéale)
2. Placez le livre sur une surface plane
3. Prenez la photo en tenant votre téléphone bien droit
4. Cadrez uniquement la couverture
5. Assurez-vous qu'il n'y a pas de reflets ou d'ombres

**Conseils qualité :**
- ✅ Lumière uniforme
- ✅ Cadrage droit
- ✅ Mise au point nette
- ❌ Éviter les doigts dans le cadre
- ❌ Éviter les reflets du flash

### Option B : Scanner les couvertures 🖨️

Si vous avez un scanner, c'est l'option idéale pour une qualité parfaite.

### Option C : Télécharger depuis internet 🌐

Vous pouvez télécharger les couvertures depuis :
- Google Images (rechercher "couverture [titre du livre]")
- Amazon (clic droit sur l'image → Enregistrer)
- Babelio (sur la page du livre)
- Goodreads

---

## 📂 Étape 2 : Organiser vos images

### Renommer vos fichiers

Utilisez des noms simples et sans espaces :

**Format recommandé :**
```
titre-du-livre.jpg
```

**Exemples :**
- `letranger.jpg`
- `1984.jpg` ou `1984.png`
- `le-petit-prince.jpg`
- `seigneur-des-anneaux.jpg`

**Caractères à éviter :**
- ❌ Espaces → Utilisez des tirets `-`
- ❌ Apostrophes → Supprimez-les
- ❌ Caractères spéciaux (é, è, à) → Utilisez e, a
- ✅ Utilisez uniquement : lettres minuscules, chiffres, tirets

### Placer vos images

Copiez toutes vos images dans le dossier :
```
/Users/chloelecointe/Documents/Dev/SongeYume/public/covers/
```

**Structure finale :**
```
public/
└── covers/
    ├── letranger.jpg
    ├── 1984.jpg
    ├── le-petit-prince.jpg
    ├── la-nuit-des-temps.jpg
    ├── seigneur-des-anneaux.jpg
    ├── les-miserables.jpg
    ├── cent-ans-de-solitude.jpg
    └── dune.jpg
```

---

## ✏️ Étape 3 : Modifier books.json

Ouvrez le fichier : `src/data/books.json`

### Avant (avec Unsplash) :
```json
{
  "id": 1,
  "title": "L'Étranger",
  "author": "Albert Camus",
  "cover": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  ...
}
```

### Après (avec votre image) :
```json
{
  "id": 1,
  "title": "L'Étranger",
  "author": "Albert Camus",
  "cover": "/covers/letranger.jpg",
  ...
}
```

**Important :** Le chemin commence toujours par `/covers/`

---

## 🔄 Étape 4 : Appliquer pour tous les livres

Répétez pour chaque livre dans votre `books.json` :

```json
[
  {
    "id": 1,
    "cover": "/covers/letranger.jpg"
  },
  {
    "id": 2,
    "cover": "/covers/1984.jpg"
  },
  {
    "id": 3,
    "cover": "/covers/le-petit-prince.jpg"
  },
  {
    "id": 4,
    "cover": "/covers/la-nuit-des-temps.jpg"
  },
  {
    "id": 5,
    "cover": "/covers/seigneur-des-anneaux.jpg"
  },
  {
    "id": 6,
    "cover": "/covers/les-miserables.jpg"
  },
  {
    "id": 7,
    "cover": "/covers/cent-ans-de-solitude.jpg"
  },
  {
    "id": 8,
    "cover": "/covers/dune.jpg"
  }
]
```

---

## ✅ Étape 5 : Vérifier

1. **Sauvegardez** `books.json`
2. Le site se **recharge automatiquement** (Hot Reload)
3. **Vérifiez** que les images s'affichent correctement
4. Si une image ne s'affiche pas :
   - Vérifiez le nom du fichier (majuscules/minuscules)
   - Vérifiez que l'image est bien dans `public/covers/`
   - Vérifiez le chemin dans `books.json`

---

## 🎨 Optimisation des images (optionnel)

Pour améliorer les performances :

### Outils gratuits en ligne :
1. **TinyPNG** - https://tinypng.com
   - Glissez-déposez vos images
   - Téléchargez les versions compressées

2. **Squoosh** - https://squoosh.app
   - Application web de Google
   - Compression avancée

3. **CompressJPEG** - https://compressjpeg.com

### Tailles recommandées :
- **Largeur** : 400-600px
- **Hauteur** : 600-900px
- **Poids** : < 300KB par image (idéal)
- **Format** : JPG pour les photos, PNG pour la qualité

---

## 🚨 Résolution de problèmes

### L'image ne s'affiche pas

**Vérifiez :**
1. Le fichier existe dans `public/covers/`
2. Le nom du fichier correspond exactement (attention aux majuscules)
3. Le chemin commence par `/covers/` (avec le slash)
4. L'extension est correcte (.jpg, .png, etc.)

### L'image est floue

**Solutions :**
- Utilisez une image de meilleure résolution
- Minimum recommandé : 400x600px
- Idéal : 600x900px ou plus

### L'image est déformée

**Cause :** Ratio incorrect (pas 2:3)

**Solutions :**
- Recadrez l'image en format 2:3 (portrait)
- Utilisez un éditeur d'image pour ajuster

---

## 📝 Exemple complet

### 1. Vous avez pris une photo de "L'Étranger"

### 2. Renommez le fichier :
```
letranger.jpg
```

### 3. Copiez dans :
```
/Users/chloelecointe/Documents/Dev/SongeYume/public/covers/letranger.jpg
```

### 4. Modifiez books.json :
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

### 5. Sauvegardez et admirez ! ✨

---

## 🎯 Workflow rapide

```
Photo → Renommer → Copier dans public/covers/ → Modifier books.json → Sauvegarder
```

**Temps estimé :** 2-3 minutes par livre une fois le processus maîtrisé.

---

## 💡 Astuces

### Traitement par lot

Si vous avez beaucoup de livres :
1. Prenez toutes les photos d'un coup
2. Transférez-les toutes sur ordinateur
3. Renommez-les toutes
4. Copiez-les toutes dans `public/covers/`
5. Modifiez `books.json` en une seule session

### Template pour books.json

Pour accélérer, préparez un template :
```json
{
  "id": X,
  "title": "",
  "author": "",
  "cover": "/covers/XXXXX.jpg",
  "summary": "",
  "personalReview": "",
  "rating": 4,
  "maxRating": 5,
  "quotes": [],
  "tags": [],
  "publishedOnInstagram": false,
  "instagramLink": null,
  "publishedOnBabelio": false,
  "babelioLink": "",
  "readDate": "2024-XX-XX"
}
```

---

## 🎊 Résultat final

Vous aurez maintenant **vos propres photos** sur votre bibliothèque virtuelle, rendant le site encore plus personnel et authentique ! 📚✨

---

**Besoin d'aide ?** Consultez `public/covers/README.md` pour plus de détails.

