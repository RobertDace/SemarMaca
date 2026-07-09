export type LegalCategory = 
  | 'ALL'
  | 'HUKUM_NASIONAL'
  | 'HUKUM_INTERNASIONAL'
  | 'POLITIK_PEMERINTAHAN'
  | 'RISET_JURNAL'
  | 'IKN_KALTIM'; // Filter khusus isu kedaerahan & IKN

export interface BookItem {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: string;
  category: LegalCategory;
  categoryLabel: string;
  coverUrl: string;
  pageCount: number;
  language: string;
  availability: 'TERSEDIA' | 'DIPINJAM' | 'DIRESERVASI';
  shelfLocation: string;
  isInternational: boolean;
  pdfUrl?: string;
}