/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import OmakaseImage from '../assets/images/omakase_sushi_plate_1782332613538.jpg';

export default function Experience() {
  const elements = [
    {
      icon: <Compass className="w-5 h-5 text-gold-accent" />,
      title: 'Omakase (おまかせ)',
      description: 'Literally translating to "I leave it to you," our omakase is a dialogue of trust. The chef creates a bespoke culinary progression tuned to your reactions and the exact micro-season.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold-accent" />,
      title: "Chef's Selection",
      description: 'Each piece of nigiri is served individually at the absolute peak of its temperature. From the warmth of the vinegared shari rice to the coolness of the aged bluefin tuna.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-accent" />,
      title: 'Seasonal Ingredients',
      description: 'Our seafood is hand-selected each morning at Tokyo’s Toyosu Market and flown directly to our counter. We respect natural lifecycles, serving only ingredients at their seasonal zenith.',
    },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-secondary overflow-hidden py-24 border-b border-white/5"
      id="experience"
    >
      <div className="max-w-7xl mx-auto w-full select-none" id="experience-container">
        
        {/* Title */}
        <div className="mb-16 md:mb-24 flex flex-col items-start" id="experience-header">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 font-sans font-medium">
            SENSORY THEATER
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-text-luxury max-w-2xl leading-tight">
            An Intimate Dialogue <span className="italic">With Seasonality</span>
          </h2>
        </div>

        {/* Asymmetric Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Descriptive Elements */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-12 order-2 lg:order-1" id="experience-details">
            {elements.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                key={index}
                className="flex items-start gap-5 group"
                id={`experience-item-${index}`}
              >
                <div className="p-3 bg-bg-tertiary border border-gold-accent/20 rounded-sm group-hover:border-gold-accent transition-colors duration-500 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-text-luxury tracking-wide mb-2 group-hover:text-gold-accent transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-text-luxury/60 text-sm font-sans font-light leading-relaxed tracking-wide">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Large Imagery composition */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center items-center relative" id="experience-image-composition">
            {/* Ambient light spill */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

            {/* Main Picture Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] w-full max-w-2xl bg-bg-tertiary border border-white/5 p-3 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={OmakaseImage}
                  alt="Michelin-starred Omakase Sushi plate at UMI counter"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
              </div>

              {/* Minimal floating tag */}
              <div className="absolute bottom-6 right-6 bg-bg-primary/90 border border-gold-accent/30 backdrop-blur-md px-4 py-2 flex items-center gap-2 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-luxury font-sans">
                  The Counter Experience
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
