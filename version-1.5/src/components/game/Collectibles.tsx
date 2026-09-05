"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";

function CollectibleToken({
  id,
  name,
  description,
  icon,
  position,
  found,
}: {
  id: string;
  name: string;
  description: string;
  icon: string;
  position: [number, number, number];
  found: boolean;
}) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [justCollected, setJustCollected] = useState(false);
  const collectItem = useGameStore((s) => s.collectItem);
  const { playClick } = useSound();

  useFrame(() => {
    if (!ref.current || found) return;
    // Float and rotate
    ref.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.15;
    ref.current.rotation.y += 0.02;
  });

  const handleCollect = useCallback(() => {
    if (found || justCollected) return;
    playClick();
    setJustCollected(true);
    collectItem(id);
    setTimeout(() => setJustCollected(false), 1000);
  }, [found, justCollected, collectItem, id, playClick]);

  if (found && !justCollected) return null;

  return (
    <group
      ref={ref}
      position={position}
      onClick={handleCollect}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      scale={justCollected ? [2, 2, 2] : hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      {/* Glowing orb */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#f0cb7c"
          emissive="#f0cb7c"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#f0cb7c" transparent opacity={hovered ? 0.2 : 0.1} />
      </mesh>
      {/* Point light */}
      <pointLight color="#f0cb7c" intensity={hovered ? 1 : 0.3} distance={3} />

      {/* Hover label */}
      {hovered && (
        <Html position={[0, 0.6, 0]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div className="bg-wood-900/90 backdrop-blur-sm text-cream-50 px-3 py-1.5 rounded-lg text-center whitespace-nowrap shadow-lg">
            <div className="text-lg mb-0.5">{icon}</div>
            <div className="text-xs font-medium">{name}</div>
            <div className="text-[10px] text-wood-300">Click to collect</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function AllCollectibles() {
  const collectibles = useGameStore((s) => s.collectibles);
  const currentRoom = useGameStore((s) => s.currentRoom);

  // Only show collectibles for the current room (island shows all outdoor ones)
  const visibleCollectibles = collectibles.filter((c) => {
    if (currentRoom === "island") return c.room === "island";
    return c.room === currentRoom;
  });

  return (
    <group>
      {visibleCollectibles.map((c) => (
        <CollectibleToken key={c.id} {...c} />
      ))}
    </group>
  );
}
