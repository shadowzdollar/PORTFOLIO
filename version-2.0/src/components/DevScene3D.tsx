'use client';

import { Suspense, useRef, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component<{children: ReactNode; fallback: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode; fallback: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(e: Error) { console.warn('3D error:', e.message); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function TableSurface() {
  return (
    <mesh position={[0, -1.3, 0]} receiveShadow>
      <boxGeometry args={[3.5, 0.08, 2]} />
      <meshStandardMaterial color="#8B6B4A" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

function DevCodingScene() {
  const { scene } = useGLTF('/3d/dev-coding.glb');
  const ref = useRef<THREE.Group>(null);
  const baseY = -1.2;

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group ref={ref} position={[0, baseY, 0]} scale={2.8}>
      <primitive object={scene} />
    </group>
  );
}

/* Camera that looks at the model center, not the origin */
function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.4} color="#faf0e6" />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#f5e6d3" />
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#d4c4b0" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffeedd" distance={10} />
      <TableSurface />
      <DevCodingScene />
    </>
  );
}

export default function DevScene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t); }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary fallback={<div />}>
      <div className="absolute right-0 top-0 w-[50vw] h-full pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 3, 7], fov: 38, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true }}
          shadows
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
