"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Toast } from '@/components/ui/Toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ZAMFARA_DATA: Record<string, string[]> = {
  "Anka": ["Bagega", "Barayar Zaki", "Dan Galadima", "Galadima", "Magaji", "Matuzgi", "Sabon Birni", "Waramu", "Wuya", "Yar'sahabi"],
  "Bakura": ["Bakura", "Danko", "Dakarko", "Damri", "Madora", "Nasarawa", "Rini", "Sabuwa", "Tsafe", "Yarkofoji"],
  "Birnin Magaji": ["Birnin Magaji", "Dauran", "Gidan Kado", "Gusami", "Kiyawa", "Nasarawa", "Sabon Birni", "Wabi"],
  "Bukkuyum": ["Bukkuyum", "Garma", "Gwashi", "Kyaram", "Nasarawa", "Sariya", "Zarumai", "Adabka", "Masama"],
  "Bungudu": ["Bungudu", "Furfuri", "Gidan Sambo", "Kwatarkwashi", "Nahuche", "Samawa", "Tsafe", "Zaman Gira"],
  "Gummi": ["Gummi", "Gyalange", "Illela", "Magajin Gari", "Shiyadi", "Bardoki", "Gayari"],
  "Gusau": ["Galadima", "Madawaki", "Sabon Gari", "Wanke", "Magami", "Tsunami", "Rijiya", "Mayana", "Matusgi", "Central"],
  "Kaura Namoda": ["Bangana", "Galadima", "Sanyinna", "Yankaba", "Kurya", "Kyambara", "Sabuwa", "Kagara"],
  "Maradun": ["Maradun", "Dosara", "Faraduchi", "Gidan Goga", "Gora", "Kaya", "Tsibiri"],
  "Maru": ["Maru", "Kanoma", "Mayanchi", "Bindin", "Dansadau", "Dangulbi", "Kuruwa"],
  "Shinkafi": ["Shinkafi", "Badarawa", "Jangeru", "Katuru", "Kurya", "Sabon Birni"],
  "Talata Mafara": ["Mafara Central", "Mafara North", "Mafara South", "Garbadu", "Kayaye", "Ruwan Doruwa"],
  "Tsafe": ["Tsafe North", "Tsafe South", "Yandoto", "Kwaren Gane", "Dauka", "Bilbis"],
  "Zurmi": ["Zurmi", "Dauran", "Kanwa", "Rukudawa", "Yanbuki"]
};

