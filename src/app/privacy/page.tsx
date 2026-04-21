import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="border-l-8 border-[#D97706] pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-[#064E3B] uppercase italic">Privacy Policy</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">Last Updated: April 2026</p>
        </div>

        <div className="prose prose-lg text-gray-600 font-medium uppercase text-[10px] tracking-wide leading-loose">
          <section className="mb-10">
            <h2 className="text-[#064E3B] text-xl font-black mb-4">1. Data Collection</h2>
            <p>We collect information you provide directly to us, such as when you register for the "Join Movement" initiative, subscribe to our newsletter, or contact us via our platform.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#064E3B] text-xl font-black mb-4">2. Use of Information</h2>
            <p>The data collected is used solely to facilitate community development, share news updates, and coordinate regional projects in alignment with the KLM Foundation vision. We do not sell your personal data.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#064E3B] text-xl font-black mb-4">3. Data Security</h2>
            <p>As part of our commitment to digital integrity, we implement industry-standard security measures to protect your information from unauthorized access or disclosure.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-[#064E3B] text-xl font-black mb-4">4. Contact Us</h2>
            <p>If you have questions regarding this policy, please contact our technical department in Gusau, Zamfara State.</p>
          </section>
        </div>
      </div>
    </main>
  );
}