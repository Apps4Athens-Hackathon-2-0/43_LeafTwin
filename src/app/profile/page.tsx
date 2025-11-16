// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Report {
  id: string;
  plantId: string;
  plantName: string;
  photo: string;
  health: string;
  disease?: string;
  points: number;
  date: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "ckontomitros", points: 0 });
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const allReports = JSON.parse(localStorage.getItem("plant-reports") || "[]");
    const userReports = allReports
      .filter((r: any) => r.user === user.name) // Simulate user
      .map((r: any, i: number) => ({
        id: `rep-${i}`,
        plantId: r.plantId,
        plantName: r.plantName || "Άγνωστο Φυτό",
        photo: r.photo,
        health: r.health,
        disease: r.disease,
        points: r.disease ? 50 : 10,
        date: new Date(r.date).toLocaleDateString("el-GR"),
      }));

    const totalPoints = userReports.reduce((sum: number, r: Report) => sum + r.points, 0);
    setReports(userReports);
    setUser(prev => ({ ...prev, points: totalPoints }));
    setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-center">Φόρτωση προφίλ...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      

      <main className="max-w-7xl mx-auto p-6">
        {/* User Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center gap-6">
          <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-3xl font-bold text-green-800">
            W
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800">{user.name}</h2>
            <p className="text-3xl font-bold text-green-600">{user.points} πόντοι</p>
            <p className="text-sm text-gray-600">Συλλέξατε {reports.length} αναφορές</p>
          </div>
          <Link href="/shop" className="ml-auto">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 shadow-md">
              Κατάστημα
            </button>
          </Link>
        </div>

        {/* Reports Grid */}
        <h3 className="text-xl font-bold text-green-800 mb-4">Οι Αναφορές Σας</h3>
        {reports.length === 0 ? (
          <p className="text-center text-gray-600 py-12">Δεν έχετε κάνει αναφορές ακόμα. Ξεκινήστε από το χάρτη!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={report.photo}
                    alt="Plant"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    +{report.points} π.
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-green-800">{report.plantName}</h4>
                  <p className="text-sm text-gray-600">Ημ: {report.date}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Υγεία:</span>{" "}
                    <HealthBadge health={report.health} />
                  </p>
                  {report.disease && (
                    <p className="text-xs mt-1 text-red-600">
                      Ασθένεια: {report.disease}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Reusable Components
function LeafLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" className="text-white">
      <path d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 10c-3 0-5 3-5 7 0 2 1 4 3 5 1-1 2-3 2-5 0-4-2-7-5-7z" fill="currentColor"/>
    </svg>
  );
}

function HealthBadge({ health }: { health: string }) {
  const colors = {
    healthy: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };
  const labels = { healthy: "Υγιές", warning: "Προσοχή", critical: "Κρίσιμο" };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[health] || colors.warning}`}>
      {labels[health] || "Άγνωστο"}
    </span>
  );
}