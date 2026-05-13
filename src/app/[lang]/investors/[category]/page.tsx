import React from 'react';
import Link from 'next/link';
import { getInvestorDocumentsByCategory, formatBytes } from '@/lib/sanity/client';
import { FileText, Calendar, Download, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface InvestorDocument {
  _id: string;
  title: string;
  date: string;
  legalRequirement: boolean;
  fileUrl: string;
  fileSize: number;
}

// Category map for translations
const categories = [
  { id: 'calendar', ro: 'Calendar Financiar', en: 'Financial Calendar' },
  { id: 'reports', ro: 'Rapoarte Curente', en: 'Current Reports' },
  { id: 'results', ro: 'Rezultate Financiare', en: 'Financial Results' },
  { id: 'governance', ro: 'Guvernanță Corporativă', en: 'Corporate Governance' },
  { id: 'assemblies', ro: 'Adunări Generale', en: 'General Assemblies' },
];

export default async function InvestorCategoryPage({
  params: { lang, category },
}: {
  params: { lang: string; category: string };
}) {
  let documents = await getInvestorDocumentsByCategory(category, lang);

  // Mock data for demo if Sanity is empty, based on official site documents
  if (documents.length === 0) {
    const mockDocs: { [key: string]: InvestorDocument[] } = {
      reports: [
        { _id: 'm1', title: lang === 'ro' ? 'Raport Curent - Transparență' : 'Current Report - Transparency', date: '15.04.2026', legalRequirement: true, fileUrl: '#', fileSize: 1250000 },
        { _id: 'm2', title: lang === 'ro' ? 'Notificare Deținere peste 5%' : 'Major Holding Notification >5%', date: '10.03.2026', legalRequirement: true, fileUrl: '#', fileSize: 850000 },
      ],
      results: [
        { _id: 'm3', title: lang === 'ro' ? 'Raport Audit 2025' : 'Audit Report 2025', date: '25.02.2026', legalRequirement: true, fileUrl: '#', fileSize: 4500000 },
        { _id: 'm4', title: lang === 'ro' ? 'Rezultate Financiare T1 2026' : 'Q1 2026 Financial Results', date: '15.05.2026', legalRequirement: false, fileUrl: '#', fileSize: 2200000 },
      ],
      governance: [
        { _id: 'm5', title: lang === 'ro' ? 'Act Constitutiv Actualizat' : 'Updated Articles of Association', date: '01.01.2026', legalRequirement: true, fileUrl: '#', fileSize: 1800000 },
        { _id: 'm6', title: lang === 'ro' ? 'Regulament Consiliu Administrație' : 'Board of Directors Regulations', date: '15.12.2025', legalRequirement: false, fileUrl: '#', fileSize: 950000 },
      ],
      assemblies: [
        { _id: 'm7', title: lang === 'ro' ? 'Convocator AGA 20.05.2026' : 'GMS Convocation 20.05.2026', date: '20.04.2026', legalRequirement: true, fileUrl: '#', fileSize: 500000 },
        { _id: 'm8', title: lang === 'ro' ? 'Hotărâri AGA Aprilie 2026' : 'GMS Decisions April 2026', date: '15.04.2026', legalRequirement: true, fileUrl: '#', fileSize: 750000 },
      ],
      calendar: [
        { _id: 'm9', title: lang === 'ro' ? 'Calendar Evenimente Corporative 2026' : 'Corporate Events Calendar 2026', date: '01.01.2026', legalRequirement: true, fileUrl: '#', fileSize: 300000 },
      ]
    };
    documents = mockDocs[category] || [];
  }

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-steel-dark pb-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${lang}/investors/${cat.id}`}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              category === cat.id
                ? 'bg-navy text-white shadow-lg shadow-navy/20'
                : 'bg-white text-navy/60 hover:bg-steel hover:text-navy'
            }`}
          >
            {lang === 'ro' ? cat.ro : cat.en}
          </Link>
        ))}
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 gap-4">
        {documents.length > 0 ? (
          documents.map((doc: InvestorDocument) => (
            <div
              key={doc._id}
              className="group bg-white p-6 rounded-2xl border border-steel-dark flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:border-orange/30 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-navy/5 rounded-xl flex items-center justify-center text-navy shrink-0 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                  <FileText size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl text-navy">{doc.title}</h3>
                    {doc.legalRequirement && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange text-white text-[10px] font-black uppercase tracking-wider">
                        <AlertCircle size={10} />
                        Mandatory
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-navy/60 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {doc.date}
                    </span>
                    <span>•</span>
                    <span>PDF • {formatBytes(doc.fileSize)}</span>
                  </div>
                </div>
              </div>

              <a 
                href={doc.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <Button variant="outline" className="w-full gap-2 group-hover:bg-navy group-hover:text-white group-hover:border-navy">
                  <Download size={18} />
                  {lang === 'ro' ? 'Descarcă' : 'Download'}
                </Button>
              </a>
            </div>
          ))
        ) : (
          <div className="py-24 text-center bg-white/50 border border-dashed border-steel-dark rounded-3xl">
            <p className="text-navy/40 font-medium">
              {lang === 'ro' ? 'Nu există documente în această categorie.' : 'No documents found in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
