'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSearch } from '@/components/HeroSearch';
import { StatsBanner } from '@/components/StatsBanner';
import { BookCard } from '@/components/BookCard';
import { BookDetailModal } from '@/components/BookDetailModal';
import { SubmitJournalModal } from '@/components/SubmitJournalModal';
import { LegalAiWidget } from '@/components/LegalAiWidget';
import { fetchLegalBooks } from '@/lib/api/booksService';
import { BookItem, LegalCategory } from '@/types/library';
import { Loader2, BookX } from 'lucide-react';

export default function SemarMacaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [scopeFilter, setScopeFilter] = useState<string>('ALL');

  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchLegalBooks(searchQuery, selectedCategory);
      setBooks(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      loadBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Apply Additional Filters (Status & Scope)
  const filteredBooks = books.filter((book) => {
    const matchesStatus = statusFilter === 'ALL' || book.availability === statusFilter;
    const matchesScope =
      scopeFilter === 'ALL' ||
      (scopeFilter === 'NASIONAL' && !book.isInternational) ||
      (scopeFilter === 'INTERNASIONAL' && book.isInternational);
    return matchesStatus && matchesScope;
  });

  // Fitur Cetak Laporan PDF
  const handlePrintReport = () => {
    window.print();
  };

  const handleJournalSuccess = (title: string) => {
    alert(`Sukses! Jurnal "${title}" telah dikirim ke pustakawan.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Header */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Interactive Search & Multi-Filter Bar */}
        <HeroSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalResults={filteredBooks.length}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          scopeFilter={scopeFilter}
          setScopeFilter={setScopeFilter}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          onPrintReport={handlePrintReport}
        />

        {/* Baris Statistik */}
        <StatsBanner />

        {/* Catalog Grid Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-xs font-semibold text-slate-400">Menghubungkan ke Repositori Pustaka Hukum...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 print:grid-cols-2">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={(selected) => setSelectedBook(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-slate-800 max-w-lg mx-auto mt-8">
            <BookX className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">Koleksi Tidak Ditemukan</h3>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter ketersediaan, cakupan, atau kata kunci pencarian Anda.</p>
          </div>
        )}

      </main>

      {/* Floating AI Assistant Widget */}
      <LegalAiWidget />

      {/* Footer Branding */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SemarMaca — Fakultas Hukum Universitas Widya Gama Mahakam Samarinda.</p>
          <p className="font-mono text-cyan-400">Engineered by 2OB1T™ Studio</p>
        </div>
      </footer>

      {/* Modal Detail & Booking Tiket Fisik */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Modal Submit Jurnal Baru */}
      <SubmitJournalModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleJournalSuccess}
      />

    </div>
  );
}