'use client';

import { tldr, getProjectBySlug, getCurrentExperiences, getRecentExperiences, formatDateRange, profile } from '@/lib/data';
import Section from '../components/Section';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TldrPage() {
  const currentExperiences = getCurrentExperiences();
  const recentExperiences = getRecentExperiences(2);
  const displayExperiences = [...currentExperiences, ...recentExperiences].slice(0, 3);
  const [showPopup, setShowPopup] = useState(false);

  // Auto-dismiss popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <Section 
      title="TLDR" 
      description="A quick summary if you're in a time crunch"
    >
      {/* Download Resume Button */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => setShowPopup(true)}
          className="btn-secondary"
        >
          Download Resume PDF →
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Now Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            What I'm doing now
          </h3>
          <ul className="space-y-2">
            {tldr.now?.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Education
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-gray-400 mr-3">•</span>
              <span className="text-gray-700">
                {profile.education.degree} with {profile.education.minor} from {profile.education.school}, {profile.education.end}
              </span>
            </li>
          </ul>
        </div>

        {/* Experience Summary */}
        {displayExperiences.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Current & Recent Work
            </h3>
            <ul className="space-y-3">
              {displayExperiences.map((experience, index) => (
                <li key={`${experience.company}-${experience.start}`} className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{experience.role}</span>
                      <span className="text-gray-400">@</span>
                      <span className="text-gray-600">{experience.company}</span>
                      <span className="text-gray-500 text-sm">
                        ({formatDateRange(experience.start, experience.end)})
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{experience.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link 
                href="/experience"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                View full experience →
              </Link>
            </div>
          </div>
        )}

        {/* Featured Projects */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h3>
          <ul className="space-y-3">
            {tldr.topProjects?.map((slug, index) => {
              const project = getProjectBySlug(slug);
              return project ? (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <div className="flex-1">
                    <Link 
                      href={`/code/${project.slug}`}
                      className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                    >
                      {project.title}
                    </Link>
                    <p className="text-gray-700 text-sm mt-1">{project.summary}</p>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
          <div className="mt-4">
            <Link 
              href="/code"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
            >
              View full projects →
            </Link>
          </div>
        </div>

                {/* Contact */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Contact
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium text-gray-900">Email:</span> {tldr.contact.email}
                    </p>
                    <div className="flex space-x-4">
                      {tldr.contact.links.map((link, index) => (
                        <Link
                          key={index}
                          href={`/${link}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 capitalize"
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Non-disruptive Popup */}
              {showPopup && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-red-500 text-white rounded-xl p-4 shadow-lg max-w-xs border border-red-400">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-red-100">Sorry, working on that!</p>
                        <p className="text-xs text-red-200 mt-1">Resume PDF coming soon 🚀</p>
                      </div>
                      <button
                        onClick={() => setShowPopup(false)}
                        className="flex-shrink-0 text-red-200 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Section>
          );
        }
