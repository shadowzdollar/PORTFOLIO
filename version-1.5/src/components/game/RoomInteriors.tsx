"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF, Html } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";
import { useTimeOfDay } from "@/components/TimeOfDay";
import InteractiveObject from "@/components/InteractiveObject";
import GLBErrorBoundary from "@/components/GLBErrorBoundary";
import { BookRow, PottedPlant, WallFrame, CorkBoard, FloorLamp, WallClock } from "@/components/EnvironmentDetails";
import AmbientParticles from "@/components/AmbientParticles";

/* ═══════════════════════════════════════════════════
   EXIT BUTTON — returns to island
   ═══════════════════════════════════════════════════ */
function ExitButton() {
  const exitRoom = useGameStore((s) => s.exitRoom);
  const { playClick } = useSound();

  return (
    <Html center distanceFactor={5} position={[0, 2.5, 2]}>
      <button
        onClick={() => {
          playClick();
          exitRoom();
        }}
        className="bg-cream-50/95 backdrop-blur-md border border-wood-200 shadow-wood rounded-xl px-6 py-3 text-sm font-medium text-wood-700 hover:bg-cream-50 hover:shadow-wood-lg transition-all whitespace-nowrap"
      >
        ← Return to Island
      </button>
    </Html>
  );
}

/* ═══════════════════════════════════════════════════
   ROOM FLOOR + WALLS
   ═══════════════════════════════════════════════════ */
