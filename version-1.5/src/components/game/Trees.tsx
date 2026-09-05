"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   PROCEDURAL TREE — generated from seed
   ═══════════════════════════════════════════════════ */
function Tree({
  position,
  height = 3,
  canopyRadius = 1.5,
  trunkColor = "#6B4F12",
  leafColor = "#4a7c59",
  seed = 0,
}: {
  position: [number, number, number];
  height?: number;
  canopyRadius?: number;
  trunkColor?: string;
  leafColor?: string;
  seed?: number;
}) {
  const { trunkGeo, canopyGeo } = useMemo(() => {
    // Slightly randomized trunk
    const tHeight = height * (0.9 + Math.sin(seed * 7.3) * 0.2);
    const tRadius = 0.08 + Math.sin(seed * 3.1) * 0.03;

    const trunk = new THREE.CylinderGeometry(tRadius * 0.7, tRadius, tHeight, 6);

    // Canopy — cluster of spheres
    const canopy = new THREE.SphereGeometry(canopyRadius, 8, 6);

    return { trunkGeo: trunk, canopyGeo: canopy };
  }, [height, canopyRadius, seed]);

  const swayOffset = useMemo(() => Math.sin(seed * 13.7) * 0.1, [seed]);

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]} castShadow geometry={trunkGeo}>
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      {/* Canopy — main */}
      <mesh position={[swayOffset, height + canopyRadius * 0.3, 0]} castShadow geometry={canopyGeo}>
        <meshStandardMaterial color={leafColor} roughness={0.85} />
      </mesh>
      {/* Canopy — extra lumps */}
      <mesh position={[canopyRadius * 0.4 + swayOffset, height + canopyRadius * 0.1, canopyRadius * 0.3]}>
        <sphereGeometry args={[canopyRadius * 0.6, 6, 5]} />
        <meshStandardMaterial color={leafColor} roughness={0.85} />
      </mesh>
      <mesh position={[-canopyRadius * 0.3 + swayOffset, height + canopyRadius * 0.5, -canopyRadius * 0.2]}>
        <sphereGeometry args={[canopyRadius * 0.5, 6, 5]} />
        <meshStandardMaterial color={leafColor} roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   BUSH — small round shrub
   ═══════════════════════════════════════════════════ */
function Bush({
  position,
  radius = 0.5,
  color = "#3d6b4a",
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[radius, 8, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[radius * 0.5, -radius * 0.2, radius * 0.3]} castShadow>
        <sphereGeometry args={[radius * 0.7, 6, 5]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   ROCK — small boulder
   ═══════════════════════════════════════════════════ */
function Rock({
  position,
  scale = 1,
  color = "#8a8070",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color={color} roughness={0.95} flatShading />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   FLOWER — small colorful dot
   ═══════════════════════════════════════════════════ */
function Flower({
  position,
  color = "#e74c3c",
}: {
  position: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 4]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   ALL TREES & FOLIAGE — placed around the island
   ═══════════════════════════════════════════════════ */
export function IslandFoliage() {
  const treePositions: Array<{
    pos: [number, number, number];
    h: number;
    r: number;
    seed: number;
    color?: string;
  }> = useMemo(
    () => [
      // Forest area (back of island)
      { pos: [-6, 0, -3], h: 4, r: 1.8, seed: 1 },
      { pos: [-8, 0, -1], h: 3.5, r: 1.5, seed: 2 },
      { pos: [-7, 0, -6], h: 5, r: 2, seed: 3 },
      { pos: [-9, 0, -4], h: 3, r: 1.3, seed: 4 },
      { pos: [-4, 0, -7], h: 4.5, r: 1.7, seed: 5 },
      // Near workshop
      { pos: [3, 0, 3], h: 3, r: 1.4, seed: 6 },
      { pos: [-3, 0, 7], h: 3.5, r: 1.5, seed: 7 },
      // Near library
      { pos: [-12, 0, -3], h: 4, r: 1.6, seed: 8, color: "#5a8a5e" },
      { pos: [-8, 0, -7], h: 3, r: 1.2, seed: 9 },
      // Scattered
      { pos: [6, 0, -4], h: 3.5, r: 1.4, seed: 10 },
      { pos: [8, 0, 2], h: 2.5, r: 1.1, seed: 11 },
      { pos: [-2, 0, 12], h: 3, r: 1.3, seed: 12 },
      { pos: [4, 0, -8], h: 4, r: 1.6, seed: 13 },
      { pos: [-11, 0, 2], h: 3.5, r: 1.5, seed: 14 },
      { pos: [7, 0, -10], h: 3, r: 1.2, seed: 15 },
      // Beach edge palms
      { pos: [10, 0, 5], h: 5, r: 2, seed: 16, color: "#5a9a5e" },
      { pos: [-12, 0, 8], h: 4.5, r: 1.8, seed: 17, color: "#5a9a5e" },
    ],
    []
  );

  const bushPositions: Array<{ pos: [number, number, number]; r: number; color?: string }> = useMemo(
    () => [
      { pos: [2, 0.2, 6], r: 0.4 },
      { pos: [-1, 0.2, 4], r: 0.5 },
      { pos: [-9, 0.3, -2], r: 0.6, color: "#4a7c59" },
      { pos: [5, 0.2, -3], r: 0.4 },
      { pos: [-3, 0.2, -8], r: 0.5, color: "#3d6b4a" },
      { pos: [8, 0.1, 8], r: 0.3 },
      { pos: [-6, 0.3, -9], r: 0.5 },
      { pos: [1, 0.2, -6], r: 0.4, color: "#5a8a5e" },
    ],
    []
  );

  const flowerColors = ["#e74c3c", "#f39c12", "#9b59b6", "#e91e63", "#ff6b6b", "#feca57"];

  return (
    <group>
      {treePositions.map((t, i) => (
        <Tree key={`tree-${i}`} position={t.pos} height={t.h} canopyRadius={t.r} seed={t.seed} leafColor={t.color} />
      ))}
      {bushPositions.map((b, i) => (
        <Bush key={`bush-${i}`} position={b.pos} radius={b.r} color={b.color} />
      ))}
      {/* Scattered flowers near garden */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Flower
          key={`flower-${i}`}
          position={[
            -5 + Math.sin(i * 2.3) * 4,
            0.15,
            -10 + Math.cos(i * 1.7) * 3,
          ]}
          color={flowerColors[i % flowerColors.length]}
        />
      ))}
      {/* Scattered rocks */}
      <Rock position={[5, 0.15, -6]} scale={0.8} />
      <Rock position={[-8, 0.2, 5]} scale={1.2} />
      <Rock position={[3, 0.1, -10]} scale={0.6} />
      <Rock position={[-4, 0.15, 10]} scale={0.9} />
      <Rock position={[9, 0.1, -3]} scale={0.7} />
    </group>
  );
}
