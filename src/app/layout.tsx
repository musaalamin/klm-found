import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KLM Foundation | Consolidating Legacy",
  description: "Official platform of the KLM Foundation, fostering sustainable development and inclusive governance in Zamfara State.",
  keywords: [
    "KLM Foundation", 
    "Daudalawal", 
    "Zamfara", 
    "bandit", 
    "APC", 
    "PDP", 
    "Gusau", 
    "Climate Action Nigeria", 
    "wondersightgallery", 
"goverment",
"maibiredi Tv",
"Abdulaziz Yari",
"marafa",
"Gusau",
"Anka",
"Tsafe",
    "kidnapping", 
    "kabiru Jagaba"
  ],
  authors: [{ name: "Khaliferh Musa Al-Amin" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white selection:bg-[#D97706] selection:text-white">
        {/* Navbar stays at the top (z-[5000] in your Navbar.tsx) */}
        <Navbar />
        
        {/* Main Wrapper: 
            'relative' and 'z-0' ensures page content stays behind the Navbar.
            'pt-28' prevents the Navbar from covering the top of your pages.
        */}
        <div className="relative z-0 pt-28">
          {children}
        </div>
        
        {/* Cookie Consent Banner - Sits above everything (z-[6000]) */}
        <CookieBanner />
        
        <Footer />
      </body>
    </html>
  );
}