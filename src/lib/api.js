/**
 * API Client for CineVibe Backend
 * Handles communication with Python backend API for KNN recommendations
 */

/**
 * Mood payload structure for API requests
 * @typedef {Object} MoodPayload
 * @property {number} colorHue - Normalized color hue (0-1)
 * @property {number} intensity - Intensity value (0-1)
 * @property {number} pacing - Pacing value (0-1)
 * @property {number[]} descriptors - Descriptor vector (8 dimensions)
 */

/**
 * Movie recommendation response structure
 * @typedef {Object} MovieRecommendation
 * @property {string} id - Movie ID
 * @property {string} title - Movie title
 * @property {string} poster - Poster URL
 * @property {string[]} tags - Mood tags
 * @property {number} distance - KNN distance
 * @property {number} similarity - Similarity score (0-1)
 * @property {number} score - Match percentage (0-100)
 */

/**
 * API response structure
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether request succeeded
 * @property {MovieRecommendation[]} recommendations - Top-k movie recommendations
 * @property {number} k - Number of recommendations returned
 * @property {string} [error] - Error message if failed
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Sends moodboard data to backend and gets KNN recommendations
 * @param {Object} mood - Mood object from UI (colors, descriptors, intensity, pacing)
 * @param {number} k - Number of recommendations (default: 5)
 * @param {string} distanceMetric - 'euclidean' or 'cosine' (default: 'euclidean')
 * @returns {Promise<ApiResponse>} API response with recommendations
 */
export async function getKnnRecommendations(mood, k = 5, distanceMetric = 'euclidean') {
  try {
    // Convert mood to API payload format
    const payload = {
      colorHue: mood.colors.size > 0 
        ? Array.from(mood.colors).reduce((sum, hex) => {
            // Convert hex to normalized hue
            const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!m) return sum;
            const r = parseInt(m[1], 16) / 255;
            const g = parseInt(m[2], 16) / 255;
            const b = parseInt(m[3], 16) / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h = 0;
            if (max !== min) {
              if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360;
              else if (max === g) h = 60 * ((b - r) / (max - min)) + 120;
              else h = 60 * ((r - g) / (max - min)) + 240;
            }
            return sum + (h / 360);
          }, 0) / mood.colors.size
        : 0.5,
      intensity: mood.intensity,
      pacing: mood.pacing,
      descriptors: [
        "cozy", "melancholic", "upbeat", "mysterious",
        "gritty", "surreal", "romantic", "dark comedy"
      ].map(desc => mood.descriptors.has(desc) ? 1.0 : 0.0),
    };

    // Validate payload
    if (payload.intensity < 0 || payload.intensity > 1 ||
        payload.pacing < 0 || payload.pacing > 1 ||
        payload.colorHue < 0 || payload.colorHue > 1) {
      throw new Error('Invalid mood values: must be between 0 and 1');
    }

    const response = await fetch(`${API_BASE_URL}/recommendations/mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        k,
        distance_metric: distanceMetric,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      recommendations: data.recommendations || [],
      k: data.k || k,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      recommendations: [],
      k: 0,
      error: error.message || 'Failed to fetch recommendations',
    };
  }
}

/**
 * Checks if backend API is available
 * @returns {Promise<boolean>} True if API is reachable
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

