import { client, urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';
import { Navbar } from "@/components/layout/Navbar";
import Image from 'next/image';

// Custom Image component for PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-10">
        <Image 
          src={urlFor(value).url()} 
          alt="News Image" 
          width={1200} 
          height={700} 
          className="rounded-3xl w-full object-cover" 
        />
      </div>
    ),
  },
};

export default async function SingleNewsPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "news" && slug.current == $slug][0]`;
  const news = await client.fetch(query, { slug: params.slug });

  if (!news) return <div className="pt-40 text-center">News not found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <p className="text-[#D97706] font-black text-xs mb-4 uppercase tracking-widest">{news.displayDate}</p>
        <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic leading-tight mb-10">
          {news.title}
        </h1>
        <div className="prose prose-lg text-gray-700 font-medium">
          <PortableText value={news.content} components={ptComponents} />
        </div>
      </article>
    </main>
  );
}