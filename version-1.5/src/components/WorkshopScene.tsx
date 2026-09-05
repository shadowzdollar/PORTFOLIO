"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "./InteractiveObject";
import AmbientParticles from "./AmbientParticles";
import GLBErrorBoundary from "./GLBErrorBoundary";
import { useTimeOfDay } from "./TimeOfDay";
import {
  WoodenShelf,
  BookRow,
  WallFrame,
  PottedPlant,
  CorkBoard,
  FloorLamp,
  WallClock,
  WorkshopRug,
  SideTable,
} from "./EnvironmentDetails";

/* ═══════════════════════════════════════════════════
   TIME-AWARE LIGHTING — adjusts to real clock
   ═══════════════════════════════════════════════════ */
function TimeLighting() {
  const time = useTimeOfDay();
  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);

  useFrame(() => {
    if (dirLightRef.current) {
      dirLightRef.current.color.set(time.sunColor);
      dirLightRef.current.intensity = time.sunIntensity;
      dirLightRef.current.position.set(...time.sunPosition);
    }
    if (ambientRef.current) {
      ambientRef.current.color.set(time.ambientColor);
      ambientRef.current.intensity = time.ambientIntensity;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.35} color="#ffffff" />
      <directionalLight
        ref={dirLightRef}
        position={[5, 8, 5]}
        intensity={1.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <pointLight position={[-5, 5, 2]} intensity={0.4} color="#ffeedd" />
      <pointLight position={[5, 5, -2]} intensity={0.3} color="#fff5e6" />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   TIME-AWARE FOG
   ═══════════════════════════════════════════════════ */
function TimeFog() {
  const time = useTimeOfDay();
  return <fog attach="fog" args={[time.fogColor, time.fogNear, time.fogFar]} />;
}

/* ═══════════════════════════════════════════════════
   SCROLL CAMERA
   ═══════════════════════════════════════════════════ */
function ScrollCamera({ roomIndex }: { roomIndex: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 4, 8));
  const targetLook = useRef(new THREE.Vector3(0, 1, 0));

  const roomConfigs = [
    { pos: new THREE.Vector3(0, 4, 8), look: new THREE.Vector3(0, 1, 0) },
    { pos: new THREE.Vector3(0, 2.5, 5), look: new THREE.Vector3(0, 0.5, 0) },
    { pos: new THREE.Vector3(-5, 3, 3), look: new THREE.Vector3(-5, 2, -2) },
    { pos: new THREE.Vector3(5, 3, 3), look: new THREE.Vector3(5, 1.5, -2) },
    { pos: new THREE.Vector3(0, 2, -2), look: new THREE.Vector3(0, 1, -3.5) },
  ];

  useEffect(() => {
    const config = roomConfigs[Math.min(roomIndex, roomConfigs.length - 1)];
    targetPos.current.copy(config.pos);
    targetLook.current.copy(config.look);
  }, [roomIndex]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPos.current, delta * 2);
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    currentLook.add(camera.position);
    currentLook.lerp(targetLook.current, delta * 2);
    camera.lookAt(currentLook);
  });

  return null;
}

/* ═══════════════════════════════════════════════════
   ROOM MARKER
   ═══════════════════════════════════════════════════ */
