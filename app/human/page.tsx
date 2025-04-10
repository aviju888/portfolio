'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Import the journal entry data
import journalEntries from './entries.json';

// Define the type for a journal entry based on the JSON structure
interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string; // Keep content here, though not used on index page
}

export default function HumanPage() {
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsPageVisible(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center bg-black px-4 py-32 text-white transition-opacity duration-700 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider uppercase mb-20">
        Journal
      </h1>

      <div className="w-full max-w-xl space-y-12 text-center">
        {(journalEntries as JournalEntry[]).map((entry) => (
          <Link 
            key={entry.id} 
            href={`/human/${entry.id}`} 
            className="block group"
          >
            <h2 className="text-xl sm:text-2xl font-light mb-1 transition-colors duration-200 group-hover:underline">
              {entry.title}
            </h2>
            <p className="text-sm text-white/50">{entry.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 