"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/components/game/Game"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-wood-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-bounce">🏝️</div>
        <h1 className="font-serif text-3xl font-bold text-cream-50 mb-2">Craft Island</h1>
        <p className="text-wood-400 text-sm">Loading...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return <Game />;
}
