"use client";

import React from "react";

export interface PerspectiveGridProps {
  /** Speed multiplier for the scrolling motion toward the horizon */
  speed?: number;
  /** Color of the grid lines */
  gridColor?: string;
  /** Color of the horizon glow */
  glowColor?: string;
  /** Enable or set intensity of horizon glow */
  glow?: boolean | number;
  /** Tilt angle / perspective rotation in degrees */
  perspective?: number;
  /** Opacity of the overall grid (0 to 1) */
  opacity?: number;
  /** How gradually the grid fades at the horizon */
  fadeSmoothness?: number;
  /** How far toward the horizon the grid stretches */
  gridLength?: number;
  /** Curve bending factor (0 is flat) */
  curve?: number;
  /** Bottom fade color or gradient */
  bottomFade?: string;
  /** Grid cell size in pixels */
  cellSize?: number;
  /** Additional custom class names */
  className?: string;
  /** Optional children rendered on top of the grid */
  children?: React.ReactNode;
}

export function PerspectiveGrid({
  speed = 1.0,
  gridColor = "rgba(107, 63, 105, 0.22)",
  glowColor = "rgba(107, 63, 105, 0.32)",
  glow = true,
  perspective = 62,
  opacity = 0.85,
  fadeSmoothness = 1.0,
  gridLength = 10.0,
  curve = 0.0,
  cellSize = 48,
  className = "",
  children,
}: PerspectiveGridProps) {
  const duration = Math.max(3 / speed, 0.5);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none max-w-full ${className}`}
      style={{ opacity, contain: "paint" }}
      aria-hidden="true"
    >
      {/* ── Horizon Light Glow ── */}
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 35% at 50% 28%, ${glowColor}, transparent 75%)`,
            opacity: typeof glow === "number" ? glow : 1.0,
          }}
        />
      )}

      {/* ── 3D Perspective Stage ── */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 30%",
        }}
      >
        {/* Infinite Scrolling Grid Plane */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "-50%",
            width: "200%",
            height: "240%",
            transform: `rotateX(${perspective}deg) translateZ(0)`,
            transformOrigin: "50% 0%",
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1.2px, transparent 1.2px),
              linear-gradient(to bottom, ${gridColor} 1.2px, transparent 1.2px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            animation: `perspective-grid-scroll ${duration}s linear infinite`,
            maskImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) ${
              18 * fadeSmoothness
            }%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 75%, transparent 98%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) ${
              18 * fadeSmoothness
            }%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 75%, transparent 98%)`,
          }}
        />
      </div>

      {/* Keyframe animation for infinite grid scrolling */}
      <style jsx global>{`
        @keyframes perspective-grid-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 ${cellSize}px;
          }
        }
      `}</style>

      {children}
    </div>
  );
}

export default PerspectiveGrid;

