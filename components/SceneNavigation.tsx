"use client";

import { ArrowLeft, ArrowRight, PauseCircle, PlayCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type SceneNavigationProps = {
  currentScene: number;
  totalScenes: number;
  progress: number;
  isAutoPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoToScene: (sceneIndex: number) => void;
  onRestart: () => void;
  onToggleAutoPlay: () => void;
};

export function SceneNavigation({
  currentScene,
  totalScenes,
  progress,
  isAutoPlaying,
  onPrev,
  onNext,
  onGoToScene,
  onRestart,
  onToggleAutoPlay,
}: SceneNavigationProps) {
  return (
    <div className="space-y-4 rounded-[1.4rem] border border-amber-100/10 bg-white/5 p-4 backdrop-blur-xl md:p-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm text-white/70">
          <span>
            Scene {currentScene + 1} / {totalScenes}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: totalScenes }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onGoToScene(index)}
            aria-label={`Go to scene ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentScene ? "w-8 bg-amber-200 shadow-[0_0_14px_rgba(248,211,122,0.75)]" : "w-2.5 bg-white/25 hover:bg-white/40"}`}
          />
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        <Button variant="outline" onClick={onPrev} disabled={currentScene === 0} className="w-full justify-center">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="gold" onClick={onToggleAutoPlay} className="w-full justify-center">
          {isAutoPlaying ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          {isAutoPlaying ? "Pause" : "Auto Play Story"}
        </Button>
        <Button variant="outline" onClick={onNext} disabled={currentScene >= totalScenes - 1} className="w-full justify-center">
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="soft" onClick={onRestart} className="w-full justify-center">
          <RotateCcw className="h-4 w-4" />
          Restart Story
        </Button>
        <div className="hidden xl:block" />
      </div>
    </div>
  );
}