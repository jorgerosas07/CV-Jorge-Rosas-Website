"use client";
import { useEffect } from "react";
import { motion, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";

export default function Orbs() {
  const prefersReduced = useReducedMotion();
  // Low stiffness = slow, dreamy follow
  const mouseX = useSpring(0, { stiffness: 22, damping: 18 });
  const mouseY = useSpring(0, { stiffness: 22, damping: 18 });
  const { scrollY } = useScroll();

  // Each orb moves at a different multiplier — creates depth parallax
  const orb1X = useTransform(mouseX, (v) => v * 0.55);
  const orb1Y = useTransform(mouseY, (v) => v * 0.55);
  const orb2X = useTransform(mouseX, (v) => v * -0.38);
  const orb2Y = useTransform(mouseY, (v) => v * -0.38);
  const orb3X = useTransform(mouseX, (v) => v * 0.22);
  const orb3ScrollY = useTransform(scrollY, [0, 2000], [0, -80]);

  useEffect(() => {
    if (prefersReduced) return;
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 70);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 70);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [prefersReduced, mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        zIndex: 0, pointerEvents: "none", overflow: "hidden",
      }}
    >
      <motion.div
        className="orb orb1"
        style={prefersReduced ? {} : { x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="orb orb2"
        style={prefersReduced ? {} : { x: orb2X, y: orb2Y }}
      />
      <motion.div
        className="orb orb3"
        style={prefersReduced ? {} : { x: orb3X, y: orb3ScrollY }}
      />
    </div>
  );
}
