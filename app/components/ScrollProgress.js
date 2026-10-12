"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "1px",
        background: "rgba(255,255,255,0.85)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99997,
        pointerEvents: "none",
      }}
    />
  );
}
