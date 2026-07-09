'use client';

import React from 'react';
import { BookOpen, Award, FileCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatsBanner = () => {
  const stats = [
    {
      id: 1,
      icon: BookOpen,
      value: '1.250+',
      label: 'Koleksi Pustaka Hukum',
      sub: 'Nasional & Internasional',
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      bgColor: 'bg-cyan-500/10',
    },
    {
      id: 2,
      icon: FileCheck,
      value: '380+',
      label: 'Riset & Jurnal Akademis',
      sub: 'Dosen & Mahasiswa FH UWGM',
      color: 'text-teal-400',
      borderColor: 'border-teal-500/20',
      bgColor: 'bg-teal-500/10',
    },
    {
      id: 3,
      icon: Award,
      value: 'Terakreditasi',
      label: 'Program Studi Hukum',
      sub: 'FH UWGM Samarinda',
      color: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: 4,
      icon: Users,
      value: '24/7',
      label: 'Akses Katalog Digital',
      sub: 'Layanan Terintegrasi Repositori',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      bgColor: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="py-2 my-2 print:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} ${stat.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-100 tracking-tight">{stat.value}</h4>
                <p className="text-xs font-bold text-slate-300 leading-snug">{stat.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};