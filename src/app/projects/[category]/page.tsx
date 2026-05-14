import { client } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react"; // Important for the content field

// FIX: Ensure the category is passed into the query parameters object
async function getProjects(category: string) {
  const query = `*[_type == "project" && category == $category] | order(date desc) {
    title,
    location,
    date,
    videoUrl,
    "audioUrl": audioFile.asset->url,
    "mainImage": mainImage.asset->url,
    gallery,
    description,
    content
  }`;
  
  // We must pass { category } as the second argument so Sanity sees $category
  return await client.fetch(query, { category });
}

// FIX: Next.js 16 requires 'params' to be a Promise
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // We 'await' the params before destructuring
  const { category } = await params;
  const projects = await getProjects(category);

  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-400 uppercase">No projects found in {category}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black uppercase tracking-tighter text-[#064E3B] mb-2">
        {category} Interventions
      </h1>
      <div className="w-20 h-2 bg-[#D97706] mb-12"></div>

      <div className="space-y-24">
        {projects.map((project: any, index: number) => (
          <div key={index} className="border-b border-gray-100 pb-20 last:border-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Media Section */}
              <div className="space-y-6">
                {project.videoUrl ? (
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.videoUrl.split('v=')[1]}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : project.mainImage ? (
                  <img 
                    src={project.mainImage} 
                    alt={project.title} 
                    className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                  />
                ) : (
                   <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
                     <span className="text-gray-400 font-bold uppercase">No Image Available</span>
                   </div>
                )}

                {project.audioUrl && (
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-gray-500">Audio Report/Music</span>
                    <audio controls className="w-full">
                      <source src={project.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#D97706]/10 text-[#D97706] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {project.location || "Zamfara"}
                  </span>
                  <span className="text-gray-400 text-[10px] font-bold">
                    {project.date ? new Date(project.date).toLocaleDateString() : "Date TBD"}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-[#064E3B] mb-6 uppercase tracking-tight">
                  {project.title}
                </h2>
                
                <div className="text-gray-600 leading-relaxed mb-8">
                  {/* Render the rich text content from Sanity */}
                  <PortableText value={project.content} />
                </div>
                
                {project.gallery && (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {project.gallery.map((img: any, i: number) => (
                      <div key={i} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                        <img src={urlFor(img).url()} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}