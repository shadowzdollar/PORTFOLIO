"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/components/AmbientSound";

export default function Inventory() {
  const showInventory = useGameStore((s) => s.showInventory);
  const toggleInventory = useGameStore((s) => s.toggleInventory);
  const inventory = useGameStore((s) => s.inventory);
  const collectibles = useGameStore((s) => s.collectibles);
  const totalCollectibles = useGameStore((s) => s.totalCollectibles);
  const { playPageTurn } = useSound();

  const items = inventory
    .map((id) => collectibles.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {showInventory && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-96 max-w-[90vw] z-50 pointer-events-auto"
        >
          <div className="h-full bg-cream-50/95 backdrop-blur-lg border-l border-wood-200 shadow-wood-lg p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-wood-900">🎒 Inventory</h2>
                <p className="text-xs text-wood-500 mt-1">
                  {items.length} / {totalCollectibles} collected
                </p>
              </div>
              <button
                onClick={() => {
                  toggleInventory();
                  playPageTurn();
                }}
                className="w-8 h-8 rounded-lg bg-wood-100 hover:bg-wood-200 flex items-center justify-center text-wood-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-wood-100 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(items.length / totalCollectibles) * 100}%` }}
                className="h-full bg-gradient-to-r from-wood-500 to-wood-400 rounded-full"
              />
            </div>

            {/* Items grid */}
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-wood-500 text-sm">No items collected yet.</p>
                <p className="text-wood-400 text-xs mt-1">Explore the island to find hidden treasures!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <motion.div
                    key={item!.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cream-100 border border-wood-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-wood transition-shadow"
                  >
                    <div className="text-2xl mt-0.5">{item!.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-wood-900 text-sm">{item!.name}</div>
                      <div className="text-wood-500 text-xs leading-relaxed mt-0.5">{item!.description}</div>
                      <div className="text-wood-400 text-[10px] mt-1 font-mono capitalize">📍 {item!.room}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Hint */}
            <div className="mt-6 pt-4 border-t border-wood-200">
              <p className="text-[10px] text-wood-400 text-center">
                Press <kbd className="px-1 py-0.5 bg-wood-100 rounded text-wood-600 font-mono">TAB</kbd> to toggle inventory
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
