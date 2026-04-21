"use client";
import { useState, useEffect } from "react";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[6000] md:left-auto md:w-96">
      <div className="bg-[#064E3B] text-white p-6 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed mb-4">
          We use cookies to enhance your experience on the KLM Foundation platform. 
          By continuing, you agree to our data policy.
        </p>
        <button 
          onClick={acceptCookies}
          className="w-full bg-[#D97706] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#064E3B] transition-all"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
};