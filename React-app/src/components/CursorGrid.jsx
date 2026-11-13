import { useEffect, useRef } from "react";

import "./CursorGrid.css";

const STYLES = new Set(["lines", "dashed", "dots", "crosses"]);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parseHex = (hex, fallback = [255, 255, 255]) => {
  const value = String(hex || "")
    .replace("#", "")
    .trim();
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((character) => character + character)
          .join("")
      : value.slice(0, 6);
  const number = Number.parseInt(normalized, 16);
  if (Number.isNaN(number)) return fallback;
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
};

const rgba = (rgb, alpha) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${clamp(alpha, 0, 1)})`;

const falloffValue = (type, value) => {
  const amount = clamp(value, 0, 1);
  if (type === "sharp") return amount * amount * amount;
  if (type === "linear") return amount;
  return amount * amount * (3 - 2 * amount);
};

export default function CursorGrid({
  cellSize = 60,
  color,
  gridColor,
  radius = 140,
  falloff = "smooth",
  highlight = "area",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1,
  maxOpacity = 1,
  fillOpacity = 0.06,
  gridOpacity = 0.08,
  gridStyle = "lines",
  cellRadius = 0,
  cellGap = 0,
  spotlight = 0.6,
  clickPulse = true,
  pulseSpeed = 600,
  ambient = 0,
  edgeFade = 0.2,
  intro = true,
  lightMode = false,
  dpr,
  children,
  className = "",
  style,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const settingsRef = useRef({});

  settingsRef.current = {
    cellSize: Math.max(8, cellSize),
    color: parseHex(color || (lightMode ? "#18181b" : "#ffffff")),
    gridColor: parseHex(gridColor || (lightMode ? "#18181b" : "#ffffff")),
    radius: Math.max(1, radius),
    falloff,
    highlight,
    holdTime: Math.max(0, holdTime),
    fadeDuration: Math.max(16, fadeDuration),
    lineWidth: Math.max(0.25, lineWidth),
    maxOpacity: clamp(maxOpacity, 0, 1),
    fillOpacity: clamp(fillOpacity, 0, 1),
    gridOpacity: clamp(gridOpacity, 0, 1),
    gridStyle: STYLES.has(gridStyle) ? gridStyle : "lines",
    cellRadius: Math.max(0, cellRadius),
    cellGap: Math.max(0, cellGap),
    spotlight: clamp(spotlight, 0, 1),
    clickPulse,
    pulseSpeed: Math.max(1, pulseSpeed),
    ambient: clamp(ambient, 0, 1),
    edgeFade: clamp(edgeFade, 0, 0.5),
    intro,
    dpr,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!container || !canvas || !context) return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const pointer = { x: 0, y: 0, inside: false };
    const cells = new Map();
    const pulses = [];
    const view = { width: 1, height: 1, ratio: 1 };
    let frameId = 0;
    let lastTime = performance.now();
    let introProgress = settingsRef.current.intro && !reducedMotion ? 0 : 1;
    let visible = true;

    const edgeStrength = (x, y, current) => {
      if (!current.edgeFade) return 1;
      const inset = Math.min(view.width, view.height) * current.edgeFade;
      if (!inset) return 1;
      const nearest = Math.min(x, y, view.width - x, view.height - y);
      const amount = clamp(nearest / inset, 0, 1);
      return amount * amount * (3 - 2 * amount);
    };

    const roundedRect = (x, y, width, height, radiusValue) => {
      const corner = Math.min(Math.max(radiusValue, 0), width / 2, height / 2);
      context.beginPath();
      context.roundRect(x, y, width, height, corner);
    };

    const drawBaseGrid = (current, offsetX, offsetY) => {
      context.save();
      context.lineWidth = current.lineWidth;
      context.strokeStyle = rgba(current.gridColor, current.gridOpacity * introProgress);
      context.fillStyle = rgba(current.gridColor, current.gridOpacity * introProgress);

      if (current.gridStyle === "dashed") {
        context.setLineDash([current.cellSize / 12, current.cellSize / 12]);
      }

      if (current.gridStyle === "dots" || current.gridStyle === "crosses") {
        const size = Math.max(current.lineWidth, 1);
        for (let x = offsetX; x <= view.width + current.cellSize; x += current.cellSize) {
          for (let y = offsetY; y <= view.height + current.cellSize; y += current.cellSize) {
            const fade = edgeStrength(x, y, current);
            context.globalAlpha = fade;
            if (current.gridStyle === "dots") {
              context.beginPath();
              context.arc(x, y, size * 1.25, 0, Math.PI * 2);
              context.fill();
            } else {
              const arm = current.cellSize * 0.1;
              context.beginPath();
              context.moveTo(x - arm, y);
              context.lineTo(x + arm, y);
              context.moveTo(x, y - arm);
              context.lineTo(x, y + arm);
              context.stroke();
            }
          }
        }
      } else {
        context.beginPath();
        for (let x = offsetX; x <= view.width + current.cellSize; x += current.cellSize) {
          context.moveTo(x, 0);
          context.lineTo(x, view.height);
        }
        for (let y = offsetY; y <= view.height + current.cellSize; y += current.cellSize) {
          context.moveTo(0, y);
          context.lineTo(view.width, y);
        }
        context.stroke();
      }
      context.restore();
    };

    const drawSpotlight = (current) => {
      if (!pointer.inside || current.spotlight <= 0) return;
      const gradient = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        current.radius * 1.4,
      );
      gradient.addColorStop(0, rgba(current.color, current.gridOpacity * current.spotlight * 0.42));
      gradient.addColorStop(1, rgba(current.color, 0));
      context.fillStyle = gradient;
      context.fillRect(0, 0, view.width, view.height);
    };

    const drawLitCells = (current, offsetX, offsetY, now) => {
      const size = current.cellSize;
      const gap = current.cellGap;
      for (const [key, state] of cells) {
        const [column, row] = key.split(":").map(Number);
        const elapsed = now - state.touched;
        const fade =
          elapsed <= current.holdTime
            ? 1
            : 1 - (elapsed - current.holdTime) / Math.max(current.fadeDuration, 1);
        const level = state.strength * clamp(fade, 0, 1);
        if (level <= 0.002) {
          cells.delete(key);
          continue;
        }

        const x = offsetX + column * size + gap;
        const y = offsetY + row * size + gap;
        const tileSize = size - gap * 2;
        const edge = edgeStrength(x + tileSize / 2, y + tileSize / 2, current);
        const opacity = level * edge * introProgress;

        roundedRect(x, y, tileSize, tileSize, current.cellRadius);
        context.fillStyle = rgba(current.color, current.fillOpacity * opacity);
        context.fill();
        context.lineWidth = current.lineWidth;
        context.strokeStyle = rgba(current.color, current.maxOpacity * opacity);
        context.stroke();
      }
    };

    const drawPulses = (current, now) => {
      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        const pulse = pulses[index];
        const elapsed = (now - pulse.started) / 1000;
        const pulseRadius = elapsed * current.pulseSpeed;
        const maximum = Math.hypot(view.width, view.height);
        if (pulseRadius > maximum) {
          pulses.splice(index, 1);
          continue;
        }
        context.beginPath();
        context.arc(pulse.x, pulse.y, pulseRadius, 0, Math.PI * 2);
        context.strokeStyle = rgba(current.color, 0.35 * (1 - pulseRadius / maximum));
        context.lineWidth = Math.max(1, current.lineWidth * 1.5);
        context.stroke();
      }
    };

    const draw = (now = performance.now()) => {
      const current = settingsRef.current;
      const size = current.cellSize;
      const columns = Math.ceil(view.width / size) + 1;
      const rows = Math.ceil(view.height / size) + 1;
      const offsetX = (view.width - columns * size) / 2;
      const offsetY = (view.height - rows * size) / 2;

      context.setTransform(view.ratio, 0, 0, view.ratio, 0, 0);
      context.clearRect(0, 0, view.width, view.height);
      drawBaseGrid(current, offsetX, offsetY);
      drawSpotlight(current);
      drawLitCells(current, offsetX, offsetY, now);
      drawPulses(current, now);
    };

    const energize = (x, y, now) => {
      const current = settingsRef.current;
      const size = current.cellSize;
      const columns = Math.ceil(view.width / size) + 1;
      const rows = Math.ceil(view.height / size) + 1;
      const offsetX = (view.width - columns * size) / 2;
      const offsetY = (view.height - rows * size) / 2;
      const centerColumn = Math.floor((x - offsetX) / size);
      const centerRow = Math.floor((y - offsetY) / size);
      const reach = current.highlight === "cell" ? 0 : Math.ceil(current.radius / size);

      for (let row = centerRow - reach; row <= centerRow + reach; row += 1) {
        for (let column = centerColumn - reach; column <= centerColumn + reach; column += 1) {
          if (column < 0 || row < 0 || column >= columns || row >= rows) {
            continue;
          }
          const centerX = offsetX + column * size + size / 2;
          const centerY = offsetY + row * size + size / 2;
          const distance = Math.hypot(centerX - x, centerY - y);
          if (reach && distance > current.radius) continue;
          const strength =
            current.highlight === "cell"
              ? 1
              : falloffValue(current.falloff, 1 - distance / current.radius);
          const key = `${column}:${row}`;
          const previous = cells.get(key);
          cells.set(key, {
            strength: Math.max(previous?.strength || 0, strength),
            touched: now,
          });
        }
      }
    };

    const animate = (now) => {
      frameId = 0;
      if (!visible || document.hidden) return;
      const current = settingsRef.current;
      const delta = clamp((now - lastTime) / 1000, 0, 0.05);
      lastTime = now;

      if (introProgress < 1) {
        introProgress = Math.min(1, introProgress + delta / 1.4);
      }

      if (current.ambient > 0 && !reducedMotion && Math.random() < current.ambient * delta * 2) {
        energize(Math.random() * view.width, Math.random() * view.height, now);
      }

      draw(now);
      if (
        pointer.inside ||
        cells.size ||
        pulses.length ||
        introProgress < 1 ||
        (current.ambient > 0 && !reducedMotion)
      ) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const wake = () => {
      if (!frameId && visible && !document.hidden) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      view.width = Math.max(1, container.clientWidth);
      view.height = Math.max(1, container.clientHeight);
      view.ratio = Math.min(settingsRef.current.dpr || window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(view.width * view.ratio));
      canvas.height = Math.max(1, Math.round(view.height * view.ratio));
      canvas.style.width = `${view.width}px`;
      canvas.style.height = `${view.height}px`;
      draw();
      wake();
    };

    const locate = (event) => {
      const bounds = container.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      return {
        x,
        y,
        inside: x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height,
      };
    };

    const onPointerMove = (event) => {
      const location = locate(event);
      pointer.x = location.x;
      pointer.y = location.y;
      pointer.inside = location.inside;
      if (location.inside) {
        energize(location.x, location.y, performance.now());
      }
      wake();
    };

    const onPointerDown = (event) => {
      const location = locate(event);
      if (!location.inside || !settingsRef.current.clickPulse || reducedMotion) {
        return;
      }
      pulses.push({
        x: location.x,
        y: location.y,
        started: performance.now(),
      });
      wake();
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    });
    intersectionObserver.observe(container);

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", onPointerDown, {
      passive: true,
    });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", wake);

    resize();
    if (introProgress < 1) {
      pulses.push({
        x: view.width / 2,
        y: view.height / 2,
        started: performance.now(),
      });
    }
    wake();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cursor-grid${className ? ` ${className}` : ""}`}
      style={style}
    >
      <canvas ref={canvasRef} className="cursor-grid__canvas" aria-hidden="true" />
      {children ? <div className="cursor-grid__content">{children}</div> : null}
    </div>
  );
}
