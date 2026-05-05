import { client, urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import Image from 'next/image';

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Updated Query to get the Gallery images
  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    displayDate,
    content,
    "gallery": gallery[].asset->url
  }`;
  
  const news = await client.fetch(query, { slug });

  if (!news) return <div className="pt-40 text-center">News Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <article className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <p className="text-[#D97706] font-black text-xs uppercase mb-4">{news.displayDate}</p>
        <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic mb-10 leading-tight">
          {news.title}
        </h1>

        {/* 1. TEXT SECTION */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16">
          <PortableText value={news.content} />
        </div>

        {/* 2. DEDICATED GALLERY SECTION */}
        {news.gallery && news.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 border-t pt-12">
            {news.gallery.map((imgUrl: string, index: number) => (
              <div key={index} className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg">
                <Image 
                  src={imgUrl} 
                  alt={`Gallery image ${index + 1}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}