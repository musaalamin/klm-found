"use client";
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#064E3B] text-white py-16 px-6 border-t-8 border-[#D97706]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#064E3B] font-black text-2xl shadow-lg">K</div>
            <span className="font-black text-2xl tracking-tighter italic uppercase">KLM FOUNDATION</span>
          </div>
          <p className="text-gray-300 text-xs font-bold uppercase tracking-widest leading-relaxed">
            Consolidating legacy, empowering the grassroots, and building a unified Zamfara.
          </p>
        </div>

        {/* Navigation Section */}
        <div className="uppercase">
          <h4 className="text-[#D97706] font-black text-xs tracking-[0.3em] mb-6">Quick Links</h4>
          <ul className="space-y-3 text-[10px] font-black text-gray-200">
            <li><Link href="/" className="hover:text-[#D97706] transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#D97706] transition-colors">Hon. Kabiru Lawal</Link></li>
            <li><Link href="/projects" className="hover:text-[#D97706] transition-colors">Projects</Link></li>
            <li><Link href="/register" className="hover:text-[#D97706] transition-colors">Join Movement</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="uppercase">
          <h4 className="text-[#D97706] font-black text-xs tracking-[0.3em] mb-6">Connect With Us</h4>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18}/>} link="#" />
            <SocialIcon icon={<Twitter size={18}/>} link="#" />
            <SocialIcon icon={<Instagram size={18}/>} link="#" />
            <SocialIcon icon={<Linkedin size={18}/>} link="#" />
          </div>
          <div className="mt-8 flex items-center gap-2 text-gray-300 text-[10px] font-bold">
            <Mail size={14} className="text-[#D97706]" />
            <span>OFFICE@KLM-FOUNDATION.ORG</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          COPYRIGHT @ WONDER SIGHT X KLM 2026
        </p>
        <p className="text-[10px] font-black tracking-widest text-gray-500 italic uppercase">
          BUILT BY WONDER SIGHT CREATIVES
        </p>
      </div>
    </footer>
  );
};

function SocialIcon({ icon, link }: { icon: any, link: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" 
       className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D97706] transition-all text-white">
      {icon}
    </a>
  );
}