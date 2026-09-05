"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  speed?: number;
  opacity?: number;
}

export default function AmbientParticles({
  count = 200,
  color = "#f0cb7c",
  size = 0.03,
  spread = 10,
  speed = 0.3,
  opacity = 0.6,
}: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = Math.random() * spread * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      velocities[i * 3] = (Math.random() - 0.5) * speed;
      velocities[i * 3 + 1] = Math.random() * speed * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

      sizes[i] = Math.random() * size + size * 0.5;
    }

    return { positions, velocities, sizes };
  }, [count, spread, speed, size]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Drift upward slowly
      arr[i * 3 + 1] += particles.velocities[i * 3 + 1] * delta;
      // Gentle horizontal sway
      arr[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.001;
      arr[i * 3 + 2] += Math.cos(Date.now() * 0.001 + i * 0.7) * 0.001;

      // Reset particle when it floats too high
      if (arr[i * 3 + 1] > spread * 0.5) {
        arr[i * 3 + 1] = -0.5;
        arr[i * 3] = (Math.random() - 0.5) * spread;
        arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
