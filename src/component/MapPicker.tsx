// src/components/MapPicker.tsx
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Plant } from "@/lib/plantData";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

if (!mapboxgl.accessToken) {
  console.error("Mapbox token is missing! Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local");
}

interface MapPickerProps {
  onLocationSelect: (loc: { lng: number; lat: number }) => void;
  plants?: Plant[];
  selectedPlant?: Plant | null;
  onPlantClick?: (plant: Plant) => void;
}

export default function MapPicker({ 
  onLocationSelect, 
  plants = [], 
  selectedPlant,
  onPlantClick 
}: MapPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const plantMarkersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [23.7275, 37.9838], // Athens
      zoom: 12,
    });

    mapRef.current = map;

    const marker = new mapboxgl.Marker({ 
      color: "#16A34A",
      draggable: false 
    });
    markerRef.current = marker;

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]).addTo(map);
      onLocationSelect({ lng, lat });
    });

    return () => {
      // Clean up all markers
      plantMarkersRef.current.forEach(m => m.remove());
      plantMarkersRef.current.clear();
      marker.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update callback handler
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

  // Manage plant markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !plants.length) return;

    // Remove old markers
    plantMarkersRef.current.forEach(m => m.remove());
    plantMarkersRef.current.clear();

    // Add new markers for each plant
    plants.forEach((plant) => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'plant-marker';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid';
      el.style.cursor = 'pointer';
      el.style.transition = 'all 0.2s';
      
      // Set color based on health
      if (plant.health === 'critical') {
        el.style.backgroundColor = '#EF4444';
        el.style.borderColor = '#991B1B';
      } else if (plant.health === 'warning') {
        el.style.backgroundColor = '#EAB308';
        el.style.borderColor = '#854D0E';
      } else {
        el.style.backgroundColor = '#22C55E';
        el.style.borderColor = '#166534';
      }

      // Highlight selected plant
      if (selectedPlant?.id === plant.id) {
        el.style.transform = 'scale(1.5)';
        el.style.backgroundColor = '#16A34A';
        el.style.borderColor = '#166534';
        el.style.boxShadow = '0 0 10px rgba(22, 163, 74, 0.5)';
      }

      el.title = plant.name;

      // Add click handler
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onPlantClick) {
          onPlantClick(plant);
        }
      });

      // Create and add marker
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([plant.location.lng, plant.location.lat])
        .addTo(map);

      plantMarkersRef.current.set(plant.id, marker);
    });

    return () => {
      plantMarkersRef.current.forEach(m => m.remove());
      plantMarkersRef.current.clear();
    };
  }, [plants, selectedPlant, onPlantClick]);

  return (
    <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}