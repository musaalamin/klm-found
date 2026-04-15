import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import { client } from "@/lib/sanity";

async function getHeroData() {
  const query = `*[_type == "hero"][0]`; // Fetch the first hero document
  return await client.fetch(query);
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <main className="min-h-screen bg-white">
      <WelcomeModal /> 
      
      {/* If data exists, show dynamic hero, otherwise show a loader or fallback */}
      {heroData ? (
        <HeroSection data={heroData} />
      ) : (
        <div className="h-screen flex items-center justify-center font-black uppercase">
          Initializing Foundation Portal...
        </div>
      )}
    </main>
  );
}