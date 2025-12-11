# 🎬 CineVibe - Mood-Driven Movie Discovery

CineVibe is an experimental movie recommendation platform that transforms film discovery into an emotional, visually-driven experience. Instead of traditional genre filters, users express their desired mood through colors, vibes, and energy levels to receive personalized cinematic recommendations.

## ✨ Features

- **Mood-Based Discovery**: Express your vibe through colors and descriptive keywords
- **Real-Time Recommendations**: Instant results that update as you refine your mood
- **65+ Curated Films**: Handpicked collection with detailed mood mappings
- **Interactive Mood Board**: Visual interface with glassmorphism effects and neon accents
- **Dark Cinematic UI**: Immersive design with neon glow effects and animated overlays
- **Fully Accessible**: WCAG AA compliant with keyboard navigation and screen reader support

## 🚀 Live Demo

[View on GitHub Pages](https://[your-username].github.io/p50-project/)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router** - Client-side routing
- **React Bootstrap** - Component library
- **Vite** - Build tool and dev server
- **CSS3** - Custom dark theme with neon effects

## 📋 Requirements Met

### ✅ Core Requirements
- [x] Committed and pushed to GitHub
- [x] Live and functional on GitHub.io
- [x] Consistent use of React Bootstrap
- [x] Primary navigation bar present and functional
- [x] At least 3 pages fully developed using React Router
- [x] At least 12 components defined and meaningfully used
- [x] Meaningfully interactable element (Mood Board with real-time updates)
- [x] Thoughtful use of design principles

### ✅ Accessibility Requirements
- [x] No skipped heading levels (h1 → h2 → h3 hierarchy maintained)
- [x] Appropriate alt text on all images
- [x] Sufficient color contrast meeting WCAG AA standards
- [x] All inputs appropriately labeled (htmlFor/id attributes)
- [x] All forms completable via keyboard (arrow keys, Enter, Space)

## 🧩 Components (13 Total)

1. **Navigation** - Site-wide navigation bar with active state indicators
2. **Home** - Main recommendation page with mood board
3. **Browse** - Browse all movies with search functionality
4. **AboutMe** - About page with project information
5. **MoodControls** - Interactive mood board with colors, vibes, and sliders
6. **MovieCard** - Reusable movie display card with click-to-detail
7. **Chip** - Mood descriptor button component
8. **Footer** - Site footer with navigation links
9. **MovieDetail** - Modal component for movie details
10. **SearchBar** - Search input with keyboard support
11. **LoadingSpinner** - Loading indicator component
12. **StatsCard** - Statistics display card
13. **ErrorBoundary** - Error handling component

## 📄 Pages

1. **Home (`/`)** - Main discovery page with mood board and recommendations
2. **Browse (`/browse`)** - Browse all movies with search and filter
3. **About (`/about`)** - Project information and features

## 🎨 Design Principles

- **Dark Theme**: Deep charcoal backgrounds (#18181b, #111113) for cinematic atmosphere
- **Neon Accents**: Purple (#7f5af0), Blue (#009ffd), Gold (#ffb400) for visual interest
- **Glassmorphism**: Frosted glass panels with backdrop blur for depth
- **Neon Glow Effects**: Box shadows and text shadows for emphasis
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Smooth Animations**: Transitions and hover effects for interactivity

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app runs on `http://localhost:5173` by default.

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed GitHub Pages deployment instructions.

Quick deploy:
```bash
npm run build
git add docs
git commit -m "Deploy to GitHub Pages"
git push
```

Then enable GitHub Pages in repository settings (Source: `/docs` folder).

## 🎯 How It Works

1. **Select Colors**: Choose colors that represent your desired visual tone
2. **Pick Vibes**: Add mood descriptors (cozy, melancholic, mysterious, etc.)
3. **Adjust Sliders**: Fine-tune intensity and pacing
4. **Get Recommendations**: See real-time movie matches ranked by relevance

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Screen reader support
- High contrast text (WCAG AA compliant)
- Focus indicators on all interactive elements
- Proper heading hierarchy (h1 → h2 → h3)

## 📊 Dataset

- **65+ Movies** with mood mappings
- **8 Mood Categories**: romantic, melancholic, upbeat, mysterious, gritty, surreal, cozy, dark comedy
- **Poster Images**: High-quality images from TMDB
- **Mood Attributes**: Hue, tempo, and edge values for each film

## 🎬 Project Structure

```
src/
├── components/     # React components
├── data/          # Movie dataset
├── lib/           # Recommendation algorithm
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

## 📝 License

This project is created for educational purposes.

## 👤 Author

Created for CS571 - Human-Computer Interaction

---

**Built with ❤️ using React, React Bootstrap, and Vite**