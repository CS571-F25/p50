/**
 * k-Nearest Neighbors (KNN) Algorithm Implementation
 * Computes distance between user mood vector and movie vectors to find best matches
 */

import { createMovieMoodVector, validateMoodVector } from './moodVector.js';

/**
 * Calculates Euclidean distance between two vectors
 * @param {number[]} vec1 - First vector
 * @param {number[]} vec2 - Second vector
 * @returns {number} Euclidean distance
 */
export function euclideanDistance(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let sumSquaredDiff = 0;
  for (let i = 0; i < vec1.length; i++) {
    const diff = vec1[i] - vec2[i];
    sumSquaredDiff += diff * diff;
  }
  
  return Math.sqrt(sumSquaredDiff);
}

/**
 * Calculates cosine similarity between two vectors
 * Returns a value between 0 and 1 (1 = identical, 0 = orthogonal)
 * @param {number[]} vec1 - First vector
 * @param {number[]} vec2 - Second vector
 * @returns {number} Cosine similarity (0-1)
 */
export function cosineSimilarity(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }
  
  const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
  if (denominator === 0) return 0;
  
  return dotProduct / denominator;
}

/**
 * Converts cosine similarity to distance (for consistent sorting)
 * Higher similarity = lower distance
 * @param {number} similarity - Cosine similarity (0-1)
 * @returns {number} Distance value (0-1)
 */
export function similarityToDistance(similarity) {
  return 1 - similarity;
}

/**
 * k-Nearest Neighbors algorithm
 * Finds the k movies closest to the user's mood vector
 * 
 * @param {number[]} userMoodVector - Normalized user mood vector
 * @param {Array} movies - Array of movie objects
 * @param {number} k - Number of nearest neighbors to return (default: 5)
 * @param {string} distanceMetric - 'euclidean' or 'cosine' (default: 'euclidean')
 * @returns {Array} Array of top-k movies with distance/similarity scores, sorted by distance (closest first)
 */
export function knnRecommendations(userMoodVector, movies, k = 5, distanceMetric = 'euclidean') {
  // Validate user vector
  if (!validateMoodVector(userMoodVector)) {
    throw new Error('Invalid user mood vector');
  }
  
  // Validate k
  if (k <= 0 || !Number.isInteger(k)) {
    throw new Error('k must be a positive integer');
  }
  
  // Calculate distance/similarity for each movie
  const moviesWithDistance = movies.map(movie => {
    const movieVector = createMovieMoodVector(movie);
    
    let distance;
    let similarity;
    
    if (distanceMetric === 'cosine') {
      similarity = cosineSimilarity(userMoodVector, movieVector);
      distance = similarityToDistance(similarity);
    } else {
      // Default to euclidean
      distance = euclideanDistance(userMoodVector, movieVector);
      similarity = 1 / (1 + distance); // Convert distance to similarity for display
    }
    
    return {
      ...movie,
      _distance: distance,
      _similarity: similarity,
      _score: similarity * 100, // Convert to percentage for UI display
    };
  });
  
  // Sort by distance (ascending - closest first)
  moviesWithDistance.sort((a, b) => a._distance - b._distance);
  
  // Return top-k results
  return moviesWithDistance.slice(0, Math.min(k, moviesWithDistance.length));
}

/**
 * Batch KNN for multiple user vectors (useful for testing/optimization)
 * @param {Array<number[]>} userVectors - Array of user mood vectors
 * @param {Array} movies - Array of movie objects
 * @param {number} k - Number of recommendations per user
 * @param {string} distanceMetric - Distance metric to use
 * @returns {Array} Array of recommendation arrays, one per user
 */
export function batchKnn(userVectors, movies, k = 5, distanceMetric = 'euclidean') {
  return userVectors.map(userVector => 
    knnRecommendations(userVector, movies, k, distanceMetric)
  );
}

