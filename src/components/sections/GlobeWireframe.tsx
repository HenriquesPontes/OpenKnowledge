"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [0.3365, 6.7273] as [number, number], size: 0.06 },
  { location: [14.933, -23.513] as [number, number], size: 0.05 },
  { location: [11.863, -15.584] as [number, number], size: 0.05 },
  { location: [-8.838, 13.234] as [number, number], size: 0.06 },
];

const ARCS = [
  { from: MARKERS[0].location, to: MARKERS[1].location },
  { from: MARKERS[1].location, to: MARKERS[2].location },
  { from: MARKERS[2].location, to: MARKERS[3].location },
  { from: MARKERS[3].location, to: MARKERS[0].location },
];

export function GlobeWireframe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let globe: ReturnType<typeof createGlobe> | undefined;
    let phi = 0;
    let frame = 0;
    let lastCss = 0;

    function create(cssSize: number) {
      if (!canvas || cssSize < 8) return;
      lastCss = cssSize;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const buffer = Math.min(Math.floor(cssSize * dpr), 2048);

      globe?.destroy();
      globe = createGlobe(canvas, {
        devicePixelRatio: 1,
        width: buffer,
        height: buffer,
        phi,
        theta: 0.28,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.82, 0.82, 0.82],
        markerColor: [1, 1, 1],
        glowColor: [0.45, 0.45, 0.45],
        markers: MARKERS,
        arcs: ARCS,
        arcColor: [0.85, 0.85, 0.85],
        arcWidth: 0.4,
        arcHeight: 0.28,
        scale: 1,
      });
      globe.update({ phi });
    }

    const observer = new ResizeObserver((entries) => {
      const cssSize = Math.floor(entries[0]?.contentRect.width ?? 0);
      if (Math.abs(cssSize - lastCss) < 2) return;
      create(cssSize);
    });
    observer.observe(wrapper);

    const animate = () => {
      phi += 0.003;
      globe?.update({ phi });
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      globe?.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full w-full" aria-hidden="true">
      <GlobeFallback />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

function GlobeFallback() {
  return (
    <svg
      viewBox="0 0 800 800"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <circle
        cx="400"
        cy="400"
        r="280"
        fill="none"
        stroke="#454545"
        strokeWidth="1.2"
      />
      {[-60, -30, 0, 30, 60].map((deg) => {
        const x = 400 + 280 * Math.sin((deg * Math.PI) / 180);
        return (
          <ellipse
            key={deg}
            cx={x}
            cy="400"
            rx={Math.abs(280 * Math.cos((deg * Math.PI) / 180)) * 0.22 + 8}
            ry="280"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        );
      })}
      {[-50, -25, 0, 25, 50].map((lat) => {
        const y = 400 - 280 * Math.sin((lat * Math.PI) / 180);
        const rx = 280 * Math.cos((lat * Math.PI) / 180);
        return (
          <ellipse
            key={lat}
            cx="400"
            cy={y}
            rx={rx}
            ry={18 + Math.abs(lat) * 0.12}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
