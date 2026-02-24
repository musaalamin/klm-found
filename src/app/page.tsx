"use client";
import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { GrassrootsEngine } from "@/components/home/GrassrootsEngine";
import { ProjectGallery } from "@/components/home/ProjectGallery";

export default function Home() {
  // These "States" keep the sections hidden until a button is clicked
  const [showGallery, setShowGallery] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. The Homepage (Hero) with buttons to unlock other sections */}
      <HeroSection 
        onViewProjects={() => { setShowGallery(true); setShowRegister(false); }}
        onRegister={() => { setShowRegister(true); setShowGallery(false); }}
      />

      {/* 2. The Gallery: Only shows if you click "View Projects" */}
      {showGallery && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <ProjectGallery />
        </div>
      )}

      {/* 3. The Registration Form: Only shows if you click "Join Movement" */}
      {showRegister && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 py-20">
          <GrassrootsEngine />
        </div>
      )}
    </main>
  );
}