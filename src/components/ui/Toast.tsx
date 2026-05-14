"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop: This darkens the background to make the pop card stand out */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* The Pop Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            className="fixed top-1/2 left-1/2 z-[9999] w-[90%] max-w-sm"
          >
            <div className={`flex flex-col items-center text-center gap-4 p-8 rounded-3xl shadow-2xl border-2 ${
              type === "success" 
              ? "bg-white border-[#064E3B]" 
              : "bg-white border-red-600"
            }`}>
              
              {/* Animated Icon */}
              <div className={`p-4 rounded-full ${
                type === "success" ? "bg-[#064E3B]/10 text-[#064E3B]" : "bg-red-100 text-red-600"
              }`}>
                {type === "success" ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
              </div>
              
              <div>
                <h3 className={`text-lg font-black uppercase italic ${
                  type === "success" ? "text-[#064E3B]" : "text-red-600"
                }`}>
                  {type === "success" ? "Successful" : "Action Required"}
                </h3>
                <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">
                  {message}
                </p>
              </div>

              <button 
                onClick={onClose}
                className={`w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  type === "success" 
                  ? "bg-[#064E3B] text-white hover:bg-[#043327]" 
                  : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Close Notification
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};