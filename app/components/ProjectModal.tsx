'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const hasDemo = project.links.demo && project.links.demo.length > 0;
  const hasRepo = project.links.repo && project.links.repo.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Screenshot */}
          {project.images[0] && (
            <div className="relative aspect-video w-full">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
          )}

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {project.year} · {project.role}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* About */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {project.summary}
              </p>
              {project.description.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {project.description.slice(0, 3).map((item, index) => (
                    <li key={index} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-300">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Links */}
            {(hasDemo || hasRepo) && (
              <div className="flex gap-3">
                {hasDemo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg text-center hover:bg-gray-800 transition-colors"
                  >
                    Live Demo →
                  </a>
                )}
                {hasRepo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg text-center hover:bg-gray-50 transition-colors"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
