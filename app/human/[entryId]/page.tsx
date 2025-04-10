'use client';

import React from 'react';
import Link from 'next/link';

// This component will display a single journal entry.
// The `params` object contains the dynamic route parameters.
export default function JournalEntryPage({ params }: { params: { entryId: string } }) {
  const { entryId } = params;

  // In a real application, you would fetch the journal entry content
  // based on the entryId here. For now, we'll use placeholder content.
  const entryTitle = entryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const entryContent = `This is the content for the journal entry: ${entryTitle}. Replace this with the actual content fetched based on the ID.`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-black px-4 py-16 text-white">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <Link href="/human" className="inline-block mb-8 text-sky-400 hover:text-sky-300 transition-colors duration-200">
          &larr; Back to Journal
        </Link>

        {/* Entry Title */}
        <h1 className="text-3xl sm:text-4xl font-normal mb-6">
          {entryTitle}
        </h1>

        {/* Entry Content (Placeholder) */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80">
          <p>{entryContent}</p>
          {/* Add more content paragraphs or elements here */}
        </div>
      </div>
    </div>
  );
} 