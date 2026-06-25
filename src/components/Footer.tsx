/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenReservations: () => void;
}

export default function Footer({ onOpenReservations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-bg-secondary overflow-hidden py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-25"
      id="footer"
    >
      {/* Background visual atmosphere wash */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20 select-none" id="footer-container">
        
        {/* Top: Large Closing Statement CTA */}
        <div className="flex flex-col items-center text-center mb-20 border-b border-white/5 pb-20" id="footer-top-cta">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 font-sans font-medium">
            LIMITED SEATING INTENSITY
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-text-luxury max-w-4xl leading-tight mb-8">
            Experience Japanese <span className="italic text-gold-accent">Dining Reimagined</span>
          </h2>
          <p className="text-text-luxury/60 text-sm sm:text-base font-sans font-light max-w-xl mb-10 leading-relaxed">
            With only ten seats available per session, reservations are highly recommended. Join us at the counter for an unforgettable evening.
          </p>

          <button
            onClick={onOpenReservations}
            className="group flex items-center gap-4 border border-gold-accent text-bg-primary bg-gold-accent hover:bg-transparent hover:text-gold-accent px-10 py-4.5 uppercase text-xs tracking-[0.25em] transition-all duration-700 ease-[0.16,1,0.3,1] font-semibold rounded-sm relative overflow-hidden"
            id="footer-reserve-btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              Reserve Your Place At The Counter <Sparkles className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 bg-bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
          </button>
        </div>

        {/* Middle: Grid Details Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-20" id="footer-details-grid">
          
          {/* Column 1: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg text-gold-accent tracking-wider font-normal">
              Inquiries
            </h4>
            <div className="flex flex-col gap-3 font-sans text-xs font-light text-text-luxury/60 tracking-wider">
              <a href="tel:+81355550192" className="flex items-center gap-3 hover:text-gold-accent transition-colors">
                <Phone className="w-4 h-4 text-gold-accent/60" />
                <span>+81 (0) 3 5555 0192</span>
              </a>
              <a href="mailto:reservations@umi-sushi.jp" className="flex items-center gap-3 hover:text-gold-accent transition-colors">
                <Mail className="w-4 h-4 text-gold-accent/60" />
                <span>reservations@umi-sushi.jp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Location */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg text-gold-accent tracking-wider font-normal">
              Location
            </h4>
            <div className="flex items-start gap-3 font-sans text-xs font-light text-text-luxury/60 tracking-wider leading-relaxed">
              <MapPin className="w-4 h-4 text-gold-accent/60 mt-0.5 flex-shrink-0" />
              <span>
                2-Chome-4-1 Shibakoen, Minato City,<br />
                Tokyo 105-0011, Japan
              </span>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg text-gold-accent tracking-wider font-normal">
              Operating Hours
            </h4>
            <div className="flex items-start gap-3 font-sans text-xs font-light text-text-luxury/60 tracking-wider leading-relaxed">
              <Clock className="w-4 h-4 text-gold-accent/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-1"><strong className="font-medium text-text-luxury/80">Tuesday — Sunday</strong></p>
                <p>First Seating: 17:30 — 19:30</p>
                <p>Second Seating: 20:00 — 22:00</p>
                <p className="mt-2 text-gold-accent/60 font-medium text-[10px] uppercase tracking-widest">Closed Mondays</p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter/Brand */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg text-gold-accent tracking-wider font-normal">
              The Chronicle
            </h4>
            <p className="font-sans text-xs font-light text-text-luxury/50 tracking-wide leading-relaxed mb-1">
              Join our exclusive circle for seasonal menu updates and special culinary release notifications.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-bg-primary border border-white/5 focus:border-gold-accent focus:outline-none text-text-luxury text-xs px-4 py-2.5 rounded-l-sm w-full font-sans font-light"
                id="newsletter-email"
              />
              <button 
                className="bg-gold-accent text-bg-primary font-sans font-medium text-xs uppercase tracking-widest px-4 py-2.5 rounded-r-sm hover:bg-gold-hover transition-colors"
                id="newsletter-submit"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom: Copyright & Top trigger */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8 font-sans text-[10px] uppercase tracking-[0.3em] text-text-luxury/40" id="footer-bottom-row">
          
          <div className="flex items-center gap-6">
            <span>© {currentYear} UMI Tokyo. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="hidden md:inline hover:text-gold-accent transition-colors cursor-pointer">Privacy Policy</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 group hover:text-gold-accent transition-colors cursor-pointer border border-white/5 hover:border-gold-accent/30 bg-bg-primary px-4 py-2 rounded-sm"
            id="back-to-top-btn"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
}
