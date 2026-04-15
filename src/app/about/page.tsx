import { Navbar } from "@/components/layout/Navbar";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react"; // Optional: for rich text formatting

// 1. Fetch the single "About" document from Sanity
async function getAboutData() {
  const query = `*[_type == "about"][0]`; // We use [0] because there is only one about page
  return await client.fetch(query);
}

export default async function AboutPage() {
  const data = await getAboutData();

  // Handle case where data isn't uploaded yet
  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 text-center font-black uppercase text-gray-400">
          Loading Visionary Profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          {/* Portrait Section - Dynamic Image from Sanity */}
          <div className="relative h-[600px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
             {data.image && (
               <img 
                 src={urlFor(data.image).url()} 
                 alt={data.name}
                 className="absolute inset-0 w-full h-full object-cover"
               />
             )}
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#064E3B] to-transparent text-white">
                <p className="font-black italic text-2xl">{data.name}</p>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">{data.title}</p>
             </div>
          </div>

          {/* Text Section - Dynamic Content from Sanity */}
          <div className="uppercase">
            <h2 className="text-[#D97706] font-black tracking-[0.4em] mb-4">THE VISIONARY</h2>
            <h1 className="text-5xl md:text-7xl font-black text-[#064E3B] italic leading-[0.8] mb-8">
              {/* You can make the headline dynamic too if you add it to the schema */}
              A Legacy <br/> of Service.
            </h1>
            
            <div className="space-y-6 text-gray-500 font-bold text-sm leading-relaxed">
              {/* If using simple text field in Sanity */}
              {typeof data.bio === 'string' ? (
                <p>{data.bio}</p>
              ) : (
                /* If using Block Content (PortableText) for bolding/lists */
                <PortableText value={data.bio} />
              )}

              {data.quote && (
                <p className="border-l-4 border-[#D97706] pl-6 italic text-[#064E3B]">
                  "{data.quote}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}