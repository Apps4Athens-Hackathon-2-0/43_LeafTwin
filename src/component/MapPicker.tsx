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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;
    if (mapRef.current) return; // Initialize map only once

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [23.7275, 37.9838], // Athens
      zoom: 12,
    });

    mapRef.current = map;

    // Create marker instance
    const marker = new mapboxgl.Marker({ 
      color: "#16A34A",
      draggable: false 
    });
    markerRef.current = marker;

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      
      // Set marker position and add to map
      marker.setLngLat([lng, lat]).addTo(map);
      
      // Call the callback
      onLocationSelect({ lng, lat });
    });

    return () => {
      marker.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Empty dependency array - map initializes once

  // Handle callback changes without reinitializing map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      const marker = markerRef.current;
      
      if (marker) {
        marker.setLngLat([lng, lat]).addTo(map);
      }
      
      onLocationSelect({ lng, lat });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [onLocationSelect]);

  return (
    <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}