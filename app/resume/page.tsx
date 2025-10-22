import Section from '../components/Section';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <Section 
      title="Resume" 
      description="Professional experience and skills"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Resume Coming Soon
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            I'm currently updating my resume with my latest projects and experience. 
            In the meantime, you can explore my work through the other sections of this site.
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              What you can find here
            </h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Detailed project portfolio in the Code section</li>
              <li>• Photography work in the Photos section</li>
              <li>• Creative projects in the Media section</li>
              <li>• Quick overview in the TLDR section</li>
            </ul>
          </div>

          {/* Contact for Resume */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Need a PDF resume?
            </h3>
            <p className="text-gray-400 mb-4">
              If you need a traditional resume format, please reach out and I'll send you the latest version.
            </p>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Request Resume
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">200+</div>
                <div className="text-sm text-gray-400">People Led</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
