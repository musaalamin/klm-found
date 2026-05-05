export const revalidate = 60;

import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/lib/sanity"; 
import Link from "next/link";

async function getNews() {
  const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc)`;
  return await client.fetch(query);
}

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
          <div className="col-span-1 md:col-span-2 space-y-16">
            {newsItems.length > 0 ? (
              newsItems
                .filter((item: any) => item.slug?.current)
                .map((item: any) => (
                  <article key={item._id} className="border-b border-gray-100 pb-12">
                    <Link href={`/news/${item.slug.current}`} className="group block">
                      <p className="text-[#D97706] font-black text-[10px] mb-2 uppercase tracking-widest">
                        {item.displayDate || "Recent Update"}
                      </p>
                      <h2 className="text-2xl md:text-4xl font-black text-[#064E3B] uppercase italic group-hover:text-[#D97706] transition-all duration-300">
                        {item.title}
                      </h2>
                      <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#064E3B]">
                        Read More <span>→</span>
                      </div>
                    </Link>
                  </article>
                ))
            ) : (
              <p className="text-gray-500 font-bold uppercase text-xs">No news updates available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}