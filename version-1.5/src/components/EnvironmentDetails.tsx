"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Wooden Shelf ─── */
export function WoodenShelf({
  position,
  width = 3,
  depth = 0.4,
}: {
  position: [number, number, number];
  width?: number;
  depth?: number;
}) {
  return (
    <group position={position}>
      {/* Shelf board */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.08, depth]} />
        <meshStandardMaterial color="#8B6914" roughness={0.75} />
      </mesh>
      {/* Brackets */}
      <mesh position={[-width / 2 + 0.15, -0.15, depth / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.06]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.8} />
      </mesh>
      <mesh position={[width / 2 - 0.15, -0.15, depth / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.06]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Books on shelf ─── */
export function BookRow({
  position,
  count = 8,
}: {
  position: [number, number, number];
  count?: number;
}) {
  const bookColors = [
    "#8B4513", "#A0522D", "#CD853F", "#D2691E",
    "#B8860B", "#DAA520", "#BC8F8F", "#C4A484",
    "#6B4226", "#8B6914", "#704214", "#966F33",
  ];

  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const height = 0.3 + Math.random() * 0.15;
        const width = 0.04 + Math.random() * 0.03;
        return (
          <mesh
            key={i}
            position={[i * 0.12 - (count * 0.12) / 2, height / 2, 0]}
            castShadow
          >
            <boxGeometry args={[width, height, 0.25]} />
            <meshStandardMaterial
              color={bookColors[i % bookColors.length]}
              roughness={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Wall Frame / Picture ─── */
export function WallFrame({
  position,
  rotation = [0, 0, 0],
  width = 0.8,
  height = 0.6,
  color = "#d4a574",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.7} />
      </mesh>
      {/* Inner canvas */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[width - 0.08, height - 0.08, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Potted Plant ─── */
export function PottedPlant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.24, 16]} />
        <meshStandardMaterial color="#b85c38" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
        <meshStandardMaterial color="#3d2817" roughness={1} />
      </mesh>
      {/* Leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 5) * Math.PI * 2) * 0.08,
            0.35 + Math.random() * 0.1,
            Math.cos((i / 5) * Math.PI * 2) * 0.08,
          ]}
          rotation={[
            Math.random() * 0.5 - 0.25,
            (i / 5) * Math.PI * 2,
            Math.random() * 0.3,
          ]}
          castShadow
        >
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Cork Board / Pin Board ─── */
export function CorkBoard({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const noteColors = ["#fff3cd", "#d4edda", "#cce5ff", "#f8d7da", "#e2d5f1"];

  return (
    <group position={position} rotation={rotation}>
      {/* Board */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.0, 0.05]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.95} />
      </mesh>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[1.55, 1.05, 0.03]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.7} />
      </mesh>
      {/* Pinned notes */}
      {noteColors.map((color, i) => (
        <group key={i}>
          <mesh
            position={[
              (i % 3 - 1) * 0.4 + Math.random() * 0.1,
              (Math.floor(i / 3) - 0.5) * 0.35 + Math.random() * 0.05,
              0.03,
            ]}
            rotation={[0, 0, (Math.random() - 0.5) * 0.15]}
          >
            <boxGeometry args={[0.25, 0.25, 0.005]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
          {/* Pin */}
          <mesh
            position={[
              (i % 3 - 1) * 0.4 + Math.random() * 0.1,
              (Math.floor(i / 3) - 0.5) * 0.35 + Math.random() * 0.05 + 0.12,
              0.04,
            ]}
          >
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#cc3333" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Floor Lamp ─── */
export function FloorLamp({
  position,
  lightOn = true,
}: {
  position: [number, number, number];
  lightOn?: boolean;
}) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(() => {
    if (lightRef.current) {
      // Subtle flicker
      lightRef.current.intensity = lightOn
        ? 0.8 + Math.sin(Date.now() * 0.005) * 0.05
        : 0;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 0.3, 16, 1, true]} />
        <meshStandardMaterial
          color="#f5e6d0"
          roughness={0.9}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Bulb glow */}
      {lightOn && (
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ffeedd" />
        </mesh>
      )}
      {/* Point light */}
      <pointLight
        ref={lightRef}
        position={[0, 1.4, 0]}
        intensity={lightOn ? 0.8 : 0}
        color="#ffeedd"
        distance={6}
        decay={2}
        castShadow
      />
    </group>
  );
}

/* ─── Wall Clock ─── */
export function WallClock({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Clock face */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.03, 32]} />
        <meshStandardMaterial color="#f5efe6" roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh>
        <torusGeometry args={[0.25, 0.02, 8, 32]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

/* ─── Workshop Rug ─── */
export function WorkshopRug({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial color="#8B4513" roughness={0.95} />
    </mesh>
  );
}

/* ─── Workbench / Side Table ─── */
export function SideTable({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Top */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.06, 0.5]} />
        <meshStandardMaterial color="#a0742e" roughness={0.75} />
      </mesh>
      {/* Legs */}
      {[
        [-0.5, 0.35, -0.2],
        [0.5, 0.35, -0.2],
        [-0.5, 0.35, 0.2],
        [0.5, 0.35, 0.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
