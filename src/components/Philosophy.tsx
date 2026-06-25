/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 bg-bg-primary overflow-hidden z-20 border-t border-b border-white/5 py-24"
      id="philosophy"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/chef.png" 
          alt="Chef Background" 
          className="w-full h-full object-cover opacity-30 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary" />
      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-12 select-none">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-xs uppercase tracking-[0.4em] text-gold-accent font-sans font-medium"
          id="philosophy-header-label"
        >
          OUR PHILOSOPHY
        </motion.div>

        {/* Large Editorial Statement */}
        <div className="flex flex-col gap-6 md:gap-10 max-w-4xl" id="philosophy-statements">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-text-luxury leading-tight italic"
          >
            “We do not serve meals.”
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gold-accent leading-tight"
          >
            “We create unforgettable evenings.”
          </motion.div>
        </div>

        {/* Supporting Narrative Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-text-luxury text-sm sm:text-base md:text-lg font-sans font-light leading-relaxed tracking-wide max-w-2xl mt-6 border-t border-gold-accent/15 pt-8"
            id="philosophy-narrative"
          >
            At UMI, dining is not a transaction. It is a slow-burn performance.
            An exchange of temperature, season, and spirit, orchestrated piece-by-piece over our hand-carved black marble counter.
          </motion.p>
      </div>
    </section>
  );
}
