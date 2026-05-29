"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MoonStar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FloatingLanterns } from "./FloatingLanterns";
import { LightParticles } from "./LightParticles";
import { storyMeta } from "@/data/nandivisalaStory";

type ThoranaIntroProps = {
  onStart: () => void;
};

export function ThoranaIntro({ onStart }: ThoranaIntroProps) {
  const reduceMotion = useReducedMotion();

  const handleStart = () => {
    onStart();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,211,122,0.18),_transparent_36%),linear-gradient(180deg,_#06101e_0%,_#120923_100%)]" />
      <FloatingLanterns className="absolute inset-0" />
      <LightParticles />
      <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_center,_rgba(255,243,201,0.22),_transparent_70%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card className="overflow-hidden border-amber-100/15 bg-white/6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_32%,rgba(248,211,122,0.06)_68%,transparent)]" />
          <CardHeader className="relative px-5 pt-8 text-center sm:px-6 md:px-12 md:pt-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-100/25 bg-amber-100/10 shadow-[0_0_40px_rgba(248,211,122,0.28)] sm:h-20 sm:w-20 sm:mb-5">
              <MoonStar className="h-7 w-7 text-amber-100 sm:h-9 sm:w-9" />
            </div>
            <CardTitle className="font-serif text-2xl tracking-wide text-amber-50 sm:text-3xl md:text-5xl">
              {storyMeta.pageTitle}
            </CardTitle>
            <CardDescription className="mx-auto mt-3 max-w-2xl text-sm text-white/78 sm:text-base md:mt-4 md:text-lg">
              {storyMeta.storyTitle}
            </CardDescription>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
              <span className="rounded-full border border-amber-100/15 bg-white/5 px-3 py-2 text-xs text-amber-50/90 sm:px-4 sm:text-sm">
                {storyMeta.tagline}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 sm:px-4 sm:text-sm">
                {storyMeta.subTagline}
              </span>
            </div>
          </CardHeader>
          <CardContent className="relative px-5 pb-8 pt-4 sm:px-6 sm:pb-10 md:px-12 md:pb-14">
            <p className="mx-auto max-w-2xl text-center text-sm leading-7 text-white/80 sm:text-base md:text-lg">
              {storyMeta.introText}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Button variant="gold" size="lg" onClick={handleStart} className="min-w-full px-6 text-base sm:min-w-[220px]">
                Start the Thorana
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-center text-sm text-amber-50/70">
                <Sparkles className="h-4 w-4 text-amber-200" />
                Tapro IT Digital Vesak Kalapaya
              </div>
            </div>

            <div className="mt-8 grid gap-3 text-center text-sm text-white/60 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Peaceful Vesak atmosphere</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Six-scene Nandivisala journey</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Gentle light, sound, and story</div>
            </div>

            <div className="mt-7 text-center text-[0.65rem] uppercase tracking-[0.35em] text-amber-100/55 sm:mt-8 sm:text-xs">
              Tapro IT
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}