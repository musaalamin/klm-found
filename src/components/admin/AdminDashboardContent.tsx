"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Map, Award, Search, Download, Plus, Image as ImageIcon, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import * as XLSX from 'xlsx';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<'stats' | 'upload'>('stats');
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Project Form State
  const [projectData, setProjectData] = useState({
    title: '', location_lga: '', description: '', image_url: '', category: 'Education'
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from('beneficiaries').select('*').order('created_at', { ascending: false });
    if (data) setBeneficiaries(data);
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('projects').insert([projectData]);
    if (error) alert("Error: " + error.message);
    else {
      alert("SUCCESS: Project added to the Foundation Gallery!");
      setProjectData({ title: '', location_lga: '', description: '', image_url: '', category: 'Education' });
      setActiveTab('stats');
    }
    setLoading(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(beneficiaries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Beneficiaries");
    XLSX.writeFile(workbook, "KLM_Foundation_Data.xlsx");
  };

  const lgaStats = beneficiaries.reduce((acc: any, curr) => {
    if (curr.lga) acc[curr.lga] = (acc[curr.lga] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(lgaStats).map(lga => ({ name: lga.toUpperCase(), count: lgaStats[lga] }));

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 md:p-10 text-black uppercase font-bold">
      {/* Hidden Navigation Toggle */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-2 rounded-lg text-xs transition-all ${activeTab === 'stats' ? 'bg-[#064E3B] text-white' : 'bg-white text-gray-400 border'}`}
        >
          Intelligence Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-2 rounded-lg text-xs flex items-center gap-2 transition-all ${activeTab === 'upload' ? 'bg-[#D97706] text-white' : 'bg-white text-gray-400 border'}`}
        >
          <Plus size={14} /> Manage Projects
        </button>
      </div>

      {activeTab === 'stats' ? (
        <>
          {/* ... EXISTING DASHBOARD CODE (Header, Stats, Chart, Table) ... */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black text-[#064E3B] italic">War-Room</h1>
            <button onClick={exportToExcel} className="bg-[#D97706] text-white px-4 py-2 rounded-lg text-[10px] flex items-center gap-2">
              <Download size={14}/> Export Excel
            </button>
          </div>
          
          {/* Chart Block */}
         {/* High-End Restoration Chart Block */}
<div className="h-[400px] w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
  <div className="flex justify-between items-center mb-8">
    <h3 className="text-sm font-black uppercase tracking-widest text-[#064E3B]">Constituency Distribution (LGA)</h3>
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-[#064E3B] rounded-full"></div>
      <span className="text-[10px] font-bold text-gray-400 uppercase">Beneficiaries</span>
    </div>
  </div>

  <ResponsiveContainer width="100%" height="90%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis 
        dataKey="name" 
        fontSize={10} 
        fontWeight="900" 
        tickLine={false} 
        axisLine={false} 
        tick={{fill: '#94a3b8'}}
      />
      <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{fill: '#94a3b8'}} />
      <Tooltip 
        cursor={{fill: '#f8fafc'}} 
        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
      />
      <Bar dataKey="count" fill="#064E3B" radius={[10, 10, 0, 0]} barSize={45} />
    </BarChart>
  </ResponsiveContainer>
</div>

          {/* Table Block */}
          <div className="bg-white rounded-3xl border overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] text-gray-400">
                   <tr><th className="p-5">Name</th><th className="p-5">LGA</th><th className="p-5">NIN</th></tr>
                </thead>
                <tbody className="text-xs">
                   {beneficiaries.slice(0, 10).map((b, i) => (
                     <tr key={i} className="border-t"><td className="p-5">{b.full_name}</td><td className="p-5">{b.lga}</td><td className="p-5">{b.nin_number}</td></tr>
                   ))}
                </tbody>
             </table>
          </div>
        </>
      ) : (
        /* THE HIDDEN UPLOAD FORM */
        <div className="max-w-2xl bg-white p-10 rounded-3xl border shadow-xl mx-auto">
          <h2 className="text-2xl font-black text-[#064E3B] mb-8 italic">New Project Entry</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-6">
            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] text-gray-400 mb-2">PROJECT TITLE</label>
              <input required className="bg-transparent outline-none" placeholder="E.G. NEW BOREHOLE SYSTEM" 
              onChange={(e) => setProjectData({...projectData, title: e.target.value})} />
            </div>

            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] text-gray-400 mb-2">LOCATION (LGA)</label>
              <input required className="bg-transparent outline-none" placeholder="E.G. GUSAU" 
              onChange={(e) => setProjectData({...projectData, location_lga: e.target.value})} />
            </div>

            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] text-gray-400 mb-2">IMAGE LINK (URL)</label>
              <input className="bg-transparent outline-none text-blue-500 lowercase" placeholder="https://..." 
              onChange={(e) => setProjectData({...projectData, image_url: e.target.value})} />
            </div>

            <div className="flex flex-col border-b-2 border-black pb-2">
              <label className="text-[10px] text-gray-400 mb-2">DESCRIPTION</label>
              <textarea className="bg-transparent outline-none text-xs" rows={3} placeholder="DETAILS OF THE PROJECT..." 
              onChange={(e) => setProjectData({...projectData, description: e.target.value})} />
            </div>

            <button disabled={loading} className="w-full bg-[#064E3B] text-white py-4 font-black tracking-widest hover:bg-black transition-all">
              {loading ? "SAVING TO GALLERY..." : "PUBLISH PROJECT"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}