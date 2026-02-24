"use client";
import React from 'react';

const PROJECTS = [
  {
    title: "Strategic Education Allocation",
    lga: "BIRNIN MAGAJI",
    description: "The strategic allocation of educational resources within the public secondary school system of Birnin Magaji local government.",
    // This is the main cover photo
    image: "/projects/birnin-1.jpg", 
    // These are the extra photos for the album
    album: ["/projects/birnin-2.jpg", "/projects/birnin-3.jpg", "/projects/birnin-4.jpg"],
    tag: "EDUCATION"
  },
{
    title: "50 Students got Medical School Scholarship",
    lga: "GUSAU",
    description: "Distribution of Uniforms, Books, and Full 3-year School Fees.",
    image: "/projects/greengarden-1.jpg", 
    album: ["/projects/greengarden-2.jpg", "/projects/greengarden-3.jpg", "/projects/greengarden-4.jpg"],
    tag: "HEALTH"
  },
];

export function ProjectGallery() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-l-8 border-[#D97706] pl-6">
          <h2 className="text-4xl font-black text-[#064E3B] uppercase italic">Legacy Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
              
              <div className="p-10">
                <span className="text-[#D97706] text-[10px] font-black tracking-widest uppercase">{project.tag}</span>
                <h3 className="text-2xl font-black text-[#064E3B] mt-2 mb-4 uppercase italic">{project.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed mb-8">{project.description}</p>
                
                {/* Mini Album Grid */}
                <div className="grid grid-cols-3 gap-4 border-t pt-6">
                  {project.album.map((img, i) => (
                    <img key={i} src={img} className="h-20 w-full object-cover rounded-lg border-2 border-white shadow-sm" alt="Gallery" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}