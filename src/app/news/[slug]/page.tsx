import { client } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import { Metadata } from "next";

// [1] DYNAMIC METADATA GENERATION
// This handles how links appear on WhatsApp, X (Twitter), and Facebook
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    displayDate,
    "ogImage": gallery[0].asset->url
  }`;
  
  const news = await client.fetch(query, { slug });

  // Use a fallback image from your /public folder if no gallery image exists
  const shareImage = news?.ogImage || "/og-branding.png";

  return {
    title: `${news?.title || 'News'} | KLM Foundation`,
    description: news?.displayDate || "Latest official update from the KLM Foundation.",
    openGraph: {
      title: news?.title,
      description: news?.displayDate,
      url: `https://klm-foundation.com/news/${slug}`,
      siteName: "KLM Foundation",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: news?.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news?.title,
      description: news?.displayDate,
      images: [shareImage],
    },
  };
}

// [2] MAIN COMPONENT RENDER
export default async function SingleNewsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return <div className="pt-40 text-center font-black">INVALID URL</div>;

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
          <h1 className="text-5xl md:text-7xl font-black text-[#064E3B] uppercase italic mb-12 leading-[0.9]">
            {news.title}
          </h1>
          
          <div className="prose prose-xl max-w-none text-gray-800 font-medium mb-20">
            <PortableText value={news.content} />
          </div>
        </div>

        {/* CREATIVE GALLERY GRID */}
        {news.gallery && news.gallery.length > 0 && (
          <div className="mt-20">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10 border-b pb-4">
                Field Evidence & Media ({news.gallery.length})
            </h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {news.gallery.map((imgUrl: string, i: number) => (
                <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={imgUrl} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={`KLM Foundation Activity ${i + 1}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}