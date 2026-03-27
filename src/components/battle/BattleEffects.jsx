import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from "react";
import {
  createSlashEffect, createMagicBurst,
  createHealSparkles, createBuffSparkles,
  createDeathParticles,
  updateParticles, drawParticles, getMagicColor,
} from "../../utils/battleParticles";

const BattleEffects = forwardRef(function BattleEffects({ width, height }, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Expose triggerEffect to parent
  useImperativeHandle(ref, () => ({
    triggerEffect(type, { x, y, color, direction }) {
      let newParticles = [];
      switch (type) {
        case "slash":
          newParticles = createSlashEffect(x, y, direction || 1);
          break;
        case "magic":
          newParticles = createMagicBurst(x, y, color || getMagicColor("default"));
          break;
        case "heal":
          newParticles = createHealSparkles(x, y);
          break;
        case "buff":
          newParticles = createBuffSparkles(x, y, color || "#3498db");
          break;
        case "death":
          newParticles = createDeathParticles(x, y);
          break;
      }
      particlesRef.current.push(...newParticles);
    },
    clear() {
      particlesRef.current = [];
    },
  }));

  const loop = useCallback((now) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dt = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = now;

    // Update
    updateParticles(particlesRef.current, dt);

    // Draw
    ctx.clearRect(0, 0, width, height);
    if (particlesRef.current.length > 0) {
      drawParticles(ctx, particlesRef.current, width, height);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [width, height]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
});

export default BattleEffects;
