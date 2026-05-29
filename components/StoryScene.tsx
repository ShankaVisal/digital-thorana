"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { StoryScene as StorySceneType } from "@/data/nandivisalaStory";

type StorySceneProps = {
  scene: StorySceneType;
  totalScenes: number;
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
};

export function StoryScene({ scene, totalScenes, className, onPrev, onNext }: StorySceneProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Card className={cn("border-amber-100/15 bg-white/5", className)}>
      <CardHeader className="space-y-3 pb-3 pt-4 sm:space-y-4 sm:pt-5 md:pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <Badge>
            Scene {scene.sceneNumber} of {totalScenes}
          </Badge>
          <span className="text-[0.65rem] tracking-[0.28em] text-amber-50/55 sm:text-xs">NANDIVISALA</span>
        </div>
        <div className="space-y-2">
          <CardTitle className="font-serif text-[1.55rem] leading-tight text-amber-50 sm:text-2xl md:text-4xl">{scene.title}</CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-6 text-white/72 sm:text-[0.95rem] md:text-base">
            {scene.englishSummary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 pt-0 sm:space-y-5 sm:px-6 sm:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.sceneNumber}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
            className="overflow-hidden rounded-[1.35rem] border border-amber-100/15 bg-black/30 shadow-[0_0_60px_rgba(0,0,0,0.35)] sm:rounded-[1.5rem]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[16/8.8]">
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                priority={scene.sceneNumber === 1}
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,10,18,0.2)_45%,rgba(4,10,18,0.7)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,243,201,0.12),_transparent_58%)]" />
            </div>
            {/* Mobile-only prev/next between image and text */}
            {(onPrev || onNext) && (
              <div className="grid grid-cols-2 gap-3 px-3 pb-3 pt-4 sm:flex sm:items-center sm:justify-center sm:gap-8 sm:px-0 sm:pb-0 sm:pt-4 sm:-translate-y-2">
                {onPrev && (
                  <button
                    onClick={onPrev}
                    aria-label="Previous scene"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-100/12 px-3 text-sm font-medium text-amber-100/95 shadow-[0_8px_30px_rgba(255,174,66,0.18)] ring-1 ring-amber-200/20 transition-transform duration-200 hover:scale-105 hover:bg-amber-200/20 sm:w-12 sm:px-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="sm:hidden">Prev</span>
                  </button>
                )}

                {onNext && (
                  <button
                    onClick={onNext}
                    aria-label="Next scene"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-100/12 px-3 text-sm font-medium text-amber-100/95 shadow-[0_8px_30px_rgba(255,174,66,0.18)] ring-1 ring-amber-200/20 transition-transform duration-200 hover:scale-105 hover:bg-amber-200/20 sm:w-12 sm:px-0"
                  >
                    <span className="sm:hidden">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            key={`sinhala-${scene.sceneNumber}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
            className="rounded-[1.2rem] border border-white/8 bg-white/5 p-4 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5"
          >
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-100/65">Sinhala narration</div>
            <p className="font-sinhala text-[1rem] leading-7 sm:text-[1.05rem] sm:leading-8 md:text-[1.12rem]">{scene.sinhalaNarration}</p>
          </motion.div>

          <motion.div
            key={`message-${scene.sceneNumber}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: 0.08 }}
            className="rounded-[1.2rem] border border-amber-100/12 bg-amber-100/8 p-4 text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5"
          >
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-100/65">Key message</div>
            <p className="text-[0.98rem] leading-7 sm:text-base md:text-[1.05rem]">{scene.keyMessage}</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm leading-6 text-white/76">
              {scene.englishSummary}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}