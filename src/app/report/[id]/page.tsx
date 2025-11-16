// src/app/report/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPlantById } from "@/lib/plantData";

export default function ReportPage() {
  const { id } = useParams();
  const router = useRouter();
  const plant = getPlantById(id as string);
  const [health, setHealth] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!plant) return <div>Φυτό δεν βρέθηκε</div>;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitReport = () => {
    setUploading(true);
    // Save to localStorage (or API)
    const reports = JSON.parse(localStorage.getItem("plant-reports") || "[]");
    reports.push({
      plantId: id,
      health,
      notes,
      photo,
      date: new Date().toISOString(),
    });
    localStorage.setItem("plant-reports", JSON.stringify(reports));
    setTimeout(() => {
      setUploading(false);
      alert("Η αναφορά σου στάλθηκε! Ευχαριστούμε!");
      router.push(`/plant/${id}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">
          Αναφορά για: {plant.name}
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Κατάσταση Υγείας
            </label>
            <select
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Επιλέξτε...</option>
              <option value="healthy">Υγιές</option>
              <option value="warning">Προσοχή</option>
              <option value="critical">Κρίσιμο</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Σχόλια
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg"
              placeholder="Π.χ. Τα φύλλα κιτρινίζουν..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Φωτογραφία
            </label>
            <input type="file" accept="image/*" onChange={handlePhoto} className="block w-full" />
            {photo && (
              <img src={photo} alt="Upload" className="mt-3 w-full h-48 object-cover rounded-lg" />
            )}
          </div>

          <button
            onClick={submitReport}
            disabled={!health || uploading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Αποστολή..." : "Υποβολή Αναφοράς"}
          </button>
        </div>
      </div>
    </div>
  );
}