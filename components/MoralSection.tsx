"use client";

import { Gift, RotateCcw, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MoralSectionProps = {
  moralSinhala: string;
  moralEnglish: string;
  quote: string;
  onWatchAgain: () => void;
  onShare: () => void;
  onVisitTapro: () => void;
  onCreateWish: () => void;
};

export function MoralSection({
  moralSinhala,
  moralEnglish,
  quote,
  onWatchAgain,
  onShare,
  onVisitTapro,
  onCreateWish,
}: MoralSectionProps) {
  return (
    <Card className="overflow-hidden border-amber-100/15 bg-gradient-to-b from-white/8 to-white/4">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-serif text-2xl text-amber-50 md:text-4xl">ධර්ම පාඩම | Moral of the Story</CardTitle>
        <CardDescription className="mx-auto max-w-3xl text-white/76 md:text-base">{moralEnglish}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 text-center">
        <div className="mx-auto max-w-4xl rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-5 text-base leading-8 text-white/88 md:text-lg md:leading-9">
          <p className="font-sinhala">{moralSinhala}</p>
        </div>

        <div className="inline-flex rounded-full border border-amber-100/20 bg-amber-100/10 px-5 py-2 text-sm font-medium text-amber-50">
          {quote}
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <Button variant="gold" onClick={onWatchAgain} className="w-full justify-center">
            <RotateCcw className="h-4 w-4" />
            Watch Again
          </Button>
          <Button variant="outline" onClick={onShare} className="w-full justify-center">
            <Share2 className="h-4 w-4" />
            Share This Thorana
          </Button>
          <Button variant="outline" onClick={onVisitTapro} className="w-full justify-center">
            <Gift className="h-4 w-4" />
            Visit Tapro IT
          </Button>
          <Button variant="soft" onClick={onCreateWish} className="w-full justify-center">
            <Sparkles className="h-4 w-4" />
            Create Vesak Wish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}