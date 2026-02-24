import { Navbar } from "@/components/layout/Navbar";
import { GrassrootsEngine } from "@/components/home/GrassrootsEngine";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 mb-12 text-center uppercase">
          <h1 className="text-4xl font-black text-[#064E3B] italic">Join the Movement</h1>
          <p className="text-gray-400 font-bold text-xs tracking-widest mt-2">Empowering the grassroots of Zamfara</p>
        </div>
        <GrassrootsEngine />
      </div>
    </main>
  );
}