// src/components/Plant3DModel.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Plant } from "@/lib/plantData";

interface Plant3DModelProps {
  plant: Plant;
}

export default function Plant3DModel({ plant }: Plant3DModelProps) {
  const healthColor = 
    plant.health === "healthy" ? "#16A34A" :
    plant.health === "warning" ? "#F59E0B" : "#EF4444";

  return (
    <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enablePan={false} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Trunk */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Foliage - changes with health */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color={healthColor} opacity={plant.health === "critical" ? 0.6 : 0.9} transparent />
        </mesh>

        {/* Soil */}
        <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </Canvas>
    </div>
  );
}