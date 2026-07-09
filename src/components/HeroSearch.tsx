'use client';

import React from 'react';
import { Search, Printer, Upload, CheckCircle2, Globe, Landmark } from 'lucide-react';
import { LegalCategory } from '@/types/library';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: LegalCategory;
  setSelectedCategory: (cat: LegalCategory) => void;
  totalResults: number;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  scopeFilter: string;
  setScopeFilter: (sc: string) => void;
  onOpenSubmitModal: () => void;
  onPrintReport: () => void;
}

const CATEGORIES: { key: LegalCategory; label: string; icon?: React.ElementType }[] = [
  { key: 'ALL', label: 'Semua Koleksi' },
  { key: 'IKN_KALTIM', label: '🏛️ Hub IKN & Hukum Kaltim', icon: Landmark },
  { key: 'HUKUM_NASIONAL', label: 'Hukum Nasional' },
  { key: 'HUKUM_INTERNASIONAL', label: 'Hukum Internasional' },
  { key: 'POLITIK_PEMERINTAHAN', label: 'Politik & Tata Negara' },
  { key: 'RISET_JURNAL', label: 'Riset & Jurnal Akademik' },
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalResults,
  statusFilter,
  setStatusFilter,
  scopeFilter,
  setScopeFilter,
  onOpenSubmitModal,
  onPrintReport,
}) => {
  return (
    <div className="pt-8 pb-6 space-y-6">
      
      {/* Title & Action Buttons Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Landmark className="w-3 h-3" /> Repositori Regional Samarinda & IKN
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
            E-Katalog Repositori Pustaka Hukum
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sistem Informasi Koleksi Buku & Riset Akademis Fakultas Hukum UWGM Samarinda.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onPrintReport}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Cetak Laporan</span>
          </button>

          <button
            onClick={onOpenSubmitModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Jurnal</span>
          </button>
        </div>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul buku, undang-undang, isu IKN, pengarang (contoh: Jimly, Pertambangan, IKN, UNCLOS)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 shadow-inner transition-all"
        />
      </div>

      {/* Primary Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.key
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Secondary Filter Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">Semua Status</option>
              <option value="TERSEDIA">Hanya Tersedia</option>
              <option value="DIPINJAM">Sedang Dipinjam</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">Semua Cakupan</option>
              <option value="NASIONAL">Koleksi Nasional</option>
              <option value="INTERNASIONAL">Koleksi Internasional</option>
            </select>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-500">
          Menampilkan <span className="text-cyan-400 font-bold">{totalResults}</span> referensi valid
        </p>
      </div>

    </div>
  );
};