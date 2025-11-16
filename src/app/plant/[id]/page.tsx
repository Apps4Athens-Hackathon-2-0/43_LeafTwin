// src/app/plant/[id]/page.tsx
"use client";

import { use, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { getPlantById, type Plant } from "@/lib/plantData";

// Dynamically import Plant3DModel to avoid SSR issues with Three.js
const Plant3DModel = dynamic(() => import("@/component/Plant3DModel"), {
  ssr: false,
  loading: () => (
    <div className="h-80 rounded-xl bg-gradient-to-b from-sky-100 to-sky-50 flex items-center justify-center">
      <p className="text-gray-500">Φόρτωση 3D μοντέλου...</p>
    </div>
  ),
});

export default function PlantPage({ params }: { params: Promise<{ id: string }> }) {
  // UNWRAP params
  const { id } = use(params);
  
  // State for plant data
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [plantUrl, setPlantUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Load plant data
  useEffect(() => {
    async function loadPlant() {
      try {
        const plantData = await getPlantById(id);
        setPlant(plantData);
      } catch (error) {
        console.error("Error loading plant:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPlant();
  }, [id]);

  // Set URL only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPlantUrl(`${window.location.origin}/plant/${id}`);
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Φόρτωση φυτού...</div>;
  }

  if (!plant) {
    return <div className="p-6 text-center">Το φυτό δεν βρέθηκε</div>;
  }

  // === DOWNLOAD FUNCTIONS ===
  const downloadPNG = async () => {
    if (!qrRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(qrRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = `${plant.name}-QR.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("PNG download error:", err);
      alert("Σφάλμα κατά τη λήψη PNG");
    } finally {
      setDownloading(false);
    }
  };

  const downloadPDF = async () => {
    if (!qrRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(qrRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(img, "PNG", 10, 10, width - 20, height);
      pdf.setFontSize(12);
      pdf.text(`Φυτό: ${plant.name}`, 10, height + 20);
      pdf.text(`URL: ${plantUrl}`, 10, height + 30);
      pdf.save(`${plant.name}-QR.pdf`);
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Σφάλμα PDF. Δοκιμάστε PNG.");
    } finally {
      setDownloading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-green-800 mb-4">{plant.name}</h2>
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
              {plantUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <QRCode value={plantUrl} size={180} />
                  <p className="text-xs text-gray-600 mt-2 break-all">{plantUrl}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Φόρτωση URL...</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={downloadPNG}
                disabled={downloading || !plantUrl}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {downloading ? "..." : "PNG"}
              </button>
              <button
                onClick={downloadPDF}
                disabled={downloading || !plantUrl}
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