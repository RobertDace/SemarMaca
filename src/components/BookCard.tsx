'use client';

import React, { useState } from 'react';
import { BookItem } from '@/types/library';
import { BookOpen, MapPin, CheckCircle2, XCircle, Globe, Award, Scale, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: BookItem;
  onSelect: (book: BookItem) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  const hasValidCover = book.coverUrl && book.coverUrl.trim() !== '' && !imgError;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      <div>
        {/* Cover Container */}
        <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800/60 flex items-center justify-center">
          
          {hasValidCover ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            /* Fallback Cover untuk 1-2 buku yang dari Google-nya belum di-scan */
            <div className="w-full h-full p-4 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 flex flex-col justify-between border border-cyan-500/20 relative overflow-hidden">
              <div className="flex justify-between items-center z-10">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">FH UWGM</span>
              </div>

              <div className="z-10 my-auto text-left">
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 line-clamp-1">
                  {book.categoryLabel}
                </p>
                <h4 className="text-xs font-black text-slate-100 leading-snug line-clamp-3">
                  {book.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">
                  {book.authors[0]}
                </p>
              </div>

              <div className="z-10 pt-2 border-t border-slate-800/80 flex justify-between items-center">
                <span className="text-[9px] font-mono text-slate-500">{book.publishedDate}</span>
                <BookMarked className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md border ${
              book.availability === 'TERSEDIA'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                : 'bg-rose-950/80 text-rose-400 border-rose-800/60'
            }`}>
              {book.availability === 'TERSEDIA' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Tersedia
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3" /> Dipinjam
                </>
              )}
            </span>
          </div>

          {/* Scope Badge */}
          <div className="absolute top-3 right-3 z-20">
            {book.isInternational ? (
              <span className="p-1.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/60 backdrop-blur-md" title="Koleksi Hukum Internasional">
                <Globe className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 backdrop-blur-md" title="Koleksi Hukum Nasional">
                <Award className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Category Label */}
          <div className="absolute bottom-2 left-3 right-3 z-20">
            <p className="text-[11px] font-semibold text-cyan-300 tracking-wide uppercase truncate">
              {book.categoryLabel}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <h3 className="text-base font-bold text-slate-100 line-clamp-2 mb-1 group-hover:text-cyan-300 transition-colors">
          {book.title}
        </h3>

        <p className="text-xs text-slate-400 font-medium line-clamp-1 mb-3">
          {book.authors.join(', ')} ({book.publishedDate})
        </p>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {book.description}
        </p>
      </div>

      {/* Footer Info & Detail Button */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span className="truncate max-w-[130px]">{book.shelfLocation}</span>
        </div>

        <button
          onClick={() => onSelect(book)}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold transition-all duration-300 border border-cyan-500/30 flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Detail</span>
        </button>
      </div>
    </motion.div>
  );
};