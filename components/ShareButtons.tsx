"use client";

import { Copy, Facebook, MessageCircleMore, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type ShareButtonsProps = {
  shareUrl: string;
  shareMessage: string;
  onShared?: (status: "copied" | "shared" | "opened") => void;
};

export function ShareButtons({ shareUrl, shareMessage, onShared }: ShareButtonsProps) {
  const encodedMessage = encodeURIComponent(`${shareMessage} ${shareUrl}`);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: "Tapro IT Digital Vesak Thorana",
        text: shareMessage,
        url: shareUrl,
      });
      onShared?.("shared");
      return;
    }

    await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
    onShared?.("copied");
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
    onShared?.("opened");
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
    onShared?.("opened");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
    onShared?.("copied");
  };

  return (
    <div className="rounded-[1.4rem] border border-amber-100/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-sm text-amber-50/75">
        <Share2 className="h-4 w-4 text-amber-200" />
        Share the thorana
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Button variant="gold" onClick={handleShare} className="w-full justify-center">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" onClick={handleWhatsApp} className="w-full justify-center">
          <MessageCircleMore className="h-4 w-4" />
          WhatsApp
        </Button>
        <Button variant="outline" onClick={handleFacebook} className="w-full justify-center">
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button variant="outline" onClick={handleCopy} className="w-full justify-center">
          <Copy className="h-4 w-4" />
          Copy link
        </Button>
      </div>
    </div>
  );
}