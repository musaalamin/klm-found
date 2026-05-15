"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // NEW: States to handle mobile accordions
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset accordions when menu closes
      setIsProjectsOpen(false);
      setIsNetworkOpen(false);
    }
  }, [isOpen]);

  const projectCategories = [
    { name: 'Health', slug: 'health' },
    { name: 'Education', slug: 'education' },
    { name: 'Empowerment', slug: 'empowerment' },
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'Sports', slug: 'sports' }
  ];

  const networkCategories = [
    { name: 'Youth Wing', slug: 'youth' },
    { name: 'Women Wing', slug: 'women' },
    { name: 'Elders Council', slug: 'elders' },
    { name: 'Technical Partners', slug: 'partners' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[5000] pointer-events-none flex justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl px-4 md:px-8 py-4 flex justify-between items-center">
            
            {/* LOGO SECTION */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img 
                src="/logo-official.png" 
                alt="KLM Foundation" 
                className="h-8 md:h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.insertAdjacentHTML('afterbegin', '<div class="w-8 h-8 md:w-10 md:h-10 bg-[#064E3B] rounded-lg flex items-center justify-center text-[#D97706] font-black">K</div>');
                }}
              />
              <span className="font-bold text-[#064E3B] text-sm md:text-base tracking-tighter uppercase">KLM Foundation</span>
            </Link>
            
            {/* DESKTOP MENU (Remains the same) */}
            <div className="hidden md:flex gap-8 items-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <Link href="/" className="hover:text-[#D97706] transition-colors">Home</Link>
              <Link href="/about" className="hover:text-[#D97706] transition-colors">The Jagaban</Link>

              <div className="relative group py-2">
                <button className="hover:text-[#D97706] transition-colors font-black uppercase tracking-widest text-[10px] flex items-center gap-1 cursor-default">
                  Projects <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 top-full w-56 bg-white shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden z-[9999] translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 grid grid-cols-1">
                    {projectCategories.map((item) => (
                      <Link key={item.slug} href={`/projects/${item.slug}`} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#064E3B] hover:bg-[#064E3B] hover:text-white rounded-lg transition-all">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/news" className="hover:text-[#D97706] transition-colors">News</Link>

              <div className="relative group py-2">
                <button className="hover:text-[#D97706] transition-colors font-black uppercase tracking-widest text-[10px] flex items-center gap-1 cursor-default">
                  Network <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 top-full w-56 bg-white shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden z-[9999] translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 grid grid-cols-1">
                    {networkCategories.map((item) => (
                      <Link key={item.slug} href={`/network/${item.slug}`} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#064E3B] hover:bg-[#064E3B] hover:text-white rounded-lg transition-all">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/contact" className="hover:text-[#D97706] transition-colors">Contact</Link>
            </div>

            {/* MOBILE BUTTON */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-[5001] p-3 rounded-xl bg-gray-50 text-[#064E3B] border-2 border-[#D97706]/20"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[4999] bg-white md:hidden flex flex-col p-8 pt-32 overflow-y-auto">
          <div className="flex flex-col gap-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left">The Jagaban</Link>
            
            {/* MOBILE PROJECTS ACCORDION */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left"
              >
                Projects <ChevronDown size={24} className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isProjectsOpen ? 'max-h-[500px] py-4' : 'max-h-0'}`}>
                <div className="flex flex-col gap-4 pl-4">
                  {projectCategories.map((item) => (
                    <Link 
                      key={item.slug} 
                      href={`/projects/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-black text-[#D97706] uppercase italic"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/news" onClick={() => setIsOpen(false)} className="text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left">News</Link>

            {/* MOBILE NETWORK ACCORDION */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                className="flex items-center justify-between text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left"
              >
                Network <ChevronDown size={24} className={`transition-transform duration-300 ${isNetworkOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isNetworkOpen ? 'max-h-[500px] py-4' : 'max-h-0'}`}>
                <div className="flex flex-col gap-4 pl-4">
                  {networkCategories.map((item) => (
                    <Link 
                      key={item.slug} 
                      href={`/network/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-black text-[#D97706] uppercase italic"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-4xl font-black text-[#064E3B] uppercase border-b border-gray-100 pb-2 text-left">Contact</Link>
          </div>
        </div>
      )}
    </>
  );
};