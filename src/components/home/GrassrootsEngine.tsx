"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ZAMFARA_DATA: Record<string, string[]> = {
  "Anka": ["Anka", "Bagega", "Barayar Zaki", "Galadima"],
  "Bakura": ["Bakura", "Danko", "Dakko", "Damri"],
  "Birnin Magaji": ["Birnin Magaji", "Gidan Kasai", "Modomawa"],
  "Bungudu": ["Bungudu", "Furfuri", "Nahuche", "Kwatarkwashi"],
  "Gummi": ["Gummi", "Gayari", "Bardoki"],
  "Gusau": ["Central", "Galadima", "Mayana", "Sabon Gari", "Tudun Wada"],
  "Isa": ["Isa North", "Isa South", "Turba"],
  "Kaura Namoda": ["Bangana", "Gabake", "Kybana", "Yankaba"],
  "Maradun": ["Maradun", "Dosara", "Faradun"],
  "Maru": ["Maru", "Kanoma", "Dansadau"],
  "Shinkafi": ["Shinkafi", "Katuru", "Jangeru"],
  "Talata Mafara": ["Mafara", "Garbadu", "Matusgi"],
  "Tsafe": ["Tsafe", "Yankuzo", "Bilbis"],
  "Zurmi": ["Zurmi", "Dauran", "Kanwa"]
};

export function GrassrootsEngine() {
  const [loading, setLoading] = useState(false);
  const [manualWard, setManualWard] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '', email_address: '', phone_number: '',
    dob: '', nin_number: '', education_level: '',
    lga: '', ward: '', gender: '', 
    benefited_before: 'No', benefit_details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('beneficiaries').insert([formData]);
    if (error) alert("Error: " + error.message);
    else alert("SUCCESS! Data saved to the KLM Foundation database.");
    setLoading(false);
  };

  return (
    <section className="w-full bg-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto border-l border-gray-900 pl-8">
        <div className="mb-12">
            <div className="bg-[#064E3B] text-white px-4 py-2 inline-block font-bold text-xs mb-4">
                FOUNDATION <br/> <span className="text-xl">KLM</span>
            </div>
            <h1 className="text-5xl font-black text-[#064E3B] italic tracking-tighter uppercase">
                Register Credentials
            </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          <InputGroup label="FULL NAME" type="text" onChange={(val) => setFormData({...formData, full_name: val})} />
          <InputGroup label="email address" type="email" onChange={(val) => setFormData({...formData, email_address: val})} />
          <InputGroup label="PHONE NUMBER" type="tel" onChange={(val) => setFormData({...formData, phone_number: val})} />
          <InputGroup label="DATE OF BIRTH" type="date" onChange={(val) => setFormData({...formData, dob: val})} />
          <InputGroup label="NIN NUMBER" type="text" onChange={(val) => setFormData({...formData, nin_number: val})} />
          
          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">GENDER</label>
            <select className="bg-transparent font-bold outline-none uppercase" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">EDUCATION LEVEL</label>
            <select className="bg-transparent font-bold outline-none uppercase" onChange={(e) => setFormData({...formData, education_level: e.target.value})}>
              <option>Select Level</option>
              <option>Primary Cert</option><option>SSCE</option><option>NCE</option>
              <option>Diploma</option><option>HND</option><option>Bsc</option>
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">SELECT LGA</label>
            <select className="bg-transparent font-bold outline-none uppercase" onChange={(e) => setFormData({...formData, lga: e.target.value})}>
              <option value="">Choose LGA</option>
              {Object.keys(ZAMFARA_DATA).map(lga => <option key={lga} value={lga}>{lga}</option>)}
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">SELECT WARD</label>
            {!manualWard ? (
              <select className="bg-transparent font-bold outline-none uppercase" 
                onChange={(e) => {
                  if(e.target.value === "OTHER") setManualWard(true);
                  else setFormData({...formData, ward: e.target.value});
                }}>
                <option value="">Choose Ward</option>
                {formData.lga && ZAMFARA_DATA[formData.lga].map(ward => <option key={ward} value={ward}>{ward}</option>)}
                <option value="OTHER">NOT LISTED (TYPE MANUALLY)</option>
              </select>
            ) : (
              <input className="bg-transparent font-bold outline-none uppercase" placeholder="TYPE YOUR WARD HERE" 
              onChange={(e) => setFormData({...formData, ward: e.target.value})} />
            )}
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">BENEFITED BEFORE?</label>
            <select className="bg-transparent font-bold outline-none uppercase" onChange={(e) => setFormData({...formData, benefited_before: e.target.value})}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {formData.benefited_before === 'Yes' && (
            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2">WHAT DID YOU BENEFIT FROM?</label>
              <input className="bg-transparent font-bold outline-none uppercase" placeholder="Describe benefit (e.g. Scholarship)" 
              onChange={(e) => setFormData({...formData, benefit_details: e.target.value})} />
            </div>
          )}

          <div className="md:col-span-2 pt-10">
            <button className="w-full bg-[#064E3B] text-white py-5 font-black uppercase tracking-widest hover:bg-[#043327] transition-all">
              {loading ? "SUBMITTING..." : "SUBMIT TO DATABASE"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function InputGroup({ label, type, onChange }: { label: string, type: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col border-b-2 border-black pb-2">
      <label className="text-[10px] font-black text-gray-400 uppercase mb-2">{label}</label>
      <input type={type} required className="bg-transparent font-bold outline-none uppercase" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}