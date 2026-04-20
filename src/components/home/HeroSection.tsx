"use client";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    // Changed z-index to a negative or zero value to ensure it never overlaps the Navbar
    <section className="relative h-screen w-full overflow-hidden flex items-center z-0"> 
      
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10"> {/* Set to -z-10 so it is the absolute bottom layer */}
        <img 
          src={urlFor(data.backgroundImage).url()} 
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* The "Unified Vision" Tag */}
          <span className="inline-block bg-[#D97706] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            {data?.topTag || "Unified Vision, One Zamfara"}
          </span>

          <h1 className="text-5xl md:text-8xl font-black uppercase italic leading-none mb-6">
            {data?.headline}
          </h1>
          
          <p className="text-sm md:text-base font-bold uppercase tracking-widest max-w-xl text-gray-300 mb-10 leading-relaxed">
            {data?.subheadline}
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Primary Button */}
            <Link href="/projects">
              <button className="bg-white text-[#064E3B] px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#D97706] hover:text-white transition-all">
                {data?.primaryCtaText || "Explore Projects"}
              </button>
            </Link>

            {/* Secondary Button */}
            <Link href="/register">
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-[#064E3B] transition-all">
                {data?.secondaryCtaText || "Join Movement"}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};