export function GrassrootsEngine() {
  const [loading, setLoading] = useState(false);
  const [manualWard, setManualWard] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' });
  const [formData, setFormData] = useState({
    full_name: '', email_address: '', phone_number: '',
    dob: '', nin_number: '', education_level: '',
    lga: '', ward: '', gender: '', 
    benefited_before: 'No', benefit_details: ''
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ isVisible: true, message, type });
    if (type === 'success') {
      setTimeout(() => window.location.reload(), 3000); 
    } else {
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. NIN Length Check
    if (formData.nin_number.length !== 11) {
      showToast("INVALID NIN: MUST BE EXACTLY 11 DIGITS.", "error");
      return;
    }

    // 2. Strict Validation Check
    const requiredFields = ['full_name', 'email_address', 'phone_number', 'dob', 'nin_number', 'education_level', 'lga', 'ward', 'gender'];
    const firstEmptyField = requiredFields.find(field => !formData[field as keyof typeof formData]?.toString().trim());

    if (firstEmptyField) {
      showToast(`FIELD REQUIRED: ${firstEmptyField.replace('_', ' ').toUpperCase()}`, "error");
      return;
    }

    setLoading(true);

    try {
      // 3. ATTEMPT INSERT TO SUPABASE
      const { error } = await supabase.from('beneficiaries').insert([formData]);
      
      if (error) {
        // 4. CHECK FOR DUPLICATE KEY ERROR (PostgREST code '23505')
        if (error.code === '23505') {
          showToast("ALREADY REGISTERED: THIS PHONE OR NIN EXISTS.", "error");
        } else {
          showToast("SUBMISSION ERROR: " + error.message, "error");
        }
      } else {
        // 5. SUCCESS MESSAGE
        showToast("SUCCESSFUL: CREDENTIALS SAVED TO DATABASE.", "success");
      }
    } catch (err) {
      showToast("CONNECTION ERROR: CHECK YOUR INTERNET.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-6 md:px-20">
      {/* ANIMATED TOAST COMPONENT */}
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

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
          <InputGroup label="FULL NAME" type="text" value={formData.full_name} onChange={(val) => setFormData({...formData, full_name: val})} />
          <InputGroup label="EMAIL ADDRESS" type="email" value={formData.email_address} onChange={(val) => setFormData({...formData, email_address: val})} />
          <InputGroup label="PHONE NUMBER" type="tel" value={formData.phone_number} onChange={(val) => setFormData({...formData, phone_number: val})} />
          <InputGroup label="DATE OF BIRTH" type="date" value={formData.dob} onChange={(val) => setFormData({...formData, dob: val})} />
          
          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">NIN NUMBER (11 DIGITS)</label>
            <input 
              type="text" 
              required 
              maxLength={11}
              value={formData.nin_number}
              placeholder="ENTER 11 DIGITS"
              className="bg-transparent font-bold outline-none uppercase placeholder:text-gray-200" 
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ''); 
                if (val.length <= 11) setFormData({...formData, nin_number: val});
              }} 
            />
          </div>
          
          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">GENDER</label>
            <select required value={formData.gender} className="bg-transparent font-bold outline-none uppercase cursor-pointer" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">EDUCATION LEVEL</label>
            <select required value={formData.education_level} className="bg-transparent font-bold outline-none uppercase cursor-pointer" onChange={(e) => setFormData({...formData, education_level: e.target.value})}>
              <option value="">Select Level</option>
              <option value="Primary Cert">Primary Cert</option>
              <option value="SSCE">SSCE</option>
              <option value="NCE">NCE</option>
              <option value="Diploma">Diploma</option>
              <option value="HND">HND</option>
              <option value="Bsc">Bsc</option>
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">SELECT LGA</label>
            <select required value={formData.lga} className="bg-transparent font-bold outline-none uppercase cursor-pointer" onChange={(e) => setFormData({...formData, lga: e.target.value, ward: ''})}>
              <option value="">Choose LGA</option>
              {Object.keys(ZAMFARA_DATA).map(lga => <option key={lga} value={lga}>{lga}</option>)}
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">SELECT WARD</label>
            {!manualWard ? (
              <select required value={formData.ward} className="bg-transparent font-bold outline-none uppercase cursor-pointer" 
                onChange={(e) => {
                  if(e.target.value === "OTHER") { setManualWard(true); setFormData({...formData, ward: ""}); }
                  else setFormData({...formData, ward: e.target.value});
                }}>
                <option value="">Choose Ward</option>
                {formData.lga && ZAMFARA_DATA[formData.lga].map(ward => <option key={ward} value={ward}>{ward}</option>)}
                <option value="OTHER">NOT LISTED (TYPE MANUALLY)</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input required className="bg-transparent font-bold outline-none uppercase flex-1" placeholder="TYPE YOUR WARD HERE" value={formData.ward} onChange={(e) => setFormData({...formData, ward: e.target.value})} />
                <button type="button" onClick={() => {setManualWard(false); setFormData({...formData, ward: ""})}} className="text-[8px] bg-gray-200 px-2 py-1 rounded font-black">BACK</button>
              </div>
            )}
          </div>

          <div className="flex flex-col border-b-2 border-black pb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase mb-2">BENEFITED BEFORE?</label>
            <select value={formData.benefited_before} className="bg-transparent font-bold outline-none uppercase cursor-pointer" onChange={(e) => setFormData({...formData, benefited_before: e.target.value})}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {formData.benefited_before === 'Yes' && (
            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2">WHAT DID YOU BENEFIT FROM?</label>
              <input required value={formData.benefit_details} className="bg-transparent font-bold outline-none uppercase" placeholder="Describe benefit" onChange={(e) => setFormData({...formData, benefit_details: e.target.value})} />
            </div>
          )}

          <div className="md:col-span-2 pt-10">
            <button type="submit" disabled={loading} className="w-full bg-[#064E3B] text-white py-5 font-black uppercase tracking-widest hover:bg-[#043327] disabled:bg-gray-400 transition-all">
              {loading ? "CHECKING RECORDS..." : "SUBMIT TO DATABASE"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function InputGroup({ label, type, value, onChange }: { label: string, type: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col border-b-2 border-black pb-2">
      <label className="text-[10px] font-black text-gray-400 uppercase mb-2">{label}</label>
      <input type={type} required value={value} autoComplete="off" className="bg-transparent font-bold outline-none uppercase placeholder:text-gray-200" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}