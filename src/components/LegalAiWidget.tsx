'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Scale, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const LegalAiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Saya SemarAI — Asisten Digital Repositori Hukum FH UWGM. Ada isu hukum, regulasi, atau pustaka yang ingin Anda tanyakan?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Dynamic Mock AI Responses based on keywords
    setTimeout(() => {
      let aiResponseText = 'Untuk kueri tersebut, Anda dapat merujuk pada regulasi perundang-undangan dan koleksi pustaka terkait di katalog utama SemarMaca. Silakan manfaatkan pencarian dengan kata kunci spesifik.';

      const lower = userText.toLowerCase();
      if (lower.includes('pidana') || lower.includes('kuhp')) {
        r: aiResponseText = 'Mengenai Hukum Pidana, rujukan utama di katalog adalah "Asas-Asas Hukum Pidana Indonesia" karya Prof. Moeljatno serta analisis KUHP Baru (UU No. 1/2023).';
      } else if (lower.includes('ikn') || lower.includes('nusantara')) {
        r: aiResponseText = 'Terkait isu IKN, riset akademis terbaru FH UWGM membahas UU No. 21/2023 tentang IKN dan implikasinya terhadap hak atas tanah adat di Penajam Paser Utara.';
      } else if (lower.includes('perdata') || lower.includes('kontrak')) {
        r: aiResponseText = 'Untuk Hukum Perdata dan Perikatan, Anda dapat menggunakan referensi utama "Hukum Perdata Indonesia" oleh Subekti, S.H. yang tersedia di Rak H-03.';
      } else if (lower.includes('pinjam') || lower.includes('booking')) {
        r: aiResponseText = 'Peminjaman buku fisik dapat dilakukan dengan menekan tombol "Detail" pada kartu buku, lalu klik "Pengajuan Booking Fisik" untuk mendapatkan Kode Tiket Booking.';
      } else if (lower.includes('uwgm') || lower.includes('fakultas') || lower.includes('perpustakaan')) {
        r: aiResponseText = 'Perpustakaan Hukum UWGM berlokasi di Kampus Universitas Widya Gama Mahakam Samarinda. Layanan fisik buka setiap hari kerja pukul 08.00 - 16.00 WITA.';
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-500 text-slate-950 shadow-2xl shadow-cyan-500/30 flex items-center justify-center border border-cyan-300/40"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* AI Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[80vh] print:hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-100">SemarAI Legal Bot</h3>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Asisten Hukum Cerdas FH UWGM
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 font-mono ${
                        msg.sender === 'user' ? 'text-slate-900/70 text-right' : 'text-slate-500'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span className="text-[11px] font-mono">SemarAI sedang menganalisis kueri...</span>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tanyakan topik hukum / pustaka..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};