# 📚 Songe Yume - Virtual Library

A modern and elegant personal virtual library built with React, TailwindCSS, and Framer Motion.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Modern Design**: Beautiful dark theme with warm accent colors
- 📖 **Book Management**: Display books with covers, ratings, reviews, and quotes
- 🔍 **Smart Search**: Search books by title, author, or keywords
- 🏷️ **Tag Filtering**: Filter books dynamically by tags
- 📊 **Statistics Dashboard**: Visual analytics with charts (Recharts)
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ✨ **Smooth Animations**: Enhanced UX with Framer Motion
- 🌐 **Multi-page Application**: React Router navigation

## 🎨 Design Theme

- Background: `#151823`
- Text: `#dde5f2`
- Accent: `#e09e29`

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. **Clone the repository**
```bash
cd /Users/chloelecointe/Documents/Dev/SongeYume
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
SongeYume/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.jsx       # Main layout with header/footer
│   │   ├── BookCard.jsx     # Book card component
│   │   ├── BookShelf.jsx    # Book grid display
│   │   ├── SearchBar.jsx    # Search component
│   │   └── TagList.jsx      # Tag filtering component
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── Library.jsx      # Full library view
│   │   ├── BookDetail.jsx   # Individual book page
│   │   ├── Stats.jsx        # Statistics dashboard
│   │   └── About.jsx        # About page
│   ├── data/
│   │   └── books.json       # Books database
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📚 Book Data Structure

Each book in `src/data/books.json` contains:

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "cover": "https://image-url.jpg",
  "summary": "Book summary...",
  "personalReview": "My personal review...",
  "rating": 4.5,
  "maxRating": 5,
  "quotes": ["Quote 1", "Quote 2"],
  "tags": ["Tag1", "Tag2"],
  "publishedOnInstagram": true,
  "instagramLink": "https://instagram.com/...",
  "publishedOnBabelio": true,
  "babelioLink": "https://www.babelio.com/...",
  "readDate": "2024-01-15"
}
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.1
- **Styling**: TailwindCSS 3.4
- **Animations**: Framer Motion 11.0
- **Charts**: Recharts 2.12
- **Icons**: Lucide React 0.344
- **Routing**: React Router DOM 6.22

## 🎯 Key Features Explained

### Homepage
- Quick statistics overview
- Recent books section
- Top-rated books showcase
- Call-to-action sections

### Library Page
- Complete book collection
- Search functionality
- Tag-based filtering
- Responsive grid layout

### Book Detail Page
- Full book information
- Cover image display
- Personal review section
- Favorite quotes
- External links (Instagram, Babelio)
- Reading date

### Statistics Page
- Total books count
- Average rating
- Reading timeline (last 6 months)
- Rating distribution chart
- Top tags visualization
- Favorite authors
- Publication status tracking

### About Page
- Personal introduction
- Reading philosophy
- Features overview
- Technologies used

## 🎨 Customization

### Adding a New Book

1. Open `src/data/books.json`
2. Add a new book object following the data structure
3. The book will automatically appear in the library

### Changing Colors

Edit `tailwind.config.js`:

```js
colors: {
  'background': '#151823',    // Main background
  'text-light': '#dde5f2',    // Text color
  'accent': '#e09e29',        // Accent color
  'card-bg': '#1e2230',       // Card background
  'card-hover': '#252938'     // Card hover state
}
```

## 📦 Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 🌐 Deployment

This project can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply upload the contents of the `dist/` folder after building.

## 📝 License

MIT License - Feel free to use this project for your own personal library!

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Fonts from Google Fonts (Inter, Merriweather)

## 📧 Contact

Created with ❤️ by a book lover for book lovers.

---

**Happy Reading! 📖✨**

