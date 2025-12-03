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
public/covers/
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

## ⚡ Optimisation des images (AUTOMATIQUE)

Les images sont **automatiquement optimisées** lors du `npm run build` !

### Optimisation Automatique

Le projet inclut `vite-plugin-image-optimizer` qui compresse automatiquement :
- **Réduction de 65-75%** de la taille
- **Sans perte visible de qualité**
- **Cache intelligent** (optimise uniquement les images modifiées)

**Vous n'avez rien à faire !** Ajoutez simplement vos images PNG/JPG dans `public/covers/` et lancez `npm run build`.

### Tailles Recommandées (pour les originaux)

- **Largeur** : 400-800px
- **Hauteur** : 600-1200px
- **Format** : PNG ou JPG (sera optimisé automatiquement)

### Optimisation Manuelle (Optionnel)

Si vous souhaitez pré-optimiser avant d'ajouter au projet :

**Outils en ligne gratuits :**
- **TinyPNG** - https://tinypng.com
- **Squoosh** - https://squoosh.app
- **CompressJPEG** - https://compressjpeg.com

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
public/covers/letranger.jpg
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

## 🔥 Système de notation Spicy

Pour les livres avec des tags **Romance** ou **MM**, vous pouvez ajouter un niveau "spicy" pour indiquer le degré de contenu romantique/sensuel :

### Niveaux disponibles

| Niveau | Indicateur | Description | Exemple |
|--------|------------|-------------|---------|
| **0** | ○○○ | Sous-entendus uniquement | Roi Sorcier, Demain et Demain |
| **1** | 🔥○○ | Doux - Moments tendres | Yumi et le Peintre de Cauchemars |
| **2** | 🔥🔥○ | Épicé - Scènes explicites | Tarot - Le Dernier Soleil |
| **3** | 🔥🔥🔥 | Hard - Contenu très explicite |  |

*Note : Les flammes s'affichent dans la couleur dorée de votre charte graphique*

### Comment l'utiliser

Dans votre `books.json`, ajoutez le champ `spicyLevel` (optionnel) :

```json
{
  "id": 13,
  "title": "Roi Sorcier",
  "tags": ["Fantasy", "MM"],
  "spicyLevel": 0
}
```

**Important :**
- Ce champ est **optionnel** - ne l'ajoutez que pour les livres Romance/MM
- Si le champ n'est pas présent, aucun indicateur ne s'affichera
- Les flammes s'affichent automatiquement sur les cartes et la page détail

---

## 📚 Format des livres

Vous pouvez maintenant indiquer le format physique de vos livres. Cette information apparaît sur la page de détail et génère des statistiques.

### Formats disponibles

| Format | Icône | Description |
|--------|-------|-------------|
| **Poche** | 📖 | Format de poche (petit format) |
| **Broché** | 📚 | Couverture souple |
| **Relié** | 📗 | Couverture rigide |

*Note : Les icônes s'affichent dans la couleur dorée de votre charte graphique avec un fond semi-transparent*

### Comment l'utiliser

Dans votre `books.json`, ajoutez le champ `format` (optionnel) :

```json
{
  "id": 1,
  "title": "Yumi et le Peintre de Cauchemars",
  "format": "Poche"
}
```

**Options valides :** `"Poche"`, `"Broché"`, `"Relié"`

### Où apparaît cette information ?

- ✅ **Page de détail du livre** : Affiché avec les autres informations
- ✅ **Page Statistiques** : Section "Répartition par format" avec graphiques et pourcentages
- ❌ **Pas de filtre** : Cette information n'est pas utilisée pour filtrer dans la bibliothèque

---

**Besoin d'aide ?** Consultez `public/covers/README.md` pour plus de détails.

