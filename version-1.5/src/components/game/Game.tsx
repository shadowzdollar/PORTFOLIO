"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";
import FirstPersonController from "./FirstPersonController";
import { IslandTerrain, Ocean, Sky } from "./Island";
import { Workshop, Library, Lighthouse, Garden, Cave, Docks } from "./Buildings";
import { IslandFoliage } from "./Trees";
import { AllCollectibles } from "./Collectibles";
import RoomInterior from "./RoomInteriors";
import HUD from "./HUD";
import IslandMap from "./IslandMap";
import Inventory from "./Inventory";
import AmbientParticles from "@/components/AmbientParticles";
import { useTimeOfDay } from "@/components/TimeOfDay";

/* ═══════════════════════════════════════════════════
   LOADING SCREEN
   ═══════════════════════════════════════════════════ */
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[100] bg-wood-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-bounce">🏝️</div>
        <h1 className="font-serif text-3xl font-bold text-cream-50 mb-2">Craft Island</h1>
        <p className="text-wood-400 text-sm mb-8">Building your world...</p>
        <div className="w-64 h-2 bg-wood-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-wood-500 to-wood-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-wood-500 text-xs mt-3 font-mono">{progress}%</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   WORLD SCENE — the island
   ═══════════════════════════════════════════════════ */
function WorldScene() {
  const time = useTimeOfDay();
  const currentRoom = useGameStore((s) => s.currentRoom);
  const isPointerLocked = useGameStore((s) => s.isPointerLocked);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={time.ambientIntensity} color={time.ambientColor} />
      <directionalLight
        position={time.sunPosition}
        intensity={time.sunIntensity}
        color={time.sunColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight position={[-5, 3, 5]} intensity={0.2} color="#ffeedd" />
      <hemisphereLight
        color={time.skyColor}
        groundColor="#4a3728"
        intensity={0.3}
      />

      {/* Sky */}
      <Sky />

      {/* Fog */}
      <fog attach="fog" args={[time.fogColor, time.fogNear, time.fogFar]} />

      {/* Terrain */}
      <IslandTerrain />
      <Ocean />

      {/* Buildings */}
      <Workshop />
      <Library />
      <Lighthouse />
      <Garden />
      <Cave />
      <Docks />

      {/* Foliage */}
      <IslandFoliage />

      {/* Collectibles */}
      <AllCollectibles />

      {/* Atmospheric particles */}
      <AmbientParticles count={80} color="#f0cb7c" size={0.02} spread={20} speed={0.1} opacity={0.3} />
      {time.period === "night" && (
        <AmbientParticles count={40} color="#aaddff" size={0.015} spread={15} speed={0.05} opacity={0.5} />
      )}

      {/* Player controller — only on island */}
      {currentRoom === "island" && (
        <FirstPersonController enabled={true} startPosition={[0, 2, 15]} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN GAME COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Game() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const currentRoom = useGameStore((s) => s.currentRoom);
  const isTransitioning = useGameStore((s) => s.isTransitioning);
  const { playCreak } = useSound();

  // Simulate loading
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Play creak on room transition
  useEffect(() => {
    if (isTransitioning) {
      playCreak();
    }
  }, [isTransitioning, playCreak]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-sky-100">
      {/* Loading screen */}
      {loading && <LoadingScreen progress={progress} />}

      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[90] bg-wood-950/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="text-cream-50 font-serif text-xl animate-pulse">
            {currentRoom === "island" ? "Returning to island..." : `Entering ${currentRoom}...`}
          </div>
        </div>
      )}

      {/* 3D World */}
      <Canvas
        shadows
        camera={{ position: [0, 2, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </Canvas>

      {/* Room interior overlay */}
      <RoomInterior />

      {/* HUD */}
      <HUD />

      {/* Map */}
      <IslandMap />

      {/* Inventory */}
      <Inventory />
    </div>
  );
}
