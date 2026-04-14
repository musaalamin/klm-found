"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Camera, ShieldCheck, Leaf, Radio } from 'lucide-react';

const organizations = [
  {
    name: "Wonder Sight Gallery",
    role: "Founder & CVO",
    description: "A multidisciplinary creative hub specializing in cinematic photography, videography, and professional visual storytelling.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    name: "Dan-Dalin Matasa 360",
    role: "Community Initiative",
    description: "A youth-led radio show and community movement focusing on civic awareness and peacebuilding.",
    icon: <Radio className="w-6 h-6" />,
  },
  {
    name: "STAT-OGP Project",
    role: "Governance Innovation",
    description: "A project aimed at strengthening transparency and inclusive governance through youth-led digital solutions.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    name: "NiSECA Africa",
    role: "Climate Action",
    description: "Dedicated to driving climate stewardship and sustainability projects across the region.",
    icon: <Leaf className="w-6 h-6" />,
  }
];

export default function NetworkPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black text-[#064E3B] uppercase tracking-tighter mb-4">
            Our Network
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            KLM Foundation acts as the central pillar for these partner organizations, 
            each sharing our commitment to innovation and community development.
          </p>
        </motion.div>

        {/* The Grid Card Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gray-50 text-[#D97706] rounded-xl flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                  {org.icon}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                  {org.role}
                </span>
              </div>
              <h3 className="text-xl font-black text-[#064E3B] uppercase tracking-tight mb-3">
                {org.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {org.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}