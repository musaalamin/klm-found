import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Users, UserCheck, ShieldCheck, Zap } from "lucide-react";

// FIX: Added the colon (type: string) and fixed the GROQ syntax
async function getNetwork(type: string) {
  const query = `*[_type == "network" && category == $type] {
    name,
    bio,
    videoUrl,
    "logoUrl": logo.asset->url,
    gallery
  }`;
  return await client.fetch(query, { type });
}

export default async function NetworkPage({ 
  params 
}: { 
  params: Promise<{ type: string }> 
}) {
  // FIX: Await the params for Next.js 16 compatibility
  const { type } = await params;
  const members = await getNetwork(type);

  // Helper to show icons based on the wing type
  const getIcon = (category: string) => {
    switch (category) {
      case 'youth': return <Zap size={40} />;
      case 'women': return <UserCheck size={40} />;
      case 'elders': return <ShieldCheck size={40} />;
      default: return <Users size={40} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black uppercase tracking-tighter text-[#064E3B] mb-2">
        {type.replace('-', ' ')} Network
      </h1>
      <div className="w-20 h-2 bg-[#D97706] mb-12"></div>

      {members.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
          <p className="text-gray-400 font-bold uppercase tracking-widest">No members found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16">
          {members.map((org: any, index: number) => (
            <div key={index} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                
                {/* Logo or Icon Section */}
                <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
                  {org.logoUrl ? (
                    <img src={org.logoUrl} alt={org.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="text-[#D97706]">{getIcon(type)}</div>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-[#064E3B] uppercase mb-4">{org.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6 italic">{org.bio}</p>
                  
                  {/* Video Embed */}
                  {org.videoUrl && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-6 max-w-2xl shadow-lg">
                      <iframe 
                        className="w-full h-full"
                        src={org.videoUrl.includes('youtube.com') 
                          ? `https://www.youtube.com/embed/${org.videoUrl.split('v=')[1]}` 
                          : org.videoUrl}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {/* Gallery */}
                  {org.gallery && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {org.gallery.map((img: any, i: number) => (
                        <div key={i} className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
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
      )}
    </div>
  );
}