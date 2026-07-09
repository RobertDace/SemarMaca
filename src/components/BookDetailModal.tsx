'use client';

import React, { useState } from 'react';
import { BookItem } from '@/types/library';
import { X, Copy, Check, BookMarked, MapPin, FileText, QrCode, Download, Map, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  if (!book) return null;

  const citationAPA = `${book.authors.join(', ')}. (${book.publishedDate}). ${book.title}. ${book.publisher}. ISBN: ${book.isbn}. Perpustakaan Hukum UWGM Samarinda.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationAPA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateBooking = () => {
    const randomCode = `BOOK-UWGM-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(randomCode);
  };

  const handleDownloadPass = () => {
    alert(`Tiket Booking ${bookingCode} berhasil disimpan sebagai Pass Digital untuk ditunjukkan ke Pustakawan.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          <button
            onClick={() => { setBookingCode(null); setShowMap(false); onClose(); }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-100 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Cover & Shelf Location */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-3 bg-slate-950 relative group">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              </div>

              {/* Denah Interactive Button */}
              <button
                onClick={() => setShowMap(!showMap)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Map className="w-4 h-4 text-cyan-400" />
                <span>{showMap ? 'Sembunyikan Denah' : '📍 Lihat Denah Rak'}</span>
              </button>

              <div className="w-full mt-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                  Lokasi Fisik Pustaka
                </p>
                <p className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{book.shelfLocation}</span>
                </p>
              </div>
            </div>

            {/* Right Information & Interactive Features */}
            <div className="md:col-span-8 space-y-4">
              
              {/* FITUR 1: DENAH LOKASI RAK INTERAKTIF VISUAL MAP */}
              {showMap ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Peta Layout Perpustakaan FH UWGM
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Lantai 1-3</span>
                  </div>

                  {/* SVG Map Illustration */}
                  <div className="relative w-full h-44 bg-slate-900 rounded-xl border border-slate-800 p-3 flex flex-col justify-between overflow-hidden">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>[AREA PINTU MASUK]</span>
                      <span>[MEJA PUSTAKAWAN]</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 my-auto text-center text-[10px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">Rak A-F</div>
                      <div className={`p-2 rounded font-bold border animate-pulse ${
                        book.shelfLocation.includes('H-') || book.shelfLocation.includes('HI-')
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}>
                        {book.shelfLocation.split(' ')[0]} (AKTIF)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">Rak P-Q</div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">Arsip Riset</div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-1.5">
                      <span>Posisi: <strong className="text-cyan-300">{book.shelfLocation}</strong></span>
                      <span className="text-emerald-400 font-bold">● Jalur Bebas Hambatan</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60 mb-2">
                      {book.categoryLabel}
                    </span>
                    <h2 className="text-2xl font-black text-slate-100 leading-tight">{book.title}</h2>
                    <p className="text-sm font-semibold text-slate-400 mt-1">Oleh: {book.authors.join(', ')}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center text-xs">
                    <div>
                      <p className="text-slate-500 font-medium">Penerbit</p>
                      <p className="text-slate-200 font-bold truncate">{book.publisher}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Tahun Terbit</p>
                      <p className="text-slate-200 font-bold">{book.publishedDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">ISBN</p>
                      <p className="text-slate-200 font-bold truncate">{book.isbn}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> Abstraksi / Sinopsis Pustaka
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-h-24 overflow-y-auto pr-2">{book.description}</p>
                  </div>

                  {/* APA Citation Box */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Format Sitasi (APA 7th)</span>
                      <button onClick={handleCopyCitation} className="flex items-center gap-1 text-xs font-bold text-cyan-400">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Tersalin!' : 'Salin Sitasi'}</span>
                      </button>
                    </div>
                    <p className="text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800/60 leading-relaxed select-all">{citationAPA}</p>
                  </div>
                </>
              )}

              {/* FITUR 2: QR CODE GATE PASS & BOOKING TICKET */}
              {bookingCode ? (
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 text-center">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4" /> QR Gate Pass Terkonfirmasi
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Berlaku 24 Jam</span>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-2">
                    {/* Visual QR Code Box */}
                    <div className="p-2.5 bg-white rounded-xl shadow-lg border border-emerald-400/50">
                      <div className="w-24 h-24 bg-slate-950 rounded p-1 flex flex-col justify-between items-center text-[8px] font-mono text-cyan-400">
                        <div className="w-full flex justify-between">
                          <span className="w-5 h-5 bg-cyan-400 rounded-sm"></span>
                          <span className="w-5 h-5 bg-cyan-400 rounded-sm"></span>
                        </div>
                        <span className="font-bold text-[10px] tracking-wider text-white">QR-UWGM</span>
                        <div className="w-full flex justify-between">
                          <span className="w-5 h-5 bg-cyan-400 rounded-sm"></span>
                          <span className="w-3 h-3 bg-cyan-400 rounded-sm"></span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Kode Tiket Booking:</p>
                      <p className="text-lg font-mono font-black text-cyan-300">{bookingCode}</p>
                      <p className="text-[11px] text-slate-300">Tunjukkan QR ini ke scanner petugas di <strong>{book.shelfLocation}</strong>.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPass}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR Pass (Tiket Digital)</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerateBooking}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Pengajuan Booking Fisik & Generate QR Pass</span>
                </button>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};