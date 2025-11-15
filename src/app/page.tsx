// src/app/page.tsx
"use client";

import { useState } from "react";
import MapPicker from "@/component/MapPicker";
import { recommendPlants } from "@/lib/recommendPlants";

export default function Home() {
  const [location, setLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = async ({ lng, lat }: { lng: number; lat: number }) => {
    setLocation({ lng, lat });
    setLoading(true);
    const recs = await recommendPlants(lat, lng);
    setPlants(recs);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans">
      {/* Header */}

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-800">Pick a Planting Spot</h2>
            <MapPicker onLocationSelect={handleSelect} />
            {location && (
              <p className="mt-3 text-sm text-gray-600">
                Selected: <strong>{location.lng.toFixed(4)}°, {location.lat.toFixed(4)}°</strong>
              </p>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              {location ? "Recommended for This Spot" : "Tap the map to begin"}
            </h2>

            {loading && (
              <p className="text-gray-500 animate-pulse">Analyzing soil, sun, and climate...</p>
            )}

            <div className="space-y-4">
              {plants.map((plant, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md border border-green-100 flex gap-4 hover:shadow-lg transition"
                >
                  <div className="bg-green-100 border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-green-800">{plant.name}</h3>
                    <p className="text-sm text-gray-600">
                      Drought: <span className="text-yellow-600">{'★'.repeat(plant.drought)}</span> | 
                      Sun: <span className="text-orange-500">{'☀'.repeat(plant.sun)}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{plant.soil} soil • Native to Mediterranean</p>
                  </div>
                </div>
              ))}
            </div>

            {plants.length > 0 && (
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
                Export Planting Plan (PDF)
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 LeafTwin • Built for Greek Municipalities • @wisper2009
      </footer>
    </div>
  );
}

// Leaf Logo Component
function LeafLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" className="inline">
      <path d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 10c-3 0-5 3-5 7 0 2 1 4 3 5 1-1 2-3 2-5 0-4-2-7-5-7z" fill="currentColor"/>
      <path d="M20 18v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}