"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "../theme-provider";

/**
 * HexTechBackground
 *
 * A high-performance tech background using HTML5 Canvas.
 * - Background: "Falling Comets" (diagonal glowing lines).
 * - Foreground: Static black hexagon grid with gaps.
 * - Effect: The glow "peeks" through the cracks between hexagons.
 *
 * Optimizations:
 * - Decoupled rendering: Two separate canvases.
 *   1. bgCanvas: Draws the animated comets. Blurred via CSS (GPU).
 *   2. gridCanvas: Draws the static hexagon grid once at z-index 1.
 * - Removed per-frame Canvas API filter/shadowBlur calls (extremely expensive).
 */
const HexTechBackground = ({
  className,
  hexSize = 20,
  gap = 1,

  // Comet properties
  lineCount = 25,
  speed = 1.0, // General speed multiplier
  minLength = 100,
  maxLength = 1000,
}) => {
  const bgCanvasRef = useRef(null);
  const gridCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Update theme ref whenever theme changes
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // 1. Static Grid Layer
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Create hexagon path once
    const createHexagonPath = (size) => {
      const path = new Path2D();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        const px = size * Math.cos(angle);
        const py = size * Math.sin(angle);
        if (i === 0) path.moveTo(px, py);
        else path.lineTo(px, py);
      }
      path.closePath();
      return path;
    };

    const renderGrid = (width, height) => {
      ctx.clearRect(0, 0, width, height);

      // Use theme-aware colors: dark mode = dark hex, light mode = light hex
      const resolvedTheme =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;
      const isDark = resolvedTheme === "dark";
      ctx.fillStyle = isDark ? "#1f1f1fff" : "#f0f0f0ff";

      const gridR = hexSize + gap;
      const xStep = Math.sqrt(3) * gridR;
      const yStep = 1.5 * gridR;

      const cols = Math.ceil(width / xStep) + 2;
      const rows = Math.ceil(height / yStep) + 2;

      const hexPath = createHexagonPath(hexSize);

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const xOffset = row % 2 !== 0 ? xStep / 2 : 0;
          const x = col * xStep + xOffset;
          const y = row * yStep;
          
          ctx.translate(x, y);
          ctx.fill(hexPath);
          ctx.translate(-x, -y);
        }
      }
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      // Remove inline style setting for width/height as it's handled by className/Tailwind
      
      renderGrid(width * dpr, height * dpr);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);
    resize();

    return () => {
      observer.disconnect();
    };
  }, [hexSize, gap, theme]);

  // 2. Animated Background Layer (Comets)
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let items = [];

    const angle = Math.PI / 4;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    const createItem = (w, h) => {
      // Check current theme for trail colors
      const resolvedTheme =
        themeRef.current === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : themeRef.current;
      const isDark = resolvedTheme === "dark";

      return {
        x: Math.random() * (w + h) - h,
        y: Math.random() * (h + w) - w,
        speed: (Math.random() * 0.5 + 0.5) * speed * 2,
        length: minLength + Math.random() * (maxLength - minLength),
        width: Math.random() * 5 + 10,
        color: !isDark
          ? `hsl(0, 0%, ${Math.random() * 5}%)` // Dark mode: black/very dark gray (0-5%)
          : `hsl(${Math.random() * 40 + 10}, 90%, 60%)`, // Light mode: colorful yellow/orange
      };
    };

    const initItems = (w, h) => {
      items = [];
      for (let i = 0; i < lineCount; i++) {
        items.push(createItem(w, h));
      }
    };

    const update = (w, h) => {
      items.forEach((item) => {
        item.x += dx * item.speed;
        item.y += dy * item.speed;

        const margin = item.length;
        const isOffScreen = item.x - margin > w || item.y - margin > h;

        if (isOffScreen) {
          if (Math.random() > 0.5) {
            item.x = Math.random() * w;
            item.y = -item.length;
          } else {
            item.x = -item.length;
            item.y = Math.random() * h;
          }
        }
      });
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with transparency
      ctx.clearRect(0, 0, w, h);

      items.forEach((item) => {
        const headX = item.x;
        const headY = item.y;
        const tailX = item.x - dx * item.length;
        const tailY = item.y - dy * item.length;

        const r = item.width / 2;

        const gradient = ctx.createLinearGradient(headX, headY, tailX, tailY);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(headX, headY, r, angle - Math.PI / 2, angle + Math.PI / 2);
        ctx.lineTo(tailX, tailY);
        ctx.closePath();
        ctx.fill();
      });

      update(w, h);
      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      // Inline styles handled by Tailwind classes

      if (items.length === 0) initItems(width, height);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);

    resize();
    initItems(container.clientWidth, container.clientHeight);
    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineCount, speed, minLength, maxLength, theme]);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}
    >
      {/* Animated comets layer */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 z-10 w-full h-full"
      />

      {/* Foreground Layer: Static Hexagon Grid. Sharp. */}
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 z-20 w-full h-full"
      />
    </div>
  );
};

export default HexTechBackground;
