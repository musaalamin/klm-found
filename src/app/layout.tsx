import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "KLM Foundation | Jagaban Zamfara | Consolidating Legacy",
  description: "Official platform of the KLM Foundation, fostering sustainable development and inclusive governance in Zamfara State.",
  keywords: [
    "KLM Foundation", "Daudalawal", "Zamfara", "Gusau", "Climate Action Nigeria", 
    "wondersightgallery", "goverment", "maibiredi Tv", "Abdulaziz Yari", "APC ADC NDC", "marafa", 
    "Anka", "Tsafe", "kabiru Jagaba"
  ],
  authors: [{ name: "Khaliferh Musa Al-Amin" }],
  // --- OPEN GRAPH (Social Media Previews) ---
  openGraph: {
    title: "KLM Foundation | Consolidating Legacy",
    description: "Fostering sustainable development and inclusive governance in Zamfara State.",
    url: "https://www.klm-foundation.com",
    siteName: "KLM Foundation",
    images: [
      {
        url: "/og-branding.png", // Must exist in your /public folder
        width: 1200,
        height: 630,
        alt: "KLM Foundation - Consolidating Legacy"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KLM Foundation | Jagaban Zamfara",
    description: "Consolidating Legacy in Zamfara State.",
    images: ["/og-branding.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body className={`${jakarta.className} antialiased bg-white selection:bg-[#D97706] selection:text-white`}>
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