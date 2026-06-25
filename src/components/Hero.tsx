/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenReservations: () => void;
  onScrollToPhilosophy: () => void;
}

export default function Hero({ onOpenReservations, onScrollToPhilosophy }: HeroProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-start px-6 md:px-12 lg:px-24 overflow-hidden pt-20"
      id="hero"
    >
      {/* 🎥 CINEMATIC FILM BACKGROUND VIDEO PLAYER */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-black/15 z-10" />

        {/* Autoplay cinematic video */}
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/umi.MOV"
          onError={() => console.error("Video failed to load")}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/umi.MOV" type="video/quicktime" />
          <source src="/umi.MOV" type="video/mp4" />
        </video>
      </div>

      {/* Visual Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/50 via-bg-primary/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-bg-primary/20 z-10 pointer-events-none" />

      {/* Content Container (Approx. 40%-50% wide on large screens) */}
      <div className="relative z-20 max-w-xl lg:max-w-2xl text-left flex flex-col justify-center select-none">
        
        {/* Category Label */}
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

        {/* Master Typographical Headline Composition with Font Intersect */}
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

        {/* Short Editorial Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="text-text-luxury/70 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide mb-10 max-w-md"
          id="hero-narrative"
        >
          Inspired by centuries of Asian culinary heritage, crafted with the finest seasonal ingredients.
        </motion.p>

        {/* Reservation CTA Button */}
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
            <span className="relative z-10 flex items-center gap-3">
              Reserve A Table
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
            </span>
            <span className="absolute inset-0 bg-gold-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
          </button>
        </motion.div>
      </div>

      {/* Luxury Parallax Scroll Indicator */}
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
    </section>
  );
}
