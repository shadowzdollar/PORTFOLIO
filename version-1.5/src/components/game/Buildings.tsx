"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore, RoomId } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";

/* ═══════════════════════════════════════════════════
   INTERACTIVE DOOR — click to enter building
   ═══════════════════════════════════════════════════ */
function Door({
  position,
  rotation = [0, 0, 0],
  label,
  roomId,
  color = "#5C4A1E",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  label: string;
  roomId: RoomId;
  color?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const enterRoom = useGameStore((s) => s.enterRoom);
  const { playClick } = useSound();
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (glowRef.current && hovered) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(Date.now() * 0.005) * 0.15;
    }
  });

  const handleClick = useCallback(() => {
    playClick();
    // Exit pointer lock before transitioning
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    enterRoom(roomId);
  }, [enterRoom, roomId, playClick]);

  return (
    <group position={position} rotation={rotation}>
      {/* Door frame */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 2.4, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, 0, 0.08]} castShadow>
        <boxGeometry args={[1.2, 2.0, 0.08]} />
        <meshStandardMaterial color={hovered ? "#8B6914" : "#6B4F12"} roughness={0.75} />
      </mesh>
      {/* Door handle */}
      <mesh position={[0.4, 0, 0.15]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Hover glow */}
      {hovered && (
        <mesh ref={glowRef} position={[0, 0, 0.12]}>
          <boxGeometry args={[1.8, 2.6, 0.02]} />
          <meshBasicMaterial color="#f0cb7c" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Hover label */}
      {hovered && (
        <Html position={[0, 1.8, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="bg-cream-50/95 backdrop-blur-md border border-wood-200 rounded-lg px-4 py-2 shadow-wood whitespace-nowrap">
            <div className="font-serif font-bold text-wood-900 text-sm">Enter {label}</div>
            <div className="text-wood-500 text-xs">Click to explore</div>
          </div>
        </Html>
      )}

      {/* Clickable area */}
      <mesh
        position={[0, 0, 0.2]}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[1.8, 2.6, 0.3]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   WORKSHOP BUILDING
   ═══════════════════════════════════════════════════ */
export function Workshop() {
  return (
    <group position={[0, 0, 5]}>
      {/* Walls */}
      <mesh position={[0, 1.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[6, 3, 0.2]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.85} />
      </mesh>
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#d4b896" roughness={0.85} />
      </mesh>
      <mesh position={[3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#d4b896" roughness={0.85} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[6.6, 0.2, 4.6]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      {/* Chimney */}
      <mesh position={[2, 4, -1]} castShadow>
        <boxGeometry args={[0.6, 1.5, 0.6]} />
        <meshStandardMaterial color="#8a7060" roughness={0.9} />
      </mesh>
      {/* Door */}
      <Door position={[0, 1.2, 2.1]} label="Workshop" roomId="workshop" />
      {/* Sign */}
      <Html position={[0, 3.5, 2.2]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="bg-wood-800/90 text-cream-50 px-3 py-1 rounded font-serif text-sm whitespace-nowrap">
          🔨 Workshop
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   LIBRARY BUILDING
   ═══════════════════════════════════════════════════ */
export function Library() {
  return (
    <group position={[-10, 0, -5]}>
      {/* Stone walls */}
      <mesh position={[0, 2, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 0.25]} />
        <meshStandardMaterial color="#9a9080" roughness={0.95} />
      </mesh>
      <mesh position={[-2.5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 0.25]} />
        <meshStandardMaterial color="#a09888" roughness={0.95} />
      </mesh>
      <mesh position={[2.5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 0.25]} />
        <meshStandardMaterial color="#a09888" roughness={0.95} />
      </mesh>
      {/* Peaked roof */}
      <mesh position={[0, 4.5, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#6B4F12" roughness={0.85} />
      </mesh>
      <Door position={[0, 1.2, 2.6]} label="Library" roomId="library" color="#5C4A1E" />
      <Html position={[0, 5.2, 2.6]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="bg-wood-800/90 text-cream-50 px-3 py-1 rounded font-serif text-sm whitespace-nowrap">
          📚 Library
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   LIGHTHOUSE
   ═══════════════════════════════════════════════════ */
export function Lighthouse() {
  const lightRef = useRef<THREE.SpotLight>(null!);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.target.rotation.y += 0.02;
    }
  });

  return (
    <group position={[12, 0, -8]}>
      {/* Tower base */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.5, 4, 16]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.85} />
      </mesh>
      {/* Tower mid */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1.2, 3, 16]} />
        <meshStandardMaterial color="#f0e6d6" roughness={0.85} />
      </mesh>
      {/* Tower top */}
      <mesh position={[0, 7.8, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.9, 1.5, 16]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.85} />
      </mesh>
      {/* Lamp room */}
      <mesh position={[0, 8.8, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.8, 16, 1, true]} />
        <meshStandardMaterial color="#f5efe6" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Lamp glow */}
      <mesh position={[0, 8.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffeedd" />
      </mesh>
      {/* Rotating beam */}
      <group position={[0, 8.8, 0]}>
        <spotLight
          ref={lightRef as any}
          color="#ffeebb"
          intensity={2}
          distance={40}
          angle={0.3}
          penumbra={0.5}
        />
      </group>
      {/* Stripes */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[1.22, 1.52, 0.5, 16]} />
        <meshStandardMaterial color="#cc3333" roughness={0.8} />
      </mesh>
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[0.92, 1.22, 0.5, 16]} />
        <meshStandardMaterial color="#cc3333" roughness={0.8} />
      </mesh>
      {/* Door */}
      <Door position={[0, 1.2, 1.6]} label="Lighthouse" roomId="lighthouse" color="#5C4A1E" />
      <Html position={[0, 9.8, 0]} center distanceFactor={15} style={{ pointerEvents: "none" }}>
        <div className="bg-wood-800/90 text-cream-50 px-3 py-1 rounded font-serif text-sm whitespace-nowrap">
          🏠 Lighthouse
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   GARDEN — open area with trellis
   ═══════════════════════════════════════════════════ */
export function Garden() {
  return (
    <group position={[-5, 0, -10]}>
      {/* Garden arch / trellis */}
      <mesh position={[0, 2, 0]} castShadow>
        <torusGeometry args={[2, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.8} />
      </mesh>
      {/* Garden gate */}
      <Door position={[0, 1.2, 0.1]} label="Garden" roomId="garden" color="#5C4A1E" />
      {/* Stone path markers */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 1.5]} receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 8]} />
          <meshStandardMaterial color="#b0a090" roughness={0.95} />
        </mesh>
      ))}
      <Html position={[0, 3.5, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="bg-wood-800/90 text-cream-50 px-3 py-1 rounded font-serif text-sm whitespace-nowrap">
          🌿 Garden
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   CAVE — dark entrance
   ═══════════════════════════════════════════════════ */
export function Cave() {
  return (
    <group position={[0, 0, -15]}>
      {/* Rock formations around entrance */}
      <mesh position={[-1.5, 1, 0]} castShadow rotation={[0, 0, 0.2]}>
        <coneGeometry args={[1, 2.5, 6]} />
        <meshStandardMaterial color="#6a6058" roughness={0.95} />
      </mesh>
      <mesh position={[1.5, 0.8, 0]} castShadow rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.8, 2, 6]} />
        <meshStandardMaterial color="#7a7068" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.5, -0.5]} castShadow>
        <sphereGeometry args={[2, 8, 6]} />
        <meshStandardMaterial color="#5a5048" roughness={0.98} />
      </mesh>
      {/* Dark entrance */}
      <mesh position={[0, 1, 0.5]}>
        <boxGeometry args={[2, 2.2, 0.3]} />
        <meshStandardMaterial color="#1a1510" roughness={1} />
      </mesh>
      <Door position={[0, 1.1, 0.7]} label="Cave" roomId="cave" color="#3a3028" />
      <Html position={[0, 3, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="bg-wood-800/90 text-cream-50 px-3 py-1 rounded font-serif text-sm whitespace-nowrap">
          🕳️ Cave
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   DOCKS — wooden pier extending into water
   ═══════════════════════════════════════════════════ */
export function Docks() {
  return (
    <group position={[10, -0.1, 10]}>
      {/* Pier planks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 1.2]} receiveShadow castShadow>
          <boxGeometry args={[3, 0.08, 1.0]} />
          <meshStandardMaterial color="#8B6914" roughness={0.8} />
        </mesh>
      ))}
      {/* Support posts */}
      {[-1.2, 1.2].map((x) =>
        [0, 3, 6, 9].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.5, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
            <meshStandardMaterial color="#6B4F12" roughness={0.85} />
          </mesh>
        ))
      )}
      {/* Rope railing */}
      <mesh position={[-1.3, 0.4, 4.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.03, 0.03, 9]} />
        <meshStandardMaterial color="#c9a060" roughness={0.9} />
      </mesh>
      <mesh position={[1.3, 0.4, 4.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.03, 0.03, 9]} />
        <meshStandardMaterial color="#c9a060" roughness={0.9} />
      </mesh>
      {/* Mailbox */}
      <mesh position={[1.5, 0.6, 1]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.3]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      <mesh position={[1.5, 0.2, 1]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#5C4A1E" roughness={0.8} />
      </mesh>
      <Html position={[1.5, 1.2, 1]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div className="bg-cream-50/90 border border-wood-200 rounded px-2 py-1 text-xs text-wood-700 whitespace-nowrap shadow-sm">
          📬 Contact
        </div>
      </Html>
    </group>
  );
}
