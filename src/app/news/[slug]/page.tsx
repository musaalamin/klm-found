import { client, urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import Image from 'next/image';

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 relative w-full h-[300px] md:h-[600px]">
          <Image 
            src={urlFor(value).url()} 
            alt="KLM Foundation News" 
            fill
            className="rounded-3xl object-cover shadow-xl" 
          />
        </div>
      );
    },
  },
};

// NOTICE: In Next.js 15, params is a Promise
export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // This is the fix for Next.js 15
  
  const query = `*[_type == "news" && slug.current == $slug][0]`;
  const news = await client.fetch(query, { slug });

  if (!news) return <div className="pt-40 text-center font-black uppercase">Official News Statement Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="border-l-4 border-[#D97706] pl-4 mb-8">
            <p className="text-[#D97706] font-black text-xs uppercase tracking-widest">
                {news.displayDate || "Official Update"}
            </p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic leading-tight mb-10">
          {news.title}
        </h1>
        <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
          <PortableText value={news.content} components={ptComponents} />
        </div>
      </article>
    </main>
  );
}