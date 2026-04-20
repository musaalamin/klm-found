// Last Deploy: April 2026 - Force Update
// Force Update: v2.0.1
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'The Jagaban', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'News', href: '/news' },
    { name: 'Network', href: '/network' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* CRITICAL FIX: This outer nav has 'pointer-events-none' 
        but the INNER div has 'pointer-events-auto'. 
        This prevents the navbar from blocking the whole top of your screen.
      */}
      <nav className="fixed top-0 left-0 right-0 z-[5000] pointer-events-none flex justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl px-4 md:px-8 py-4 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#064E3B] rounded-lg flex items-center justify-center text-[#D97706] font-black">K</div>
              <span className="font-bold text-[#064E3B] text-sm md:text-base">KLM FOUNDATION</span>
            </Link>
            
            <div className="hidden md:flex gap-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>{link.name}</Link>
              ))}
            </div>

            {/* MOBILE BUTTON - Forced to top with z-index */}
            <button 
              onClick={() => {
                console.log("MOBILE MENU CLICKED"); // CHECK YOUR BROWSER CONSOLE
                setIsOpen(!isOpen);
              }}
              className="md:hidden relative z-[5001] p-3 rounded-xl bg-gray-50 text-[#064E3B] border-2 border-[#D97706]/20"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - Moved OUTSIDE the main nav tag to prevent clipping */}
      {isOpen && (
        <div className="fixed inset-0 z-[4999] bg-white md:hidden flex flex-col p-8 pt-32">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black text-[#064E3B] uppercase italic border-b border-gray-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};