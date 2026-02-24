"use client";
import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = "JAGABAN_ACCESS_2026"; // Change this to your desired password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuthenticated();
    } else {
      alert("Unauthorized Access: Incorrect Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#064E3B] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#D97706]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-[#D97706] w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-[#064E3B] uppercase mb-2">Security Portal</h2>
        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-8">KLM Foundation Command</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="ENTER ACCESS KEY" 
            className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-[#D97706] text-center font-bold tracking-widest"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#064E3B] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all">
            Unlock War-Room
          </button>
        </form>
      </div>
    </div>
  );
}