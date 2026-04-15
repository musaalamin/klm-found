import "./globals.css"; // MUST BE THE FIRST LINE
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {/* This 'pt-28' (padding-top) pushes the entire website down 
          so it starts below the fixed Navbar. 
        */}
        <div className="pt-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}