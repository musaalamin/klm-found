"use client";
import Link from 'next/link';

export const Navbar = () => (
  // 'fixed top-0' keeps it at the top. 'z-50' ensures it stays above all other content.
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
    {/* Merged bg-white/80 and backdrop-blur-md for a modern, semi-transparent look */}
    <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-4 md:px-8 py-4 flex justify-between items-center">
      
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#064E3B] rounded-lg flex items-center justify-center text-[#D97706] font-black text-lg md:text-xl shadow-sm">K</div>
        <span className="font-bold text-[#064E3B] tracking-tight text-sm md:text-base">KLM FOUNDATION</span>
      </Link>
      
      {/* Navigation Links - Hidden on small screens, flex on medium+ */}
      <div className="hidden md:flex gap-6 lg:gap-10 text-[10px] font-black text-gray-600 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#D97706] transition-colors">Home</Link>
        <Link href="/about" className="hover:text-[#D97706] transition-colors">The Jagaban</Link>
        <Link href="/projects" className="hover:text-[#D97706] transition-colors">Projects</Link>
        <Link href="/news" className="hover:text-[#D97706] transition-colors">News</Link>
        <Link href="/network" className="hover:text-[#D97706] transition-colors">Network</Link>
        <Link href="/contact" className="hover:text-[#D97706] transition-colors">Contact</Link>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden flex flex-col gap-1.5">
        <div className="w-6 h-0.5 bg-[#064E3B] rounded-full"></div>
        <div className="w-6 h-0.5 bg-[#064E3B] rounded-full"></div>
      </div>
    </div>
  </nav>
);