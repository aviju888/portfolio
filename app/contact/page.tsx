'use client';

import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Section from '../components/Section';

export default function ContactPage() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID"); // TODO: Replace with actual Formspree form ID for production
  
  if (state.succeeded) {
    return (
      <Section 
        title="Thanks for reaching out!" 
        description="I'll get back to you as soon as possible."
      >
        <div className="text-center">
          <a href="/" className="btn-primary">
            Back to Home
          </a>
        </div>
      </Section>
    );
  }
  
  return (
    <Section 
      title="Get in Touch" 
      description="Have a project in mind? Let's talk about it."
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900/50
                         transition-all duration-200"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900/50
                         transition-all duration-200"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          
          {/* Message field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900/50
                         transition-all duration-200 resize-none"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={state.submitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </Section>
  );
}