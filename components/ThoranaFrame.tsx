"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type ThoranaFrameProps = {
  children: React.ReactNode;
  className?: string;
};

function BulbStrip({ orientation }: { orientation: "top" | "bottom" | "left" | "right" }) {
  const bulbs = orientation === "top" || orientation === "bottom" ? 14 : 8;

  return (
    <div
      className={cn(
        "pointer-events-none absolute flex",
        orientation === "top" && "inset-x-6 top-2 flex-row justify-between",
        orientation === "bottom" && "inset-x-6 bottom-2 flex-row justify-between",
        orientation === "left" && "left-2 top-8 bottom-8 flex-col justify-between",
        orientation === "right" && "right-2 top-8 bottom-8 flex-col justify-between",
      )}
      aria-hidden="true"
    >
      {Array.from({ length: bulbs }).map((_, index) => (
        <motion.span
          key={`${orientation}-${index}`}
          className="block rounded-full bg-gradient-to-b from-amber-100 to-orange-300 shadow-[0_0_18px_rgba(255,204,112,0.85)]"
          style={
            orientation === "top" || orientation === "bottom"
              ? { width: 10, height: 10 }
              : { width: 10, height: 10 }
          }
          animate={{ opacity: [0.4, 1, 0.55], scale: [0.8, 1.08, 0.88] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function ThoranaFrame({ children, className }: ThoranaFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-amber-100/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-3 shadow-[0_0_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:p-5",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-[2rem] border border-white/5" />
      <div className="absolute inset-x-14 top-0 h-24 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,243,201,0.14),_transparent_70%)] blur-2xl" />
      <div className="absolute inset-x-12 bottom-0 h-24 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,158,69,0.12),_transparent_70%)] blur-2xl" />
      <BulbStrip orientation="top" />
      <BulbStrip orientation="bottom" />
      <BulbStrip orientation="left" />
      <BulbStrip orientation="right" />

      <div className="relative rounded-[1.6rem] border border-white/10 bg-slate-950/45 p-3 md:p-5">
        {children}
      </div>
    </motion.div>
  );
}