"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useTimeOfDay, TimePeriod } from "./TimeOfDay";

/* ═══════════════════════════════════════════════════
   SOUND CONTEXT
   ═══════════════════════════════════════════════════ */
interface SoundState {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
  playClick: () => void;
  playHover: () => void;
  playPageTurn: () => void;
  playCreak: () => void;
  playTyping: () => void;
  playClockTick: () => void;
  playRain: () => void;
  stopRain: () => void;
}

const SoundContext = createContext<SoundState | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      enabled: false,
      volume: 0.3,
      toggle: () => {},
      setVolume: () => {},
      playClick: () => {},
      playHover: () => {},
      playPageTurn: () => {},
      playCreak: () => {},
      playTyping: () => {},
      playClockTick: () => {},
      playRain: () => {},
      stopRain: () => {},
    };
  }
  return ctx;
}

/* ═══════════════════════════════════════════════════
   PROCEDURAL SOUND GENERATOR
   ═══════════════════════════════════════════════════ */
function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createToneBuffer(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "sine"
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 8);
    data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
  }
  return buffer;
}

/* ═══════════════════════════════════════════════════
   SOUND PROVIDER
   ═══════════════════════════════════════════════════ */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playBuffer = useCallback(
    (buffer: AudioBuffer, vol = 1) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        source.buffer = buffer;
        gain.gain.value = volume * vol;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(0);
      } catch (e) {
        // silently fail
      }
    },
    [enabled, volume, getCtx]
  );

  // Click sound — short wooden tap
  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  // Hover sound — soft woody pop
  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  // Page turn — filtered noise sweep
  const playPageTurn = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 0.3);
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.2);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  // Wood creak — low frequency sweep
  const playCreak = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  // Typing — short clicks in rapid succession
  const playTyping = useCallback(() => {
    if (!enabled) return;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playClick(), i * 60 + Math.random() * 30);
    }
  }, [enabled, playClick]);

  // Clock tick
  const playClockTick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 1200;
      gain.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  // Rain — continuous filtered noise
  const playRain = useCallback(() => {
    if (!enabled || rainSourceRef.current) return;
    try {
      const ctx = getCtx();
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 10);
      noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1500;
      filter.Q.value = 0.5;
      const gain = ctx.createGain();
      gain.gain.value = volume * 0.08;
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(0);
      rainSourceRef.current = noise;
      rainGainRef.current = gain;
    } catch (e) {}
  }, [enabled, volume, getCtx]);

  const stopRain = useCallback(() => {
    if (rainSourceRef.current) {
      try {
        rainSourceRef.current.stop();
      } catch (e) {}
      rainSourceRef.current = null;
      rainGainRef.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopRain();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopRain]);

  return (
    <SoundContext.Provider
      value={{
        enabled,
        volume,
        toggle: () => setEnabled((e) => !e),
        setVolume,
        playClick,
        playHover,
        playPageTurn,
        playCreak,
        playTyping,
        playClockTick,
        playRain,
        stopRain,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════
   SOUND CONTROLS — toggle + volume slider
   ═══════════════════════════════════════════════════ */
export function SoundControls({ className = "" }: { className?: string }) {
  const { enabled, volume, toggle, setVolume } = useSound();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={toggle}
        className="w-8 h-8 rounded-lg bg-cream-50/90 backdrop-blur-md border border-wood-200 flex items-center justify-center text-wood-600 hover:bg-cream-50 transition-all"
        title={enabled ? "Mute sounds" : "Enable sounds"}
      >
        {enabled ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
      {enabled && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 accent-wood-500"
          title="Volume"
        />
      )}
    </div>
  );
}
