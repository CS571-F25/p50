export const DEFAULT_MOOD = {
  colors: new Set(),
  descriptors: new Set(),
  intensity: 0.5, // 0..1
  pacing: 0.5,    // 0..1
};

const TAG_MAP = {
  cozy: ["cozy", "romantic", "light"],
  melancholic: ["melancholic", "introspective", "drama"],
  upbeat: ["upbeat", "feel-good", "music"],
  mysterious: ["mysterious", "noir", "thriller"],
  gritty: ["gritty", "crime", "noir"],
  surreal: ["surreal", "art-house", "dreamlike"],
  romantic: ["romantic", "cozy", "drama"],
  "dark comedy": ["dark comedy", "surreal", "offbeat"],
};

function hueFromHex(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  const r = parseInt(m[1], 16) / 255;
  const g = parseInt(m[2], 16) / 255;
  const b = parseInt(m[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  if (max === min) h = 0;
  else if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360;
  else if (max === g) h = 60 * ((b - r) / (max - min)) + 120;
  else h = 60 * ((r - g) / (max - min)) + 240;
  return h;
}

export function rankByMood(movies, mood) {
  const wanted = new Set(
    Array.from(mood.descriptors).flatMap((d) => TAG_MAP[d] ?? [d])
  );
  const hues = Array.from(mood.colors)
    .map(hueFromHex)
    .filter((v) => v != null);

  return movies
    .map((m) => {
      let score = 0;

      // descriptor overlap
      const overlap = m.tags.filter((t) => wanted.has(t)).length;
      score += overlap * 1.5;

      // color proximity (avg hue distance)
      if (hues.length && typeof m.hue === "number") {
        const dists = hues.map((h) => {
          const diff = Math.abs(h - m.hue);
          return Math.min(diff, 360 - diff);
        });
        const avg = dists.reduce((a, b) => a + b, 0) / dists.length;
        score += (1 - avg / 180) * 1.2;
      }

      // intensity & pacing similarity
      if (typeof m.edge === "number")  score += (1 - Math.abs(m.edge - mood.intensity)) * 1.0;
      if (typeof m.tempo === "number") score += (1 - Math.abs(m.tempo - mood.pacing)) * 1.0;

      return { ...m, _score: score };
    })
    .sort((a, b) => b._score - a._score);
}
