'use client';

import React from 'react';
import { BookOpen, Scale, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Institution Info */}
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20"
          >
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Scale className="w-6 h-6 text-cyan-400" />
            </div>
          </motion.div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                SemarMaca
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                v2.0 E-Catalog
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fakultas Hukum • Univ. Widya Gama Mahakam Samarinda</span>
            </div>
          </div>
        </div>

        {/* Developer Branding Badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">Engineered By</p>
            <p className="text-sm font-bold text-slate-200">2OB1T™ Studio</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-cyan-400 flex items-center gap-2 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>AI-Powered Catalog</span>
          </div>
        </div>

      </div>
    </header>
  );
};