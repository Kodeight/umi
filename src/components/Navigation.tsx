/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenReservations: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navigation({ onOpenReservations, onScrollToSection, activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'philosophy' },
    { label: 'Menu', id: 'menu' },
    { label: 'Private Dining', id: 'private-dining' },
    { label: 'Gallery', id: 'experience' },
    { label: 'Contact', id: 'footer' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent py-6 md:py-8'
        }`}
        id="main-header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
            id="logo-container"
          >
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-[0.25em] text-text-luxury group-hover:text-gold-accent transition-colors duration-500">
              UMI
            </span>
            <div className="flex flex-col text-[8px] font-medium text-gold-accent tracking-widest border-l border-gold-accent/30 pl-2 leading-none uppercase select-none">
              <span>海</span>
              <span>味</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative text-xs uppercase tracking-[0.3em] font-sans font-light text-text-luxury/75 hover:text-text-luxury transition-colors duration-500 py-1"
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Reservation Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenReservations}
              className="hidden md:block border border-gold-accent/40 text-gold-accent hover:text-bg-primary bg-transparent hover:bg-gold-accent font-sans text-xs uppercase tracking-[0.25em] px-6 py-2.5 transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden group rounded-sm"
              id="header-reserve-btn"
            >
              <span className="relative z-10">Reservation</span>
              <span className="absolute inset-0 bg-gold-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-text-luxury hover:text-gold-accent transition-colors duration-300 p-1"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-bg-primary z-40 flex flex-col justify-center items-center px-8 md:hidden"
            id="mobile-nav-overlay"
          >
            {/* Ambient gold/dark light wash background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 text-center" id="mobile-nav-links">
              {navItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-lg uppercase tracking-[0.25em] font-serif ${
                    activeSection === item.id ? 'text-gold-accent' : 'text-text-luxury/80'
                  } hover:text-text-luxury transition-colors duration-300`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.6 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservations();
                }}
                className="mt-8 border border-gold-accent/50 text-gold-accent px-8 py-3 uppercase text-xs tracking-[0.25em] rounded-sm hover:bg-gold-accent/10 transition-colors"
                id="mobile-reserve-btn"
              >
                Book Counter
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
