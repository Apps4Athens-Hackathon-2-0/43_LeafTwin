// src/app/about/page.tsx
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    

      <main className="max-w-4xl mx-auto p-6 space-y-16 py-12">
        {/* Section 1: Το Πρόβλημα / Οι Ανάγκες */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Το Πρόβλημα
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>Οι πόλεις στην Ελλάδα χάνουν τα δέντρα τους.</strong> Η Αθήνα, η Θεσσαλονίκη, τα Χανιά — παντού, τα αστικά δέντρα υποφέρουν από:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>Έλλειψη φροντίδας (κλάδεμα, λίπανση, πότισμα)</li>
              <li>Ασθένειες που δεν εντοπίζονται έγκαιρα</li>
              <li>Κλιματική αλλαγή: καύσωνες, ξηρασία, ακραία καιρικά φαινόμενα</li>
              <li>Έλλειψη δεδομένων: οι δήμοι δεν ξέρουν ποιο δέντρο χρειάζεται τι</li>
              <li>Απουσία εμπλοκής πολιτών: "Δεν είναι δικό μου δέντρο"</li>
            </ul>
            <p className="mt-6 font-medium text-red-600">
              Αποτέλεσμα: Μέχρι το 2030, η Ελλάδα μπορεί να χάσει το 10% των αστικών δέντρων της — και μαζί τους, σκιά, καθαρό αέρα, ψυχική υγεία.
            </p>
          </div>
        </section>

        {/* Section 2: Η Λύση & Η Αξία */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Η Λύση μας: LeafTwin
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>LeafTwin</strong> είναι το <em>ψηφιακό δίδυμο κάθε αστικού δέντρου</em> — χωρίς αισθητήρες, χωρίς κόστος εγκατάστασης.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="font-bold text-xl mb-2">Τι κάνει;</h3>
                <ul className="space-y-2 text-sm">
                  <li>AI προβλέπει πότε να κλαδέψεις, να ποτίσεις, να λιπάνεις</li>
                  <li>Πολίτες ανεβάζουν φωτογραφίες → AI εντοπίζει ασθένειες</li>
                  <li>3D μοντέλο δείχνει την υγεία σε πραγματικό χρόνο</li>
                  <li>QR κωδικός σε κάθε δέντρο → ο καθένας βοηθά</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="font-bold text-xl mb-2">Ποια η αξία;</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Δήμοι:</strong> Εξοικονόμηση 70% σε συντήρηση</li>
                  <li><strong>Πολίτες:</strong> Πόντοι → δώρα (καφές, φυτά, t-shirt)</li>
                  <li><strong>Περιβάλλον:</strong> +20% επιβίωση δέντρων</li>
                  <li><strong>Κοινωνία:</strong> Ενεργοί πολίτες, πράσινη συνείδηση</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-xl font-bold text-center">
              Μια εφαρμογή. Χιλιάδες δέντρα σώζονται. Μια πόλη γίνεται πιο πράσινη.
            </p>
          </div>
        </section>

        {/* Section 3: Η Ομάδα */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Η Ομάδα μας
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
              C
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-green-800">
                Christos Kontomitros
              </h3>
              <p className="text-lg text-gray-700 font-medium">
                Backend Engineer @ t-digital by Deutsche Telekom
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Με πάνω από 5 χρόνια εμπειρία σε cloud systems, AI pipelines και real-time data processing, ο Χρήστος είναι ο εγκέφαλος πίσω από την κλιμακούμενη υποδομή του LeafTwin. Εξασφαλίζει ότι κάθε QR scan, κάθε φωτογραφία και κάθε AI πρόβλεψη φτάνει στον δήμο σε λιγότερο από 1 δευτερόλεπτο.
              </p>
              <p className="mt-2 text-sm text-green-600 font-medium">
                @ckontomitros | Αθήνα, Ελλάδα
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500 italic">
            *Μπορείτε να μας γνωρίσετε και προφορικά στην παρουσίαση!*
          </p>
        </section>
      </main>
    </div>
  );
}

// Reusable Leaf Logo
function LeafLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" className="text-white">
      <path
        d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 10c-3 0-5 3-5 7 0 2 1 4 3 5 1-1 2-3 2-5 0-4-2-7-5-7z"
        fill="currentColor"
      />
    </svg>
  );
}