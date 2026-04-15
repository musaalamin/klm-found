import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/lib/sanity";
import { Mail, Phone, MapPin } from "lucide-react";

async function getContactData() {
  // Fetch the first contact document from Sanity
  const query = `*[_type == "contact"][0]`; 
  return await client.fetch(query);
}

export default async function ContactPage() {
  const data = await getContactData();

  // Fallback values if data hasn't been added to Sanity Studio yet
  const contactInfo = {
    phone: data?.phone || "+234 000 000 0000",
    email: data?.email || "info@klm-foundation.org",
    address: data?.address || "Gusau, Zamfara State, Nigeria",
    mapUrl: data?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.485646197576!2d6.6543!3d12.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b980af459f33c9%3A0x633d7b43!2sGusau!5e0!3m2!1sen!2sng!4v1713200000000!5m2!1sen!2sng"
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Details & Form */}
            <div className="space-y-12">
              <h1 className="text-6xl font-black text-[#064E3B] italic uppercase">
                Contact <br/> The Office.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactItem 
                  icon={<Phone className="text-[#D97706]" />} 
                  label="Direct Line" 
                  value={contactInfo.phone} 
                />
                <ContactItem 
                  icon={<Mail className="text-[#D97706]" />} 
                  label="Email Us" 
                  value={contactInfo.email} 
                />
                <div className="md:col-span-2">
                  <ContactItem 
                    icon={<MapPin className="text-[#D97706]" />} 
                    label="Headquarters" 
                    value={contactInfo.address} 
                  />
                </div>
              </div>

              {/* Inquiry Form */}
              <form className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                <input 
                  placeholder="FULL NAME" 
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 mb-6 outline-none focus:border-[#064E3B] font-bold uppercase text-xs tracking-widest" 
                />
                <textarea 
                  placeholder="HOW CAN WE HELP?" 
                  rows={4} 
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 mb-8 outline-none focus:border-[#064E3B] font-bold uppercase text-xs tracking-widest" 
                />
                <button className="w-full bg-[#064E3B] text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-black transition-all">
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Dynamic Map Section - Now using mapUrl from Sanity */}
            <div className="h-[500px] lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 relative group">
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                /* Uses mapUrl from data or fallback from contactInfo */
                src={contactInfo.mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl">
                 <p className="text-[10px] font-black uppercase tracking-tighter text-[#064E3B]">
                   Location: {contactInfo.address}
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

function ContactItem({ icon, label, value }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="font-bold text-black">{value}</p>
      </div>
    </div>
  );
}