export const revalidate = 60; // Updates the page every 1 minute

import { client } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import Image from 'next/image';

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Notice we use asset->url to get the direct, raw link to fix the 400 error
  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    displayDate,
    content,
    "gallery": gallery[].asset->url 
  }`;
  
  const news = await client.fetch(query, { slug });

  if (!news) return <div className="pt-40 text-center font-black">STATEMENT NOT FOUND</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <article className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-4xl">
            <p className="text-[#D97706] font-black text-xs uppercase mb-4 tracking-[0.3em]">
                {news.displayDate || "Official Update"}
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-[#064E3B] uppercase italic leading-[0.9] mb-12">
            {news.title}
            </h1>

            {/* TEXT WRITEUP */}
            <div className="prose prose-xl max-w-none text-gray-800 font-medium leading-relaxed mb-20">
            <PortableText value={news.content} />
            </div>
        </div>

        {/* CREATIVE GALLERY GRID (The Project Style) */}
        {news.gallery && news.gallery.length > 0 && (
          <div className="mt-20">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10 border-b pb-4">
                Field Evidence & Media ({news.gallery.length})
            </h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {news.gallery.map((imgUrl: string, index: number) => (
                <div key={index} className="break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={imgUrl} 
                    alt={`Media ${index + 1}`} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}