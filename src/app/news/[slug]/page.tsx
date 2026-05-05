import { client, urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import Image from 'next/image';

const ptComponents = {
  types: {
    // This is the critical missing piece from your screenshots
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      
      return (
        <div className="my-10 relative w-full h-[300px] md:h-[600px] overflow-hidden rounded-3xl shadow-xl">
          <Image 
            src={urlFor(value).url()} 
            alt={value.alt || "KLM Foundation News"} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      );
    },
  },
};

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Notice the "asset->" part - this follows the link to get the image URL
  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    displayDate,
    content[] {
      ...,
      asset-> {
        _id,
        url
      }
    }
  }`;
  
  const news = await client.fetch(query, { slug });

  if (!news) return <div className="pt-40 text-center">Statement Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <article className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <p className="text-[#D97706] font-black text-xs uppercase mb-4">{news.displayDate}</p>
        <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic mb-10">
          {news.title}
        </h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <PortableText value={news.content} components={ptComponents} />
        </div>
      </article>
    </main>
  );
}