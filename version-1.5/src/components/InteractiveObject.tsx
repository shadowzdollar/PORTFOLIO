"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import GLBErrorBoundary from "./GLBErrorBoundary";

interface InteractiveObjectProps {
  modelPath?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  name: string;
  description: string;
  tags?: string[];
  link?: string;
  floatSpeed?: number;
  floatIntensity?: number;
  color?: string;
  showInfo?: boolean;
}

/* ─── GLB Model Loader — always calls useGLTF hook ─── */
function GLBModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene.clone()} />;
}

/* ─── Placeholder ─── */
function Placeholder({ color, hovered }: { color?: string; hovered: boolean }) {
  return (
    <mesh castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color={color || "#be8a55"}
        roughness={0.6}
        metalness={0.1}
        emissive={hovered ? (color || "#be8a55") : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
}

/* ─── Fallback while loading ─── */
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#d4a574" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

/* ─── Main interactive object ─── */
export default function InteractiveObject({
  modelPath,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  name,
  description,
  tags = [],
  link,
  floatSpeed = 1.5,
  floatIntensity = 0.3,
  color,
  showInfo = true,
}: InteractiveObjectProps) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 1.08 : 1;
    ref.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      delta * 6
    );
  });

  const handleClick = useCallback(() => {
    setPanelVisible((v) => !v);
  }, []);

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  return (
    <Float speed={floatSpeed} rotationIntensity={0.05} floatIntensity={floatIntensity}>
      <group
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Render GLB model or placeholder */}
        {modelPath ? (
          <GLBErrorBoundary fallback={<LoadingFallback />}>
            <Suspense fallback={<LoadingFallback />}>
              <GLBModel path={modelPath} />
            </Suspense>
          </GLBErrorBoundary>
        ) : (
          <Placeholder color={color} hovered={hovered} />
        )}

        {/* Hover glow ring */}
        {hovered && (
          <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.7, 32]} />
            <meshBasicMaterial color="#f0cb7c" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Floating label on hover */}
        {hovered && !panelVisible && showInfo && (
          <Html position={[0, 1.2, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
            <div className="bg-cream-50/95 backdrop-blur-md border border-wood-200 rounded-lg px-4 py-2 shadow-wood whitespace-nowrap">
              <div className="font-serif font-bold text-wood-900 text-sm">{name}</div>
              <div className="text-wood-500 text-xs">Click to explore</div>
            </div>
          </Html>
        )}

        {/* Expanded info panel */}
        {panelVisible && showInfo && (
          <Html position={[0, 1.5, 0]} center distanceFactor={6} style={{ pointerEvents: "auto" }}>
            <div className="bg-cream-50/98 backdrop-blur-lg border border-wood-200 rounded-xl p-5 shadow-wood-lg w-64 pointer-events-auto relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)]" />
              <div className="mt-2">
                <h3 className="font-serif text-lg font-bold text-wood-900 mb-1">{name}</h3>
                <p className="text-wood-600 text-xs leading-relaxed mb-3">{description}</p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-wood-50 text-wood-600 text-[10px] rounded border border-wood-200 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {link && (
                  <a href={link} className="inline-flex items-center gap-1 text-xs font-medium text-wood-600 hover:text-wood-800 transition-colors">
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPanelVisible(false);
                  }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-wood-100 hover:bg-wood-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 text-wood-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
