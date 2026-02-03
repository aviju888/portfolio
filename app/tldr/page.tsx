'use client';

import { tldr, getProjectBySlug, getCurrentExperiences, getRecentExperiences, formatDateRange, profile } from '@/lib/data';
import Section from '../components/Section';
import Link from 'next/link';
import FadeIn from '../components/FadeIn';

export default function TldrPage() {
  const currentExperiences = getCurrentExperiences();
  const recentExperiences = getRecentExperiences(2);
  const displayExperiences = [...currentExperiences, ...recentExperiences].slice(0, 3);

  return (
    <FadeIn>
      <Section 
      title="TLDR" 
      description="A quick summary if you're in a time crunch"
    >
      {/* View Resume Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/adriel-vijuan-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View Resume PDF →
        </a>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Now Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
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
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
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
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Current & Recent Work
            </h3>
            <ul className="space-y-3">
              {displayExperiences.map((experience, index) => (
                <li key={`${experience.company}-${experience.start}`} className="flex items-start">
                  <span className="text-gray-400 mr-3 flex-shrink-0">•</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-1">
                      <span className="font-medium text-gray-900">{experience.role}</span>
                      <span className="hidden md:inline text-gray-400">@</span>
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
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
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

            </Section>
    </FadeIn>
  );
}
