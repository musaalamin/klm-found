import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/lib/sanity";
import Link from "next/link"; // Required for routing

async function getNews() {
  // Sorting by publishedAt descending (newest first)
  const query = `*[_type == "news"] | order(publishedAt desc)`;
  return await client.fetch(query);
}

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto border-l-8 border-[#064E3B] pl-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic">
            Press & Media
          </h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">
            Official Statements and Updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-2 space-y-16">
            {newsItems.length > 0 ? (
              newsItems.map((item: any) => (
                <article key={item._id} className="border-b border-gray-100 pb-12">
                  <Link href={`/news/${item.slug.current}`} className="group block">
                    <p className="text-[#D97706] font-black text-[10px] mb-2 uppercase tracking-widest">
                      {item.displayDate || "Recent Update"}
                    </p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#064E3B] uppercase italic group-hover:text-[#D97706] transition-all duration-300 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm font-medium line-clamp-2 max-w-2xl leading-relaxed">
                      {/* This shows a snippet of text to entice readers */}
                      Click to read the full official statement regarding this update on the KLM Foundation mission.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#064E3B]">
                      Read More 
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="text-gray-500 font-bold uppercase text-xs">
                No news updates available.
              </p>
            )}
          </div>
          
          <aside className="bg-gray-50 p-8 rounded-3xl h-fit hidden md:block border border-gray-100">
            <h3 className="text-sm font-black text-[#D97706] uppercase tracking-widest mb-6 border-b pb-2">
              Quick Browse
            </h3>
            <ul className="space-y-6">
              {newsItems.slice(0, 6).map((item: any) => (
                <li key={item._id}>
                  <Link 
                    href={`/news/${item.slug.current}`} 
                    className="text-[10px] font-black uppercase text-gray-500 hover:text-[#064E3B] transition-colors leading-tight block"
                  >
                    • {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}