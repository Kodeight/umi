/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, SlidersHorizontal, CalendarDays } from 'lucide-react';
import PrivateRoomImage from '../assets/images/luxury_private_dining_1782332651287.jpg';

interface PrivateDiningProps {
  onInquirePrivateDining: () => void;
}

export default function PrivateDining({ onInquirePrivateDining }: PrivateDiningProps) {
  const offerings = [
    {
      title: 'The Shôji Chamber',
      capacity: '4 to 8 guests',
      detail: 'Fully secluded behind handcrafted washi paper shoji screens. Features a solid 400-year-old Hinoki cypress table and a private auxiliary counter where a dedicated chef serves your omakase course-by-course.',
    },
    {
      title: 'The Maple Salon',
      capacity: '8 to 12 guests',
      detail: 'An expansive editorial space framed by dark wood panels, featuring antique Japanese pottery, a dedicated sake sommelier, and a customized menu highlighting exclusive seasonal delicacies.',
    }
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-primary overflow-hidden py-28 border-b border-white/5"
      id="private-dining"
    >
      {/* Background soft lighting wash */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full select-none" id="private-dining-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Intimate details and rooms */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1" id="private-dining-text-side">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 font-sans font-medium">
              EXCLUSIVE SANCTUARIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-text-luxury leading-tight mb-8">
              Private Dining <span className="italic">Reimagined</span>
            </h2>
            <p className="text-text-luxury/70 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide mb-12 max-w-xl">
              For gatherings requiring absolute discretion and customized culinary storytelling, UMI offers two exquisitely appointed private chambers.
              Each space is designed according to Sukiya-zukuri architecture principles, combining raw Hinoki, handmade shoji, and minimalist styling.
            </p>

            {/* Room Offerings list */}
            <div className="flex flex-col gap-10 mb-12" id="private-rooms-list">
              {offerings.map((room, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  key={index}
                  className="border-l-2 border-gold-accent/20 hover:border-gold-accent pl-6 py-1 group transition-colors duration-500"
                  id={`room-${index}`}
                >
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <h3 className="font-serif text-xl font-normal text-text-luxury group-hover:text-gold-accent transition-colors duration-500">
                      {room.title}
                    </h3>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-gold-accent/60 bg-gold-accent/5 px-2.5 py-1 rounded-sm border border-gold-accent/10">
                      {room.capacity}
                    </span>
                  </div>
                  <p className="text-text-luxury/60 text-xs sm:text-sm font-sans font-light leading-relaxed tracking-wide">
                    {room.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Booking Trigger Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              id="private-dining-cta-wrapper"
            >
              <button
                onClick={onInquirePrivateDining}
                className="group flex items-center gap-4 border border-gold-accent/30 hover:border-gold-accent text-text-luxury bg-bg-secondary/50 hover:bg-gold-accent hover:text-bg-primary px-8 py-4 uppercase text-xs tracking-[0.25em] transition-all duration-700 ease-[0.16,1,0.3,1] rounded-sm relative overflow-hidden"
                id="private-inquire-btn"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Inquire For Private Event
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                </span>
                <span className="absolute inset-0 bg-gold-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Panoramic layout frame */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center" id="private-dining-visual-side">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] w-full max-w-2xl bg-bg-tertiary border border-white/5 p-3 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={PrivateRoomImage}
                  alt="Atmospheric Japanese Private Dining Chamber"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent pointer-events-none" />
              </div>

              {/* Decorative corner borders for editorial style */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-accent/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-accent/30" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-accent/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-accent/30" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
