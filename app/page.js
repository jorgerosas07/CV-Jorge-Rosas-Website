"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import { cvData } from "../data";
import MagneticWrap from "./components/MagneticWrap";
import PriceLine from "./components/PriceLine";

// ─── Motion Design Tokens ──────────────────────────────────────────────────────
// Expo-out: sub-second snap in, graceful ease out — reads intentional, not default
const EASE = [0.22, 1.0, 0.36, 1.0];

const T = (delay = 0, duration = 0.65) => ({
  duration,
  ease: EASE,
  delay,
});

// Section entry: y offset + opacity
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: T() },
};

// Container stagger — children animate sequentially
const staggerContainer = (staggerChildren = 0.07) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren: 0.04 },
  },
});

// Skills — tighter stagger for the marquee fallback grid
const skillItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: T(0, 0.45) },
};

// ─── Hero: Word Mask Reveal ────────────────────────────────────────────────────
// Each word sits in an overflow:hidden clip box. The word slides up from 110%
// (hidden below the clip) to 0%. Staggered by 80ms per word.
// Falls back to a plain h1 under prefers-reduced-motion.
function HeroTitle({ name }) {
  const prefersReduced = useReducedMotion();
  const words = name.split(" ");

  if (prefersReduced) {
    return <h1 className={styles.heroTitle}>{name}</h1>;
  }

  return (
    <h1 className={styles.heroTitle} aria-label={name}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.28em",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={T(0.08 + i * 0.08, 0.78)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Bento Tilt Card ──────────────────────────────────────────────────────────
// rotateX / rotateY driven by cursor offset within the card bounds.
// Max ±7°, spring return on mouse leave.
// Disabled on touch devices and under prefers-reduced-motion.
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const rX = useSpring(0, { stiffness: 220, damping: 28 });
  const rY = useSpring(0, { stiffness: 220, damping: 28 });

  const onMove = useCallback(
    (e) => {
      if (prefersReduced || isTouchRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rY.set(nx * 14); // ±7° max
      rX.set(-ny * 14);
    },
    [prefersReduced, rX, rY]
  );

  const onLeave = useCallback(() => {
    rX.set(0);
    rY.set(0);
  }, [rX, rY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeInUp}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor
    >
      {children}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Hero parallax: bg moves at 0.4× scroll speed
  const heroParallax = useTransform(
    scrollY,
    [0, 600],
    [0, prefersReduced ? 0 : -160]
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="about" className={styles.hero} ref={heroRef}>
        <motion.div
          className={styles.heroBg}
          style={{ y: heroParallax }}
          aria-hidden="true"
        />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <HeroTitle name={cvData.name} />

            <motion.p
              className={styles.heroSubtitle}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={T(0.56, 0.7)}
            >
              {cvData.hero.subtitle}
            </motion.p>

            <motion.div
              className={styles.heroActions}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={T(0.74, 0.7)}
            >
              <MagneticWrap>
                <a href="#contact" className="btn">
                  Initiate Contact
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href={cvData.cv}
                  download="Jorge_Rosas_CV.pdf"
                  className="btnGhost"
                >
                  Download CV
                </a>
              </MagneticWrap>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroImageWrapper}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={T(0.2, 0.95)}
          >
            <Image
              src="/profile.jpg"
              alt="Jorge Rosas"
              fill
              className={styles.heroImage}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Scroll-scrubbed Transition ───────────────────────────────────── */}
      <PriceLine />

      {/* ── Education ────────────────────────────────────────────────────── */}
      <motion.section
        id="education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeInUp} className="overline">
          // Academic Architecture
        </motion.div>
        {/* perspective on the grid parent makes rotateX/Y read as 3D depth */}
        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.08)}
          style={{ perspective: "1200px" }}
        >
          {cvData.education.map((edu, i) => (
            <TiltCard key={i} className={styles.bentoBox}>
              <div className={styles.bentoHeader}>
                <h3 className={styles.bentoTitle}>{edu.institution}</h3>
                <p className={styles.bentoSubtitle}>{edu.degree}</p>
                <span className={styles.bentoDate}>{edu.date}</span>
              </div>
              {edu.image && (
                <div className={styles.bentoImageContainer}>
                  <Image
                    src={edu.image}
                    alt={edu.institution}
                    fill
                    className={`${styles.bentoImage} ${
                      edu.logo ? styles.bentoImageContain : ""
                    }`}
                  />
                </div>
              )}
              <ul className={styles.bentoBullets}>
                {edu.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeInUp} className="overline">
          // Professional Execution
        </motion.div>
        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.08)}
          style={{ perspective: "1200px" }}
        >
          {cvData.experience.map((exp, i) => (
            <TiltCard key={i} className={styles.bentoBox}>
              <div className={styles.bentoHeader}>
                <h3 className={styles.bentoTitle}>{exp.company}</h3>
                <p className={styles.bentoSubtitle}>{exp.role}</p>
                <span className={styles.bentoDate}>{exp.date}</span>
              </div>
              {exp.image && (
                <div className={styles.bentoImageContainer}>
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    className={`${styles.bentoImage} ${
                      exp.logo ? styles.bentoImageContain : ""
                    }`}
                  />
                </div>
              )}
              <ul className={styles.bentoBullets}>
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {exp.pitches && (
                <div className={styles.pitchDownloads}>
                  {exp.pitches.map((pitch, j) => (
                    <MagneticWrap key={j} strength={0.25} max={8}>
                      <a
                        href={pitch.url}
                        download
                        className={styles.downloadTag}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {pitch.name}
                      </a>
                    </MagneticWrap>
                  ))}
                </div>
              )}
            </TiltCard>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Capabilities — Marquee ────────────────────────────────────────── */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeInUp} className="overline">
          // Core Capabilities
        </motion.div>

        {/* Marquee strip — skills loop infinitely left */}
        <motion.div variants={fadeInUp} className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Rendered twice so the loop is seamless */}
            {[...cvData.skills, ...cvData.skills].map((skill, i) => (
              <span key={i} className={styles.marqueeItem}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ── Achievements ─────────────────────────────────────────────────── */}
      <motion.section
        id="achievements"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeInUp} className="overline">
          // Milestones
        </motion.div>
        <motion.ul
          className={styles.simpleList}
          variants={staggerContainer(0.09)}
        >
          {cvData.achievements.map((item, i) => (
            <motion.li key={i} variants={fadeInUp}>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <motion.section
        id="contact"
        className={styles.contactSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        variants={staggerContainer()}
      >
        <div className={styles.contactSplit}>
          <div className={styles.contactText}>
            <motion.div variants={fadeInUp} className="overline">
              // Communication Protocol
            </motion.div>
            <motion.h2 variants={fadeInUp}>Awaiting Input.</motion.h2>
            <motion.p variants={fadeInUp}>
              The architecture is established. My inbox is open for strategic
              partnerships and opportunities.
            </motion.p>
            <motion.div variants={fadeInUp} className={styles.heroActions}>
              <MagneticWrap>
                <a href={`mailto:${cvData.email}`} className="btn">
                  Send Email
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href={cvData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  LinkedIn
                </a>
              </MagneticWrap>
            </motion.div>
          </div>

          {/* Contact photo: slides in from right when section enters viewport */}
          <motion.div
            className={styles.contactImageWrapper}
            initial={prefersReduced ? false : { opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={T(0.35, 0.9)}
          >
            <Image
              src="/profile.jpg"
              alt="Jorge Rosas"
              fill
              className={styles.contactImageLarge}
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
