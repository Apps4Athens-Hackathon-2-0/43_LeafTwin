// src/app/shop/page.tsx
"use client";

import Link from "next/link";

const rewards = [
  { id: 1, name: "Κουπόνι Καφέ", points: 100, icon: "☕" },
  { id: 2, name: "Δωρεάν Φυτό", points: 300, icon: "🌱" },
  { id: 3, name: "T-Shirt LeafTwin", points: 500, icon: "👕" },
];

export default function ShopPage() {
  const userPoints = 250; // From profile

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <Link href="/profile" className="text-green-600 hover:underline">← Πίσω στο Προφίλ</Link>
      </header>

      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Κατάστημα Ανταμοιβών</h1>
        <p className="text-lg text-gray-700 mb-8">Έχετε <strong>{userPoints} πόντους</strong></p>

        <div className="grid md:grid-cols-3 gap-6">
          {rewards.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-6xl mb-4">{r.icon}</div>
              <h3 className="text-xl font-bold text-green-800">{r.name}</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">{r.points} π.</p>
              <button
                disabled={userPoints < r.points}
                className={`mt-4 w-full py-2 rounded-lg font-bold ${
                  userPoints >= r.points
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {userPoints >= r.points ? "Εξαργύρωση" : "Ανεπαρκείς πόντοι"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}