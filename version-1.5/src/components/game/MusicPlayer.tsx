"use client";

import { useRef, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicPlaying = useGameStore((s) => s.musicPlaying);
  const musicVolume = useGameStore((s) => s.musicVolume);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = musicVolume;
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  return null;
}