function RoomMarker({
  position,
  color = "#be8a55",
}: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN DESK
   ═══════════════════════════════════════════════════ */
function MainDesk() {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.15, 3]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} metalness={0.05} />
      </mesh>
      {[[-2.6, -0.7, -1.2], [2.6, -0.7, -1.2], [-2.6, -0.7, 1.2], [2.6, -0.7, 1.2]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.2, 1.2, 0.2]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[1.8, -0.25, 0]} castShadow>
        <boxGeometry args={[1.2, 0.4, 2.6]} />
        <meshStandardMaterial color="#7d5a24" roughness={0.75} />
      </mesh>
      <mesh position={[1.8, -0.25, 1.32]}>
        <boxGeometry args={[0.3, 0.04, 0.04]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   ROOM
   ═══════════════════════════════════════════════════ */
function WorkshopRoom() {
  return (
    <group>
      <mesh position={[0, 3, -4]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#f5efe6" roughness={0.9} />
      </mesh>
      <mesh position={[-8, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#efe5d4" roughness={0.9} />
      </mesh>
      <mesh position={[8, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#efe5d4" roughness={0.9} />
      </mesh>
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#faf6f1" roughness={1} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   FULL SCENE
   ═══════════════════════════════════════════════════ */
function FullScene({ roomIndex }: { roomIndex: number }) {
  const time = useTimeOfDay();

  return (
    <>
      <TimeLighting />
      <TimeFog />
      <Environment preset="apartment" />
      <ScrollCamera roomIndex={roomIndex} />

      <WorkshopRoom />

      <RoomMarker position={[0, 5, 0]} color="#be8a55" />
      <RoomMarker position={[0, 3, 0]} color="#4a7c59" />
      <RoomMarker position={[-5, 4, -2]} color="#8B4513" />
      <RoomMarker position={[5, 4, -2]} color="#6B4226" />
      <RoomMarker position={[0, 3, -3]} color="#b85c38" />

      {/* ═══ AREA 1: DESK ═══ */}
      <MainDesk />

      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/laptop.glb" position={[0, 0.15, -0.3]} scale={0.5} name="Laptop" description="My trusty development machine. Where all the code magic happens." tags={["React", "Next.js", "TypeScript"]} link="#projects" />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/keyboard.glb" position={[0, 0.15, 0.5]} scale={0.4} name="Mechanical Keyboard" description="Cherry MX Blues — every keystroke a tiny celebration." tags={["Tools"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/mouse.glb" position={[1.3, 0.12, 0.5]} scale={0.4} name="Mouse" description="Precision instrument for navigating the digital workshop." tags={["Tools"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/lamp.glb" position={[-2.2, 0.1, -0.5]} scale={0.5} name="Desk Lamp" description="Warm light for late-night coding sessions." tags={["Atmosphere"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/notebook.glb" position={[-1.3, 0.12, 0.4]} scale={0.35} name="Sketchbook" description="Where wireframes and ideas come to life before touching code." tags={["Design"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/telephone.glb" position={[2.4, 0.12, -0.3]} scale={0.35} name="Vintage Telephone" description="A nod to classic communication." tags={["Nostalgia"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/headphones.glb" position={[-0.9, 0.15, -0.6]} scale={0.3} name="Headphones" description="Lo-fi beats and deep focus." tags={["Focus"]} />
      </GLBErrorBoundary>
      <GLBErrorBoundary>
        <InteractiveObject modelPath="/models/sheets.glb" position={[1.6, 0.12, 0.3]} scale={0.3} name="Design Sheets" description="UI mockups and design explorations." tags={["Design"]} link="#about" />
      </GLBErrorBoundary>

      {/* ═══ AREA 2: LIBRARY ═══ */}
      <group position={[-5, 0, -2]}>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 3, 0.4]} />
          <meshStandardMaterial color="#6B4F12" roughness={0.8} />
        </mesh>
        {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
          <group key={i}>
            <WoodenShelf position={[0, y, 0]} width={2.3} depth={0.35} />
            <BookRow position={[0, y, 0]} count={8 + i} />
          </group>
        ))}
        <InteractiveObject position={[-0.5, 2.1, 0.3]} scale={0.8} name="Three.js Journey" description="The definitive guide to WebGL and 3D on the web." tags={["Three.js", "WebGL"]} color="#d35400" floatIntensity={0} floatSpeed={0} />
        <InteractiveObject position={[0.3, 1.4, 0.3]} scale={0.8} name="Refactoring UI" description="Practical design tips for developers." tags={["Design", "CSS"]} color="#2980b9" floatIntensity={0} floatSpeed={0} />
        <PottedPlant position={[0.9, 2.7, 0.1]} scale={0.8} />
        <FloorLamp position={[-1.5, -1.3, 0.5]} lightOn={time.period === "evening" || time.period === "night" || time.period === "dawn"} />
      </group>

      {/* ═══ AREA 3: GALLERY ═══ */}
      <group position={[5, 0, -2]}>
        <WallFrame position={[0, 2.5, -1.9]} width={1.2} height={0.9} color="#d4a574" />
        <WallFrame position={[-1.5, 2.2, -1.9]} width={0.8} height={0.8} color="#a8d5ba" />
        <WallFrame position={[1.5, 2.8, -1.9]} width={1.0} height={0.7} color="#f5d5c8" />
        <InteractiveObject position={[-1.5, 2.2, -1.7]} scale={0.5} name="E-Commerce Platform" description="Full-stack e-commerce with Stripe." tags={["Next.js", "Stripe"]} link="#projects" floatIntensity={0} floatSpeed={0} />
        <InteractiveObject position={[0, 2.5, -1.7]} scale={0.5} name="3D Experience" description="Interactive WebGL with procedural generation." tags={["Three.js", "WebGL"]} link="#projects" floatIntensity={0} floatSpeed={0} />
        <InteractiveObject position={[1.5, 2.8, -1.7]} scale={0.5} name="Analytics Dashboard" description="Real-time dashboard with D3 visualizations." tags={["D3.js", "React"]} link="#projects" floatIntensity={0} floatSpeed={0} />
        <CorkBoard position={[0, 1.5, -1.9]} />
        <SideTable position={[0, -1.3, -1]} />
        <PottedPlant position={[0, -0.5, -1]} scale={1.2} />
      </group>

      {/* ═══ AREA 4: WORKBENCH ═══ */}
      <group position={[0, 0, -3.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 0.12, 1.2]} />
          <meshStandardMaterial color="#7d5a24" roughness={0.75} />
        </mesh>
        {[[-1.8, -0.65, -0.5], [1.8, -0.65, -0.5], [-1.8, -0.65, 0.5], [1.8, -0.65, 0.5]].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} castShadow>
            <boxGeometry args={[0.15, 1.2, 0.15]} />
            <meshStandardMaterial color="#5C4A1E" roughness={0.8} />
          </mesh>
        ))}
        <GLBErrorBoundary>
          <InteractiveObject modelPath="/models/plant.glb" position={[-1.2, 0.2, 0]} scale={0.5} name="Living Plant" description="Good things take time to grow." tags={["Nature"]} />
        </GLBErrorBoundary>
        <GLBErrorBoundary>
          <InteractiveObject modelPath="/models/headphones.glb" position={[1.2, 0.15, 0]} scale={0.35} name="Studio Headphones" description="Deep flow state." tags={["Focus"]} />
        </GLBErrorBoundary>
        <WoodenShelf position={[0, 1.5, -0.4]} width={3.5} depth={0.35} />
        <InteractiveObject position={[-1, 1.7, -0.3]} scale={0.6} name="Design Toolkit" description="Figma, Framer, Adobe." tags={["Figma", "Design"]} color="#e74c3c" floatIntensity={0} floatSpeed={0} />
        <InteractiveObject position={[0, 1.7, -0.3]} scale={0.6} name="Dev Toolkit" description="VS Code, GitHub, Terminal." tags={["VS Code", "Git"]} color="#2ecc71" floatIntensity={0} floatSpeed={0} />
        <InteractiveObject position={[1, 1.7, -0.3]} scale={0.6} name="AI Companion" description="GitHub Copilot, Claude." tags={["AI", "Copilot"]} color="#9b59b6" floatIntensity={0} floatSpeed={0} />
      </group>

      {/* ═══ AMBIENT ═══ */}
      <WorkshopRug position={[0, -1.28, 0.5]} />
      <WallClock position={[0, 4, -3.95]} />
      <PottedPlant position={[-3, -1.3, 2]} scale={1.5} />
      <PottedPlant position={[3.5, -1.3, 1.5]} scale={1.0} />
      <AmbientParticles count={150} color="#f0cb7c" size={0.025} spread={12} speed={0.15} opacity={0.4} />
      <AmbientParticles count={50} color="#ffeedd" size={0.015} spread={4} speed={0.1} opacity={0.3} />

      <ContactShadows position={[0, -1.29, 0]} opacity={0.3} scale={20} blur={2} far={6} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={3}
        maxDistance={18}
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════════ */
function SceneLoader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#be8a55" wireframe />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   EXPORTED CANVAS
   ═══════════════════════════════════════════════════ */
export default function WorkshopCanvas({ roomIndex = 0 }: { roomIndex?: number }) {
  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 4, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={<SceneLoader />}>
          <FullScene roomIndex={roomIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
}
