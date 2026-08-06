"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const NODE_COUNT = 34;
const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 160;

/**
 * Ambient network of drifting, self-connecting nodes behind the Hero
 * headline. It's not decorative noise — it's the visual thesis of the
 * product: scattered points that Kinalia pulls into connected data.
 * Respects prefers-reduced-motion by rendering a static frame.
 */
export default function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const inkColor = "26, 46, 31";
    const terracottaColor = "193, 96, 60";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distToMouse) / MOUSE_RADIUS;
          node.x += (dx / distToMouse) * force * 1.2;
          node.y += (dy / distToMouse) * force * 1.2;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgba(${inkColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const distToMouse = Math.hypot(
          node.x - mouseRef.current.x,
          node.y - mouseRef.current.y
        );
        const isNear = distToMouse < MOUSE_RADIUS;
        ctx.fillStyle = isNear
          ? `rgba(${terracottaColor}, 0.9)`
          : `rgba(${inkColor}, 0.45)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    seed();
    draw();

    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 h-full w-full opacity-70"
    />
  );
}