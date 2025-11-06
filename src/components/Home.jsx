import { useMemo, useState } from "react";
import MoodControls from "./MoodControls.jsx";
import { MOVIES } from "../data/movies.js";
import { rankByMood, DEFAULT_MOOD } from "../lib/recommend.js";

export default function Home() {
  const [mood, setMood] = useState(DEFAULT_MOOD);

  const ranked = useMemo(() => rankByMood(MOVIES, mood), [mood]);

  return (
    <div>
      <h1 className="mb-2">CineVibe</h1>
      <p className="text-muted">Pick a vibe. Get movies instantly.</p>

      <MoodControls
        mood={mood}
        onChange={(next) => setMood(next)}
      />

      <h2 className="h5 mt-4 mb-3">Recommendations</h2>
      <div className="row g-3">
        {ranked.map((m) => (
          <div className="col-sm-6" key={m.id}>
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-auto">
                  <img
                    src={m.poster}
                    alt={m.title}
                    width="96"
                    height="144"
                    style={{ objectFit: "cover", borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem" }}
                  />
                </div>
                <div className="col">
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title mb-1">{m.title}</h5>
                      <strong className="text-monospace">{m._score.toFixed(2)}</strong>
                    </div>
                    <p className="card-text"><small className="text-muted">{m.tags.join(" · ")}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {ranked.length === 0 && <p>No matches yet.</p>}
      </div>
    </div>
  );
}
