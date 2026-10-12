"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import { cvData } from "../data";
import PriceChart from "./components/PriceChart";

const EASE = [0.22, 1.0, 0.36, 1.0];

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
      <section id="work">
        <h2 className="overline">
          Selected work
        </h2>

        {/* NOS */}
        <article className={styles.caseCard}>
          <p className={styles.caseTag}>{cases.nos.tag}</p>
          <h3 className={styles.caseTitle}>{cases.nos.title}</h3>
          <p className={styles.caseMeta}>{cases.nos.meta}</p>
          <Steps steps={cases.nos.steps} />
        </article>

        {/* Magnite */}
        <article className={styles.caseCard}>
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
        </article>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section id="experience">
        <h2 className="overline">
          Experience and activities
        </h2>
        <div className={styles.grid}>
          {cvData.experience.map((exp) => (
            <div key={exp.org} className={styles.bentoBox}>
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
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ──────────────────────────────────────────────────── */}
      <section id="education">
        <h2 className="overline">
          Education
        </h2>
        <ul className={styles.eduList}>
          {cvData.education.map((edu) => (
            <li key={edu.institution} className={styles.eduItem}>
              {edu.image && (
                <div className={styles.eduImage}>
                  <Image
                    src={edu.image}
                    alt={edu.institution}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className={styles.bentoImage}
                  />
                </div>
              )}
              <div className={styles.eduBody}>
              <div className={styles.eduHead}>
                <div>
                  <h3 className={styles.eduTitle}>{edu.institution}</h3>
                  <p className={styles.eduDegree}>{edu.degree}</p>
                </div>
                <span className={styles.bentoDate}>{edu.date}</span>
              </div>
              <ul className={styles.bentoBullets}>
                {edu.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {edu.note && <p className={styles.footnote}>{edu.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section id="skills">
        <h2 className="overline">
          Skills, languages and certifications
        </h2>
        <div className={styles.skillGroups}>
          {cvData.skills.map((g) => (
            <div key={g.group} className={styles.skillGroup}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactText}>
          <h2 className="overline">
            Contact
          </h2>
          <p className={styles.contactHeading}>
            {cvData.contact.heading}
          </p>
          <p className={styles.contactBody}>
            {cvData.contact.text}
          </p>
          <p className={styles.contactFacts}>
            {cvData.contact.facts}
          </p>
          <div className={styles.heroActions}>
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
          </div>
        </div>
      </section>
    </>
  );
}
