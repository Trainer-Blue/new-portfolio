"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "../theme-provider";


const HexTechBackground = ({
  className,
  hexSize = 20,
  gap = 1,

  // Comet properties
  lineCount = 25,
  speed = 0.2,
  minLength = 100,
  maxLength = 1000,
}) => {
  const bgCanvasRef = useRef(null);
  const gridCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  // Cached theme boolean — avoids matchMedia calls in animation loop
  const isDarkRef = useRef(false);

  // Resolve and cache theme whenever it changes
  useEffect(() => {
    themeRef.current = theme;
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    isDarkRef.current = resolved === "dark";
  }, [theme]);

  // 1. Static Grid Layer — createPattern, alpha: false
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // alpha: false — grid is bottom-most, no transparency needed
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const renderGrid = (width, height) => {
      ctx.clearRect(0, 0, width, height);
      const isDark = isDarkRef.current;
      const hexColor = isDark ? "#0B0B0B" : "#f0f0f0";

      const gridR = hexSize + gap;
      const xStep = Math.sqrt(3) * gridR;
      const yStep = 1.5 * gridR;

      // Single tile with 2 hex positions, tiled via createPattern
      const tileW = xStep;
      const tileH = yStep * 2;

      const tileCanvas = document.createElement("canvas");
      tileCanvas.width = Math.ceil(tileW);
      tileCanvas.height = Math.ceil(tileH);
      const tileCtx = tileCanvas.getContext("2d");

      tileCtx.fillStyle = hexColor;

      const drawHex = (cx, cy) => {
        tileCtx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i + Math.PI / 6;
          const px = cx + hexSize * Math.cos(a);
          const py = cy + hexSize * Math.sin(a);
          if (i === 0) tileCtx.moveTo(px | 0, py | 0);
          else tileCtx.lineTo(px | 0, py | 0);
        }
        tileCtx.closePath();
        tileCtx.fill();
      };

      drawHex(tileW / 2, 0);
      drawHex(tileW / 2, tileH);
      drawHex(0, yStep);
      drawHex(tileW, yStep);

      const pattern = ctx.createPattern(tileCanvas, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      renderGrid(width * dpr, height * dpr);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);
    resize();

    return () => {
      observer.disconnect();
    };
  }, [hexSize, gap, theme]);

  // 2. Animated Comets — pre-rendered sprites, integer coords
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

    // Pre-render a comet sprite for the given color, length, and width
    const createSprite = (color, length, width) => {
      const r = width / 2;
      // Sprite canvas: big enough for tail→head at 45°
      const extentX = dx * length + r;
      const extentY = dy * length + r;
      const pad = 2;
      const spriteW = Math.ceil(extentX + r + pad);
      const spriteH = Math.ceil(extentY + r + pad);
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = spriteW;
      spriteCanvas.height = spriteH;
      const sCtx = spriteCanvas.getContext("2d");

      // Head at bottom-right, tail trails to upper-left
      const headX = spriteW - r - 1;
      const headY = spriteH - r - 1;
      const tailX = headX - dx * length;
      const tailY = headY - dy * length;

      const gradient = sCtx.createLinearGradient(headX, headY, tailX, tailY);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");

      sCtx.fillStyle = gradient;
      sCtx.beginPath();
      sCtx.arc(headX, headY, r, angle - Math.PI / 2, angle + Math.PI / 2);
      sCtx.lineTo(tailX, tailY);
      sCtx.closePath();
      sCtx.fill();

      // Store head offset within sprite so drawImage can align correctly
      spriteCanvas._headOffsetX = spriteW - r - 1;
      spriteCanvas._headOffsetY = spriteH - r - 1;

      return spriteCanvas;
    };

    const createItem = (w, h) => {
      const isDark = isDarkRef.current;
      const color = isDark
        ? `hsl(${Math.random() * 40 + 10}, 90%, 60%)`
        : `hsl(0, 0%, ${Math.random() * 5}%)`;
      const length = minLength + Math.random() * (maxLength - minLength);
      const width = Math.random() * 20 + 10;

      return {
        x: Math.random() * (w + h) - h,
        y: Math.random() * (h + w) - w,
        speed: (Math.random() * 0.5 + 0.5) * speed * 2,
        length,
        width,
        color,
        sprite: createSprite(color, length, width),
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

      ctx.clearRect(0, 0, w, h);

      items.forEach((item) => {
        // Offset so sprite head aligns with item.x, item.y
        const drawX = (item.x - item.sprite._headOffsetX) | 0;
        const drawY = (item.y - item.sprite._headOffsetY) | 0;
        ctx.drawImage(item.sprite, drawX, drawY);
      });

      update(w, h);
      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

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
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {/* Top gradient fade
      <div className="absolute top-0 left-0 right-0 h-[10vh] z-5 pointer-events-none bg-gradient-to-b from-black dark:from-amber-500 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] z-5 pointer-events-none bg-gradient-to-t from-black dark:from-amber-500 to-transparent" /> */}

      {/* Animated comets layer */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 z-10 w-full h-full"
      />

      {/* Foreground Layer: Static Hexagon Grid */}
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 z-20 w-full h-full"
      />
      <div className="absolute inset-0 z-30 w-full h-full backdrop-blur-[2px]" />
    </div>
  );
};

export default HexTechBackground;
