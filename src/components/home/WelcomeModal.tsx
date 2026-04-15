"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 1500); // Opens after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative border-t-8 border-[#D97706] shadow-2xl"
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#064E3B] rounded-2xl flex items-center justify-center text-[#D97706] font-black text-2xl mx-auto mb-6 shadow-lg">K</div>
              <h2 className="text-2xl font-black text-[#064E3B] uppercase tracking-tight mb-4">Empowering Zamfara</h2>
              <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8 uppercase tracking-wide">
                Welcome to the KLM Foundation. Discover our network of innovation and community development initiatives.
              </p>
              <button 
                onClick={closeModal}
                className="w-full bg-[#064E3B] text-white font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-[#043327] transition-all shadow-md"
              >
                Enter Website
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};