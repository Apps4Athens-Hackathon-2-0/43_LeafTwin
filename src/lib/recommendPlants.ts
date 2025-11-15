// src/lib/recommendPlants.ts
const greekPlants = [
    { name: "Λεβάντα (Lavender)", drought: 5, sun: 5, soil: "Sandy" },
    { name: "Δεντρολίβανο (Rosemary)", drought: 4, sun: 5, soil: "Sandy" },
    { name: "Ελιά (Olive Tree)", drought: 5, sun: 5, soil: "Loam" },
    { name: "Μυρτιά (Myrtle)", drought: 4, sun: 4, soil: "Loam" },
    { name: "Θυμάρι (Thyme)", drought: 5, sun: 5, soil: "Sandy" },
  ];
  
  export async function recommendPlants(lat: number, lng: number): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 800)); // fake API delay
  
    const isCoastal = lat < 38.5;
    const isHot = lat > 37;
  
    return greekPlants
      .filter((p) => p.drought >= (isCoastal ? 3 : 4))
      .filter((p) => p.sun >= (isHot ? 5 : 4))
      .slice(0, 3);
  }