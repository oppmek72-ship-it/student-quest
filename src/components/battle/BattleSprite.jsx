import { useRef, useEffect, useMemo, useCallback } from "react";
import { renderPixelAvatar, W, H } from "../avatar/PixelAvatar";
import { getAnimation, ANIM_DURATIONS } from "../../utils/battleAnimations";

export default function BattleSprite({
  avatar,
  size = 80,
  animState = "idle",
  facing = "right",
  onAnimEnd,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const prevAnimRef = useRef(animState);

  // Offscreen canvas for drawing the base character once
  const offscreen = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    return c;
  }, []);

  // Redraw base character when avatar changes
  const avatarKey = useMemo(() => JSON.stringify(avatar), [avatar]);
  useEffect(() => {
    if (offscreen) {
      renderPixelAvatar(offscreen, avatar);
    }
  }, [avatarKey, offscreen]);

  // Reset start time when animation changes
  useEffect(() => {
    if (animState !== prevAnimRef.current) {
      startTimeRef.current = null;
      prevAnimRef.current = animState;
    }
  }, [animState]);

  const dir = facing === "left" ? -1 : 1;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !offscreen) return;

    const ctx = canvas.getContext("2d");
    const now = performance.now();

    if (startTimeRef.current === null) {
      startTimeRef.current = now;
    }

    const duration = ANIM_DURATIONS[animState] || 2000;
    const elapsed = now - startTimeRef.current;
    const isLoop = animState === "idle";

    let t;
    if (isLoop) {
      t = (elapsed % duration) / duration;
    } else {
      t = Math.min(1, elapsed / duration);
    }

    // Get pose from animation function
    const animFn = getAnimation(animState);
    const pose = animFn(t);

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Save and apply transforms
    ctx.save();

    // Center point for transforms
    const cx = W / 2;
    const cy = H / 2;

    // Apply opacity
    ctx.globalAlpha = pose.opacity;

    // Translate to center, apply rotation + scale, translate back
    ctx.translate(cx, cy);

    // Flip for facing direction
    if (facing === "left") {
      ctx.scale(-1, 1);
    }

    // Apply pose offset (in pixel space, direction-aware)
    // offsetX is always "toward enemy" so we use it directly
    ctx.translate(pose.offsetX * dir * (facing === "left" ? -1 : 1), pose.offsetY);

    // Apply rotation
    if (pose.rotation) {
      ctx.rotate(pose.rotation);
    }

    // Apply scale
    ctx.scale(pose.scaleX, pose.scaleY);

    // Draw character centered
    ctx.translate(-cx, -cy);
    ctx.drawImage(offscreen, 0, 0);

    // Apply tint overlay
    if (pose.tintColor && pose.tintOpacity > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = pose.tintOpacity;
      ctx.fillStyle = pose.tintColor;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();

    // Check if one-shot animation is done
    if (!isLoop && t >= 1) {
      onAnimEnd?.();
      // Don't schedule next frame for this animation
      // Fall through to idle — parent should update animState
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [animState, facing, dir, offscreen, onAnimEnd]);

  // Start/restart animation loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const displayH = size * (H / W);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{
        width: size,
        height: displayH,
        imageRendering: "pixelated",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
