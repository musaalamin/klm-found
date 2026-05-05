import { client } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return <div>Invalid URL</div>;

  // This IS where we use $slug
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
        <p className="text-[#D97706] font-black text-xs uppercase mb-4 tracking-[0.3em]">{news.displayDate}</p>
        <h1 className="text-5xl md:text-7xl font-black text-[#064E3B] uppercase italic mb-12">{news.title}</h1>
        
        <div className="prose prose-xl max-w-none text-gray-800 font-medium mb-20">
          <PortableText value={news.content} />
        </div>

        {news.gallery && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mt-10">
            {news.gallery.map((imgUrl: string, i: number) => (
              <img key={i} src={imgUrl} className="w-full rounded-xl shadow-lg" alt="Gallery" />
            ))}
          </div>
        )}
      </article>
    </main>
  );
}