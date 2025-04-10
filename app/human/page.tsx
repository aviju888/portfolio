'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data for journal entries
const journalEntries = [
  { id: 'first-entry', title: 'My First Thoughts', date: '2024-07-26' },
  { id: 'second-entry', title: 'A Day in the Life', date: '2024-07-27' },
  { id: 'reflections', title: 'Reflections on Learning', date: '2024-07-28' },
];

export default function HumanPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black px-4 py-16 text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider uppercase mb-12">
        Journal
      </h1>

      <div className="w-full max-w-2xl space-y-6">
        {journalEntries.map((entry) => (
          <Link key={entry.id} href={`/human/${entry.id}`} className="block group p-6 border border-white/20 rounded-lg hover:bg-white/5 transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-normal mb-2 group-hover:text-sky-300 transition-colors duration-200">
              {entry.title}
            </h2>
            <p className="text-sm text-white/60">{entry.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 