"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   ISLAND TERRAIN — procedural heightmap mesh
   ═══════════════════════════════════════════════════ */
export function IslandTerrain() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const { geometry, colors } = useMemo(() => {
    const size = 60;
    const segments = 128;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colorArr = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Island shape
      const dist = Math.sqrt(x * x + z * z);
      const maxRadius = 22;
      const islandFactor = Math.max(0, 1 - dist / maxRadius);
      const edgeFalloff = Math.pow(islandFactor, 1.5);

      // Multi-octave noise
      const n1 = Math.sin(x * 0.15) * Math.cos(z * 0.15) * 2;
      const n2 = Math.sin(x * 0.3 + 1.7) * Math.cos(z * 0.25 + 0.9) * 1;
      const n3 = Math.sin(x * 0.6 + 3.1) * Math.cos(z * 0.5 + 2.3) * 0.4;
      const n4 = Math.sin(x * 1.2 + 5.0) * Math.cos(z * 1.0 + 4.0) * 0.15;

      let height = (n1 + n2 + n3 + n4) * edgeFalloff;

      // Flatten for buildings
      const flatAreas = [
        { cx: 0, cz: 5, r: 5, h: 0.3 },      // Workshop
        { cx: -10, cz: -5, r: 4, h: 0.6 },    // Library
        { cx: 12, cz: -8, r: 3, h: 1.0 },     // Lighthouse
        { cx: -5, cz: -10, r: 5, h: 0.4 },    // Garden
        { cx: 0, cz: -15, r: 4, h: -0.2 },    // Cave
        { cx: 10, cz: 10, r: 4, h: 0.1 },     // Docks
      ];

      for (const area of flatAreas) {
        const d = Math.sqrt((x - area.cx) ** 2 + (z - area.cz) ** 2);
        if (d < area.r) {
          const blend = 1 - d / area.r;
          height = height * (1 - blend) + area.h * blend;
        }
      }

      // Beach: flatten near water
      if (height < 0.3 && dist < maxRadius) {
        height = Math.max(height, -0.1);
      }

      pos.setY(i, height);

      // Color based on height and slope
      const green = new THREE.Color("#4a7c59");   // Grass
      const sand = new THREE.Color("#d4b896");     // Sand
      const stone = new THREE.Color("#8a8070");    // Stone
      const darkGrass = new THREE.Color("#3d6b4a"); // Dark grass

      let color: THREE.Color;
      if (height < 0.05) {
        color = sand.clone().lerp(green, Math.max(0, height / 0.05));
      } else if (height < 1.5) {
        color = green.clone().lerp(darkGrass, height / 1.5);
      } else {
        color = darkGrass.clone().lerp(stone, Math.min(1, (height - 1.5) / 1.5));
      }

      colorArr[i * 3] = color.r;
      colorArr[i * 3 + 1] = color.g;
      colorArr[i * 3 + 2] = color.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colorArr, 3));
    geo.computeVertexNormals();

    return { geometry: geo, colors: colorArr };
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   OCEAN — animated water plane
   ═══════════════════════════════════════════════════ */
export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#1a6b8a") },
      uColor2: { value: new THREE.Color("#2d9cb7") },
      uFoamColor: { value: new THREE.Color("#e8f4f8") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
      <planeGeometry args={[120, 120, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float wave1 = sin(pos.x * 0.3 + uTime * 0.8) * 0.15;
            float wave2 = sin(pos.y * 0.4 + uTime * 0.6) * 0.1;
            float wave3 = sin(pos.x * 0.8 + pos.y * 0.6 + uTime * 1.2) * 0.05;
            
            pos.z = wave1 + wave2 + wave3;
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uFoamColor;
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = smoothstep(-0.15, 0.15, vElevation);
            vec3 color = mix(uColor1, uColor2, mixFactor);
            
            // Foam on wave crests
            float foam = smoothstep(0.12, 0.18, vElevation);
            color = mix(color, uFoamColor, foam * 0.5);
            
            // Subtle shimmer
            float shimmer = sin(vUv.x * 50.0 + uTime * 2.0) * sin(vUv.y * 50.0 + uTime * 1.5);
            color += shimmer * 0.03;
            
            gl_FragColor = vec4(color, 0.85);
          }
        `}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   SKY — procedural sky dome
   ═══════════════════════════════════════════════════ */
export function Sky() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  // Time-of-day colors are updated via uniforms in the parent WorldScene

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSkyTop: { value: new THREE.Color("#5BA3D9") },
      uSkyBottom: { value: new THREE.Color("#c8dce8") },
      uSunColor: { value: new THREE.Color("#fff8e7") },
      uSunPosition: { value: new THREE.Vector3(0.5, 0.3, 0.8) },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[50, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        side={THREE.BackSide}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPos.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `}
        fragmentShader={`
          uniform vec3 uSkyTop;
          uniform vec3 uSkyBottom;
          uniform vec3 uSunColor;
          uniform vec3 uSunPosition;
          varying vec3 vWorldPosition;
          
          void main() {
            float h = normalize(vWorldPosition).y;
            vec3 sky = mix(uSkyBottom, uSkyTop, max(0.0, h));
            
            // Sun glow
            vec3 sunDir = normalize(uSunPosition);
            float sunDot = max(0.0, dot(normalize(vWorldPosition), sunDir));
            float sunGlow = pow(sunDot, 32.0);
            sky += uSunColor * sunGlow * 0.8;
            
            // Horizon haze
            float horizon = 1.0 - abs(h);
            sky = mix(sky, uSkyBottom * 1.1, pow(horizon, 4.0));
            
            gl_FragColor = vec4(sky, 1.0);
          }
        `}
      />
    </mesh>
  );
}
