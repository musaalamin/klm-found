import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/lib/sanity"; // Import the sanity client

// 1. This function talks to Sanity to get your news items
async function getNews() {
  const query = `*[_type == "news"] | order(_createdAt desc)`;
  return await client.fetch(query);
}

export default async function NewsPage() {
  // 2. We fetch the news items before the page loads
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
          <div className="col-span-1 md:col-span-2 space-y-12">
            {/* 3. We map through the real news items from Sanity */}
            {newsItems.length > 0 ? (
              newsItems.map((item: any) => (
                <NewsPlaceholder 
                  key={item._id} 
                  title={item.title} 
                  date={item.date} 
                  content={item.content} 
                />
              ))
            ) : (
              <p className="text-gray-500 font-bold uppercase text-xs">No news updates available.</p>
            )}
          </div>
          
          <aside className="bg-gray-50 p-8 rounded-3xl h-fit">
            <h3 className="text-sm font-black text-[#D97706] uppercase tracking-widest mb-6 border-b pb-2">Latest Bulletin</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase text-gray-500">
              {/* You can also map specific small alerts here if you create a schema for them */}
              <li className="hover:text-[#064E3B] cursor-pointer">• 500 New Scholarships Announced</li>
              <li className="hover:text-[#064E3B] cursor-pointer">• Strategic Planning Meeting with LGA Leaders</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}

// 4. Updated Placeholder to accept dynamic props
function NewsPlaceholder({ title, date, content }: { title: string, date: string, content?: string }) {
  return (
    <div className="group cursor-pointer">
      <p className="text-[#D97706] font-black text-[10px] mb-2">{date}</p>
      <h2 className="text-2xl md:text-3xl font-black text-[#064E3B] uppercase italic group-hover:text-black transition-colors">
        {title}
      </h2>
      {content && (
        <p className="text-gray-600 mt-4 text-sm font-medium leading-relaxed max-w-xl">
          {content}
        </p>
      )}
      <div className="w-20 h-1 bg-[#064E3B] mt-4 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}