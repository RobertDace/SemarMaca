'use client';

import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileText, Send, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubmitJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (title: string) => void;
}

export const SubmitJournalModal: React.FC<SubmitJournalModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    nimNip: '',
    category: 'RISET_JURNAL',
    abstract: '',
  });

  const [hasFile, setHasFile] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{ similarity: number; passed: boolean } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = () => {
    setHasFile(true);
    setIsAuditing(true);
    setAuditResult(null);

    // Simulasi AI Pre-Check Plagiarism & Structure Audit
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        similarity: 12, // 12% Plagiarism (Lolos < 20%)
        passed: true,
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(formData.title);
      setSubmitted(false);
      setHasFile(false);
      setAuditResult(null);
      setFormData({ title: '', author: '', nimNip: '', category: 'RISET_JURNAL', abstract: '' });
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">Submit Jurnal & AI Pre-Check</h3>
              <p className="text-xs text-slate-400">Unggah naskah akademis ke Repositori FH UWGM Samarinda</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-slate-100">Jurnal Berhasil Terpublikasi!</h4>
              <p className="text-xs text-slate-400">Naskah Anda telah lolos AI Audit & diterima oleh Tim Pustakawan FH UWGM.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Judul Karya / Jurnal</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Implikasi Hukum IKN Nusantara Terhadap Hak Ulayat Dayak..."
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nama Penulis Utama</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap & Gelar"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">NIM / NIDN (FH UWGM)</label>
                  <input
                    type="text"
                    required
                    placeholder="Nomor Induk Mahasiswa/Dosen"
                    value={formData.nimNip}
                    onChange={e => setFormData({ ...formData, nimNip: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Abstrak Singkat</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan latar belakang, metode, dan hasil riset..."
                  value={formData.abstract}
                  onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                />
              </div>

              {/* FITUR 5: UPLOAD FILE & AI PRE-CHECK AUDIT */}
              <div
                onClick={handleFileSelect}
                className="p-4 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/50 text-center cursor-pointer transition-colors"
              >
                <FileText className="w-7 h-7 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-200">
                  {hasFile ? '✓ Naskah_Jurnal_FH_UWGM.pdf (Selected)' : 'Klik untuk Unggah Naskah Jurnal (.PDF)'}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">Sistem akan langsung melakukan AI Audit Kelayakan Format & Plagiarisme</p>
              </div>

              {/* AI Audit Live Feedback Widget */}
              {isAuditing && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-2 text-xs text-cyan-300 animate-pulse">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>SemarAI sedang memindai kelayakan format & indeks plagiarisme...</span>
                </div>
              )}

              {auditResult && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>AI Audit: LOLOS KUALIFIKASI</span>
                  </div>
                  <div className="text-right text-[11px] text-slate-300 font-mono">
                    Indeks Similarity: <strong className="text-emerald-400">{auditResult.similarity}%</strong> (&lt; 20%)
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!auditResult}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Naskah ke Repositori Digital</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};