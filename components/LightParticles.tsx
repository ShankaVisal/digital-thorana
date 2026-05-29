"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { left: "8%", top: "18%" },
  { left: "17%", top: "32%" },
  { left: "28%", top: "12%" },
  { left: "36%", top: "76%" },
  { left: "47%", top: "20%" },
  { left: "58%", top: "64%" },
  { left: "66%", top: "14%" },
  { left: "77%", top: "34%" },
  { left: "84%", top: "72%" },
  { left: "92%", top: "26%" },
  { left: "13%", top: "86%" },
  { left: "41%", top: "44%" },
];

export function LightParticles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${index}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-100/70 shadow-[0_0_16px_rgba(255,236,160,0.8)]"
          style={{ left: particle.left, top: particle.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 1, 0.35],
                  scale: [0.8, 1.45, 0.9],
                  y: [0, -12, 0],
                }
          }
          transition={{ duration: 5.2 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.32 }}
        />
      ))}
    </div>
  );
}