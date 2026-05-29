"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { FloatingLanterns } from "@/components/FloatingLanterns";
import { LightParticles } from "@/components/LightParticles";
import { MoralSection } from "@/components/MoralSection";
import { SceneNavigation } from "@/components/SceneNavigation";
import { ShareButtons } from "@/components/ShareButtons";
import { StoryScene } from "@/components/StoryScene";
import { TaproBranding } from "@/components/TaproBranding";
import { ThoranaFrame } from "@/components/ThoranaFrame";
import { Button } from "@/components/ui/button";
import { nandivisalaScenes, storyMeta } from "@/data/nandivisalaStory";

import { ThoranaIntro } from "./ThoranaIntro";

function safePlayAudio(audio: HTMLAudioElement | null) {
  if (!audio) {
    return;
  }

  void audio.play().catch(() => {
    // Browser autoplay restrictions or missing files are expected fallback cases.
  });
}

export function ThoranaExperience() {
  const reduceMotion = useReducedMotion();
  const [isStarted, setIsStarted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMoralSection, setShowMoralSection] = useState(false);
  const [shareUrl, setShareUrl] = useState(storyMeta.website);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundPrevVolumeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const narrationGainRef = useRef<GainNode | null>(null);
  const bgSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const narrationSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferCache = useRef<Map<string, AudioBuffer>>(new Map());
  const [isIOS, setIsIOS] = useState(false);
  const isAutoPlayingRef = useRef(false);
  const [audioDebugEnabled, setAudioDebugEnabled] = useState(false);
  const [lastAudioError, setLastAudioError] = useState<string | null>(null);
  const [lastAudioAction, setLastAudioAction] = useState<string | null>(null);
  const suppressNextSceneEffectRef = useRef(false);

  const currentSceneData = nandivisalaScenes[currentScene];
  const totalScenes = nandivisalaScenes.length;
  const progress = ((currentScene + 1) / totalScenes) * 100;

  useEffect(() => {
    setShareUrl(window.location.href);
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const uaMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      setIsMobile(window.innerWidth <= 767 || uaMobile);
      setIsIOS(/iP(hone|od|ad)/i.test(ua) || (/Macintosh/i.test(ua) && 'ontouchend' in document));
      const onResize = () => setIsMobile(window.innerWidth <= 767 || uaMobile);
      window.addEventListener("resize", onResize);
      try {
        const params = new URLSearchParams(window.location.search);
        setAudioDebugEnabled(params.get("audioDebug") === "1");
      } catch (e) {}
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  // helpers for debugging / diagnostics and manual triggers
  const ensureAudioContext = async () => {
    if (typeof window === "undefined") return null;
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx();
      try {
        await audioContextRef.current!.resume();
      } catch (e) {}
    } else {
      try {
        await audioContextRef.current!.resume();
      } catch (e) {}
    }
    return audioContextRef.current;
  };

  const playBufferUrl = async (url: string, loop = false, gainValue?: number) => {
    const ctx = await ensureAudioContext();
    if (!ctx) throw new Error("No AudioContext available");
    let buffer = audioBufferCache.current.get(url);
    if (!buffer) {
      const res = await fetch(url);
      const ab = await res.arrayBuffer();
      buffer = (await ctx.decodeAudioData(ab.slice(0))) as AudioBuffer;
      audioBufferCache.current.set(url, buffer);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = loop;
    const gain = ctx.createGain();
    if (typeof gainValue === "number") gain.gain.value = gainValue;
    src.connect(gain).connect(ctx.destination);
    src.start();
    return { ctx, src, gain } as const;
  };

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    // For iOS devices, we will initialize and play the background via Web Audio API
    if (isIOS) {
      return;
    }

    const audio = backgroundAudioRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = isStarted ? 0.05 : 0.22;

    void audio.play().catch(() => {
      // Autoplay may be blocked by the browser; the element stays ready for the first allowed play.
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isStarted]);

  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (!audio) {
      return;
    }

    if (isIOS) {
      // iOS background handled via AudioContext path; keep element paused
      try {
        audio.pause();
      } catch (e) {}
      return;
    }

    if (isMuted) {
      audio.pause();
      return;
    }

    audio.volume = isStarted ? 0.12 : 0.22;
    void audio.play().catch(() => {
      // Keep the background track ready if autoplay is blocked.
    });
  }, [isMuted, isStarted]);

  const stopNarration = () => {
    narrationAudioRef.current?.pause();
    if (narrationAudioRef.current) {
      narrationAudioRef.current.currentTime = 0;
    }
    // restore background if we ducked it for mobile narration
    if (isMobile && backgroundPrevVolumeRef.current !== null && backgroundAudioRef.current) {
      try {
        backgroundAudioRef.current.volume = backgroundPrevVolumeRef.current;
      } catch (e) {
        // ignore
      }
      backgroundPrevVolumeRef.current = null;
    }
  };

  const playSceneAudio = (sceneIndex: number) => {
    if (!isNarrationEnabled || isMuted) {
      stopNarration();
      return;
    }

    if (typeof Audio === "undefined") {
      return;
    }

    if (narrationAudioRef.current) {
      narrationAudioRef.current.pause();
      narrationAudioRef.current = null;
    }

    // For iOS devices use WebAudio buffers to ensure both tracks route to the same output
    if (isIOS && typeof window !== "undefined") {
      const srcUrl = nandivisalaScenes[sceneIndex].audioSrc;
      const ctx = audioContextRef.current;
      if (!ctx) return;

      // stop any existing narration source
      try {
        narrationSourceRef.current?.stop();
      } catch (e) {}

      // Use a media element connected into the AudioContext for narration on iOS.
      // This reliably routes audio through the same output as the background buffer.
      const playNarrationViaElement = async (url: string) => {
        try {
          // ensure background gain exists and is connected
          if (!backgroundGainRef.current) {
            const bgGain = ctx.createGain();
            bgGain.gain.value = isStarted ? (isMobile ? 0.035 : 0.05) : (isMobile ? 0.12 : 0.22);
            bgGain.connect(ctx.destination);
            backgroundGainRef.current = bgGain;
          }

          if (!narrationGainRef.current) {
            const voiceGain = ctx.createGain();
            voiceGain.gain.value = isMobile ? 1.55 : 1.15;
            voiceGain.connect(ctx.destination);
            narrationGainRef.current = voiceGain;
          }

          // duck background
          try {
            backgroundGainRef.current.gain.value = isMobile ? 0.016 : 0.02;
          } catch (e) {}

          // create an HTMLAudioElement and route it through the AudioContext
          const el = new Audio(url);
          el.preload = "auto";
          el.crossOrigin = "anonymous";
          (el as any).playsInline = true;

          // create media source and connect narration to its own gain
          try {
            const mediaSrc = ctx.createMediaElementSource(el);
            mediaSrc.connect(narrationGainRef.current ?? ctx.destination);
          } catch (e) {
            // Some browsers restrict createMediaElementSource; fall back to direct connect
            // (the element will still play through system output)
          }

          narrationAudioRef.current = el;
          await el.play();

          el.onended = () => {
            try {
              if (backgroundGainRef.current) backgroundGainRef.current.gain.value = isStarted ? (isMobile ? 0.035 : 0.05) : (isMobile ? 0.12 : 0.22);
            } catch (e) {}

            if (sceneIndex === totalScenes - 1) {
              setShowMoralSection(true);
              setIsAutoPlaying(false);
              return;
            }

            if (isAutoPlayingRef.current) {
              setShowMoralSection(false);
              setCurrentScene((current) => Math.min(current + 1, totalScenes - 1));
            }
          };
        } catch (e) {
          // fallback: nothing we can do here other than ignore
        }
      };

      void playNarrationViaElement(srcUrl).catch(() => {});
      return;
    }

    const audio = new Audio(nandivisalaScenes[sceneIndex].audioSrc);
    audio.preload = "none";

    // On mobile: boost narration and duck background; desktop/tablet behavior unchanged
    if (isMobile) {
      // save previous background volume to restore later
      if (backgroundAudioRef.current) backgroundPrevVolumeRef.current = backgroundAudioRef.current.volume;
      // set narration to max (element volume) and lower background
      audio.volume = 1.0;
      if (backgroundAudioRef.current) {
        try {
          // make background audible but reduced on mobile (was too low for some devices)
          backgroundAudioRef.current.volume = isStarted ? 0.12 : 0.08;
        } catch (e) {
          // ignore
        }
      }

      audio.onended = () => {
        // restore background
        if (backgroundPrevVolumeRef.current !== null && backgroundAudioRef.current) {
          try {
            backgroundAudioRef.current.volume = backgroundPrevVolumeRef.current;
          } catch (e) {}
          backgroundPrevVolumeRef.current = null;
        }

        if (sceneIndex === totalScenes - 1) {
          setShowMoralSection(true);
          setIsAutoPlaying(false);
          return;
        }

        if (isAutoPlayingRef.current) {
          setShowMoralSection(false);
          setCurrentScene((current) => Math.min(current + 1, totalScenes - 1));
        }
      };
    } else {
      // desktop/tablet: keep prior behavior
      audio.volume = 0.95;
      audio.onended = () => {
        if (sceneIndex === totalScenes - 1) {
          setShowMoralSection(true);
          setIsAutoPlaying(false);
          return;
        }

        if (isAutoPlayingRef.current) {
          setShowMoralSection(false);
          setCurrentScene((current) => Math.min(current + 1, totalScenes - 1));
        }
      };
    }

    narrationAudioRef.current = audio;
    safePlayAudio(audio);
  };

  const goToScene = (sceneIndex: number) => {
    const nextScene = Math.min(Math.max(sceneIndex, 0), totalScenes - 1);
    setCurrentScene(nextScene);
    setShowMoralSection(nextScene === totalScenes - 1);
    playSceneAudio(nextScene);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    goToScene(currentScene - 1);
  };

  const handleNext = () => {
    if (currentScene >= totalScenes - 1) {
      setShowMoralSection(true);
      setIsAutoPlaying(false);
      return;
    }
    goToScene(currentScene + 1);
  };

  const handleRestart = () => {
    setIsAutoPlaying(false);
    setShowMoralSection(false);
    goToScene(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToScene = (sceneIndex: number) => {
    setIsAutoPlaying(false);
    goToScene(sceneIndex);
  };

  const handleStart = () => {
    void (async () => {
      try {
        if (isIOS) {
          const ctx = await ensureAudioContext();
          if (!ctx) {
            throw new Error("AudioContext unavailable");
          }

          // Stop any stray element-based playback on iOS so only the shared audio graph is active.
          try {
            backgroundAudioRef.current?.pause();
            if (backgroundAudioRef.current) {
              backgroundAudioRef.current.currentTime = 0;
            }
          } catch (e) {}

          // Start or refresh the shared background buffer.
          try {
            const url = "/audio/background-vesak.mp3";
            let buffer = audioBufferCache.current.get(url);
            if (!buffer) {
              const res = await fetch(url);
              const ab = await res.arrayBuffer();
              buffer = (await ctx.decodeAudioData(ab.slice(0))) as AudioBuffer;
              audioBufferCache.current.set(url, buffer);
            }

            const bgGain = ctx.createGain();
            bgGain.gain.value = isMobile ? 0.035 : 0.05;
            backgroundGainRef.current = bgGain;

            try {
              bgSourceRef.current?.stop();
            } catch (e) {}

            const src = ctx.createBufferSource();
            src.buffer = buffer;
            src.loop = true;
            src.connect(bgGain).connect(ctx.destination);
            src.start();
            bgSourceRef.current = src;
          } catch (e) {
            setLastAudioError(String((e as any)?.message ?? e));
          }
        }

        setIsStarted(true);
        setIsAutoPlaying(true);
        setShowMoralSection(false);
        suppressNextSceneEffectRef.current = true;
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Explicitly kick off the first narration after audio is initialized.
        if (isNarrationEnabled && !isMuted) {
          playSceneAudio(0);
        }
      } catch (e) {
        setLastAudioError(String((e as any)?.message ?? e));
        setIsStarted(true);
        setIsAutoPlaying(true);
        setShowMoralSection(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    })();
  };

  useEffect(() => {
    if (!isStarted) {
      stopNarration();
      return;
    }

    if (isMuted) {
      backgroundAudioRef.current?.pause();
      return;
    }

    // Initialize Web Audio graph for iOS only on start (user gesture)
    const initIosAudio = async () => {
      if (!isIOS) return;
      if (audioContextRef.current) return;
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      void ctx.resume().catch(() => {});

      // create background gain and play background buffer
      const bgGain = ctx.createGain();
      // set background gain: higher on mobile so it's audible, lowered when started
      bgGain.gain.value = isStarted ? (isMobile ? 0.12 : 0.05) : 0.22;
      backgroundGainRef.current = bgGain;

      try {
        const url = "/audio/background-vesak.mp3";
        let buffer = audioBufferCache.current.get(url);
        if (!buffer) {
          const res = await fetch(url);
          const ab = await res.arrayBuffer();
          buffer = (await ctx.decodeAudioData(ab.slice(0))) as AudioBuffer;
          audioBufferCache.current.set(url, buffer);
        }

        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;
        src.connect(bgGain).connect(ctx.destination);
        src.start();
        bgSourceRef.current = src;
      } catch (e) {
        // fallback: let the HTMLAudio play if buffer approach fails
        try {
          backgroundAudioRef.current?.play().catch(() => {});
        } catch (e) {}
      }
    };

    if (isIOS) {
      void initIosAudio();
      return;
    }

    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = isStarted ? 0.05 : 0.22;
    }

    void backgroundAudioRef.current?.play().catch(() => {
      // Browser policies may still require a user gesture on some devices.
    });
  }, [isStarted, isMuted]);

  useEffect(() => {
    if (!isStarted) {
      return;
    }

    if (suppressNextSceneEffectRef.current) {
      suppressNextSceneEffectRef.current = false;
      return;
    }

    playSceneAudio(currentScene);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene, isNarrationEnabled, isMuted, isStarted]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isStarted) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }

      if (event.key === " ") {
        event.preventDefault();
        setIsAutoPlaying((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene, isStarted]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: storyMeta.pageTitle,
        text: storyMeta.shareMessage,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(`${storyMeta.shareMessage} ${shareUrl}`);
  };

  const handleVisitTapro = () => {
    window.open(storyMeta.website, "_blank", "noopener,noreferrer");
  };

  const handleCreateWish = () => {
    const message = encodeURIComponent(`${storyMeta.vesakWish} ${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-vesak-radial text-white">
      <div className="absolute inset-0 opacity-45">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,243,201,0.16),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,158,69,0.08),_transparent_34%)]" />
        <FloatingLanterns className="absolute inset-0" />
        <LightParticles />
      </div>

      <audio
        ref={backgroundAudioRef}
        src="/audio/background-vesak.mp3"
        autoPlay
        loop
        preload="auto"
        aria-hidden="true"
        className="hidden"
      />

      <div className="relative z-10">
        {audioDebugEnabled && (
          <div className="fixed right-4 top-4 z-50 w-72 rounded-lg border border-white/10 bg-black/60 p-3 text-sm text-white">
            <div className="mb-2 font-medium">Audio Debug</div>
            <div className="mb-2">
              <div>isIOS: {String(isIOS)}</div>
              <div>isMobile: {String(isMobile)}</div>
              <div>AudioContext: {audioContextRef.current ? "ready" : "null"}</div>
              <div>BG buffer: {bgSourceRef.current ? "loaded" : "null"}</div>
              <div>BG gain: {backgroundGainRef.current ? String(backgroundGainRef.current.gain.value) : "-"}</div>
              <div>Narration src: {narrationSourceRef.current ? "playing" : "null"}</div>
              <div>Last action: {lastAudioAction ?? "-"}</div>
              <div className="text-rose-300">Last error: {lastAudioError ?? "-"}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={async () => {
                  setLastAudioAction("init-audio-context");
                  setLastAudioError(null);
                  try {
                    const ctx = await ensureAudioContext();
                    console.log("AudioContext ready", ctx);
                  } catch (e: any) {
                    console.error(e);
                    setLastAudioError(String(e?.message ?? e));
                  }
                }}
                className="rounded bg-amber-100/12 px-3 py-1 text-amber-100"
              >
                Init AudioContext
              </button>
              <button
                onClick={async () => {
                  setLastAudioAction("play-bg-buffer");
                  setLastAudioError(null);
                  try {
                    const res = await playBufferUrl("/audio/background-vesak.mp3", true, isMobile ? 0.12 : 0.05);
                    // store bg source ref for diagnostics
                    bgSourceRef.current = res.src;
                    backgroundGainRef.current = res.gain;
                    console.log("Played BG buffer", res);
                  } catch (e: any) {
                    console.error(e);
                    setLastAudioError(String(e?.message ?? e));
                  }
                }}
                className="rounded bg-amber-100/12 px-3 py-1 text-amber-100"
              >
                Play BG Buffer
              </button>
              <button
                onClick={async () => {
                  setLastAudioAction("play-narration-buffer");
                  setLastAudioError(null);
                  try {
                    const sceneUrl = nandivisalaScenes[currentScene]?.audioSrc ?? "/audio/scene-1.mp3";
                    const res = await playBufferUrl(sceneUrl, false, 1.0);
                    narrationSourceRef.current = res.src;
                    console.log("Played narration buffer", res);
                  } catch (e: any) {
                    console.error(e);
                    setLastAudioError(String(e?.message ?? e));
                  }
                }}
                className="rounded bg-amber-100/12 px-3 py-1 text-amber-100"
              >
                Play Narration Buffer
              </button>
              <button
                onClick={async () => {
                  setLastAudioAction("play-narration-element");
                  setLastAudioError(null);
                  try {
                    const url = nandivisalaScenes[currentScene]?.audioSrc ?? "/audio/scene-1.mp3";
                    const el = new Audio(url);
                    el.preload = "auto";
                    narrationAudioRef.current = el;
                    await el.play();
                    console.log("Played narration via element", url);
                  } catch (e: any) {
                    console.error(e);
                    setLastAudioError(String(e?.message ?? e));
                  }
                }}
                className="rounded bg-amber-100/12 px-3 py-1 text-amber-100"
              >
                Play Narration Element
              </button>
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div key="intro">
              <ThoranaIntro onStart={handleStart} />
            </motion.div>
          ) : (
            <motion.div
              key="thorana"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-8 lg:px-8"
            >
              <div className="space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4 text-center backdrop-blur-xl sm:text-left md:flex-row md:items-center md:justify-between md:px-5">
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-[0.32em] text-amber-100/55 sm:text-xs">Digital Vesak Thorana</div>
                      <h1 className="mt-1 font-serif text-[1.5rem] leading-tight text-amber-50 sm:text-2xl md:text-4xl">{storyMeta.pageTitle}</h1>
                    </div>
                    <div className="text-sm text-white/72 md:text-right">
                      <div className="font-medium text-amber-50">{storyMeta.storyTitle}</div>
                      <div className="mt-1 text-xs sm:text-sm">{storyMeta.tagline}</div>
                    </div>
                  </div>

                  <div className="relative">
                    <ThoranaFrame>
                      <StoryScene scene={currentSceneData} totalScenes={totalScenes} onPrev={handlePrev} onNext={handleNext} />
                    </ThoranaFrame>

                    {/* mobile prev/next are rendered inside StoryScene between image and text */}
                  </div>

                  <div className="hidden md:block">
                    <SceneNavigation
                      currentScene={currentScene}
                      totalScenes={totalScenes}
                      progress={progress}
                      isAutoPlaying={isAutoPlaying}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      onGoToScene={handleGoToScene}
                      onRestart={handleRestart}
                      onToggleAutoPlay={() => setIsAutoPlaying((value) => !value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <ShareButtons shareUrl={shareUrl} shareMessage={storyMeta.shareMessage} />
                </div>
              </div>

              <div className="grid gap-5">
                {showMoralSection && (
                  <MoralSection
                    moralSinhala={storyMeta.moralSinhala}
                    moralEnglish={storyMeta.moralEnglish}
                    quote={storyMeta.quote}
                    onWatchAgain={handleRestart}
                    onShare={handleShare}
                    onVisitTapro={handleVisitTapro}
                    onCreateWish={handleCreateWish}
                  />
                )}

                <TaproBranding onVisitTapro={handleVisitTapro} />
                <div className="mt-2 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-white/72">
                  <div className="font-medium text-white">Designed and Implemented by Shanka Visal</div>
                  <div className="mt-1">Voice by Tharushi Wijethunga</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}