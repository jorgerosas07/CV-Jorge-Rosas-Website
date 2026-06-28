"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export default function Cursor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // safe default for SSR

  // Dot — fast, almost instant
  const dotX = useSpring(0, { stiffness: 900, damping: 55 });
  const dotY = useSpring(0, { stiffness: 900, damping: 55 });
  // Ring — laggy follow
  const ringX = useSpring(0, { stiffness: prefersReduced ? 900 : 130, damping: prefersReduced ? 55 : 20 });
  const ringY = useSpring(0, { stiffness: prefersReduced ? 900 : 130, damping: prefersReduced ? 55 : 20 });
  const ringScale = useSpring(1, { stiffness: 280, damping: 22 });

  useEffect(() => {
    // Touch detection — run once on mount, safe from SSR
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    const onMove = (e) => {
      setVisible(true);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onEnter = () => ringScale.set(1.8);
    const onLeave = () => ringScale.set(1);

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    attach();

    // Re-attach when DOM changes (dynamic content)
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render on touch devices or before first mouse move
  if (isTouch || !visible) return null;

  return (
    <>
      {/* Dot — fast, mix-blend for inversion on light bg */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 99999,
          mixBlendMode: "difference",
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#ffffff",
        }}
      />
      {/* Ring — laggy trail */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 99998,
          x: ringX, y: ringY, scale: ringScale,
          translateX: "-50%", translateY: "-50%",
          width: 40, height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.55)",
        }}
      />
    </>
  );
}
