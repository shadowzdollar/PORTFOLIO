'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Magnifying Glass Cursor ──────────────────────────────── */
/* Hides the default cursor and replaces it with a custom      */
/* magnifying glass that follows the mouse with spring physics. */
/* Hovering over text shows a subtle zoom effect.               */

export default function MagnifyingGlassCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Scale spring for hover/click effects
  const scaleValue = useMotionValue(1);
  const scale = useSpring(scaleValue, { damping: 20, stiffness: 300 });

  // Rotation based on movement
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 200 });

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    if (!isVisible) setIsVisible(true);

    // Calculate rotation based on movement direction
    const currentX = cursorX.getPrevious();
    const currentY = cursorY.getPrevious();
    if (currentX !== undefined && currentY !== undefined) {
      const dx = e.clientX - currentX;
      const dy = e.clientY - currentY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      rotation.set(angle * 0.1); // Subtle rotation
    }
  }, [cursorX, cursorY, rotation, isVisible]);

  // Handle hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button, a, [role="button"], input, textarea, select, [data-cursor-hover]');
    const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, li');

    setIsHovering(!!(isInteractive || isText));
    scaleValue.set(isInteractive ? 1.3 : isText ? 1.1 : 1);
  }, [scaleValue]);

  // Handle mouse down/up
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    scaleValue.set(0.8);
  }, [scaleValue]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
    scaleValue.set(isHovering ? 1.2 : 1);
  }, [scaleValue, isHovering]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Hide cursor when not moving
  useEffect(() => {
    const handleMouseStop = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // Optionally dim cursor after inactivity
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseStop);
    return () => {
      window.removeEventListener('mousemove', handleMouseStop);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Inject cursor-hiding CSS via useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>

      {/* Main magnifying glass cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x,
          y,
          scale,
          rotate: smoothRotation,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Glass lens outer ring */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="rgba(235, 210, 179, 0.3)"
            stroke="#9C6D48"
            strokeWidth="2"
          />

          {/* Glass lens inner */}
          <circle
            cx="18"
            cy="18"
            r="11"
            fill="rgba(235, 210, 179, 0.15)"
          />

          {/* Glass reflection highlight */}
          <path
            d="M10 12 C12 10 16 9 18 11"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Handle */}
          <path
            d="M29 29 L40 40"
            stroke="#52392B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M29 29 L40 40"
            stroke="#9C6D48"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Handle grip lines */}
          <line x1="32" y1="32" x2="34" y2="34" stroke="#52392B" strokeWidth="1" opacity="0.5" />
          <line x1="35" y1="35" x2="37" y2="37" stroke="#52392B" strokeWidth="1" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Outer ring effect on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="30"
            cy="30"
            r="28"
            stroke="#9C6D48"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="4 4"
          />
        </svg>
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => setIsClicking(false)}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#9C6D48"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </motion.div>
      )}
    </>
  );
}
