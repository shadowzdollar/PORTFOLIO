"use client";

import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";

const MOVE_SPEED = 5;
const SPRINT_SPEED = 9;
const LOOK_SPEED = 0.002;
const PLAYER_HEIGHT = 1.7;
const GRAVITY = -15;
const JUMP_FORCE = 7;

interface Keys {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
}

export default function FirstPersonController({
  enabled = true,
  startPosition = [0, PLAYER_HEIGHT, 15],
}: {
  enabled?: boolean;
  startPosition?: [number, number, number];
}) {
  const { camera, gl } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const isGrounded = useRef(true);
  const keys = useRef<Keys>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  });

  const setPointerLocked = useGameStore((s) => s.setPointerLocked);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const isTransitioning = useGameStore((s) => s.isTransitioning);

  // Initialize camera position
  useEffect(() => {
    camera.position.set(...startPosition);
    camera.rotation.set(0, 0, 0);
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera, startPosition]);

  // Pointer lock
  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    const onClick = () => {
      if (!isTransitioning) {
        canvas.requestPointerLock();
      }
    };

    const onLockChange = () => {
      setPointerLocked(document.pointerLockElement === canvas);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;
      euler.current.y -= e.movementX * LOOK_SPEED;
      euler.current.x -= e.movementY * LOOK_SPEED;
      euler.current.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [enabled, gl, camera, setPointerLocked, isTransitioning]);

  // Keyboard input
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = true;
          break;
        case "Space":
          keys.current.jump = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = false;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = false;
          break;
        case "Space":
          keys.current.jump = false;
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [enabled]);

  // Movement loop
  useFrame((_, delta) => {
    if (!enabled || isTransitioning) return;
    if (document.pointerLockElement !== gl.domElement) return;

    const speed = keys.current.sprint ? SPRINT_SPEED : MOVE_SPEED;
    const k = keys.current;

    // Calculate move direction
    direction.current.set(0, 0, 0);
    if (k.forward) direction.current.z -= 1;
    if (k.backward) direction.current.z += 1;
    if (k.left) direction.current.x -= 1;
    if (k.right) direction.current.x += 1;
    direction.current.normalize();

    // Apply camera rotation to direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const sideDirection = new THREE.Vector3();
    sideDirection.crossVectors(camera.up, cameraDirection).normalize();

    const moveDir = new THREE.Vector3();
    moveDir.addScaledVector(cameraDirection, -direction.current.z);
    moveDir.addScaledVector(sideDirection, direction.current.x);
    moveDir.normalize();

    // Apply movement
    velocity.current.x = moveDir.x * speed;
    velocity.current.z = moveDir.z * speed;

    // Gravity + jump
    if (isGrounded.current && k.jump) {
      velocity.current.y = JUMP_FORCE;
      isGrounded.current = false;
    }
    velocity.current.y += GRAVITY * delta;

    // Update position
    const newPos = camera.position.clone();
    newPos.x += velocity.current.x * delta;
    newPos.z += velocity.current.z * delta;
    newPos.y += velocity.current.y * delta;

    // Ground collision — simple heightmap
    const groundHeight = getGroundHeight(newPos.x, newPos.z);
    if (newPos.y < groundHeight + PLAYER_HEIGHT) {
      newPos.y = groundHeight + PLAYER_HEIGHT;
      velocity.current.y = 0;
      isGrounded.current = true;
    }

    // Boundary clamping (island bounds)
    const ISLAND_RADIUS = 25;
    const distFromCenter = Math.sqrt(newPos.x * newPos.x + newPos.z * newPos.z);
    if (distFromCenter > ISLAND_RADIUS) {
      const angle = Math.atan2(newPos.z, newPos.x);
      newPos.x = Math.cos(angle) * ISLAND_RADIUS;
      newPos.z = Math.sin(angle) * ISLAND_RADIUS;
    }

    camera.position.copy(newPos);
    setPlayerPosition([newPos.x, newPos.y, newPos.z]);
  });

  return null;
}

/* ─── Simple ground height based on island terrain ─── */
function getGroundHeight(x: number, z: number): number {
  // Island shape — higher in center, slopes to water at edges
  const dist = Math.sqrt(x * x + z * z);
  const maxRadius = 22;
  const islandFactor = Math.max(0, 1 - dist / maxRadius);

  // Multi-octave noise approximation
  const n1 = Math.sin(x * 0.15) * Math.cos(z * 0.15) * 1.5;
  const n2 = Math.sin(x * 0.3 + 1.7) * Math.cos(z * 0.25 + 0.9) * 0.8;
  const n3 = Math.sin(x * 0.6 + 3.1) * Math.cos(z * 0.5 + 2.3) * 0.3;

  let height = (n1 + n2 + n3) * islandFactor;

  // Flatten some areas for buildings
  const distWorkshop = Math.sqrt(x * x + (z - 5) * (z - 5));
  if (distWorkshop < 4) height = Math.max(height, 0.5);

  const distLibrary = Math.sqrt((x + 10) * (x + 10) + (z + 5) * (z + 5));
  if (distLibrary < 3) height = Math.max(height, 0.8);

  const distLighthouse = Math.sqrt((x - 12) * (x - 12) + (z + 8) * (z + 8));
  if (distLighthouse < 2.5) height = Math.max(height, 1.2);

  return Math.max(-0.5, height);
}
