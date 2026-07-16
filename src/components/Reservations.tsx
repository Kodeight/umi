/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, CheckCircle2, Copy, Shield, Sparkles, ChevronRight, Armchair } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationsProps {
  onAddReservation: (res: Reservation) => void;
  activeReservation: Reservation | null;
  onCancelReservation: () => void;
  preSelectedPreference?: 'Counter' | 'Private Room' | 'Window View' | null;
}

const AVAILABLE_TIMES = ['17:30', '18:00', '19:30', '20:00', '21:30'];
const AVAILABLE_SEATS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 10 counter seats

export default function Reservations({ 
  onAddReservation, 
  activeReservation, 
  onCancelReservation,
  preSelectedPreference 
}: ReservationsProps) {
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('19:30');
  const [tablePreference, setTablePreference] = useState<'Counter' | 'Private Room' | 'Window View'>('Counter');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<number | null>(4); // Default select seat 4
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preSelectedPreference) {
      setTablePreference(preSelectedPreference);
    }
  }, [preSelectedPreference]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) errors.phone = 'Valid phone number is required';
    if (!date) errors.date = 'Date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const codeHash = 'UMI-' + Math.floor(1000 + Math.random() * 9000) + '-' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    
    const newReservation: Reservation = {
      id: Math.random().toString(),
      name,
      email,
      phone,
      guests,
      date,
      time,
      tablePreference,
      confirmationCode: codeHash,
      createdAt: new Date().toISOString(),
      specialRequests: tablePreference === 'Counter' && selectedSeat ? `Counter Seat No. ${selectedSeat}` : undefined,
    };

    onAddReservation(newReservation);
  };

  const handleCopyCode = () => {
    if (activeReservation) {
      navigator.clipboard.writeText(activeReservation.confirmationCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-bg-secondary overflow-hidden py-32 border-b border-white/5"
      id="reservations"
    >
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bg-primary/80 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-20 select-none" id="reservation-wrapper">
        
        <AnimatePresence mode="wait">
          {!activeReservation ? (
            /* Reservation Form Interface */
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
              id="reservation-form-grid"
            >
              
              {/* Left Column: Form Info and Seating Selection */}
              <div className="lg:col-span-5 flex flex-col gap-8" id="reservation-info-pane">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-gold-accent mb-4 block font-sans font-medium">
                    COUNTER RESERVATIONS
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-text-luxury leading-tight mb-4">
                    Secure Your Place <span className="italic">At The Table</span>
                  </h2>
                  <p className="text-text-luxury/60 text-sm font-sans font-light leading-relaxed tracking-wide">
                    UMI features an intimate 10-seat master counter. Bookings are available up to 30 days in advance.
                    We recommend counter seating to fully experience the craftsmanship of Chef Kenji Sato.
                  </p>
                </div>

                {/* Counter Seating Chart - Custom Interactive SVG/HTML map */}
                {tablePreference === 'Counter' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-bg-tertiary border border-white/5 p-6 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
                    id="counter-seating-chart"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] uppercase tracking-widest text-gold-accent/80 font-medium">
                        Interactive Counter Map
                      </span>
                      <span className="text-[9px] font-sans text-text-luxury/40">
                        {selectedSeat ? `Seat No. ${selectedSeat} Selected` : 'Select a Seat'}
                      </span>
                    </div>

                    {/* Visual diagram representation of UMI counter */}
                    <div className="relative flex flex-col items-center gap-6 py-6 border border-gold-accent/10 rounded-sm bg-bg-primary/40">
                      {/* Chef Counter Bar Area */}
                      <div className="w-[85%] h-5 bg-bg-tertiary border-b border-gold-accent/40 rounded-t-lg flex items-center justify-center relative shadow-[inset_0_-10px_20px_rgba(0,0,0,0.8)] px-2">
                        <span className="text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold-accent/60 font-medium font-mono text-center truncate">
                          Chef Kenji Sato’s Prep Area
                        </span>
                        {/* Glow light effect under counter */}
                        <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-24 sm:w-32 h-[1px] bg-gold-accent/40 blur-[1px]" />
                      </div>

                      {/* Seat selection row */}
                      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between w-[95%] sm:w-[90%] gap-2 sm:gap-1 px-1 sm:px-2">
                        {AVAILABLE_SEATS.map((seat) => {
                          const isBooked = seat === 2 || seat === 7; // Mock some booked seats
                          const isSelected = selectedSeat === seat;
                          return (
                            <button
                              key={seat}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedSeat(seat)}
                              className={`flex flex-col items-center gap-1 focus:outline-none min-w-[32px] sm:min-w-0 sm:flex-1 transition-all duration-300 ${
                                isBooked 
                                  ? 'opacity-20 cursor-not-allowed' 
                                  : 'cursor-pointer hover:scale-110'
                              }`}
                              id={`counter-seat-${seat}`}
                            >
                              {/* Armchair visual component */}
                              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center border transition-all duration-500 ${
                                isSelected
                                  ? 'bg-gold-accent/20 border-gold-accent text-gold-accent shadow-[0_0_15px_rgba(212,167,98,0.3)]'
                                  : 'bg-bg-tertiary border-white/10 text-text-luxury/40'
                              }`}>
                                <Armchair className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </div>
                              <span className={`text-[7px] sm:text-[8px] font-mono ${isSelected ? 'text-gold-accent font-bold' : 'text-text-luxury/30'}`}>
                                {seat}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-4 mt-2 text-[9px] font-sans text-text-luxury/50 justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-bg-tertiary border border-white/10 rounded-sm" />
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-gold-accent/20 border border-gold-accent rounded-sm" />
                          <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-bg-tertiary border border-white/10 opacity-20 rounded-sm" />
                          <span>Unavailable</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Additional reassurance */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 text-xs text-text-luxury/50 font-sans font-light">
                  <Shield className="w-4 h-4 text-gold-accent/60 flex-shrink-0" />
                  <span>Your booking is fully secure. No upfront charges. Credit card details are kept strictly as an attendance holding guarantee.</span>
                </div>
              </div>

              {/* Right Column: Premium Interactive Form */}
              <div className="lg:col-span-7 bg-bg-tertiary border border-white/5 p-8 md:p-12 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.9)]" id="reservation-form-container">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="reservation-booking-form">
                  
                  {/* Form section: Placement */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium">
                      Table / Ambience Preference
                    </label>
                    <div className="grid grid-cols-3 gap-3" id="preference-toggle">
                      {(['Counter', 'Private Room', 'Window View'] as const).map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setTablePreference(pref)}
                          className={`py-3.5 px-2 text-center text-[10px] md:text-xs uppercase tracking-wider border rounded-sm transition-all duration-700 font-sans font-light ${
                            tablePreference === pref
                              ? 'bg-gold-accent/15 border-gold-accent text-gold-accent shadow-[0_0_15px_rgba(212,167,98,0.1)]'
                              : 'bg-bg-primary/40 border-white/5 text-text-luxury/50 hover:text-text-luxury hover:border-white/20'
                          }`}
                          id={`pref-btn-${pref.replace(' ', '-')}`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Section: Size / Date / Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="date-time-guests-row">
                    {/* Guest Selector */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold-accent" /> Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="bg-bg-primary/60 border border-white/5 focus:border-gold-accent text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none appearance-none cursor-pointer"
                        id="guest-selector"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num} className="bg-bg-tertiary">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-accent" /> Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-bg-primary/60 border border-white/5 focus:border-gold-accent text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none cursor-pointer"
                        id="date-picker"
                      />
                    </div>

                    {/* Time Picker */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-accent" /> Seating Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-bg-primary/60 border border-white/5 focus:border-gold-accent text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none appearance-none cursor-pointer"
                        id="time-selector"
                      >
                        {AVAILABLE_TIMES.map((t) => (
                          <option key={t} value={t} className="bg-bg-tertiary">
                            {t} Seating
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Form Section: User details with luxurious floating effect labels */}
                  <div className="flex flex-col gap-5 mt-4" id="form-personal-fields">
                    {/* Name */}
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors({...formErrors, name: ''});
                        }}
                        placeholder="e.g. Master Kenji"
                        className={`bg-bg-primary/60 border ${formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-accent'} text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none`}
                        id="input-name"
                      />
                      {formErrors.name && (
                        <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1">
                          {formErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Contact Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="form-contact-row">
                      {/* Email */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formErrors.email) setFormErrors({...formErrors, email: ''});
                          }}
                          placeholder="name@luxury.com"
                          className={`bg-bg-primary/60 border ${formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-accent'} text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none`}
                          id="input-email"
                        />
                        {formErrors.email && (
                          <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1">
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gold-accent/80 font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (formErrors.phone) setFormErrors({...formErrors, phone: ''});
                          }}
                          placeholder="+81 (00) 0000 0000"
                          className={`bg-bg-primary/60 border ${formErrors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-gold-accent'} text-text-luxury rounded-sm py-3 px-4 text-xs font-sans font-light tracking-wide focus:outline-none`}
                          id="input-phone"
                        />
                        {formErrors.phone && (
                          <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1">
                            {formErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <button
                    type="submit"
                    className="mt-6 flex justify-center items-center gap-3 bg-gold-accent hover:bg-gold-hover text-bg-primary font-sans text-xs uppercase tracking-[0.25em] py-4.5 font-semibold transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden group shadow-[0_10px_30px_rgba(212,167,98,0.2)]"
                    id="submit-reservation-btn"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Request Reservation Seating <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>

                </form>
              </div>

            </motion.div>
          ) : (
            /* Reservation Pass Confirmation Card */
            <motion.div
              key="confirmation-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto bg-bg-tertiary border border-gold-accent/30 p-8 md:p-12 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.95)] relative overflow-hidden text-center"
              id="reservation-confirmation-pass"
            >
              {/* Confetti-style elegant backdrop blur wash */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold-accent via-gold-hover to-gold-accent" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col items-center gap-6" id="confirmation-content">
                <div className="p-4 bg-gold-accent/10 border border-gold-accent/30 rounded-full text-gold-accent animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold-accent font-sans block mb-2 font-medium">
                    CONFIRMATION OF PASSAGE
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-text-luxury leading-tight">
                    Your Counter is Saved
                  </h2>
                </div>

                <p className="text-text-luxury/75 text-sm font-sans font-light max-w-md leading-relaxed mb-6">
                  Honorable <span className="font-semibold text-gold-accent">{activeReservation.name}</span>, your reservation at UMI has been submitted successfully. An invitation detail has been dispatched to <span className="font-semibold text-text-luxury">{activeReservation.email}</span>.
                </p>

                {/* Elegant Ticket Component */}
                <div className="w-full bg-bg-primary/60 border border-white/5 p-6 md:p-8 rounded-sm flex flex-col gap-6 relative select-none" id="ticket-pass">
                  {/* Perforated ticket circular edge shapes */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-tertiary border-r border-white/5 rounded-full z-10" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-tertiary border-l border-white/5 rounded-full z-10" />

                  {/* Top: Details rows */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-b border-dashed border-white/10 pb-6" id="ticket-meta">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-gold-accent/60">Guests</span>
                      <span className="text-xs font-sans font-medium text-text-luxury">{activeReservation.guests} Seated</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-gold-accent/60">Date</span>
                      <span className="text-xs font-sans font-medium text-text-luxury">{activeReservation.date}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-gold-accent/60">Seating Time</span>
                      <span className="text-xs font-sans font-medium text-text-luxury">{activeReservation.time}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-gold-accent/60">Location</span>
                      <span className="text-xs font-sans font-medium text-text-luxury">{activeReservation.tablePreference}</span>
                    </div>
                  </div>

                  {/* Bottom: Code and seating */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2" id="ticket-footer">
                    {/* Confirmation hash */}
                    <div className="flex flex-col items-center md:items-start gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-gold-accent/60">INVITATION CODE</span>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-mono font-semibold text-gold-accent tracking-wider">
                          {activeReservation.confirmationCode}
                        </span>
                        <button 
                          onClick={handleCopyCode} 
                          className="p-1 hover:text-gold-accent text-text-luxury/50 transition-colors"
                          title="Copy Confirmation Code"
                          id="btn-copy-code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {isCopied && <span className="text-[9px] text-gold-accent font-sans animate-fade">Copied code!</span>}
                    </div>

                    {/* Specific counter details if selected */}
                    {activeReservation.specialRequests && (
                      <div className="flex items-center gap-2 border border-gold-accent/20 bg-gold-accent/5 px-4 py-2 rounded-sm" id="assigned-seat-panel">
                        <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                        <span className="text-[10px] font-mono tracking-widest text-text-luxury uppercase">
                          {activeReservation.specialRequests}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Return or Action Row */}
                <div className="flex gap-4 mt-8" id="confirmation-actions">
                  <button
                    onClick={onCancelReservation}
                    className="border border-white/10 hover:border-white/30 text-text-luxury/50 hover:text-text-luxury bg-transparent px-6 py-3 uppercase text-[10px] tracking-widest transition-colors duration-500 rounded-sm"
                    id="btn-cancel-seat"
                  >
                    Cancel / Edit Seat
                  </button>
                  <button
                    onClick={() => {
                      // Smooth scroll to hero
                      const element = document.getElementById('hero');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-bg-primary bg-transparent px-8 py-3 uppercase text-[10px] tracking-widest transition-all duration-700 rounded-sm"
                    id="btn-return-home"
                  >
                    Return Home
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
