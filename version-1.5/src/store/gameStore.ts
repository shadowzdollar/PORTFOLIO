import { create } from "zustand";

export type RoomId =
  | "island"
  | "workshop"
  | "library"
  | "gallery"
  | "lighthouse"
  | "garden"
  | "cave"
  | "docks";

export interface Collectible {
  id: string;
  name: string;
  description: string;
  icon: string;
  found: boolean;
  position: [number, number, number];
  room: RoomId;
}

interface GameState {
  // Current location
  currentRoom: RoomId;
  isTransitioning: boolean;

  // Player
  playerPosition: [number, number, number];
  playerRotation: number;
  isPointerLocked: boolean;

  // Inventory
  inventory: string[];
  showInventory: boolean;
  showMap: boolean;

  // Music
  musicPlaying: boolean;
  musicVolume: number;

  // Collectibles
  collectibles: Collectible[];
  totalCollectibles: number;

  // Visited rooms
  visitedRooms: RoomId[];

  // Actions
  enterRoom: (room: RoomId) => void;
  exitRoom: () => void;
  setTransitioning: (v: boolean) => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerRotation: (rot: number) => void;
  setPointerLocked: (v: boolean) => void;
  collectItem: (id: string) => void;
  toggleInventory: () => void;
  toggleMap: () => void;
  toggleMusic: () => void;
  setMusicVolume: (v: number) => void;
  visitRoom: (room: RoomId) => void;
}

const defaultCollectibles: Collectible[] = [
  // Beach
  { id: "beach-1", name: "Driftwood Compass", description: "A compass carved from driftwood. Points toward new discoveries.", icon: "🧭", found: false, position: [0, 0.5, 18], room: "island" },
  { id: "beach-2", name: "Message in a Bottle", description: "Contains a pull request description from 2019.", icon: "🍾", found: false, position: [5, 0.3, 20], room: "island" },
  { id: "beach-3", name: "Shell of Infinity", description: "A perfect spiral. Like recursion, it goes on forever.", icon: "🐚", found: false, position: [-4, 0.3, 19], room: "island" },
  { id: "beach-4", name: "Sand Dollar", description: "Flat, round, and full of hidden patterns — like good CSS.", icon: "🪙", found: false, position: [8, 0.2, 17], room: "island" },
  { id: "beach-5", name: "Sea Glass", description: "Rough edges smoothed by time. Like code after 100 refactorings.", icon: "💎", found: false, position: [-7, 0.4, 16], room: "island" },
  // Workshop
  { id: "ws-1", name: "First Commit", description: "The original git init. Where it all began.", icon: "💾", found: false, position: [0, 1.5, 0], room: "workshop" },
  { id: "ws-2", name: "Rubber Duck", description: "The best debugger in the world.", icon: "🦆", found: false, position: [2, 1, -1], room: "workshop" },
  { id: "ws-3", name: "Bug in Amber", description: "A bug so old it fossilized. Still not fixed.", icon: "🐛", found: false, position: [-2, 0.8, 1], room: "workshop" },
  { id: "ws-4", name: "Stack Overflow Mug", description: "Filled with coffee. Always. Even when the mug is upside down.", icon: "☕", found: false, position: [1, 1, 0.5], room: "workshop" },
  { id: "ws-5", name: "Mechanical Switch", description: "Cherry MX Blue. The sound of productivity.", icon: "⌨️", found: false, position: [-1, 0.8, -0.5], room: "workshop" },
  // Library
  { id: "lib-1", name: "Rare First Edition", description: "Kernighan & Ritchie. The C Programming Language.", icon: "📖", found: false, position: [-1, 2, 0], room: "library" },
  { id: "lib-2", name: "Hidden Bookmark", description: "A bookmark with a Regex cheat sheet on one side.", icon: "🔖", found: false, position: [1, 1.5, 0], room: "library" },
  { id: "lib-3", name: "Annotation", description: "Margin notes from a deep study session on algorithms.", icon: "📝", found: false, position: [0, 2.5, -0.5], room: "library" },
  { id: "lib-4", name: "Pressed Flower", description: "A flower from the day the portfolio launched.", icon: "🌸", found: false, position: [-0.5, 1.2, 0.5], room: "library" },
  // Gallery
  { id: "gal-1", name: "Golden Frame", description: "Empty. Reserved for the next masterpiece.", icon: "🖼️", found: false, position: [0, 2, -1], room: "gallery" },
  { id: "gal-2", name: "Artist's Palette", description: "Every color has a hex code. Every hex code has a story.", icon: "🎨", found: false, position: [-2, 1, 0], room: "gallery" },
  { id: "gal-3", name: "Blue Ribbon", description: "First place at the local hackathon. 48 hours of pure chaos.", icon: "🎗️", found: false, position: [2, 1.5, -1], room: "gallery" },
  // Lighthouse
  { id: "lh-1", name: "Captain's Log", description: "Entry #1: 'Set sail from localhost to production.'", icon: "📒", found: false, position: [0, 3, 0], room: "lighthouse" },
  { id: "lh-2", name: "Lens Fragment", description: "A piece of the lighthouse lens. Focuses light like good architecture focuses code.", icon: "🔍", found: false, position: [0, 5, 0], room: "lighthouse" },
  { id: "lh-3", name: "Fog Horn", description: "Sounds when the build breaks at 3am.", icon: "📯", found: false, position: [0, 7, 0], room: "lighthouse" },
  // Garden
  { id: "gdn-1", name: "Seed of Knowledge", description: "Plant it in your mind. Water it with curiosity.", icon: "🌱", found: false, position: [-3, 0.5, -3], room: "garden" },
  { id: "gdn-2", name: "Golden Apple", description: "Not the Newton kind. The 'aha moment' kind.", icon: "🍎", found: false, position: [3, 1, -2], room: "garden" },
  { id: "gdn-3", name: "Butfly of Debugging", description: "It appeared when I removed a print statement.", icon: "🦋", found: false, position: [0, 2, -4], room: "garden" },
  { id: "gdn-4", name: "Mushroom of Wisdom", description: "Eat it and you'll understand async/await. Maybe.", icon: "🍄", found: false, position: [-2, 0.3, -5], room: "garden" },
  // Cave
  { id: "cave-1", name: "Abandoned Prototype", description: "The project that taught me what NOT to do.", icon: "🕸️", found: false, position: [0, 1, -8], room: "cave" },
  { id: "cave-2", name: "TODO Comment", description: "// TODO: remove this later. Written 3 years ago.", icon: "📋", found: false, position: [2, 0.5, -9], room: "cave" },
  { id: "cave-3", name: "Mineral of Persistence", description: "Formed under extreme pressure. Like debugging production at 2am.", icon: "🪨", found: false, position: [-1, 0.8, -10], room: "cave" },
  // Docks
  { id: "dock-1", name: "Signal Flag", description: "Flag 'C' — Charlie. 'Yes, I'm available for work.'", icon: "🚩", found: false, position: [10, 2, 10], room: "docks" },
  { id: "dock-2", name: "Anchor", description: "Heavy, reliable, and keeps things grounded.", icon: "⚓", found: false, position: [12, 0.5, 12], room: "docks" },
];

