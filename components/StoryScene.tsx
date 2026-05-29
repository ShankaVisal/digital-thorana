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
};

export function StoryScene({ scene, totalScenes, className }: StorySceneProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Card className={cn("border-amber-100/15 bg-white/5", className)}>
      <CardHeader className="space-y-4 pb-3 md:pb-4">
        <div className="flex items-center justify-between gap-4">
          <Badge>
            Scene {scene.sceneNumber} of {totalScenes}
          </Badge>
          <span className="text-xs tracking-[0.3em] text-amber-50/55">NANDIVISALA</span>
        </div>
        <div className="space-y-2">
          <CardTitle className="font-serif text-2xl text-amber-50 md:text-4xl">{scene.title}</CardTitle>
          <CardDescription className="max-w-3xl text-sm text-white/72 md:text-base">
            {scene.englishSummary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.sceneNumber}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
            className="overflow-hidden rounded-[1.5rem] border border-amber-100/15 bg-black/30 shadow-[0_0_60px_rgba(0,0,0,0.35)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/8.8]">
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
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            key={`sinhala-${scene.sceneNumber}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
            className="rounded-[1.2rem] border border-white/8 bg-white/5 p-4 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-100/65">Sinhala narration</div>
            <p className="font-sinhala text-[1.05rem] leading-8 md:text-[1.12rem]">{scene.sinhalaNarration}</p>
          </motion.div>

          <motion.div
            key={`message-${scene.sceneNumber}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: 0.08 }}
            className="rounded-[1.2rem] border border-amber-100/12 bg-amber-100/8 p-4 text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-100/65">Key message</div>
            <p className="text-base leading-7 md:text-[1.05rem]">{scene.keyMessage}</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm leading-6 text-white/76">
              {scene.englishSummary}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}