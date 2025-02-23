'use client';

import { useState, useEffect } from 'react';
import { SoftwareHero } from '../components/domain/SoftwareHero';
import { ProjectCard } from '../components/ui/ProjectCard';

interface Project {
  title: string;
  description: string;
  tools: string[];
  features: string[];
  year: string;
  thumbnail: string;
  link?: string;
}

const projects = {
  'ai-ml': [
    {
      title: "Pacman AI Agent",
      description: "Built AI algorithms for Pacman simulation with strategic decision-making",
      tools: ["Python", "NumPy", "Matplotlib"],
      features: [
        "Search strategies (DFS, BFS, A* Search)",
        "Minimax and Expectimax algorithms",
        "Q-Learning and Value Iteration",
        "Adaptive reward functions"
      ],
      year: "April 2023",
      thumbnail: "/images/software/pacman-ai.jpg"
    },
    {
      title: "TERF Toxic Speech Detection",
      description: "ML model to detect and classify toxic speech in online forums",
      tools: ["Python", "NLTK", "spaCy", "scikit-learn", "TensorFlow"],
      features: [
        "Data collection and preprocessing",
        "Feature extraction (BoW, TF-IDF)",
        "Multiple classifier implementations",
        "Real-time detection prototype"
      ],
      year: "Fall 2023",
      thumbnail: "/images/software/nlp-model.jpg"
    }
  ],
  'computer-vision': [
    {
      title: "Colorizing Historical Imagery",
      description: "Automated system for aligning and colorizing Prokudin-Gorskii collection",
      tools: ["Python", "NumPy", "SciPy", "scikit-learn", "Matplotlib"],
      features: [
        "L2 norm alignment",
        "Multi-scale pyramid alignment",
        "Automated contrast optimization"
      ],
      year: "September 2024",
      thumbnail: "/images/software/colorize.jpg"
    },
    {
      title: "Diffusion Models",
      description: "Implementation of custom diffusion sampling loops",
      tools: ["Python", "PyTorch", "Hugging Face"],
      features: [
        "Inpainting capabilities",
        "Text-conditional image translation",
        "Classifier-free guidance"
      ],
      year: "November 2024",
      thumbnail: "/images/software/diffusion.jpg"
    }
  ],
  'web-dev': [
    {
      title: "KOSMOS Website",
      description: "Contributed to the development of KOSMOS's website using modern web technologies",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      features: [
        "Modern UI/UX implementation",
        "Responsive design",
        "Performance optimization",
        "Content management"
      ],
      year: "November 2024-Present",
      thumbnail: "/images/software/kosmos-web.jpg"
    },
    {
      title: "PASAE Website",
      description: "Led the redesign and development of the PASAE organization website",
      tools: ["React.js", "HTML", "CSS", "JavaScript"],
      features: [
        "Complete website overhaul",
        "Mobile responsiveness",
        "User experience improvements",
        "Content management system"
      ],
      year: "2023-2024",
      thumbnail: "/images/software/pasae-web.jpg"
    }
  ],
  'systems': [
    {
      title: "61CPU Project",
      description: "5-stage pipelined RISC-V CPU implementation",
      tools: ["Logisim", "Assembly", "Git"],
      features: [
        "Complete datapath implementation",
        "Hazard detection and forwarding",
        "Pipeline optimization"
      ],
      year: "Spring 2023",
      thumbnail: "/images/software/cpu.jpg"
    }
  ]
};

export default function SoftwarePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    // Observe all section elements
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SoftwareHero />
      
      {/* Category Navigation - Sticky */}
      <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 py-4 overflow-x-auto no-scrollbar">
            <a
              href="#ai-ml"
              className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                ${activeSection === 'ai-ml' 
                  ? 'text-blue-400 scale-105' 
                  : 'text-white/60 hover:text-white/80'}`}
            >
              <span className="text-lg font-mono">&lt;/&gt;</span>
              AI/ML
              <span className="text-sm text-white/40">({projects['ai-ml'].length})</span>
            </a>
            <a
              href="#computer-vision"
              className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                ${activeSection === 'computer-vision' 
                  ? 'text-blue-400 scale-105' 
                  : 'text-white/60 hover:text-white/80'}`}
            >
              <span className="text-lg font-mono">◎</span>
              Computer Vision
              <span className="text-sm text-white/40">({projects['computer-vision'].length})</span>
            </a>
            <a
              href="#web-dev"
              className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                ${activeSection === 'web-dev' 
                  ? 'text-blue-400 scale-105' 
                  : 'text-white/60 hover:text-white/80'}`}
            >
              <span className="text-lg font-mono">🌐</span>
              Web Development
              <span className="text-sm text-white/40">({projects['web-dev'].length})</span>
            </a>
            <a
              href="#systems"
              className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                ${activeSection === 'systems' 
                  ? 'text-blue-400 scale-105' 
                  : 'text-white/60 hover:text-white/80'}`}
            >
              <span className="text-lg font-mono">⚡</span>
              Systems & Architecture
              <span className="text-sm text-white/40">({projects['systems'].length})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      {Object.entries(projects).map(([category, items]) => (
        <section 
          key={category}
          id={category}
          className="py-16 first:pt-8"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  tools={project.tools}
                  thumbnail={project.thumbnail}
                  link={project.link}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-[#111] max-w-4xl w-full rounded-xl p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  View Project ↗
                </a>
              )}
            </div>
            
            <p className="text-white/80 text-lg mb-8">{selectedProject.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Features</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400/80
                        border border-blue-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="text-white/40">{selectedProject.year}</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 