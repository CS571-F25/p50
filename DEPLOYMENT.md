# CineVibe - GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed locally
- Node.js and npm installed

## Deployment Steps

### 1. Build the Project
```bash
npm run build
```

This creates a `docs/` folder with the production build (configured in `vite.config.js`).

### 2. Commit and Push to GitHub
```bash
# Add all files
git add .

# Commit changes
git commit -m "Deploy CineVibe to GitHub Pages"

# Push to GitHub
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
4. Click **Save**

### 4. Access Your Site
Your site will be available at:
```
https://[your-username].github.io/[repository-name]/
```

For example: `https://username.github.io/p50-project/`

## Important Notes

- The `base` in `vite.config.js` must match your repository name
- Currently set to `/p50/` - update if your repo name is different
- After pushing, it may take a few minutes for GitHub Pages to update
- The site uses HashRouter, so all routes work correctly on GitHub Pages

## Troubleshooting

**Images not loading?**
- Check that poster URLs are publicly accessible
- Verify CORS settings if using external image sources

**Routes not working?**
- HashRouter is already configured - this should work automatically
- If using BrowserRouter, you'd need a 404.html redirect file

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check for any linting errors with `npm run lint`

