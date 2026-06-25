/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import ChefKnifeImage from '../assets/images/chef_knife_precision_1782332632899.jpg';

export default function ChefsCraft() {
  const principles = [
    {
      num: '01',
      title: 'The 36.5°C Shari Rule',
      text: 'Our red vinegar sushi rice (shari) is kept at exact human body temperature—36.5°C—ensuring that it immediately melts on the palate, harmonizing with the fats of the raw fish.',
    },
    {
      num: '02',
      title: 'Aged Edomae Curing',
      text: 'Rather than serving fish fresh, we utilize ancient Edomae curing methods (including kombujime and shiojime) to age bluefin tuna and whitefish for up to 14 days, concentrating natural umami.',
    },
    {
      num: '03',
      title: 'The Single-Stroke Cut',
      text: 'A master chef never "saws" the fish. Using hand-forged Tamahagane steel Yanagiba knives, each fillet is separated in a single, fluid draw-stroke, leaving the delicate proteins undamaged.',
    },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-secondary overflow-hidden py-28 border-b border-white/5"
      id="chefs-craft"
    >
      {/* Background vector circles / glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full select-none" id="chef-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Full-Height Editorial Photo with overlapping text */}
          <div className="lg:col-span-6 flex justify-center items-center relative" id="chef-visual">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-md bg-bg-tertiary border border-white/5 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={ChefKnifeImage}
                  alt="Executive Chef preparing food with ultimate precision"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
              </div>

              {/* Overlapping gold leaf citation label */}
              <div className="absolute -bottom-8 -right-8 bg-bg-primary border border-gold-accent/30 p-6 max-w-xs shadow-[0_15px_40px_rgba(0,0,0,0.8)] hidden sm:block">
                <p className="font-serif text-lg italic text-gold-accent leading-snug mb-2">
                  "The knife is an extension of the soul."
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-text-luxury/50">
                  — Chef Kenji Sato
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Immersive story & principles */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left" id="chef-story-text">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 font-sans font-medium">
              THE ART OF PRECISION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-text-luxury leading-tight mb-8">
              Decades in a <span className="italic">Single Cut</span>
            </h2>
            <p className="text-text-luxury/70 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide mb-12 max-w-xl">
              To wield the sushi knife at UMI is to respect the lifecycle of the ingredients.
              Executive Chef Kenji Sato has dedicated thirty-five years to perfecting the geometry, temperature, and kinetics of Edomae sushi.
              His methods are conservative yet visionary, honoring classic techniques while pushing boundaries of aging.
            </p>

            {/* Principles Staggered List */}
            <div className="flex flex-col gap-8" id="chef-principles-list">
              {principles.map((p, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  key={index}
                  className="flex gap-6 items-start group"
                  id={`principle-item-${p.num}`}
                >
                  <span className="font-serif text-lg text-gold-accent/40 group-hover:text-gold-accent transition-colors duration-500 font-light mt-0.5">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-normal text-text-luxury group-hover:text-gold-accent transition-colors duration-500 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-text-luxury/60 text-xs sm:text-sm font-sans font-light leading-relaxed tracking-wide">
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