function RoomShell({
  wallColor = "#f5efe6",
  floorColor = "#8B6914",
  size = 8,
}: {
  wallColor?: string;
  floorColor?: string;
  size?: number;
}) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={floorColor} roughness={0.8} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, size / 4, -size / 2]} receiveShadow>
        <planeGeometry args={[size, size / 2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-size / 2, size / 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[size, size / 2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Right wall */}
      <mesh position={[size / 2, size / 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[size, size / 2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   WORKSHOP INTERIOR
   ═══════════════════════════════════════════════════ */
function WorkshopInterior() {
  return (
    <>
      <RoomShell floorColor="#8B6914" wallColor="#f5efe6" />
      {/* Desk */}
      <mesh position={[0, 0.75, -1]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.12, 1.5]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {[[-1.3, 0.37, -0.4], [1.3, 0.37, -0.4], [-1.3, 0.37, 0.4], [1.3, 0.37, 0.4]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.75, 0.08]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
      ))}
      {/* GLB items on desk */}
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/laptop.glb" position={[0, 0.9, -1]} scale={0.35} name="Laptop" description="Where all the code magic happens." tags={["React", "Next.js"]} link="#projects" floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/keyboard.glb" position={[0, 0.88, -0.2]} scale={0.25} name="Keyboard" description="Cherry MX Blues." tags={["Tools"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/lamp.glb" position={[-1, 0.85, -1.2]} scale={0.35} name="Desk Lamp" description="Late night companion." tags={["Atmosphere"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/notebook.glb" position={[1, 0.88, -0.5]} scale={0.25} name="Sketchbook" description="Ideas come to life here." tags={["Design"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/headphones.glb" position={[-0.8, 0.88, 0]} scale={0.2} name="Headphones" description="Lo-fi beats." tags={["Focus"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/mouse.glb" position={[0.8, 0.88, 0.2]} scale={0.25} name="Mouse" description="Precision tool." tags={["Tools"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/telephone.glb" position={[1.2, 0.88, -1]} scale={0.2} name="Vintage Phone" description="Classic communication." tags={["Nostalgia"]} floatIntensity={0} floatSpeed={0} />
      </GLBErrorBoundary>
      {/* Floor lamp */}
      <FloorLamp position={[-2.5, 0, 1]} />
      {/* Exit */}
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   LIBRARY INTERIOR
   ═══════════════════════════════════════════════════ */
function LibraryInterior() {
  return (
    <>
      <RoomShell wallColor="#efe5d4" floorColor="#6B4F12" size={10} />
      {/* Bookshelves on walls */}
      <group position={[-4, 0, 0]}>
        <mesh position={[0, 1.5, -4.8]} castShadow>
          <boxGeometry args={[3, 3, 0.4]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
        {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
          <group key={i}>
            <BookRow position={[0, y, -4.6]} count={10} />
          </group>
        ))}
      </group>
      <group position={[4, 0, 0]}>
        <mesh position={[0, 1.5, -4.8]} castShadow>
          <boxGeometry args={[3, 3, 0.4]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
        {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
          <group key={i}>
            <BookRow position={[0, y, -4.6]} count={10} />
          </group>
        ))}
      </group>
      {/* Reading chair */}
      <InteractiveObject position={[0, 0.4, 0]} scale={0.8} name="Reading Chair" description="A cozy spot for deep reading sessions." tags={["Comfort"]} color="#8B4513" floatIntensity={0} floatSpeed={0} />
      {/* Wall frames */}
      <WallFrame position={[0, 2, -4.9]} width={1.5} height={1} color="#d4a574" />
      <PottedPlant position={[3, 0, -3]} scale={1.2} />
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   LIGHTHOUSE INTERIOR — spiral staircase
   ═══════════════════════════════════════════════════ */
function LighthouseInterior() {
  return (
    <>
      <RoomShell wallColor="#e8ddd0" floorColor="#a09080" size={6} />
      {/* Spiral staircase suggestion */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 8) * Math.PI * 2) * 1.2,
            i * 0.4,
            Math.cos((i / 8) * Math.PI * 2) * 1.2,
          ]}
          castShadow
        >
          <boxGeometry args={[0.8, 0.06, 0.4]} />
          <meshStandardMaterial color="#8B6914" roughness={0.75} />
        </mesh>
      ))}
      {/* Central pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 3.5, 8]} />
        <meshStandardMaterial color="#4a3728" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Window frames */}
      {[0, 1, 2].map((i) => (
        <WallFrame
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 2.8,
            1.5 + i * 0.8,
            Math.sin((i / 3) * Math.PI * 2) * 2.8,
          ]}
          rotation={[0, (i / 3) * Math.PI * 2, 0]}
          width={0.6}
          height={0.8}
          color="#87CEEB"
        />
      ))}
      {/* Captain's desk */}
      <mesh position={[0, 0.7, 1.5]} castShadow>
        <boxGeometry args={[1.2, 0.08, 0.6]} />
        <meshStandardMaterial color="#6B4F12" roughness={0.8} />
      </mesh>
      <InteractiveObject position={[0, 0.9, 1.5]} scale={0.3} name="Captain's Log" description="Entry #1: Set sail from localhost to production." tags={["Story"]} floatIntensity={0} floatSpeed={0} />
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   GARDEN INTERIOR — outdoor with plants
   ═══════════════════════════════════════════════════ */
function GardenInterior() {
  return (
    <>
      <RoomShell wallColor="#d4e8c4" floorColor="#5a8a3e" size={12} />
      {/* Flower beds */}
      {Array.from({ length: 20 }).map((_, i) => (
        <PottedPlant
          key={i}
          position={[
            Math.sin(i * 1.3) * 4,
            0,
            Math.cos(i * 1.7) * 4,
          ]}
          scale={0.5 + Math.sin(i * 0.7) * 0.3}
        />
      ))}
      {/* Skill tree — actual tree in center */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 4, 8]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.5, 0]} castShadow>
          <sphereGeometry args={[2, 8, 6]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.85} />
        </mesh>
        <InteractiveObject position={[0, 3, 0.5]} scale={0.4} name="Skill Tree" description="My skills, grown over years of practice." tags={["Growth"]} floatIntensity={0} floatSpeed={0} />
      </group>
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   CAVE INTERIOR — dark, mysterious
   ═══════════════════════════════════════════════════ */
