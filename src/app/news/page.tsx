import { Navbar } from "@/components/layout/Navbar";
import { client, urlFor } from "@/lib/sanity"; // Ensure urlFor is exported from your sanity lib
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

async function getNews() {
  // We sort by publishedAt descending so the newest is at the top
  const query = `*[_type == "news"] | order(publishedAt desc)`;
  return await client.fetch(query);
}

// Custom components to handle images inside the news writeup
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 relative w-full h-[300px] md:h-[500px]">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'KLM Foundation News'}
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      );
    },
  },
};

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto border-l-8 border-[#064E3B] pl-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic">Press & Media</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Official Statements and Updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-2 space-y-24">
            {newsItems.length > 0 ? (
              newsItems.map((item: any) => (
                <article key={item._id} className="border-b border-gray-100 pb-16">
                  <p className="text-[#D97706] font-black text-[10px] mb-2">{item.displayDate || item.publishedAt}</p>
                  <h2 className="text-3xl md:text-5xl font-black text-[#064E3B] uppercase italic mb-8">
                    {item.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                    <PortableText value={item.content} components={ptComponents} />
                  </div>
                </article>
              ))
            ) : (
              <p className="text-gray-500 font-bold uppercase text-xs">No news updates available.</p>
            )}
          </div>
          
          <aside className="bg-gray-50 p-8 rounded-3xl h-fit hidden md:block">
            <h3 className="text-sm font-black text-[#D97706] uppercase tracking-widest mb-6 border-b pb-2">Latest Bulletin</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase text-gray-500">
              {newsItems.slice(0, 5).map((item: any) => (
                <li key={item._id} className="hover:text-[#064E3B] cursor-pointer leading-tight">
                  • {item.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}