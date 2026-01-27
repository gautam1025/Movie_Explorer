import { useRef, useEffect } from 'react';

/**
 * Custom hook for GPU-accelerated 3D tilt effect using requestAnimationFrame and CSS transforms.
 * Avoids React state updates for smooth 60fps animations.
 *
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 10)
 * @param {number} options.perspective - Perspective value in px (default: 1000)
 * @param {number} options.scale - Scale factor on hover (default: 1.04)
 * @param {number} options.translateY - Y translation on hover (default: -6)
 * @returns {Object} - { tiltRef, handleMouseMove, handleMouseLeave }
 */
export function useTilt({
  maxTilt = 10,
  perspective = 1000,
  scale = 1.04,
  translateY = -6
} = {}) {
  const tiltRef = useRef(null);
  const rafId = useRef(null);

  // Cache calculations to reduce per-frame computations
  const cached = useRef({
    rect: null,
    centerX: 0,
    centerY: 0
  });

  const updateTilt = (e) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Apply transform directly to DOM element for GPU acceleration
    tiltRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`;
  };

  const resetTilt = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = '';
  };

  const handleMouseMove = (e) => {
    // Cancel previous frame if still pending
    if (rafId.current) cancelAnimationFrame(rafId.current);

    // Schedule update for next frame
    rafId.current = requestAnimationFrame(() => updateTilt(e));
  };

  const handleMouseLeave = () => {
    // Cancel any pending animation frame
    if (rafId.current) cancelAnimationFrame(rafId.current);

    // Reset transform immediately
    resetTilt();
  };

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    // Add will-change for GPU acceleration hint
    element.style.willChange = 'transform';
    element.style.transformStyle = 'preserve-3d';
    element.style.backfaceVisibility = 'hidden';

    // Cleanup on unmount
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      element.style.willChange = '';
    };
  }, []);

  return {
    tiltRef,
    handleMouseMove,
    handleMouseLeave
  };
}
