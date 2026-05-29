"use client";

import { Music2, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";

type AudioControlsProps = {
  isMuted: boolean;
  isNarrationEnabled: boolean;
  onToggleMuted: () => void;
  onToggleNarration: () => void;
};

export function AudioControls({
  isMuted,
  isNarrationEnabled,
  onToggleMuted,
  onToggleNarration,
}: AudioControlsProps) {
  return (
    <div className="rounded-[1.4rem] border border-amber-100/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-sm text-amber-50/75">
        <Music2 className="h-4 w-4 text-amber-200" />
        Audio controls
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button variant={isMuted ? "outline" : "gold"} onClick={onToggleMuted} className="w-full justify-center">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isMuted ? "Background music off" : "Background music on"}
        </Button>
        <Button variant={isNarrationEnabled ? "gold" : "outline"} onClick={onToggleNarration} className="w-full justify-center">
          {isNarrationEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {isNarrationEnabled ? "Sinhala narration on" : "Sinhala narration off"}
        </Button>
      </div>
    </div>
  );
}