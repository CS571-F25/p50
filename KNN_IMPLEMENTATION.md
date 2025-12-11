# KNN Implementation Guide

## Overview

CineVibe now uses a **k-Nearest Neighbors (KNN)** algorithm to provide movie recommendations based on user mood vectors. The implementation supports both client-side (JavaScript) and server-side (Python) execution.

## Architecture

### Frontend (React + Vite)
- **Client-side KNN**: Runs in browser for immediate results
- **API Client**: Communicates with Python backend when available
- **Automatic Fallback**: Uses client-side if backend unavailable

### Backend (Python Flask)
- **RESTful API**: `/recommendations/mood` endpoint
- **NumPy Optimization**: Vectorized distance calculations
- **CORS Enabled**: Works with frontend on different ports

## Data Structures

### Mood Vector Schema

Both user and movie mood vectors use the same 11-dimensional structure:

```
[color_hue, intensity, pacing, cozy, melancholic, upbeat, mysterious, gritty, surreal, romantic, dark_comedy]
```

- **color_hue** (0-1): Normalized hue from selected colors
- **intensity** (0-1): User's intensity slider value
- **pacing** (0-1): User's pacing slider value
- **descriptors** (8x 0/1): One-hot encoding of mood descriptors

### Example Vectors

**User Mood:**
```javascript
{
  colors: new Set(['#F59E0B']),  // Orange
  descriptors: new Set(['cozy']),
  intensity: 0.2,
  pacing: 0.5
}
// Vector: [0.083, 0.2, 0.5, 1, 0, 0, 0, 0, 0, 0, 0]
```

**Movie Mood:**
```javascript
{
  hue: 30,        // Orange hue
  edge: 0.3,      // Intensity
  tempo: 0.6,     // Pacing
  tags: ['cozy', 'romantic']
}
// Vector: [0.083, 0.3, 0.6, 1, 0, 0, 0, 0, 0, 1, 0]
```

## KNN Algorithm

### Distance Metrics

1. **Euclidean Distance** (default)
   - Standard L2 norm: `√Σ(vi - ui)²`
   - Good for continuous features
   - Range: 0 to ∞ (lower = closer)

2. **Cosine Similarity**
   - Measures angle between vectors: `(u·v) / (||u|| ||v||)`
   - Good for high-dimensional sparse data
   - Range: 0 to 1 (higher = more similar)
   - Converted to distance: `1 - similarity`

### Algorithm Flow

```
1. User selects mood parameters (colors, descriptors, sliders)
2. Convert mood to 11D vector
3. For each movie:
   a. Convert movie data to 11D vector
   b. Calculate distance to user vector
   c. Store distance + similarity score
4. Sort movies by distance (ascending)
5. Return top-k movies
```

## File Structure

```
src/
├── lib/
│   ├── moodVector.js      # Vector creation utilities
│   ├── knn.js             # KNN algorithm implementation
│   ├── api.js             # Backend API client
│   └── recommendKnn.js    # Main recommendation wrapper
├── components/
│   └── Home.jsx           # Updated to use KNN

backend/
├── knn_api.py             # Flask API server
├── requirements.txt       # Python dependencies
└── README.md              # Backend setup guide
```

## Usage

### Frontend (Client-Side)

```javascript
import { getRecommendationsKnnSync } from './lib/recommendKnn.js';

const recommendations = getRecommendationsKnnSync(mood, movies, k=5, 'euclidean');
// Returns: Array of top-k movies with _distance, _similarity, _score
```

### Backend API

```bash
POST http://localhost:8000/recommendations/mood
Content-Type: application/json

{
  "colorHue": 0.5,
  "intensity": 0.7,
  "pacing": 0.6,
  "descriptors": [1, 0, 1, 0, 0, 0, 1, 0],
  "k": 5,
  "distance_metric": "euclidean"
}
```

## Integration Points

### 1. Mood Board UI → Vector

**Location**: `src/lib/moodVector.js`

- `createUserMoodVector(mood)`: Converts UI mood object to vector
- `createMovieMoodVector(movie)`: Converts movie data to vector
- Handles color normalization, descriptor encoding

### 2. KNN Calculation

**Location**: `src/lib/knn.js`

- `knnRecommendations(userVector, movies, k, metric)`: Main KNN function
- `euclideanDistance(vec1, vec2)`: Distance calculation
- `cosineSimilarity(vec1, vec2)`: Similarity calculation

### 3. Frontend Integration

**Location**: `src/components/Home.jsx`

- Uses `getRecommendationsKnnSync()` for immediate updates
- Displays similarity scores as percentages
- Shows loading/error states

### 4. Backend API

**Location**: `backend/knn_api.py`

- Flask REST API
- Validates input ranges
- Returns JSON with recommendations

## Performance

- **Client-side**: ~1-5ms for 65 movies (synchronous)
- **Backend**: ~10-50ms including network (with NumPy optimization)
- **Scalability**: O(n) where n = number of movies

## Testing

### Test KNN Locally

```javascript
// In browser console
import { getRecommendationsKnnSync } from './lib/recommendKnn.js';
import { DEFAULT_MOOD } from './lib/recommend.js';
import { MOVIES } from './data/movies.js';

const recommendations = getRecommendationsKnnSync(DEFAULT_MOOD, MOVIES, 5);
console.log(recommendations);
```

### Test Backend API

```bash
curl -X POST http://localhost:8000/recommendations/mood \
  -H "Content-Type: application/json" \
  -d '{
    "colorHue": 0.5,
    "intensity": 0.7,
    "pacing": 0.6,
    "descriptors": [1, 0, 1, 0, 0, 0, 1, 0],
    "k": 5
  }'
```

## Future Enhancements

1. **Weighted Dimensions**: Give more importance to certain features
2. **Embeddings**: Use ML embeddings instead of hand-crafted features
3. **Hybrid Approach**: Combine KNN with content-based filtering
4. **User History**: Incorporate past preferences
5. **Real-time Updates**: WebSocket for live recommendations

## Troubleshooting

### Images Not Loading
- Check TMDB URLs are valid
- Verify CORS settings
- Use fallback placeholder images

### Backend Not Connecting
- Check `VITE_API_BASE_URL` in `.env`
- Verify Flask server is running
- Check CORS configuration

### Low Quality Recommendations
- Adjust `k` value (try 10-15)
- Try different distance metric (cosine vs euclidean)
- Verify movie vectors are correctly computed

