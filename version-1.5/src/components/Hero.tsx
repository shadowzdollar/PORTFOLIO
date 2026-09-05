"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./AmbientSound";
import { useTimeOfDay } from "./TimeOfDay";
import { HandDrawnButton, HandDrawnUnderline } from "./HandDrawn";

const WorkshopScene = dynamic(() => import("./WorkshopScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-wood-300 border-t-wood-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-wood-500 text-sm">Building the workshop...</p>
      </div>
    </div>
  ),
});

const rooms = [
  { id: 0, name: "Overview", icon: "🏠", description: "The full workshop at a glance" },
  { id: 1, name: "Desk", icon: "💻", description: "Where the magic happens" },
  { id: 2, name: "Library", icon: "📚", description: "Knowledge and inspiration" },
  { id: 3, name: "Gallery", icon: "🎨", description: "Featured projects" },
  { id: 4, name: "Workbench", icon: "🔧", description: "Tools of the trade" },
];

export default function Hero() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [showMinimap, setShowMinimap] = useState(true);
  const [isExploring, setIsExploring] = useState(false);
  const { playClick, playHover, playCreak } = useSound();
  const time = useTimeOfDay();

  const navigateRoom = useCallback((index: number) => {
    setRoomIndex(index);
    playClick();
  }, [playClick]);

  const nextRoom = useCallback(() => {
    setRoomIndex((prev) => Math.min(prev + 1, rooms.length - 1));
    playCreak();
  }, [playCreak]);

  const prevRoom = useCallback(() => {
    setRoomIndex((prev) => Math.max(prev - 1, 0));
    playCreak();
  }, [playCreak]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Time-of-day background overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 bg-gradient-to-br ${time.bgGradient} transition-all duration-[3000ms]`} />

      {/* 3D SCENE — Full screen */}
      <div className="absolute inset-0 z-10">
        <WorkshopScene roomIndex={roomIndex} />
      </div>

      {/* OVERLAY UI */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold drop-shadow-lg" style={{ color: time.textColor }}>
              The Workshop
            </h1>
            <p className="text-sm mt-1 drop-shadow opacity-70" style={{ color: time.textColor }}>
              Click objects to explore • Drag to look around • Scroll to zoom
            </p>
            {/* Hand-drawn underline */}
            <HandDrawnUnderline width={200} color={time.accentColor} className="opacity-60" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setIsExploring(!isExploring);
              playClick();
            }}
            onMouseEnter={() => playHover()}
            className={`pointer-events-auto px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md transition-all duration-300 ${
              isExploring
                ? "bg-wood-600/90 text-cream-50 shadow-wood"
                : "bg-cream-50/80 text-wood-700 border border-wood-200 hover:bg-cream-50"
            }`}
          >
            {isExploring ? "🔒 Lock View" : "🌍 Explore"}
          </motion.button>
        </div>

        {/* Minimap */}
        <AnimatePresence>
          {showMinimap && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <div className="bg-cream-50/90 backdrop-blur-md rounded-xl border border-wood-200 shadow-wood p-3 space-y-1.5">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => navigateRoom(room.id)}
                    onMouseEnter={() => playHover()}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      roomIndex === room.id
                        ? "bg-wood-600 text-cream-50 shadow-wood"
                        : "text-wood-600 hover:bg-wood-100"
                    }`}
                    title={room.description}
                  >
                    <span className="text-lg">{room.icon}</span>
                    <div className="hidden md:block">
                      <div className="text-xs font-medium leading-tight">{room.name}</div>
                      <div className={`text-[10px] leading-tight ${roomIndex === room.id ? "text-wood-200" : "text-wood-400"}`}>
                        {room.description}
                      </div>
                    </div>
                    {roomIndex === room.id && (
                      <motion.div layoutId="activeRoom" className="w-1.5 h-1.5 rounded-full bg-cream-50 ml-auto hidden md:block" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom: Room navigation */}
        <div className="absolute bottom-6 left-0 right-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 flex items-end justify-between">
            <motion.div
              key={roomIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto"
            >
              <div className="bg-cream-50/90 backdrop-blur-md rounded-xl border border-wood-200 shadow-wood p-4 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{rooms[roomIndex].icon}</span>
                  <span className="font-serif font-bold text-wood-900">{rooms[roomIndex].name}</span>
                </div>
                <p className="text-xs text-wood-500">{rooms[roomIndex].description}</p>
                <div className="flex gap-1.5 mt-3">
                  {rooms.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === roomIndex ? "w-6 bg-wood-500" : i < roomIndex ? "w-2 bg-wood-300" : "w-2 bg-wood-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="pointer-events-auto flex gap-2">
              <button
                onClick={prevRoom}
                disabled={roomIndex === 0}
                className="w-10 h-10 rounded-lg bg-cream-50/90 backdrop-blur-md border border-wood-200 shadow-wood flex items-center justify-center text-wood-600 hover:bg-cream-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                onMouseEnter={() => playHover()}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextRoom}
                disabled={roomIndex === rooms.length - 1}
                className="w-10 h-10 rounded-lg bg-cream-50/90 backdrop-blur-md border border-wood-200 shadow-wood flex items-center justify-center text-wood-600 hover:bg-cream-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                onMouseEnter={() => playHover()}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Toggle minimap */}
        <button
          onClick={() => {
            setShowMinimap(!showMinimap);
            playClick();
          }}
          className="absolute left-6 bottom-6 pointer-events-auto w-8 h-8 rounded-lg bg-cream-50/90 backdrop-blur-md border border-wood-200 shadow-wood flex items-center justify-center text-wood-500 hover:text-wood-700 transition-colors text-xs"
          title={showMinimap ? "Hide minimap" : "Show minimap"}
        >
          {showMinimap ? "◀" : "▶"}
        </button>
      </div>

      {/* Instructions toast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="bg-wood-900/80 backdrop-blur-sm text-cream-100 text-xs px-4 py-2 rounded-full flex items-center gap-3">
          <span>🖱️ Click objects</span>
          <span className="text-wood-400">•</span>
          <span>🔄 Drag to orbit</span>
          <span className="text-wood-400">•</span>
          <span>🔍 Scroll to zoom</span>
        </div>
      </motion.div>
    </section>
  );
}