function CaveInterior() {
  return (
    <>
      <RoomShell wallColor="#3a3530" floorColor="#4a4540" size={10} />
      {/* Stalactites */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            2.5,
            (Math.random() - 0.5) * 8,
          ]}
          castShadow
        >
          <coneGeometry args={[0.1 + Math.random() * 0.15, 0.5 + Math.random() * 0.5, 6]} />
          <meshStandardMaterial color="#5a5550" roughness={0.95} />
        </mesh>
      ))}
      {/* Glowing crystals */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 6, 0.3 + Math.random() * 0.5, (Math.random() - 0.5) * 6]}
          castShadow
        >
          <octahedronGeometry args={[0.2 + Math.random() * 0.2, 0]} />
          <meshStandardMaterial
            color={["#9b59b6", "#3498db", "#2ecc71", "#e74c3c", "#f39c12"][i]}
            emissive={["#9b59b6", "#3498db", "#2ecc71", "#e74c3c", "#f39c12"][i]}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      <InteractiveObject position={[0, 0.5, -2]} scale={0.5} name="Abandoned Prototype" description="The project that taught me what NOT to do." tags={["Learning"]} color="#8a4040" floatIntensity={0} floatSpeed={0} />
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   GALLERY INTERIOR — open air pavilion
   ═══════════════════════════════════════════════════ */
function GalleryInterior() {
  return (
    <>
      <RoomShell wallColor="#f0e6d6" floorColor="#c9a96e" size={10} />
      {/* Project display frames */}
      <WallFrame position={[-3, 1.5, -4.8]} width={2} height={1.5} color="#d4a574" />
      <WallFrame position={[0, 1.8, -4.8]} width={2.5} height={1.5} color="#a8d5ba" />
      <WallFrame position={[3, 1.5, -4.8]} width={2} height={1.5} color="#f5d5c8" />
      <InteractiveObject position={[-3, 1.5, -4]} scale={0.5} name="E-Commerce Platform" description="Full-stack with Stripe." tags={["Next.js", "Stripe"]} link="#projects" floatIntensity={0} floatSpeed={0} />
      <InteractiveObject position={[0, 1.8, -4]} scale={0.5} name="3D Experience" description="Interactive WebGL." tags={["Three.js", "WebGL"]} link="#projects" floatIntensity={0} floatSpeed={0} />
      <InteractiveObject position={[3, 1.5, -4]} scale={0.5} name="Analytics Dashboard" description="D3 visualizations." tags={["D3.js", "React"]} link="#projects" floatIntensity={0} floatSpeed={0} />
      <CorkBoard position={[0, 2.5, -4.8]} />
      <PottedPlant position={[-4, 0, -3]} scale={1.5} />
      <PottedPlant position={[4, 0, -3]} scale={1.5} />
      <ExitButton />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   ROOM INTERIOR SCENE
   ═══════════════════════════════════════════════════ */
function InteriorScene({ room }: { room: string }) {
  const time = useTimeOfDay();

  return (
    <>
      <ambientLight intensity={0.4} color={time.ambientColor} />
      <directionalLight position={[2, 4, 3]} intensity={0.8} castShadow />
      <pointLight position={[-2, 3, 2]} intensity={0.3} color="#ffeedd" />
      <Environment preset="apartment" />

      {room === "workshop" && <WorkshopInterior />}
      {room === "library" && <LibraryInterior />}
      {room === "lighthouse" && <LighthouseInterior />}
      {room === "garden" && <GardenInterior />}
      {room === "cave" && <CaveInterior />}
      {room === "gallery" && <GalleryInterior />}

      <ContactShadows position={[0, 0.01, 0]} opacity={0.3} scale={12} blur={2} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2}
        maxDistance={8}
        target={[0, 1, 0]}
      />
      <AmbientParticles count={30} color="#f0cb7c" size={0.02} spread={6} speed={0.1} opacity={0.3} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   EXPORTED
   ═══════════════════════════════════════════════════ */
export default function RoomInterior() {
  const currentRoom = useGameStore((s) => s.currentRoom);

  if (currentRoom === "island") return null;

  return (
    <div className="fixed inset-0 z-30">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 55 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <InteriorScene room={currentRoom} />
        </Suspense>
      </Canvas>
    </div>
  );
}
