"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "../page.module.css";
import { mgniCloses } from "../mgni-data";

const W = 760;
const H = 300;
const PAD = { l: 44, r: 20, t: 24, b: 34 };
const Y_MIN = 10;
const Y_MAX = 28;
const Y_TICKS = [10, 15, 20, 25];
const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const BUY = { date: "2026-03-10", price: 13.0, label: "Buy · 10 Mar · $13.00" };
const SELL = { date: "2026-09-17", price: 26.6, label: "Sell · 17 Sep · $26.60" };

const t0 = new Date(mgniCloses[0][0]).getTime();
const t1 = new Date(mgniCloses[mgniCloses.length - 1][0]).getTime();
const px = (date) =>
  PAD.l + ((new Date(date).getTime() - t0) / (t1 - t0)) * (W - PAD.l - PAD.r);
const py = (price) =>
  PAD.t + (1 - (price - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.t - PAD.b);

const points = mgniCloses.map(([d, c]) => [px(d), py(c)]);
const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const area = `${line} L${points[points.length - 1][0].toFixed(1)} ${H - PAD.b} L${points[0][0].toFixed(1)} ${H - PAD.b} Z`;

export default function PriceChart() {
  const prefersReduced = useReducedMotion();
  const inView = { once: true, margin: "-10%" };

  return (
    <figure className={styles.chartFigure}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Magnite (MGNI) daily closing price from March to September 2026, bought on 10 March at $13.00 and sold on 17 September at $26.60.`}
        className={styles.chartSvg}
      >
        <defs>
          <linearGradient id="mgniFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--green)", stopOpacity: 0.28 }} />
            <stop offset="100%" style={{ stopColor: "var(--green)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {Y_TICKS.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={py(t)} y2={py(t)} className={styles.chartGrid} />
            <text x={PAD.l - 10} y={py(t) + 4} textAnchor="end" className={styles.chartTick}>
              ${t}
            </text>
          </g>
        ))}

        {MONTHS.map((m, i) => {
          const d = `2026-${String(i + 3).padStart(2, "0")}-01`;
          return (
            <text key={m} x={px(d < mgniCloses[0][0] ? mgniCloses[0][0] : d)} y={H - 10} textAnchor="start" className={styles.chartTick}>
              {m}
            </text>
          );
        })}

        <motion.path
          d={area}
          fill="url(#mgniFill)"
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path
          d={line}
          fill="none"
          className={styles.chartLine}
          initial={prefersReduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <g>
          <circle cx={px(BUY.date)} cy={py(BUY.price)} r={5.5} className={styles.chartDotBuy} />
          <line x1={px(BUY.date)} x2={px(BUY.date)} y1={py(BUY.price) - 8} y2={py(17) + 6} className={styles.chartLeader} />
          <text x={px(BUY.date)} y={py(17)} className={styles.chartLabelStrong}>
            {BUY.label}
          </text>
        </g>
        <motion.g
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.4, delay: 2.1 }}
        >
          <circle cx={px(SELL.date)} cy={py(SELL.price)} r={5.5} className={styles.chartDotExit} />
          <text x={px(SELL.date) - 12} y={py(SELL.price) - 4} textAnchor="end" className={styles.chartLabelStrong}>
            {SELL.label}
          </text>
        </motion.g>
      </svg>
    </figure>
  );
}
