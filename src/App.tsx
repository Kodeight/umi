/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CalendarDays, Ticket, X, CalendarCheck, MapPin, Clock } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Experience from './components/Experience';
import SignatureMenu from './components/SignatureMenu';
import ChefsCraft from './components/ChefsCraft';
import PrivateDining from './components/PrivateDining';
import Reservations from './components/Reservations';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Reservation } from './types';

export default function App() {
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [preSelectedPreference, setPreSelectedPreference] = useState<'Counter' | 'Private Room' | 'Window View' | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);



  // Load active reservation from local storage
  useEffect(() => {
    const saved = localStorage.getItem('umi_reservation');
    if (saved) {
      try {
        setActiveReservation(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reservation from localStorage', e);
      }
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScrollDetect = () => {
      const sections = ['hero', 'philosophy', 'menu', 'private-dining', 'experience', 'footer'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollDetect);
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  const handleAddReservation = (res: Reservation) => {
    setActiveReservation(res);
    localStorage.setItem('umi_reservation', JSON.stringify(res));
    // Pop up the reservation view immediately
    setIsPassModalOpen(true);
  };

  const handleCancelReservation = () => {
    setActiveReservation(null);
    localStorage.removeItem('umi_reservation');
    setIsPassModalOpen(false);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirePrivateDining = () => {
    setPreSelectedPreference('Private Room');
    handleScrollToSection('reservations');
  };

  const handleOpenReservations = () => {
    setPreSelectedPreference('Counter');
    handleScrollToSection('reservations');
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-luxury select-none font-sans" id="app-root">

      {/* Navigation Header bar */}
      <Navigation 
        onOpenReservations={handleOpenReservations} 
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Page Content layout wrapper */}
      <main className="relative z-10 overflow-hidden">
        
        {/* Section 1: Hero */}
        <Hero 
          onOpenReservations={handleOpenReservations}
          onScrollToPhilosophy={() => handleScrollToSection('philosophy')}
        />

        {/* Section 2: Philosophy */}
        <Philosophy />

        {/* Section 3: Sensory Experience */}
        <Experience />

        {/* Section 4: Signature Progression Menu */}
        <SignatureMenu />

        {/* Section 5: Chef's Precision Craft */}
        <ChefsCraft />

        {/* Section 6: Private sanctuaries */}
        <PrivateDining onInquirePrivateDining={handleInquirePrivateDining} />

        {/* Section 7: Elite Reservations system */}
        <Reservations 
          onAddReservation={handleAddReservation}
          activeReservation={activeReservation}
          onCancelReservation={handleCancelReservation}
          preSelectedPreference={preSelectedPreference}
        />

        {/* Section 8: Gastronomy critic testimonials */}
        <Testimonials />

        {/* Section 9: Final Statement & Footer */}
        <Footer onOpenReservations={handleOpenReservations} />

      </main>

      {/* 🎟️ ACTIVE RESERVATION TICKET FLOATING BADGE (Awwwards delight) */}
      <AnimatePresence>
        {activeReservation && !isPassModalOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={() => setIsPassModalOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gold-accent hover:bg-gold-hover text-bg-primary font-sans font-medium text-[10px] uppercase tracking-widest px-5 py-3.5 rounded-full flex items-center gap-2.5 shadow-[0_10px_35px_rgba(212,167,98,0.4)] border border-gold-hover/20"
            id="active-reservation-badge"
          >
            <Ticket className="w-4 h-4 animate-bounce" />
            <span>View Active Pass</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 🎟️ PERSISTENT INVITATION PASS MODAL OVERLAY */}
      <AnimatePresence>
        {isPassModalOpen && activeReservation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            id="pass-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-bg-tertiary border border-gold-accent/10 rounded-sm max-w-lg w-full p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
              id="pass-modal-card"
            >
              {/* 🏆 PREMIUM GOLD DRAWING BORDER SVG */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-30" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                id="modal-border-svg"
              >
                <motion.rect
                  x="0.5"
                  y="0.5"
                  width="99"
                  height="99"
                  rx="1"
                  fill="none"
                  stroke="#D4A762"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    pathLength: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
                    opacity: { duration: 0.2, delay: 0.1 }
                  }}
                />
              </svg>

              {/* Gold Top line */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-accent via-gold-hover to-gold-accent z-20" 
              />

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                onClick={() => setIsPassModalOpen(false)}
                className="absolute top-4 right-4 text-text-luxury/50 hover:text-gold-accent transition-colors p-1 z-45"
                id="close-pass-modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* SEQUENTIAL REVEAL CONTENT CONTAINER */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-6 select-none relative z-10 w-full"
              >
                <div className="p-3 bg-gold-accent/10 border border-gold-accent/30 rounded-full text-gold-accent">
                  <CalendarCheck className="w-6 h-6 animate-pulse" />
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold-accent block mb-1">
                    UMI PRIVATE SEATING PASS
                  </span>
                  <h3 className="font-serif text-2xl font-light text-text-luxury">
                    Honorable Invitation
                  </h3>
                </div>

                <div className="w-full bg-bg-primary/80 border border-white/5 p-6 rounded-sm flex flex-col gap-4 text-left">
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-[10px] font-sans text-gold-accent/60 uppercase tracking-widest">Guest</span>
                    <span className="text-sm font-serif font-light text-text-luxury">{activeReservation.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-[10px] font-sans text-gold-accent/60 uppercase tracking-widest">Date & Time</span>
                    <span className="text-xs font-sans text-text-luxury">{activeReservation.date} @ {activeReservation.time}</span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-[10px] font-sans text-gold-accent/60 uppercase tracking-widest">Party Size</span>
                    <span className="text-xs font-sans text-text-luxury">{activeReservation.guests} {activeReservation.guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-[10px] font-sans text-gold-accent/60 uppercase tracking-widest">Seating Loc</span>
                    <span className="text-xs font-sans text-text-luxury">{activeReservation.tablePreference}</span>
                  </div>

                  {activeReservation.specialRequests && (
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-sans text-gold-accent/60 uppercase tracking-widest">Counter Seat</span>
                      <span className="text-xs font-mono text-gold-accent font-semibold uppercase">{activeReservation.specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 items-center border-t border-dashed border-white/10 pt-4 w-full">
                  <span className="text-[8px] uppercase tracking-widest text-text-luxury/40">INVITATION CODE</span>
                  <span className="text-lg font-mono font-bold text-gold-accent tracking-wider">
                    {activeReservation.confirmationCode}
                  </span>
                </div>

                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={handleCancelReservation}
                    className="flex-1 border border-red-500/20 hover:border-red-500 text-red-500 hover:bg-red-500/10 py-3 text-[10px] uppercase tracking-widest transition-colors rounded-sm font-sans"
                    id="modal-cancel-btn"
                  >
                    Cancel Seat
                  </button>
                  <button
                    onClick={() => setIsPassModalOpen(false)}
                    className="flex-1 bg-gold-accent hover:bg-gold-hover text-bg-primary py-3 text-[10px] uppercase tracking-widest transition-colors rounded-sm font-semibold font-sans"
                    id="modal-close-btn"
                  >
                    Keep Invitation
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
