'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import journalEntries from '../entries.json';
// Removed font style import
// import '../human.css'; 
import { notFound } from 'next/navigation';

// Define the type for a journal entry again for this page
interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function JournalEntryPage() {
  const params = useParams();
  const entryId = params.id;

  // Find the entry by ID
  const entry = (journalEntries as JournalEntry[]).find(e => e.id === entryId);

  // If entry not found, render a 404 page
  if (!entry) {
    notFound();
    return null; // Return null after calling notFound
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-black px-4 py-32 text-white">
      <article className="w-full max-w-xl">
        <header className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-light mb-1">
            {entry.title}
          </h1>
          <p className="text-sm text-white/50">{entry.date}</p>
        </header>
        
        <div 
          className="prose prose-invert prose-lg prose-p:font-light prose-p:text-white/70 prose-headings:font-light leading-relaxed space-y-8"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />

        <footer className="mt-24 pt-4 border-t border-white/5">
           <Link href="/human" className="text-sm text-white/50 hover:text-white/80 transition-colors">
             ← Back
           </Link>
         </footer>
      </article>
    </div>
  );
}

// Optional: Generate static paths if you want to pre-render entries at build time
// export async function generateStaticParams() {
//   return journalEntries.map((entry) => ({
//     id: entry.id,
//   }));
// } 