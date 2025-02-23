'use client';

import React from 'react';
import { useDomain } from '../layout/DomainProvider';

interface ProjectFeature {
  label: string;
  items?: string[];
  value?: string;
}

interface Project {
  title: string;
  description: string;
  features?: ProjectFeature[];
  tools?: string[];
  technologies?: string[];
  year: string;
  role?: string;
}

interface ProjectCategory {
  title: string;
  projects: Project[];
}

interface ProjectsSectionProps {
  categories: ProjectCategory[];
}

export const ProjectsSection = ({ categories }: ProjectsSectionProps) => {
  const { activeDomain } = useDomain();

  const getGradientByDomain = () => {
    switch (activeDomain) {
      case 'creative':
        return 'from-pink-500 to-purple-500';
      case 'software':
        return 'from-blue-500 to-cyan-500';
      case 'ui-ux':
        return 'from-orange-500 to-yellow-500';
      default:
        return 'from-white/20 to-white/10';
    }
  };

  return (
    <section className="container mx-auto px-6 py-24">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-16 last:mb-0">
          <h2 className="text-3xl font-medium mb-8">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.projects.map((project, projectIndex) => (
              <div
                key={projectIndex}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className={`text-xl font-medium mb-2 bg-gradient-to-r ${getGradientByDomain()} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                
                {project.role && (
                  <div className="mb-4">
                    <span className="text-white/50">Role: </span>
                    <span className="text-white/90">{project.role}</span>
                  </div>
                )}

                {project.features && project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="mb-4">
                    <span className="text-white/50">{feature.label}: </span>
                    {feature.items ? (
                      <ul className="list-disc list-inside text-white/90">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="ml-4">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-white/90">{feature.value}</span>
                    )}
                  </div>
                ))}

                {(project.tools || project.technologies) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(project.tools || project.technologies)?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-white/5 rounded-full text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 text-sm text-white/50">{project.year}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}; 