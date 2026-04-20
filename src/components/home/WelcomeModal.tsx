"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen this specific version of the modal
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal_v2');
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomeModal_v2', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* z-[2000] ensures it sits above the Navbar (z-[999]).
           'fixed inset-0' only exists in the DOM when isOpen is true.
        */
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full relative border-t-[12px] border-[#D97706] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Close Icon */}
            <button 
              onClick={closeModal} 
              className="absolute top-6 right-6 text-gray-400 hover:text-[#064E3B] transition-colors"
            >
              <X size={28} />
            </button>
            
            <div className="text-center">
              {/* Branding */}
              <div className="w-20 h-20 bg-[#064E3B] rounded-3xl flex items-center justify-center text-[#D97706] font-black text-3xl mx-auto mb-8 shadow-xl">
                K
              </div>
              
              <h2 className="text-3xl font-black text-[#064E3B] uppercase italic tracking-tighter mb-4">
                Empowering <br/> Zamfara
              </h2>
              
              <p className="text-gray-500 text-[10px] font-bold leading-relaxed mb-10 uppercase tracking-[0.2em]">
                Welcome to the KLM Foundation portal. Discover our visionary network of innovation, climate action, and community development.
              </p>

              {/* Action Button */}
              <button 
                onClick={closeModal}
                className="w-full bg-[#064E3B] text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#D97706] transition-all transform active:scale-95 shadow-lg"
              >
                Enter Website
              </button>
              
              <p className="mt-6 text-[8px] font-black text-gray-300 uppercase tracking-widest">
                Visionary Leadership • Sustainable Impact
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};