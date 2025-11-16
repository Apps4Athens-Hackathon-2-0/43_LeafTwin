// src/components/NavMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <LeafLogo />
          <div>
            <h1 className="text-2xl font-bold">LeafTwin</h1>
            <p className="text-xs opacity-80">Έξυπνα φυτά για έξυπνες πόλεις</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isActive("/")
                ? "bg-green-700 text-white"
                : "hover:bg-green-500"
            }`}
          >
            Σύσταση Φυτών
          </Link>
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isActive("/dashboard")
                ? "bg-green-700 text-white"
                : "hover:bg-green-500"
            }`}
          >
            Ψηφιακοί Δίδυμοι
          </Link>
          <Link
            href="/profile"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isActive("/profile")
                ? "bg-green-700 text-white"
                : "hover:bg-green-500"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/about"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isActive("/about")
                ? "bg-green-700 text-white"
                : "hover:bg-green-500"
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

// Leaf Logo
function LeafLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40">
      <path d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 10c-3 0-5 3-5 7 0 2 1 4 3 5 1-1 2-3 2-5 0-4-2-7-5-7z" fill="currentColor"/>
      <path d="M20 18v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}