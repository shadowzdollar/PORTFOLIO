"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import rough from "roughjs/bundled/rough.cjs.js";

/* ═══════════════════════════════════════════════════
   ROUGH RECTANGLE — hand-drawn border for cards/panels
   ═══════════════════════════════════════════════════ */
export function RoughRect({
  width,
  height,
  stroke = "#9a5c35",
  fill,
  strokeWidth = 1.5,
  roughness = 1.5,
  className = "",
  style = {},
}: {
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  roughness?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rc = rough.svg(svg);
    const node = rc.rectangle(4, 4, width - 8, height - 8, {
      stroke,
      strokeWidth,
      roughness,
      fill: fill || "transparent",
      fillStyle: fill ? "hachure" : "solid",
      hachureAngle: -41,
      hachureGap: 6,
    });
    svg.appendChild(node);
  }, [width, height, stroke, fill, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
    />
  );
}

/* ═══════════════════════════════════════════════════
   ROUGH CIRCLE — hand-drawn circle for decorations
   ═══════════════════════════════════════════════════ */
export function RoughCircle({
  diameter,
  stroke = "#9a5c35",
  fill,
  strokeWidth = 1.5,
  roughness = 2,
  className = "",
}: {
  diameter: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  roughness?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rc = rough.svg(svg);
    const cx = diameter / 2;
    const cy = diameter / 2;
    const r = diameter / 2 - 4;
    const node = rc.circle(cx, cy, r * 2, {
      stroke,
      strokeWidth,
      roughness,
      fill: fill || "transparent",
      fillStyle: fill ? "hachure" : "solid",
    });
    svg.appendChild(node);
  }, [diameter, stroke, fill, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      width={diameter}
      height={diameter}
      className={`${className}`}
    />
  );
}

/* ═══════════════════════════════════════════════════
   ROUGH LINE — hand-drawn horizontal rule / divider
   ═══════════════════════════════════════════════════ */
export function RoughLine({
  width,
  stroke = "#9a5c35",
  strokeWidth = 1.5,
  roughness = 2,
  className = "",
}: {
  width: number;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rc = rough.svg(svg);
    const node = rc.line(10, 8, width - 10, 8, {
      stroke,
      strokeWidth,
      roughness,
    });
    svg.appendChild(node);
  }, [width, stroke, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={16}
      className={`${className}`}
    />
  );
}

/* ═══════════════════════════════════════════════════
   HAND-DRAWN BUTTON — sketchy border button
   ═══════════════════════════════════════════════════ */
export function HandDrawnButton({
  children,
  onClick,
  variant = "filled",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outline";
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));

    const rc = rough.svg(svg);
    const node = rc.rectangle(3, 3, w - 6, h - 6, {
      stroke: variant === "filled" ? "#573127" : "#9a5c35",
      strokeWidth: 2,
      roughness: 1.8,
      fill: variant === "filled" ? "#9a5c35" : "transparent",
      fillStyle: "solid",
    });
    svg.appendChild(node);
  }, [variant]);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        variant === "filled"
          ? "bg-wood-600 text-cream-50 hover:bg-wood-700"
          : "bg-transparent text-wood-700 hover:bg-wood-50"
      } ${className}`}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   HAND-DRAWN CARD — sketchy bordered card
   ═══════════════════════════════════════════════════ */
export function HandDrawnCard({
  children,
  className = "",
  fillHachure = false,
}: {
  children: React.ReactNode;
  className?: string;
  fillHachure?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));

    const rc = rough.svg(svg);
    const node = rc.rectangle(4, 4, w - 8, h - 8, {
      stroke: "#9a5c35",
      strokeWidth: 1.5,
      roughness: 1.5,
      fill: fillHachure ? "rgba(240, 230, 214, 0.3)" : "transparent",
      fillStyle: "hachure",
      hachureAngle: -41,
      hachureGap: 8,
    });
    svg.appendChild(node);
  }, [fillHachure]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HAND-DRAWN UNDERLINE — sketchy text underline
   ═══════════════════════════════════════════════════ */
export function HandDrawnUnderline({
  width,
  color = "#b85c38",
  className = "",
}: {
  width: number;
  color?: string;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";
    const rc = rough.svg(svg);
    const node = rc.line(2, 4, width - 2, 4, {
      stroke: color,
      strokeWidth: 2.5,
      roughness: 2.5,
    });
    svg.appendChild(node);
  }, [width, color]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={8}
      className={`-mt-1 ${className}`}
    />
  );
}
