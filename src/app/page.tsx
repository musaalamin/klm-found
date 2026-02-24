import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* We no longer need Navbar here because it's in layout.tsx.
          We no longer need the 'useState' toggles because Projects and 
          Registration now have their own dedicated pages.
      */}
      <HeroSection />
    </main>
  );
}