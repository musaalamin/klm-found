import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/lib/sanity";
import * as Icons from "lucide-react";

// 1. Fetch data from Sanity
async function getNetwork() {
  const query = `*[_type == "network"] | order(name asc)`;
  // Added { cache: 'no-store' } to ensure it updates immediately when you publish
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

// Helper to render the icon string as a Lucide Component
function IconComponent({ name }: { name: string }) {
  const LucideIcon = (Icons as any)[name] || Icons.Globe;
  return <LucideIcon className="w-8 h-8 text-[#D97706]" />;
}

export default async function NetworkPage() {
  const organizations = await getNetwork();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto border-l-8 border-[#064E3B] pl-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic">Our Network</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Collaborative impact & visionary partnerships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {organizations?.map((org: any) => (
            <div key={org._id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform">
                <IconComponent name={org.icon} />
              </div>
              <span className="text-[10px] font-black text-[#D97706] uppercase tracking-widest">
                {org.role}
              </span>
              <h3 className="text-2xl font-black text-[#064E3B] uppercase italic mt-2 mb-4">
                {org.name}
              </h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase">
                {org.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}