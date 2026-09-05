"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, RoomId } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";

const roomPositions: Record<RoomId, { x: number; y: number; label: string; icon: string }> = {
  island: { x: 50, y: 50, label: "Island Center", icon: "🏝️" },
  workshop: { x: 50, y: 35, label: "Workshop", icon: "🔨" },
  library: { x: 28, y: 42, label: "Library", icon: "📚" },
  gallery: { x: 62, y: 42, label: "Gallery", icon: "🎨" },
  lighthouse: { x: 72, y: 28, label: "Lighthouse", icon: "🏠" },
  garden: { x: 35, y: 55, label: "Garden", icon: "🌿" },
  cave: { x: 50, y: 65, label: "Cave", icon: "🕳️" },
  docks: { x: 68, y: 62, label: "Docks", icon: "⚓" },
};

export default function IslandMap() {
  const showMap = useGameStore((s) => s.showMap);
  const toggleMap = useGameStore((s) => s.toggleMap);
  const visitedRooms = useGameStore((s) => s.visitedRooms);
  const collectibles = useGameStore((s) => s.collectibles);
  const enterRoom = useGameStore((s) => s.enterRoom);
  const { playClick } = useSound();

  const handleRoomClick = useCallback(
    (roomId: RoomId) => {
      if (roomId === "island") return; // Already on island
      playClick();
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      enterRoom(roomId);
      toggleMap();
    },
    [enterRoom, toggleMap, playClick]
  );

  // Keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyM" && !e.ctrlKey && !e.metaKey) {
        // Don't toggle if typing in an input
        if (document.activeElement?.tagName === "INPUT") return;
        toggleMap();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleMap]);

  const getRoomCollectibleCount = (roomId: RoomId) => {
    const roomItems = collectibles.filter((c) => c.room === roomId);
    const found = roomItems.filter((c) => c.found).length;
    return { found, total: roomItems.length };
  };

  return (
    <AnimatePresence>
      {showMap && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleMap();
              playClick();
            }
          }}
        >
          <div className="bg-cream-50/98 backdrop-blur-lg border-2 border-wood-300 rounded-2xl shadow-wood-lg p-8 w-[600px] max-w-[90vw] relative">
            {/* Pin decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 mt-2">
              <div>
                <h2 className="font-serif text-2xl font-bold text-wood-900">🗺️ Island Map</h2>
                <p className="text-xs text-wood-500">
                  {visitedRooms.length} / {Object.keys(roomPositions).length} areas explored
                </p>
              </div>
              <button
                onClick={() => {
                  toggleMap();
                  playClick();
                }}
                className="w-8 h-8 rounded-lg bg-wood-100 hover:bg-wood-200 flex items-center justify-center text-wood-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Map area */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl border border-wood-200 overflow-hidden">
              {/* Island shape */}
              <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full">
                <ellipse cx="50" cy="42" rx="38" ry="28" fill="#b8d4a0" stroke="#8a9a70" strokeWidth="0.5" />
                {/* Water ripples */}
                <ellipse cx="50" cy="42" rx="42" ry="32" fill="none" stroke="#a0c4d4" strokeWidth="0.3" strokeDasharray="2 2" />
                <ellipse cx="50" cy="42" rx="45" ry="35" fill="none" stroke="#a0c4d4" strokeWidth="0.2" strokeDasharray="3 3" />
              </svg>

              {/* Room markers */}
              {Object.entries(roomPositions).map(([roomId, room]) => {
                const isVisited = visitedRooms.includes(roomId as RoomId);
                const collectInfo = getRoomCollectibleCount(roomId as RoomId);

                return (
                  <button
                    key={roomId}
                    onClick={() => handleRoomClick(roomId as RoomId)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group ${
                      roomId === "island" ? "cursor-default" : "hover:scale-110"
                    }`}
                    style={{ left: `${room.x}%`, top: `${room.y}%` }}
                    disabled={roomId === "island"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md transition-all ${
                        isVisited
                          ? "bg-cream-50 border-2 border-wood-400"
                          : "bg-wood-200/60 border border-wood-300/50 grayscale"
                      }`}
                    >
                      {isVisited ? room.icon : "❓"}
                    </div>
                    {isVisited && (
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="text-[10px] font-medium text-wood-700">{room.label}</div>
                        {collectInfo.total > 0 && (
                          <div className="text-[8px] text-wood-400 text-center">
                            {collectInfo.found}/{collectInfo.total} ✨
                          </div>
                        )}
                      </div>
                    )}
                    {!isVisited && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-wood-400 whitespace-nowrap">
                        Undiscovered
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-wood-200 flex justify-between items-center">
              <p className="text-[10px] text-wood-400">
                Press <kbd className="px-1 py-0.5 bg-wood-100 rounded text-wood-600 font-mono">M</kbd> to toggle map
              </p>
              <p className="text-[10px] text-wood-400">
                Click a location to fast travel
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
