import { client } from "@/lib/sanity";
import { ProjectGallery } from "@/components/home/ProjectGallery";

// This updated function now explicitly fetches the gallery array
async function getProjects() {
  const query = `*[_type == "project"] {
    _id,
    title,
    description,
    category,
    gallery
  } | order(_createdAt desc)`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto border-l-8 border-[#D97706] pl-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic">Our Projects</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Impact across Zamfara</p>
        </div>
        
        {/* Pass the real Sanity data containing the gallery to your component */}
        <ProjectGallery projects={projects} />
      </div>
    </main>
  );
}