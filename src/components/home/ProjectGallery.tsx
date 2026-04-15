"use client";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  description: string;
  gallery: any[]; 
  category: string;
}

export const ProjectGallery = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
      {projects.map((project) => (
        <motion.div 
          key={project._id}
          whileHover={{ y: -10 }}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
        >
          {/* Main Image Display */}
          <div className="h-64 overflow-hidden relative">
             {project.gallery && project.gallery.length > 0 ? (
               <img 
                 src={urlFor(project.gallery[0]).url()} 
                 alt={project.title}
                 className="w-full h-full object-cover"
               />
             ) : (
               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold uppercase text-[10px]">
                 No Image Available
               </div>
             )}
          </div>

          {/* Mini Thumbnail Strip (Visible if 2+ images are uploaded in Sanity) */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-100">
              {project.gallery.slice(1, 4).map((img, idx) => (
                <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden border border-white shadow-sm">
                  <img 
                    src={urlFor(img).width(100).url()} 
                    className="w-full h-full object-cover" 
                    alt="thumbnail" 
                  />
                </div>
              ))}
              {project.gallery.length > 4 && (
                <div className="text-[8px] font-black flex items-center text-gray-400 uppercase">
                  +{project.gallery.length - 4} More
                </div>
              )}
            </div>
          )}

          <div className="p-8 flex-grow">
            {/* THIS LINE SHOWS THE CUSTOM CATEGORY YOU TYPE IN SANITY */}
            <span className="text-[10px] font-black text-[#D97706] uppercase tracking-[0.2em]">
              {project.category || "General"}
            </span>

            <h3 className="text-xl font-black text-[#064E3B] uppercase italic mt-2">
              {project.title}
            </h3>
            
            <p className="text-gray-500 text-xs font-bold mt-4 leading-relaxed uppercase">
              {project.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};