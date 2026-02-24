"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center">
      {/* Background Image - Positioned Right to show faces */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-right bg-cover md:bg-contain opacity-80"
        style={{ backgroundImage: "url('/hero-jagaban.jpg')" }}
      ></div>

      {/* Dark Fade for Readability on Left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12 z-10 pt-32 md:pt-20"> {/* This pt-32 pushes it down without centering it */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-left" // Forced back to left-aligned
        >
          <span className="text-[#D97706] font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
            Unified Vision • One Zamfara
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] text-white">
            KLM <br/> <span className="text-[#D97706]">FOUNDATION</span>
          </h1>
          <p className="text-gray-200 text-lg mt-6 font-bold max-w-lg border-l-4 border-[#064E3B] pl-6 uppercase tracking-wider leading-tight">
            Consolidating a legacy of impactful service and fostering sustainable development in alignment with the progressive leadership of His Excellency.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link href="/register">
              <button className="bg-[#D97706] text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-xs">
                Join the Movement
              </button>
            </Link>
            <Link href="/projects">
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-[#064E3B] transition-all text-xs">
                View Projects
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}