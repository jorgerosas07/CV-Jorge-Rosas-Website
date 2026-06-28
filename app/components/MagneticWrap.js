"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

/**
 * MagneticWrap — wraps any child (typically a button/link) with a
 * spring-physics magnetic pull toward the cursor within a bounded radius.
 * Desktop only. Degrades to a plain span on touch + reduced-motion.
 *
 * Props:
 *   strength  {number} 0–1 — how much the element chases the cursor (default 0.35)
 *   max       {number} px  — maximum displacement in each axis (default 12)
 */
export default function MagneticWrap({ children, strength = 0.35, max = 12 }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true);

  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const onMove = useCallback(
    (e) => {
      if (prefersReduced || isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      x.set(Math.max(-max, Math.min(max, dx)));
      y.set(Math.max(-max, Math.min(max, dy)));
    },
    [prefersReduced, isTouch, x, y, strength, max]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
