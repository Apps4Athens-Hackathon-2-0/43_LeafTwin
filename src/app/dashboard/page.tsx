// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import MapPicker from "@/component/MapPicker";
import PlantTwinCard from "@/component/PlantTwinCard";
import { getAllPlants, type Plant } from "@/lib/plantData";

export default function Dashboard() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlants = async () => {
      const data = await getAllPlants();
      setPlants(data);
      setLoading(false);
    };
    loadPlants();
  }, []);

  const handleMapClick = ({ lng, lat }: { lng: number; lat: number }) => {
    const clicked = plants.find(p => 
      Math.abs(p.location.lng - lng) < 0.001 && 
      Math.abs(p.location.lat - lat) < 0.001
    );
    setSelectedPlant(clicked || null);
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      {loading ? (
        <p className="text-center text-gray-600">Φόρτωση ψηφιακών διδύμων...</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Χάρτης Φυτών</h2>
            <div className="relative h-96 lg:h-full rounded-xl overflow-hidden shadow-lg">
              <MapPicker onLocationSelect={handleMapClick} />
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${plant.mapX}%`, top: `${plant.mapY}%` }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${
                      selectedPlant?.id === plant.id
                        ? "bg-green-600 border-green-800 scale-150"
                        : plant.health === "critical"
                        ? "bg-red-500 border-red-700"
                        : plant.health === "warning"
                        ? "bg-yellow-500 border-yellow-700"
                        : "bg-green-500 border-green-700"
                    }`}
                    title={plant.name}
                    onClick={() => setSelectedPlant(plant)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Plant List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">Ψηφιακοί Δίδυμοι ({plants.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {plants.map((plant) => (
                <PlantTwinCard
                  key={plant.id}
                  plant={plant}
                  isSelected={selectedPlant?.id === plant.id}
                  onSelect={() => setSelectedPlant(plant)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}