"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "../page.module.css";

export default function PriceLine() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to horizontal translation (-100% to 0%)
  const x = useTransform(scrollYProgress, [0.2, 0.8], ["-100%", "0%"]);
  
  // Fade in at the start, fade out at the end, so it doesn't pop abruptly
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  if (prefersReduced || isMobile) {
    return (
      <div className={styles.priceLineStaticWrapper}>
        <div className={styles.priceLineStatic} />
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.priceLineGap}>
      <motion.div
        className={styles.priceLineAnimated}
        style={{ x, opacity }}
        aria-hidden="true"
      >
        <div className={styles.priceLineDot} />
      </motion.div>
    </div>
  );
}
