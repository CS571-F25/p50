/**
 * KNN-based Recommendation System
 * Wrapper that uses KNN algorithm for recommendations
 * Falls back to client-side KNN if backend is unavailable
 */

import { createUserMoodVector } from './moodVector.js';
import { knnRecommendations } from './knn.js';
import { getKnnRecommendations, checkApiHealth } from './api.js';

let useBackend = false;
let apiHealthChecked = false;

/**
 * Checks backend availability and sets preference
 */
async function checkBackendAvailability() {
  if (apiHealthChecked) return useBackend;
  
  useBackend = await checkApiHealth();
  apiHealthChecked = true;
  return useBackend;
}

/**
 * Gets KNN recommendations using backend API or client-side fallback
 * @param {Object} mood - Mood object from UI
 * @param {Array} movies - Array of all movies
 * @param {number} k - Number of recommendations (default: 5)
 * @param {string} distanceMetric - 'euclidean' or 'cosine' (default: 'euclidean')
 * @param {boolean} preferBackend - Whether to prefer backend (default: true)
 * @returns {Promise<Array>} Top-k movie recommendations with scores
 */
export async function getRecommendationsKnn(mood, movies, k = 5, distanceMetric = 'euclidean', preferBackend = true) {
  // Check backend availability if we prefer it
  if (preferBackend) {
    const backendAvailable = await checkBackendAvailability();
    
    if (backendAvailable) {
      try {
        const apiResponse = await getKnnRecommendations(mood, k, distanceMetric);
        
        if (apiResponse.success && apiResponse.recommendations.length > 0) {
          // Map API response to match local movie structure
          return apiResponse.recommendations.map(rec => {
            const originalMovie = movies.find(m => m.id === rec.id);
            return {
              ...originalMovie,
              ...rec,
              _score: rec.score || rec.similarity * 100,
            };
          });
        }
      } catch (error) {
        console.warn('Backend API failed, falling back to client-side KNN:', error);
      }
    }
  }
  
  // Fallback to client-side KNN
  const userVector = createUserMoodVector(mood);
  return knnRecommendations(userVector, movies, k, distanceMetric);
}

/**
 * Synchronous version using only client-side KNN
 * Useful for immediate updates without async overhead
 * @param {Object} mood - Mood object from UI
 * @param {Array} movies - Array of all movies
 * @param {number} k - Number of recommendations (default: 5)
 * @param {string} distanceMetric - 'euclidean' or 'cosine' (default: 'euclidean')
 * @returns {Array} Top-k movie recommendations with scores
 */
export function getRecommendationsKnnSync(mood, movies, k = 5, distanceMetric = 'euclidean') {
  const userVector = createUserMoodVector(mood);
  return knnRecommendations(userVector, movies, k, distanceMetric);
}

