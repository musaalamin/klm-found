"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";
import { Toast } from '@/components/ui/Toast';
import { client } from "@/lib/sanity";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' });
  const [contactInfo, setContactInfo] = useState({
    phone: "+234 000 000 0000",
    email: "INFO@KLM-FOUNDATION.COM",
    address: "Gusau, Zamfara State, Nigeria",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124541.97489569736!2d6.602534573138435!3d12.164166292211516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b3337a7f4577f1%3A0x7e85c2c10b77918a!2sGusau!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
  });

  // Fetch data from Sanity on mount
  useEffect(() => {
    const fetchContact = async () => {
      const data = await client.fetch(`*[_type == "contact"][0]`);
      if (data) {
        setContactInfo({
          phone: data.phone || "+234 000 000 0000",
          email: "INFO@KLM-FOUNDATION.COM", // Fixed hyphenated email
          address: data.address || "Gusau, Zamfara State, Nigeria",
          mapUrl: data.mapUrl || contactInfo.mapUrl
        });
      }
    };
    fetchContact();
  }, []);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const message = formData.get('message');

    // For a static "INFO" inbox, we use the mailto trigger
    // This ensures the inquiry goes directly to your professional email
    const mailtoUrl = `mailto:INFO@KLM-FOUNDATION.COM?subject=New Inquiry from ${name}&body=${message}`;
    
    try {
      window.location.href = mailtoUrl;
      setToast({ 
        isVisible: true, 
        message: "SUCCESSFUL: OPENING YOUR EMAIL CLIENT TO SEND INQUIRY.", 
        type: 'success' 
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setToast({ isVisible: true, message: "ERROR: COULD NOT PROCESS INQUIRY.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <h1 className="text-6xl font-black text-[#064E3B] italic uppercase">
                Contact <br/> The Office.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactItem icon={<Phone className="text-[#D97706]" />} label="Direct Line" value={contactInfo.phone} />
                <ContactItem icon={<Mail className="text-[#D97706]" />} label="Email Us" value={contactInfo.email} />
                <div className="md:col-span-2">
                  <ContactItem icon={<MapPin className="text-[#D97706]" />} label="Headquarters" value={contactInfo.address} />
                </div>
              </div>

              <form onSubmit={handleInquiry} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                <input 
                  name="name"
                  required
                  placeholder="FULL NAME" 
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 mb-6 outline-none focus:border-[#064E3B] font-bold uppercase text-xs tracking-widest" 
                />
                <textarea 
                  name="message"
                  required
                  placeholder="HOW CAN WE HELP?" 
                  rows={4} 
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 mb-8 outline-none focus:border-[#064E3B] font-bold uppercase text-xs tracking-widest" 
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#064E3B] text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-black transition-all disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Submit Inquiry"}
                </button>
              </form>
            </div>

            <div className="h-[500px] lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 relative group">
              <iframe
                title="Office Location"
                width="100%" height="100%" frameBorder="0"
                src={contactInfo.mapUrl}
                allowFullScreen loading="lazy"
              ></iframe>
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
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="font-bold text-black">{value}</p>
      </div>
    </div>
  );
}