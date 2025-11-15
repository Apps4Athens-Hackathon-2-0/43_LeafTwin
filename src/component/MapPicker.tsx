// src/components/MapPicker.tsx
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// This line pulls from .env.local
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

if (!mapboxgl.accessToken) {
  console.error("Mapbox token is missing! Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local");
}

interface MapPickerProps {
  onLocationSelect: (loc: { lng: number; lat: number }) => void;
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [23.7275, 37.9838], // Athens
      zoom: 12,
    });

    const marker = new mapboxgl.Marker({ color: "#16A34A" });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]).addTo(map);
      onLocationSelect({ lng, lat });
    });

    return () => map.remove();
  }, [onLocationSelect]);

  return (
    <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}