"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";
import { useTimeOfDay } from "@/components/TimeOfDay";
import MusicPlayer from "./MusicPlayer";

export default function HUD() {
  const isPointerLocked = useGameStore((s) => s.isPointerLocked);
  const inventory = useGameStore((s) => s.inventory);
  const totalCollectibles = useGameStore((s) => s.totalCollectibles);
  const currentRoom = useGameStore((s) => s.currentRoom);
  const musicPlaying = useGameStore((s) => s.musicPlaying);
  const toggleMusic = useGameStore((s) => s.toggleMusic);
  const toggleInventory = useGameStore((s) => s.toggleInventory);
  const toggleMap = useGameStore((s) => s.toggleMap);
  const { playClick } = useSound();
  const time = useTimeOfDay();

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.code === "Tab") {
        e.preventDefault();
        toggleInventory();
        playClick();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleInventory, playClick]);

  return (
    <>
      <MusicPlayer />

      {/* Crosshair — only when pointer locked */}
      {isPointerLocked && currentRoom === "island" && (
        <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
          <div className="w-6 h-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-wood-900/40 rounded-full" />
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-wood-900/40 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-wood-900/60 rounded-full" />
          </div>
        </div>
      )}

      {/* Top-left: Time */}
      <div className="fixed top-20 left-6 z-40 pointer-events-none">
        <div className="bg-cream-50/80 backdrop-blur-md rounded-xl border border-wood-200 shadow-wood px-4 py-2 flex items-center gap-2">
          <span className="text-lg">{time.emoji}</span>
          <div>
            <div className="text-xs font-medium text-wood-700">{time.label}</div>
            <div className="text-[10px] text-wood-400 font-mono">
              {String(time.hour).padStart(2, "0")}:{String(time.minute).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Top-right: Collectible counter */}
      <div className="fixed top-20 right-6 z-40 pointer-events-none">
        <div className="bg-cream-50/80 backdrop-blur-md rounded-xl border border-wood-200 shadow-wood px-4 py-2 flex items-center gap-2">
          <span className="text-lg">✨</span>
          <div>
            <div className="text-xs font-medium text-wood-700">
              {inventory.length} / {totalCollectibles}
            </div>
            <div className="text-[10px] text-wood-400">collected</div>
          </div>
        </div>
      </div>

      {/* Bottom-center: Controls hint */}
      {currentRoom === "island" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isPointerLocked ? 1 : 0.6, y: 0 }}
            className="bg-wood-900/70 backdrop-blur-sm text-cream-100 text-xs px-5 py-2.5 rounded-full flex items-center gap-4"
          >
            {!isPointerLocked ? (
              <span>Click to start exploring</span>
            ) : (
              <>
                <span>WASD move</span>
                <span className="text-wood-400">•</span>
                <span>Mouse look</span>
                <span className="text-wood-400">•</span>
                <span>Shift sprint</span>
                <span className="text-wood-400">•</span>
                <span>Space jump</span>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Bottom-left: Tab + M shortcuts */}
      <div className="fixed bottom-6 left-6 z-40 flex gap-2">
        <button
          onClick={() => {
            toggleInventory();
            playClick();
          }}
          className="bg-cream-50/80 backdrop-blur-md border border-wood-200 shadow-wood rounded-lg px-3 py-1.5 text-xs text-wood-600 hover:bg-cream-50 transition-all"
        >
          🎒 Inventory <kbd className="ml-1 px-1 py-0.5 bg-wood-100 rounded text-[10px] font-mono">TAB</kbd>
        </button>
        <button
          onClick={() => {
            toggleMap();
            playClick();
          }}
          className="bg-cream-50/80 backdrop-blur-md border border-wood-200 shadow-wood rounded-lg px-3 py-1.5 text-xs text-wood-600 hover:bg-cream-50 transition-all"
        >
          🗺️ Map <kbd className="ml-1 px-1 py-0.5 bg-wood-100 rounded text-[10px] font-mono">M</kbd>
        </button>
      </div>

      {/* Bottom-right: Music toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            toggleMusic();
            playClick();
          }}
          className="bg-cream-50/80 backdrop-blur-md border border-wood-200 shadow-wood rounded-lg px-3 py-1.5 text-xs text-wood-600 hover:bg-cream-50 transition-all flex items-center gap-2"
        >
          {musicPlaying ? "🎵" : "🔇"}
          {musicPlaying ? "Music On" : "Music Off"}
        </button>
      </div>
    </>
  );
}
