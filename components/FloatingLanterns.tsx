"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatingLanternsProps = {
  className?: string;
  count?: number;
};

const lanternPositions = [
  { left: "8%", top: "10%", scale: 0.92, duration: 7.2, delay: 0.2 },
  { left: "18%", top: "24%", scale: 0.78, duration: 8.3, delay: 1.4 },
  { left: "82%", top: "12%", scale: 0.88, duration: 7.8, delay: 0.7 },
  { left: "73%", top: "28%", scale: 0.74, duration: 9.1, delay: 0.5 },
  { left: "12%", top: "72%", scale: 0.66, duration: 8.6, delay: 1.1 },
  { left: "86%", top: "68%", scale: 0.7, duration: 9.4, delay: 1.3 },
];

export function FloatingLanterns({ className, count = 6 }: FloatingLanternsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      {lanternPositions.slice(0, count).map((lantern, index) => (
        <motion.div
          key={`${lantern.left}-${index}`}
          className="absolute"
          style={{ left: lantern.left, top: lantern.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -16, 0],
                  x: [0, 8, 0],
                  rotate: [0, 2, 0],
                }
          }
          transition={{ duration: lantern.duration, repeat: Infinity, ease: "easeInOut", delay: lantern.delay }}
        >
          <div
            className="relative h-16 w-10 rounded-[1.2rem] border border-amber-100/30 bg-gradient-to-b from-amber-100/30 via-orange-200/25 to-transparent shadow-[0_0_28px_rgba(255,190,90,0.35)]"
            style={{ transform: `scale(${lantern.scale})` }}
          >
            <div className="absolute inset-x-1/2 top-[-0.7rem] h-3 w-[1px] -translate-x-1/2 bg-amber-100/35" />
            <div className="absolute inset-x-[-0.4rem] top-3 h-[1px] bg-amber-100/30" />
            <div className="absolute inset-x-[-0.1rem] top-[-0.18rem] h-3 rounded-full border border-amber-100/30 bg-amber-100/20" />
            <div className="absolute inset-x-2 bottom-2 h-7 rounded-full bg-gradient-to-b from-yellow-200/50 to-orange-300/20 blur-md" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}