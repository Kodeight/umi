/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenReservations: () => void;
  onScrollToPhilosophy: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const FRAME_COUNT = 69;
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Kodeight/umi@main/public/frames/';

const getFrameUrl = (index: number) => {
  const padded = String(index).padStart(4, '0');
  const time = ((index - 1) * 0.1).toFixed(2);
  return `${CDN_BASE}frame_${padded}_${time}s.webp`;
};

export default function Hero({ onOpenReservations, onScrollToPhilosophy, onLoadingChange }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const isLockedRef = useRef(true);
  const accumulatedRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);

  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  // Notify parent component about loader visibility changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  const isWheelingRef = useRef(false);
  const wheelTimeoutRef = useRef<number | null>(null);

  const setWheeling = useCallback(() => {
    isWheelingRef.current = true;
    if (wheelTimeoutRef.current !== null) {
      window.clearTimeout(wheelTimeoutRef.current);
    }
    wheelTimeoutRef.current = window.setTimeout(() => {
      isWheelingRef.current = false;
    }, 150);
  }, []);

  // ─── Draw frame with closest loaded frame fallback ───────────────────────
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    let frame = frames[idx];
    if (!frame || !frame.complete || !frame.naturalWidth) {
      let closestIdx = -1;
      let minDiff = Infinity;
      for (let i = 0; i < frames.length; i++) {
        const f = frames[i];
        if (f && f.complete && f.naturalWidth) {
          const diff = Math.abs(i - idx);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        }
      }
      if (closestIdx !== -1) {
        frame = frames[closestIdx];
      } else {
        return;
      }
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = frame.naturalWidth;
    const ih = frame.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(frame, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }, []);

  // ─── Pre-load frames in parallel with caching and error handling ──────────
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
      setLoadingProgress(progress);
      if (loadedCount === FRAME_COUNT) {
        setIsLoading(false);
        drawFrame(0);
      }
    };

    const loadPromise = async () => {
      const promises = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        imgs.push(img);
        
        const p = new Promise<void>((resolve) => {
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame from URL: ${getFrameUrl(i)}`);
            // Increment progress and resolve anyway to avoid blocking the app
            updateProgress();
            resolve();
          };
          img.src = getFrameUrl(i);
        });
        promises.push(p);
      }
      framesRef.current = imgs;
      await Promise.all(promises);
    };

    loadPromise();
  }, [drawFrame]);

  // ─── Resize canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(frameIndexRef.current);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ─── Scroll-lock + frame stepping via events ────────────────────────────────
  useEffect(() => {
    const DELTA_PER_FRAME = 35; // Pixels to advance one frame

    const advance = (delta: number) => {
      if (framesRef.current.length === 0 || isLoading) return;

      accumulatedRef.current += delta;
      const steps = Math.round(accumulatedRef.current / DELTA_PER_FRAME);
      if (steps === 0) return;
      accumulatedRef.current -= steps * DELTA_PER_FRAME;

      const newIdx = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndexRef.current + steps));
      if (newIdx !== frameIndexRef.current) {
        frameIndexRef.current = newIdx;
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(() => drawFrame(newIdx));
      }

      // Unlock if we reach the last frame (scrolling down)
      if (newIdx >= FRAME_COUNT - 1) {
        isLockedRef.current = false;
      }
      // Re-lock if we scroll up from the last frame
      if (newIdx < FRAME_COUNT - 1) {
        isLockedRef.current = true;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (isLoading) {
        e.preventDefault();
        return;
      }
      setWheeling();

      // Re-lock if we are at top of page and user scrolls up
      if (window.scrollY === 0 && e.deltaY < 0) {
        isLockedRef.current = true;
      }

      if (!isLockedRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      advance(e.deltaY);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isLoading) {
        e.preventDefault();
        return;
      }
      if (touchStartYRef.current === null) return;

      const delta = touchStartYRef.current - e.touches[0].clientY;
      touchStartYRef.current = e.touches[0].clientY;

      setWheeling();

      // Re-lock if at top of page and swiping down (scrolling up)
      if (window.scrollY === 0 && delta < 0) {
        isLockedRef.current = true;
      }

      if (!isLockedRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      advance(delta);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animFrameRef.current);
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [drawFrame, setWheeling, isLoading]);

  // ─── Reset / Re-lock on Scroll to Top ──────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;
      if (window.scrollY === 0) {
        isLockedRef.current = true;
        if (!isWheelingRef.current) {
          frameIndexRef.current = 0;
          drawFrame(0);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawFrame, isLoading]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary text-text-luxury select-none font-sans"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="font-serif text-4xl sm:text-5xl font-light text-text-luxury">
                {loadingProgress}%
              </span>
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-1 relative">
                <motion.div
                  className="h-full bg-gold-accent absolute left-0 top-0"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
              <span className="font-serif text-sm uppercase tracking-[0.3em] text-gold-accent animate-pulse mt-2">
                Loading cinematic experience...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky full-screen container matching original layout structure */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-start px-6 md:px-12 lg:px-24 overflow-hidden pt-20"
        style={{ zIndex: 0 }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-black/15 z-10" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/50 via-bg-primary/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-bg-primary/20 z-10 pointer-events-none" />

        {/* Content Container (Fully restored styling, no fade-outs/gaps) */}
        <div className="relative z-20 max-w-xl lg:max-w-2xl text-left flex flex-col justify-center select-none">
          {/* Category label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
            id="hero-category-label"
          >
            <span className="w-8 h-[1px] bg-gold-accent" />
            <span className="text-xs uppercase tracking-[0.4em] font-sans font-medium text-gold-accent">
              ASIAN CUISINE, REFINED
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-8" id="hero-headline-composition">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-text-luxury leading-none tracking-tight"
            >
              Where Tradition
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-accent relative -mt-3 sm:-mt-5 md:-mt-6 pl-12 sm:pl-20 select-none z-30 filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]"
            >
              Meets Taste
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="text-text-luxury/70 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide mb-10 max-w-md"
            id="hero-narrative"
          >
            Inspired by centuries of Asian culinary heritage, crafted with the finest seasonal ingredients.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            id="hero-cta-wrapper"
          >
            <button
              onClick={onOpenReservations}
              className="group flex items-center gap-4 border border-gold-accent/30 hover:border-gold-accent text-text-luxury bg-bg-secondary/50 hover:bg-gold-accent hover:text-bg-primary px-8 py-4 uppercase text-xs tracking-[0.25em] transition-all duration-700 ease-[0.16,1,0.3,1] rounded-sm relative overflow-hidden"
              id="hero-reserve-btn"
            >
              <span className="relative z-10 flex items-center gap-3">Reserve A Table</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
              <span className="absolute inset-0 bg-gold-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          onClick={onScrollToPhilosophy}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer select-none group"
          id="scroll-indicator"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-text-luxury/40 group-hover:text-gold-accent transition-colors duration-500">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-text-luxury/30 via-gold-accent to-transparent relative overflow-hidden"
          >
            <span className="absolute top-0 left-0 w-full h-1/2 bg-gold-accent animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
