// src/app/plant/[id]/page.tsx
"use client";

import { use, useRef, useState } from "react";  // ADD: import { use } from "react"
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";
import Plant3DModel from "@/component/Plant3DModel";
import { Plant, getPlantById } from "@/lib/plantData";  // Keep your data fetch

// UPDATE: params is now Promise<{ id: string }>
export default function PlantPage({ params }: { params: Promise<{ id: string }> }) {
  // UNWRAP: Use React.use() to get the resolved params
  const { id } = use(params);  // This unwraps the Promise

  const plant = getPlantById(id);  // Now id is resolved
  const qrRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!plant) return <div>Φυτό δεν βρέθηκε</div>;

  const plantUrl = `${window.location.origin}/plant/${id}`;

  const downloadPNG = async () => {
    setDownloading(true);
    const canvas = await html2canvas(qrRef.current!);
    const link = document.createElement("a");
    link.download = `${id}-QR.png`;
    link.href = canvas.toDataURL();
    link.click();
    setDownloading(false);
  };

  const downloadPDF = async () => {
    setDownloading(true);
    const canvas = await html2canvas(qrRef.current!);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 80, 80);
    pdf.text(`Φυτό: ${id}`, 10, 100);
    pdf.text(`URL: ${plantUrl}`, 10, 110);
    pdf.save(`${id}-QR.pdf`);
    setDownloading(false);
  };
  console.log(plant);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-green-600 text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <LeafLogo />
            <h1 className="text-2xl font-bold">LeafTwin</h1>
          </Link>
          <Link href="/dashboard" className="text-sm underline">Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
        {/* 3D + Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">{id}</h2>
          <Plant3DModel plant={plant} />
          <div className="mt-6 space-y-3">
            <InfoRow label="Είδος" value={plant.species} />
            <InfoRow label="Υγεία" value={<HealthBadge health={plant.health} />} />
            <InfoRow label="Πότισμα σε" value={`${plant.waterIn} ημ.`} />
          </div>
        </div>

        {/* QR + Report */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3">QR Code για το Φυτό</h3>
            <div ref={qrRef} className="bg-white p-6 rounded-xl shadow-md text-center">
              <QRCode value={plantUrl} size={180} />
              <p className="text-xs text-gray-600 mt-2 break-all">{plantUrl}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={downloadPNG}
                disabled={downloading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {downloading ? "..." : "PNG"}
              </button>
              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
              >
                {downloading ? "..." : "PDF"}
              </button>
            </div>
          </div>

          <Link href={`/report/${id}`}>
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700">
              Αναφορά Υγείας + Φωτογραφία
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
  }
// Components
function LeafLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40">
      <path d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 10c-3 0-5 3-5 7 0 2 1 4 3 5 1-1 2-3 2-5 0-4-2-7-5-7z" fill="currentColor"/>
      <path d="M20 18v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function HealthBadge({ health }: { health: Plant["health"] }) {
  const colors = {
    healthy: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[health]}`}>
      {health === "healthy" ? "Υγιές" : health === "warning" ? "Προσοχή" : "Κρίσιμο"}
    </span>
  );
}

function getCareTip(plant: Plant) {
  if (plant.waterIn === 0) return "Ποτίστε ΑΜΕΣΑ! Το φυτό κινδυνεύει.";
  if (plant.soilMoisture < 30) return "Έλεγχος εδάφους. Εξετάστε λίπανση.";
  return "Το φυτό είναι υγιές. Συνεχίστε την καλή φροντίδα!";
}