export const useGameStore = create<GameState>((set, get) => ({
  currentRoom: "island",
  isTransitioning: false,
  playerPosition: [0, 2, 15],
  playerRotation: 0,
  isPointerLocked: false,
  inventory: [],
  showInventory: false,
  showMap: false,
  musicPlaying: false,
  musicVolume: 0.3,
  collectibles: defaultCollectibles,
  totalCollectibles: defaultCollectibles.length,
  visitedRooms: ["island"],

  enterRoom: (room) => {
    set({ isTransitioning: true, currentRoom: room });
    const state = get();
    if (!state.visitedRooms.includes(room)) {
      set({ visitedRooms: [...state.visitedRooms, room] });
    }
    setTimeout(() => set({ isTransitioning: false }), 1200);
  },

  exitRoom: () => {
    set({ isTransitioning: true, currentRoom: "island" });
    setTimeout(() => set({ isTransitioning: false }), 1200);
  },

  setTransitioning: (v) => set({ isTransitioning: v }),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setPlayerRotation: (rot) => set({ playerRotation: rot }),
  setPointerLocked: (v) => set({ isPointerLocked: v }),

  collectItem: (id) => {
    const state = get();
    const item = state.collectibles.find((c) => c.id === id);
    if (item && !item.found) {
      set({
        collectibles: state.collectibles.map((c) =>
          c.id === id ? { ...c, found: true } : c
        ),
        inventory: [...state.inventory, id],
      });
    }
  },

  toggleInventory: () => set((s) => ({ showInventory: !s.showInventory, showMap: false })),
  toggleMap: () => set((s) => ({ showMap: !s.showMap, showInventory: false })),
  toggleMusic: () => set((s) => ({ musicPlaying: !s.musicPlaying })),
  setMusicVolume: (v) => set({ musicVolume: v }),
  visitRoom: (room) => {
    const state = get();
    if (!state.visitedRooms.includes(room)) {
      set({ visitedRooms: [...state.visitedRooms, room] });
    }
  },
}));
