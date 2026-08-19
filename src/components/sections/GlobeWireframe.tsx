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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    let phi = 0;
    let frame = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.82, 0.82, 0.82],
      markerColor: [1, 1, 1],
      glowColor: [0.18, 0.18, 0.18],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.72, 0.72, 0.72],
      arcWidth: 0.4,
      arcHeight: 0.28,
      scale: 1,
    });

    const animate = () => {
      phi += 0.003;
      globe.update({
        phi,
        width: width * 2,
        height: width * 2,
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full aspect-square"
    />
  );
}
