/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CRITIC_REVIEWS } from '../data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-primary overflow-hidden py-32 border-b border-white/5"
      id="testimonials"
    >
      {/* Background vector highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-20 select-none" id="testimonials-container">
        
        {/* Header Title */}
        <div className="mb-20 md:mb-28 text-center" id="testimonials-header">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 block font-sans font-medium">
            GASTRONOMIC RECOGNITION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-text-luxury leading-tight max-w-2xl mx-auto">
            The Critical <span className="italic">Verdict</span>
          </h2>
        </div>

        {/* Editorial Vertical Stack */}
        <div className="flex flex-col gap-16 md:gap-24" id="testimonials-critic-stack">
          {CRITIC_REVIEWS.map((review, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              key={review.id}
              className="relative flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-6 md:gap-12 border-b border-white/5 pb-16 last:border-b-0 last:pb-0"
              id={`review-${review.id}`}
            >
              
              {/* Quote Icon decorative backdrop */}
              <div className="absolute -left-4 -top-8 text-gold-accent/5 pointer-events-none hidden lg:block">
                <Quote className="w-24 h-24 stroke-[0.5]" />
              </div>

              {/* Critic Source / Identity (Col span 4) */}
              <div className="md:col-span-4 flex flex-col items-start gap-1 text-left relative z-10">
                <span className="font-serif text-2xl font-normal text-text-luxury group-hover:text-gold-accent transition-colors">
                  {review.author}
                </span>
                <span className="text-xs uppercase tracking-widest text-gold-accent font-sans font-medium">
                  {review.designation}
                </span>
                <span className="text-[10px] font-mono text-text-luxury/40 mt-1 uppercase tracking-wider">
                  Pub. {review.source}
                </span>
              </div>

              {/* Actual Quote (Col span 8) */}
              <div className="md:col-span-8 text-left relative z-10 pl-0 md:pl-8 border-l-0 md:border-l border-gold-accent/20">
                <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-text-luxury/80 leading-relaxed tracking-wide italic">
                  “{review.quote}”
                </blockquote>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
