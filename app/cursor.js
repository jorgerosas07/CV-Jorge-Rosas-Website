"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const dotX = useSpring(0, { stiffness: 800, damping: 50 });
  const dotY = useSpring(0, { stiffness: 800, damping: 50 });
  const ringX = useSpring(0, { stiffness: 200, damping: 30 });
  const ringY = useSpring(0, { stiffness: 200, damping: 30 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 25 });
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleEnter = () => ringScale.set(1.8);
    const handleLeave = () => ringScale.set(1);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [dotX, dotY, ringX, ringY, ringScale]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.6)",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />
    </>
  );
}
