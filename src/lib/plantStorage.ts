// src/lib/plantStorage.ts
import { Plant } from "./plantData";

const STORAGE_KEY = "leaftwin-planted";

export function getPlantedPlants(): Plant[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addPlantedPlant(plant: Omit<Plant, "id">): Plant {
  const planted = getPlantedPlants();
  const newPlant: Plant = {
    ...plant,
    id: Date.now().toString(), // simple unique id
  };
  planted.push(newPlant);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(planted));
  return newPlant;
}