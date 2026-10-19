<div align="center">

  <!-- Logo & Title -->
  <br />
  <h1>⚖️ SemarMaca v2.0</h1>
  <h3>Smart E-Catalog & Repositori Pustaka Hukum Digital</h3>
  <p><b>Fakultas Hukum • Universitas Widya Gama Mahakam Samarinda</b></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2%20(Turbopack)-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.0+-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-11.0+-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Developed_By-2OB1T%E2%84%A2_Studio-cyan?style=for-the-badge" alt="Developer" />
  </p>

  <br />

  <p align="center">
    <b>SemarMaca</b> adalah platform e-katalog dan repositori perpustakaan digital interaktif yang dirancang khusus untuk memenuhi kebutuhan literatur akademis mahasiswa, dosen, dan peneliti hukum di lingkungan Fakultas Hukum Universitas Widya Gama Mahakam Samarinda.
  </p>

</div>

<hr />

<h2>✨ Fitur Inovatif Unggulan</h2>

<table>
  <tr>
    <td width="50%">
      <h3>🏛️ Hub IKN & Hukum Kaltim</h3>
      <p>Pusat koleksi dan riset khusus isu kedaerahan Kalimantan Timur, Regulasi Daerah Samarinda, serta Isu Hukum Pertanahan & Tata Ruang IKN Nusantara.</p>
    </td>
    <td width="50%">
      <h3>📍 Denah Rak Interaktif (Visual Shelf Map)</h3>
      <p>Visualisasi peta 2D layout perpustakaan yang secara otomatis menyoroti (highlight) posisi fisik rak buku (contoh: Rak H-01) untuk memudahkan pencarian.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎟️ QR Code Gate Pass & Ticket Digital</h3>
      <p>Sistem pengajuan reservasi/booking buku fisik yang menghasilkan Tiket Digital ber-QR Code untuk di-scan oleh petugas perpustakaan.</p>
    </td>
    <td width="50%">
      <h3>🛡️ AI Pre-Check & Audit Jurnal</h3>
      <p>Pemindaian otomatis berbasis AI untuk memeriksa indeks kelayakan format, kelengkapan naskah, dan simulasi plagiarisme sebelum submit karya ilmiah.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🤖 SemarAI Legal Assistant</h3>
      <p>Asisten AI cerdas melayang (widget) yang siap menjawab kueri pasal perundang-undangan, rekomendasi pustaka, dan panduan layanan kampus.</p>
    </td>
    <td width="50%">
      <h3>📚 50+ Curated Legal Database</h3>
      <p>Basis data offline-first berisi 50+ referensi buku hukum nasional, internasional, politik, serta jurnal akademis terbitan FH UWGM Samarinda.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📖 APA 7th Citation Generator</h3>
      <p>Generator format sitasi otomatis berbasis standar APA 7th Edition yang dapat disalin langsung dengan sekali klik.</p>
    </td>
    <td width="50%">
      <h3>🖨️ Cetak Laporan & Multi-Filter</h3>
      <p>Fitur rekap cetak (Print Report PDF) khusus pustakawan serta penyaringan koleksi berdasarkan Status Ketersediaan dan Cakupan Wilayah.</p>
    </td>
  </tr>
</table>

<br />

<h2>🛠️ Teknologi & Dependensi</h2>

<ul>
  <li><b>Framework:</b> Next.js 16 (App Router & Turbopack Engine)</li>
  <li><b>Language:</b> TypeScript (Strict Type Safety)</li>
  <li><b>Styling:</b> Tailwind CSS (Dark Mode Slate Aesthetic)</li>
  <li><b>Animation:</b> Framer Motion</li>
  <li><b>Icons:</b> Lucide React</li>
</ul>

<br />

<h2>🚀 Cara Menjalankan Project (Local Development)</h2>

<p>Ikuti langkah-langkah berikut untuk menjalankan project di komputer lokal Anda:</p>

<pre><code># 1. Clone repository ini
git clone https://github.com/username-kamu/semarmaca.git

# 2. Masuk ke direktori project
cd semarmaca

# 3. Install seluruh dependensi
npm install

# 4. Jalankan server pengembangan
npm run dev
</code></pre>

<p>Buka <a href="http://localhost:3000"><b>http://localhost:3000</b></a> di browser Anda untuk melihat aplikasi.</p>

<br />

<h2>📁 Struktur Direktori</h2>

<pre><code>src/
├── app/
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Halaman Utama E-Katalog SemarMaca
├── components/
│   ├── Navbar.tsx             # Header navigation & branding
│   ├── HeroSearch.tsx         # Search bar & multi-category tabs
│   ├── StatsBanner.tsx        # Ringkasan statistik & akreditasi
│   ├── BookCard.tsx           # Card komponen buku & status
│   ├── BookDetailModal.tsx    # Modal detail, Sitasi APA, QR Pass & Denah
│   ├── SubmitJournalModal.tsx # Modal submit jurnal & AI Audit
│   ├── LegalAiWidget.tsx      # Chatbot Asisten AI SemarAI
├── lib/
│   └── api/
│       └── booksService.ts    # Service & Database 50+ Pustaka Hukum
└── types/
    └── library.ts             # TypeScript Type Definitions
</code></pre>

<br />

<hr />

<div align="center">

  <p><b>Hak Cipta © 2026 SemarMaca</b></p>
  <p>Fakultas Hukum — Universitas Widya Gama Mahakam Samarinda</p>
  <p><i>Engineered with ❤️ by <b>2OB1T™ Studio</b></i></p>

</div>