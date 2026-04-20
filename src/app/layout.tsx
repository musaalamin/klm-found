import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KLM Foundation | Consolidating Legacy",
  description: "Official platform of the KLM Foundation, fostering sustainable development and inclusive governance in Zamfara State.",
  keywords: ["KLM Foundation", "Daudalawal", "Zamfara", "bandit", "APC", "PDP", "Gusau", "Climate Action Nigeria", "wondersightgallery", "kidnapping", "kabiru Jagaba"],
  authors: [{ name: "Khaliferh Musa Al-Amin" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white selection:bg-[#D97706] selection:text-white">
        {/* The Navbar is forced to the highest priority */}
        <Navbar />
        
        {/* Main Wrapper: 
          'relative' and 'z-0' ensures the content stays behind the 'z-[999]' Navbar.
        */}
        <div className="relative z-0 pt-28">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}