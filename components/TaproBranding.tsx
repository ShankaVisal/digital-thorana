"use client";

import { Mail, Phone, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { storyMeta } from "@/data/nandivisalaStory";

type TaproBrandingProps = {
  onVisitTapro: () => void;
};

export function TaproBranding({ onVisitTapro }: TaproBrandingProps) {
  return (
    <Card className="border-amber-100/12 bg-white/5">
      <CardHeader className="space-y-3">
        <CardTitle className="font-serif text-xl text-amber-50 md:text-2xl">Created with devotion and digital creativity by Tapro IT</CardTitle>
        <CardDescription className="max-w-3xl text-white/72">
          Tapro IT combines technology, creativity, and culture to build meaningful digital experiences for people and businesses.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/78">
            <div className="mb-2 flex items-center gap-2 text-amber-100">
              <Phone className="h-4 w-4" />
              Contact
            </div>
            {storyMeta.contact.phone}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/78">
            <div className="mb-2 flex items-center gap-2 text-amber-100">
              <Mail className="h-4 w-4" />
              Email
            </div>
            {storyMeta.contact.email}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/78">
            <div className="mb-2 flex items-center gap-2 text-amber-100">
              <Globe className="h-4 w-4" />
              Website
            </div>
            {storyMeta.contact.website}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100/10 bg-slate-950/35 p-4">
          <div className="text-sm text-white/72">Build your next digital experience with Tapro IT</div>
          <Button variant="gold" onClick={onVisitTapro} className="justify-center">
            Visit Tapro IT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}