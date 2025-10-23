import { experiences, projects } from '@/lib/data';
import { formatDateRange } from '@/lib/data';
import Section from '../components/Section';
import Tag from '../components/Tag';

export default function ResumePage() {
  return (
    <Section 
      title="Resume" 
      description="Software Engineer & Creative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Download button */}
        <div className="flex justify-end mb-8">
          <a 
            href="/resume.pdf" 
            download
            className="btn-secondary"
          >
            Download PDF →
          </a>
          {/* TODO: Add resume.pdf file to public directory for production */}
        </div>
        
        {/* Experience section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={`${exp.company}-${exp.start}`} className="relative pl-6 border-l-2 border-gray-300">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-4 border-white" />
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{formatDateRange(exp.start, exp.end)}</p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{exp.summary}</p>
                
                {exp.highlights.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-gray-600 mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.slice(0, 5).map((tech) => (
                    <Tag key={tech} className="text-xs">{tech}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Projects section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Featured Projects
          </h2>
          <div className="space-y-6">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.slug} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.role}</p>
                  </div>
                  <span className="text-xs text-gray-500">{project.year}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{project.summary}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 6).map((tag) => (
                    <Tag key={tag} className="text-xs">{tag}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Backend & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'Git'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">ML & CV</h4>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'OpenCV', 'NumPy', 'scikit-learn', 'Jupyter'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}