import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // [1] Import the new font

// [2] Configure the font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "KLM Foundation |Jagaban Zamfara | Consolidating Legacy",
  description: "Official platform of the KLM Foundation, fostering sustainable development and inclusive governance in Zamfara State.",
  keywords: [
    "KLM Foundation", "Daudalawal", "Zamfara", "Gusau", "Climate Action Nigeria", 
    "wondersightgallery", "goverment", "maibiredi Tv", "Abdulaziz Yari", "APC ADC NDC", "marafa", 
    "Anka", "Tsafe", "kabiru Jagaba"
  ],
  authors: [{ name: "Khaliferh Musa Al-Amin" }],
};

// [3] Move viewport here to satisfy Next.js 15+ build requirements
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* [4] Google Translate Configuration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      </head>
      {/* [5] Apply the font class to the body */}
      <body className={`${jakarta.className} antialiased bg-white selection:bg-[#D97706] selection:text-white`}>
        
        {/* [6] Google Translate Widget - Floating at the bottom left */}
        <div id="google_translate_element" className="fixed bottom-24 left-6 z-[6000] opacity-90 hover:opacity-100 transition-opacity" />

        <Navbar />
        
        <div className="relative z-0 pt-28">
          {children}
        </div>
        
        <CookieBanner />
        
        <Footer />
      </body>
    </html>
  );
}