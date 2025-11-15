// src/components/PlantTwinCard.tsx
"use client";

import Link from "next/link";
import { Plant } from "@/lib/plantData";

interface Props {
  plant: Plant;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PlantTwinCard({ plant, isSelected, onSelect }: Props) {
  return (
    <Link href={`/plant/${plant.id}`} className="block">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
          isSelected
            ? "border-green-600 bg-green-50 shadow-lg scale-105"
            : "border-gray-200 hover:border-green-400 hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-green-800">{plant.name}</h3>
            <p className="text-xs text-gray-600">{plant.species}</p>
          </div>
          <HealthBadge health={plant.health} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-500">Έδαφος</p>
            <p className="font-medium">{plant.soilMoisture}%</p>
          </div>
          <div>
            <p className="text-gray-500">Πότισμα σε</p>
            <p className={`font-medium ${plant.waterIn === 0 ? "text-red-600" : ""}`}>
              {plant.waterIn === 0 ? "ΣΗΜΕΡΑ!" : `${plant.waterIn} ημ.`}
            </p>
          </div>
        </div>

        <button className="mt-3 w-full bg-green-600 text-white py-1.5 rounded text-xs font-medium hover:bg-green-700 transition">
          Προβολή 3D Δίδυμου
        </button>
      </div>
    </Link>
  );
}

function HealthBadge({ health }: { health: Plant["health"] }) {
  const colors = {
    healthy: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };
  const labels = {
    healthy: "Υγιές",
    warning: "Προσοχή",
    critical: "Κρίσιμο",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${colors[health]}`}>
      {labels[health]}
    </span>
  );
}