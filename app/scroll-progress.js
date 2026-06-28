"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "rgba(255,255,255,0.9)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99997,
        pointerEvents: "none",
      }}
    />
  );
}
