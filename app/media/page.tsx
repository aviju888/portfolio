import Section from '../components/Section';

export default function MediaPage() {
  return (
    <Section 
      title="Media" 
      description=""
    >
      {/* Work in Progress State */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          {/* Loading Circle Animation */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mb-6"></div>
          
          {/* Pulsing Dots */}
          <div className="flex space-x-2 justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Work in Progress</h3>
          <p className="text-gray-600 max-w-md">
            Currently curating my creative work. Check back soon!
          </p>
        </div>
      </div>
    </Section>
  );
}
