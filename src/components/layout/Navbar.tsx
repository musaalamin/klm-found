"use client";
import Link from 'next/link';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
    <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg px-8 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#064E3B] rounded-lg flex items-center justify-center text-[#D97706] font-black text-xl">K</div>
        <span className="font-bold text-[#064E3B] tracking-tight">KLM FOUNDATION</span>
      </Link>
      
      <div className="hidden md:flex gap-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#D97706]">Home</Link>
        <Link href="/about" className="hover:text-[#D97706]">The Jagaban</Link>
        <Link href="/projects" className="hover:text-[#D97706]">Projects</Link>
        <Link href="/news" className="hover:text-[#D97706]">News</Link>
        <Link href="/contact" className="hover:text-[#D97706]">Contact</Link> {/* ADDED THIS */}
      </div>

      <Link href="/admin">
        <button className="bg-[#064E3B] text-white px-6 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-[#043327] transition-all uppercase tracking-widest">
          Admin Portal
        </button>
      </Link>
    </div>
  </nav>
);