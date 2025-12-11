/**
 * Mood Vector Utilities
 * Maps moodboard UI inputs to normalized numeric vectors for KNN algorithm
 */

/**
 * Converts hex color to normalized hue value (0-1 range)
 * @param {string} hex - Hex color code (e.g., "#FF6B6B")
 * @returns {number} Normalized hue value between 0 and 1
 */
export function hexToNormalizedHue(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return 0.5; // Default to middle if invalid
  
  const r = parseInt(m[1], 16) / 255;
  const g = parseInt(m[2], 16) / 255;
  const b = parseInt(m[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = (60 * ((g - b) / (max - min)) + 360) % 360;
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120;
  } else {
    h = 60 * ((r - g) / (max - min)) + 240;
  }
  
  // Normalize to 0-1 range
  return h / 360;
}

/**
 * Maps descriptor tags to a normalized vector
 * Each descriptor gets a position in the vector (one-hot encoding style)
 * @param {Set<string>} descriptors - Set of selected mood descriptors
 * @returns {number[]} Normalized descriptor vector
 */
export function descriptorsToVector(descriptors) {
  const allDescriptors = [
    "cozy", "melancholic", "upbeat", "mysterious", 
    "gritty", "surreal", "romantic", "dark comedy"
  ];
  
  return allDescriptors.map(desc => descriptors.has(desc) ? 1.0 : 0.0);
}

/**
 * Converts multiple colors to average normalized hue
 * @param {Set<string>} colors - Set of hex color codes
 * @returns {number} Average normalized hue (0-1)
 */
export function colorsToNormalizedHue(colors) {
  if (colors.size === 0) return 0.5; // Default if no colors selected
  
  const hues = Array.from(colors)
    .map(hex => hexToNormalizedHue(hex))
    .filter(h => !isNaN(h));
  
  if (hues.length === 0) return 0.5;
  
  // Return average hue
  return hues.reduce((sum, h) => sum + h, 0) / hues.length;
}

/**
 * Creates a user mood vector from moodboard inputs
 * Vector structure: [color_hue, intensity, pacing, ...descriptors]
 * @param {Object} mood - Mood object with colors, descriptors, intensity, pacing
 * @returns {number[]} Normalized mood vector
 */
export function createUserMoodVector(mood) {
  const colorHue = colorsToNormalizedHue(mood.colors);
  const intensity = mood.intensity; // Already 0-1
  const pacing = mood.pacing; // Already 0-1
  const descriptorVector = descriptorsToVector(mood.descriptors);
  
  // Combine into single vector: [color_hue, intensity, pacing, ...descriptors]
  return [colorHue, intensity, pacing, ...descriptorVector];
}

/**
 * Creates a movie mood vector from movie data
 * Uses the same structure as user mood vector for distance calculation
 * @param {Object} movie - Movie object with hue, tempo, edge, tags
 * @returns {number[]} Normalized movie mood vector
 */
export function createMovieMoodVector(movie) {
  // Normalize hue to 0-1 (movie.hue is 0-360)
  const colorHue = typeof movie.hue === 'number' ? movie.hue / 360 : 0.5;
  
  // Use edge as intensity, tempo as pacing (already 0-1)
  const intensity = typeof movie.edge === 'number' ? movie.edge : 0.5;
  const pacing = typeof movie.tempo === 'number' ? movie.tempo : 0.5;
  
  // Convert tags to descriptor vector
  const allDescriptors = [
    "cozy", "melancholic", "upbeat", "mysterious", 
    "gritty", "surreal", "romantic", "dark comedy"
  ];
  
  const descriptorVector = allDescriptors.map(desc => 
    movie.tags && movie.tags.includes(desc) ? 1.0 : 0.0
  );
  
  // Same structure as user vector: [color_hue, intensity, pacing, ...descriptors]
  return [colorHue, intensity, pacing, ...descriptorVector];
}

/**
 * Validates that a mood vector has the expected structure
 * @param {number[]} vector - Mood vector to validate
 * @returns {boolean} True if valid
 */
export function validateMoodVector(vector) {
  // Should have: 1 color + 1 intensity + 1 pacing + 8 descriptors = 11 dimensions
  return Array.isArray(vector) && vector.length === 11 && 
         vector.every(v => typeof v === 'number' && !isNaN(v) && v >= 0 && v <= 1);
}

