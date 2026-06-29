import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Key } from 'lucide-react';

interface AdminLoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function AdminLoginModal({ onLogin, onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dukamo2018') {
      onLogin();
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#FAF5EF] border border-[#8C6239]/30 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#8C6239]/10 rounded-full flex items-center justify-center mb-4 text-[#8C6239]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2D241C]">Admin Access</h2>
          <p className="text-xs text-[#5C4E43] font-mono mt-1 uppercase tracking-widest">Enter Credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] mb-1.5 ml-1">
              Secret Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6239]/60" />
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white border ${error ? 'border-red-500 shake' : 'border-[#E3D7C8]'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6239]/20 transition-all`}
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 uppercase tracking-wider">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8C6239] hover:bg-[#704E2D] text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
          >
            Enter Admin Mode
          </button>
        </form>
      </motion.div>
    </div>
  );
}
