/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import MatchaImage from '../assets/images/matcha_tea_ceremony_1782332671794.jpg';
import OmakaseImage from '../assets/images/omakase_sushi_plate_1782332613538.jpg';
import WagyuPlaceholder from '../assets/images/chef_knife_precision_1782332632899.jpg';

// Mapping menu items to beautiful generated imagery or stock placeholders
const MENU_IMAGES: Record<string, string> = {
  m1: OmakaseImage,
  m2: WagyuPlaceholder,
  m3: OmakaseImage,
  m4: MatchaImage,
};

export default function SignatureMenu() {
  const [hoveredId, setHoveredId] = useState<string>('m1');

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-primary overflow-hidden py-28 border-b border-white/5"
      id="menu"
    >
      <div className="max-w-7xl mx-auto w-full select-none" id="menu-container">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-28 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6" id="menu-header">
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 font-sans font-medium">
              CULINARY HARMONY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-text-luxury leading-tight">
              The Signature <span className="italic">Progression</span>
            </h2>
          </div>
          <p className="text-text-luxury/50 font-sans font-light text-sm tracking-wide max-w-sm text-left leading-relaxed">
            A meticulous dialogue of flavor, texture, and sequence. Hover over each dish to preview its essence.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Elegant Magazine list of dishes */}
          <div className="lg:col-span-7 flex flex-col gap-4" id="menu-list-side">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className="group relative border-b border-white/5 py-8 cursor-pointer"
                id={`menu-item-${item.id}`}
              >
                {/* Horizontal hover underline expansion */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] origin-left" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 mb-3">
                  {/* Title & Japanese subtitle */}
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-text-luxury group-hover:text-gold-accent transition-colors duration-500">
                      {item.name}
                    </h3>
                    <span className="font-serif text-sm text-gold-accent/40 font-light group-hover:text-gold-accent/70 transition-colors duration-500 tracking-wider">
                      {item.japaneseName}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="font-serif text-lg text-gold-accent/80 group-hover:text-gold-accent transition-colors duration-500 tracking-wide font-light flex-shrink-0">
                    {item.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-luxury/60 text-sm font-sans font-light leading-relaxed tracking-wide max-w-xl mb-4 group-hover:text-text-luxury/80 transition-colors duration-500">
                  {item.description}
                </p>

                {/* Scent notes / ingredients */}
                {item.ingredients && (
                  <div className="flex flex-wrap gap-2 items-center" id={`ingredients-${item.id}`}>
                    <span className="text-[10px] font-sans text-gold-accent/40 uppercase tracking-widest font-medium mr-2">
                      Key Notes:
                    </span>
                    {item.ingredients.map((ing, index) => (
                      <span 
                        key={index}
                        className="text-[10px] font-sans font-light text-text-luxury/40 group-hover:text-text-luxury/60 transition-colors duration-500 tracking-wider bg-bg-tertiary px-3 py-1 border border-white/5 rounded-sm"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Immersive visual presentation */}
          <div className="lg:col-span-5 sticky top-32 flex justify-center items-center" id="menu-image-side">
            {/* Soft gold backdrop shadow */}
            <div className="absolute w-72 h-72 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative aspect-[4/5] w-full max-w-sm bg-bg-tertiary border border-white/5 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {hoveredId && (
                    <motion.img
                      key={hoveredId}
                      src={MENU_IMAGES[hoveredId]}
                      alt="Luxury Dish Preview"
                      initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </AnimatePresence>
                {/* Vintage dark gradient mask overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent pointer-events-none" />
              </div>

              {/* Decorative corner borders for editorial style */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-accent/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-accent/30" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-accent/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-accent/30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
