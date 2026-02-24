import { Navbar } from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Portrait Section */}
          <div className="relative h-[600px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/jagaban.jpg')" }}></div>
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#064E3B] to-transparent text-white">
                <p className="font-black italic text-2xl">Hon. Kabiru Lawal</p>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">Jagaban Zamfara</p>
             </div>
          </div>

          {/* Text Section */}
          <div className="uppercase">
            <h2 className="text-[#D97706] font-black tracking-[0.4em] mb-4">THE VISIONARY</h2>
            <h1 className="text-5xl md:text-7xl font-black text-[#064E3B] italic leading-[0.8] mb-8">A Legacy <br/> of Service.</h1>
            <div className="space-y-6 text-gray-500 font-bold text-sm leading-relaxed">
              <p>Hon. Kabiru Lawal, widely known as the Jagaban of Zamfara, represents a bridge between traditional leadership and modern development.</p>
              <p>As the founder of the KLM Foundation, he has dedicated his resources to education, healthcare, and youth empowerment across the 14 LGAs of Zamfara State.</p>
              <p className="border-l-4 border-[#D97706] pl-6 italic text-[#064E3B]">
                "Our mission is simple: to leave behind a governance model rooted in service, inclusivity, and accountability."
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}