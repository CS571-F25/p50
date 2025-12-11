# CineVibe KNN Backend API

Python Flask backend for k-Nearest Neighbors movie recommendations.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Prepare movie dataset:**
   - Export your movie data to `movies.json` in the backend directory
   - Format should match the frontend movie structure:
   ```json
   [
     {
       "id": "movie-id",
       "title": "Movie Title",
       "poster": "https://...",
       "tags": ["romantic", "upbeat"],
       "hue": 50,
       "tempo": 0.7,
       "edge": 0.4
     }
   ]
   ```

3. **Run the server:**
```bash
python knn_api.py
```

The API will run on `http://localhost:8000`

## API Endpoints

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "movies_loaded": 65
}
```

### `POST /recommendations/mood`
Get KNN-based movie recommendations based on user mood.

**Request Body:**
```json
{
  "colorHue": 0.5,
  "intensity": 0.7,
  "pacing": 0.6,
  "descriptors": [1, 0, 1, 0, 0, 0, 1, 0],
  "k": 5,
  "distance_metric": "euclidean"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "movie-id",
      "title": "Movie Title",
      "poster": "https://...",
      "tags": ["romantic", "upbeat"],
      "distance": 0.234,
      "similarity": 0.876,
      "score": 87.6
    }
  ],
  "k": 5,
  "distance_metric": "euclidean"
}
```

### `GET /movies`
Get all movies in the dataset.

## Environment Variables

- `PORT`: Server port (default: 8000)

## Frontend Integration

Set the API base URL in your frontend `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000
```

The frontend will automatically detect if the backend is available and use it, otherwise falling back to client-side KNN.

## KNN Algorithm Details

- **Vector Structure**: 11 dimensions
  - [0]: Color hue (0-1)
  - [1]: Intensity (0-1)
  - [2]: Pacing (0-1)
  - [3-10]: Descriptor flags (cozy, melancholic, upbeat, mysterious, gritty, surreal, romantic, dark comedy)

- **Distance Metrics**:
  - `euclidean`: Standard Euclidean distance
  - `cosine`: Cosine similarity (converted to distance)

- **Performance**: Optimized with NumPy for vectorized operations

