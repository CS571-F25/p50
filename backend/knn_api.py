"""
CineVibe KNN Recommendation API
Python backend for k-Nearest Neighbors movie recommendations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from typing import List, Dict, Tuple
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Movie mood vector schema: [color_hue, intensity, pacing, ...descriptors]
# Descriptors: cozy, melancholic, upbeat, mysterious, gritty, surreal, romantic, dark comedy
DESCRIPTOR_INDEX = {
    "cozy": 0,
    "melancholic": 1,
    "upbeat": 2,
    "mysterious": 3,
    "gritty": 4,
    "surreal": 5,
    "romantic": 6,
    "dark comedy": 7
}

# Load movie dataset
MOVIES_DATASET = []

def load_movies_dataset(file_path: str = "movies.json"):
    """
    Load movie dataset from JSON file
    Expected format: List of movie objects with id, title, poster, tags, hue, tempo, edge
    """
    global MOVIES_DATASET
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                MOVIES_DATASET = json.load(f)
        else:
            # Fallback: use sample data structure
            MOVIES_DATASET = []
        print(f"Loaded {len(MOVIES_DATASET)} movies")
    except Exception as e:
        print(f"Error loading movies dataset: {e}")
        MOVIES_DATASET = []

def create_movie_mood_vector(movie: Dict) -> np.ndarray:
    """
    Creates a normalized mood vector from movie data
    Vector structure: [color_hue (0-1), intensity (0-1), pacing (0-1), ...descriptors (8x 0/1)]
    
    Args:
        movie: Movie object with hue, tempo, edge, tags
        
    Returns:
        numpy array of shape (11,) - normalized mood vector
    """
    # Normalize hue to 0-1 (movie.hue is 0-360)
    color_hue = movie.get('hue', 180) / 360.0 if isinstance(movie.get('hue'), (int, float)) else 0.5
    
    # Use edge as intensity, tempo as pacing (already 0-1)
    intensity = movie.get('edge', 0.5) if isinstance(movie.get('edge'), (int, float)) else 0.5
    pacing = movie.get('tempo', 0.5) if isinstance(movie.get('tempo'), (int, float)) else 0.5
    
    # Convert tags to descriptor vector (one-hot encoding)
    tags = movie.get('tags', [])
    descriptor_vector = np.zeros(8)
    for tag in tags:
        if tag in DESCRIPTOR_INDEX:
            descriptor_vector[DESCRIPTOR_INDEX[tag]] = 1.0
    
    # Combine: [color_hue, intensity, pacing, ...descriptors]
    return np.array([color_hue, intensity, pacing, *descriptor_vector])

def euclidean_distance(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculates Euclidean distance between two vectors
    
    Args:
        vec1: First vector
        vec2: Second vector
        
    Returns:
        Euclidean distance
    """
    return np.linalg.norm(vec1 - vec2)

def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculates cosine similarity between two vectors
    
    Args:
        vec1: First vector
        vec2: Second vector
        
    Returns:
        Cosine similarity (0-1)
    """
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    return dot_product / (norm1 * norm2)

def knn_recommendations(
    user_mood_vector: np.ndarray,
    movies: List[Dict],
    k: int = 5,
    distance_metric: str = 'euclidean'
) -> List[Dict]:
    """
    k-Nearest Neighbors algorithm for movie recommendations
    
    Args:
        user_mood_vector: Normalized user mood vector (11 dimensions)
        movies: List of movie objects
        k: Number of recommendations to return
        distance_metric: 'euclidean' or 'cosine'
        
    Returns:
        List of top-k movies with distance/similarity scores, sorted by distance (closest first)
    """
    if len(movies) == 0:
        return []
    
    if k <= 0:
        k = 5
    
    movies_with_distance = []
    
    for movie in movies:
        # Create movie mood vector
        movie_vector = create_movie_mood_vector(movie)
        
        # Calculate distance/similarity
        if distance_metric == 'cosine':
            similarity = cosine_similarity(user_mood_vector, movie_vector)
            distance = 1 - similarity  # Convert similarity to distance
        else:
            # Default to euclidean
            distance = euclidean_distance(user_mood_vector, movie_vector)
            similarity = 1 / (1 + distance)  # Convert distance to similarity for display
        
        movies_with_distance.append({
            **movie,  # Include all original movie data
            'distance': float(distance),
            'similarity': float(similarity),
            'score': float(similarity * 100)  # Percentage for UI
        })
    
    # Sort by distance (ascending - closest first)
    movies_with_distance.sort(key=lambda x: x['distance'])
    
    # Return top-k
    return movies_with_distance[:k]

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'movies_loaded': len(MOVIES_DATASET)
    }), 200

@app.route('/recommendations/mood', methods=['POST'])
def get_mood_recommendations():
    """
    POST /recommendations/mood
    Accepts user moodboard payload and returns KNN recommendations
    
    Expected payload:
    {
        "colorHue": 0.5,        # 0-1
        "intensity": 0.7,      # 0-1
        "pacing": 0.6,         # 0-1
        "descriptors": [1, 0, 1, 0, 0, 0, 1, 0],  # 8-element array
        "k": 5,                # Optional, default 5
        "distance_metric": "euclidean"  # Optional, default "euclidean"
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({'error': 'Missing request body'}), 400
        
        # Extract and validate mood parameters
        color_hue = data.get('colorHue', 0.5)
        intensity = data.get('intensity', 0.5)
        pacing = data.get('pacing', 0.5)
        descriptors = data.get('descriptors', [0] * 8)
        k = data.get('k', 5)
        distance_metric = data.get('distance_metric', 'euclidean')
        
        # Validate ranges
        if not (0 <= color_hue <= 1):
            return jsonify({'error': 'colorHue must be between 0 and 1'}), 400
        if not (0 <= intensity <= 1):
            return jsonify({'error': 'intensity must be between 0 and 1'}), 400
        if not (0 <= pacing <= 1):
            return jsonify({'error': 'pacing must be between 0 and 1'}), 400
        if not isinstance(descriptors, list) or len(descriptors) != 8:
            return jsonify({'error': 'descriptors must be an array of 8 elements'}), 400
        if distance_metric not in ['euclidean', 'cosine']:
            return jsonify({'error': 'distance_metric must be "euclidean" or "cosine"'}), 400
        
        # Create user mood vector: [color_hue, intensity, pacing, ...descriptors]
        user_vector = np.array([color_hue, intensity, pacing, *descriptors])
        
        # Get KNN recommendations
        recommendations = knn_recommendations(
            user_vector,
            MOVIES_DATASET,
            k=k,
            distance_metric=distance_metric
        )
        
        return jsonify({
            'success': True,
            'recommendations': recommendations,
            'k': len(recommendations),
            'distance_metric': distance_metric
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/movies', methods=['GET'])
def get_all_movies():
    """Get all movies in dataset"""
    return jsonify({
        'movies': MOVIES_DATASET,
        'count': len(MOVIES_DATASET)
    }), 200

if __name__ == '__main__':
    # Load movie dataset on startup
    load_movies_dataset('movies.json')
    
    # Run Flask app
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)

