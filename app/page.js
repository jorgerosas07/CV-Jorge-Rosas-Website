"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import { cvData } from "../data";
import PriceChart from "./components/PriceChart";

const EASE = [0.22, 1.0, 0.36, 1.0];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = (staggerChildren = 0.08) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.04 } },
});

const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-8%" },
  variants: stagger(),
};

function Steps({ steps }) {
  return (
    <dl className={styles.steps}>
      {steps.map((s) => (
        <div key={s.label} className={styles.step}>
          <dt>{s.label}</dt>
          <dd>{s.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  const prefersReduced = useReducedMotion();
  const { hero, cases } = cvData;
  const mg = cases.magnite;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section id="about" className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <motion.p
              className={styles.eyebrow}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              className={styles.heroTitle}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            >
              {cvData.name}
            </motion.h1>
            <motion.p
              className={styles.heroHeadline}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              {hero.headline}
            </motion.p>
            <motion.p
              className={styles.heroSubtitle}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            >
              {hero.subtitle.split("+104.6%").flatMap((part, i, arr) =>
                i < arr.length - 1
                  ? [part, <span key={i} className={styles.positive}>+104.6%</span>]
                  : [part]
              )}
            </motion.p>
            <motion.div
              className={styles.heroActions}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              <a href="#contact" className="btnAccent">
                Contact
              </a>
              <a href={cvData.cv} download="Jorge_Rosas_CV.pdf" className="btnOutlineAccent">
                Download CV
              </a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroImageWrapper}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <Image
              src="/profile.jpg"
              alt="Jorge Rosas"
              fill
              sizes="(max-width: 968px) 100vw, 40vw"
              className={styles.heroImage}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Proof strip ────────────────────────────────────────────────── */}
      <div className={styles.proofStrip}>
        {hero.proof.map((p) => (
          <div key={p.label} className={styles.proofItem}>
            <span className={`${styles.proofValue} ${p.positive ? styles.positiveGlow : ""}`}>
              {p.value}
            </span>
            <span className={styles.proofLabel}>{p.label}</span>
          </div>
        ))}
      </div>

      {/* ── Selected work ──────────────────────────────────────────────── */}
      <motion.section id="work" {...reveal}>
        <motion.h2 variants={fadeInUp} className="overline">
          Selected work
        </motion.h2>

        {/* NOS */}
        <motion.article variants={fadeInUp} className={styles.caseCard}>
          <p className={styles.caseTag}>{cases.nos.tag}</p>
          <h3 className={styles.caseTitle}>{cases.nos.title}</h3>
          <p className={styles.caseMeta}>{cases.nos.meta}</p>
          <Steps steps={cases.nos.steps} />
        </motion.article>

        {/* Magnite */}
        <motion.article variants={fadeInUp} className={styles.caseCard}>
          <p className={styles.caseTag}>{mg.tag}</p>
          <h3 className={styles.caseTitle}>{mg.title}</h3>
          <p className={styles.caseMeta}>{mg.meta}</p>

          <div className={styles.returnRow}>
            <div>
              <span className={`${styles.returnValue} ${styles.positiveGlow}`}>{mg.returnValue}</span>
              <span className={styles.statLabel}>{mg.returnLabel}</span>
            </div>
            <p className={styles.returnSummary}>{mg.summary}</p>
          </div>
          <PriceChart />
          <p className={styles.footnote}>{mg.footnote}</p>
        </motion.article>
      </motion.section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <motion.section id="experience" {...reveal}>
        <motion.h2 variants={fadeInUp} className="overline">
          Experience and activities
        </motion.h2>
        <motion.div className={styles.grid} variants={stagger(0.08)}>
          {cvData.experience.map((exp) => (
            <motion.div key={exp.org} variants={fadeInUp} className={styles.bentoBox}>
              <div className={styles.bentoHeader}>
                <h3 className={styles.bentoTitle}>{exp.org}</h3>
                <p className={styles.bentoSubtitle}>{exp.role}</p>
                <span className={styles.bentoDate}>{exp.date}</span>
              </div>
              {exp.image && (
                <div className={styles.bentoImageContainer}>
                  <Image
                    src={exp.image}
                    alt={exp.org}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`${styles.bentoImage} ${exp.logo ? styles.bentoImageContain : ""} ${exp.logoDark ? styles.bentoImageDark : ""}`}
                  />
                </div>
              )}
              <ul className={styles.bentoBullets}>
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Education ──────────────────────────────────────────────────── */}
      <motion.section id="education" {...reveal}>
        <motion.h2 variants={fadeInUp} className="overline">
          Education
        </motion.h2>
        <motion.div className={styles.grid} variants={stagger(0.08)}>
          {cvData.education.map((edu) => (
            <motion.div key={edu.institution} variants={fadeInUp} className={styles.bentoBox}>
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.bentoImage}
                  />
                </div>
              )}
              <ul className={styles.bentoBullets}>
                {edu.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {edu.note && <p className={styles.footnote}>{edu.note}</p>}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <motion.section id="skills" {...reveal}>
        <motion.h2 variants={fadeInUp} className="overline">
          Skills, languages and certifications
        </motion.h2>
        <motion.div className={styles.skillGroups} variants={stagger(0.08)}>
          {cvData.skills.map((g) => (
            <motion.div key={g.group} variants={fadeInUp} className={styles.skillGroup}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <motion.section id="contact" className={styles.contactSection} {...reveal}>
        <div className={styles.contactText}>
          <motion.h2 variants={fadeInUp} className="overline">
            Contact
          </motion.h2>
          <motion.p variants={fadeInUp} className={styles.contactHeading}>
            {cvData.contact.heading}
          </motion.p>
          <motion.p variants={fadeInUp} className={styles.contactBody}>
            {cvData.contact.text}
          </motion.p>
          <motion.p variants={fadeInUp} className={styles.contactFacts}>
            {cvData.contact.facts}
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.heroActions}>
            <a href={`mailto:${cvData.email}`} className="btnAccent">
              Email Me
            </a>
            <a
              href={cvData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btnLinkedin"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
