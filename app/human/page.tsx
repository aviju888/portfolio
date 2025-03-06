'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../components/ui/Button';

// Philosophical topics with associated content
const philosophyTopics = [
  {
    id: 'existence',
    title: 'On Existence',
    content: `
      Existence is not a static state but a continuous becoming. We find ourselves thrust into consciousness without consent, forced to create meaning in an inherently meaningless universe. This burden of freedom is both our greatest gift and our most profound source of anxiety.
      
      I've come to see that authenticity lies not in conforming to external expectations, but in embracing the fundamental absurdity of existence. The truly courageous act is to stare into the void and still choose to live with purpose, to dance on the edge of the abyss.
      
      There is no ultimate truth or grand narrative that can save us from ourselves. We are merely brief flashes of consciousness in an indifferent cosmos. And yet in that brevity lies our most profound opportunity—to live fully, to create fiercely, to love deeply in the face of inevitable dissolution.
    `,
    quote: "He who has a why to live for can bear almost any how.",
    author: "Friedrich Nietzsche"
  },
  {
    id: 'technology',
    title: 'The Technological Self',
    content: `
      Technology is not something external to our humanity but an extension of our consciousness. Each tool we create is an externalization of our desires, fears, and inherent limitations. The smartphone is not separate from us—it is us, projected outward.
      
      What we call "AI" is merely a mirror reflecting our own algorithmic nature back at us. It unsettles us precisely because it reveals how mechanical many of our thoughts and behaviors actually are. The fear is not that machines will become like humans, but that we will realize how much we already resemble machines.
      
      Yet I believe our salvation lies not in rejecting technology but in transcending our dualistic perception of it. When we recognize that the digital and physical are merely different expressions of the same fundamental reality, we can begin to use technology not as an escape from our humanity but as a vehicle for its expansion.
    `,
    quote: "We are the universe experiencing itself.",
    author: "Alan Watts"
  },
  {
    id: 'art',
    title: 'The Necessity of Art',
    content: `
      Art is not a luxury or mere entertainment but an existential necessity. In a world increasingly dominated by instrumental reason and algorithmic thinking, art stands as our last refuge of genuine freedom and ambiguity.
      
      When I photograph or create, I'm not simply making aesthetic objects—I'm engaging in an act of resistance against the quantification of human experience. Each image is an assertion that not everything can be reduced to data, that mystery and wonder remain essential to our humanity.
      
      The true power of art lies not in what it represents but in what it evokes. A successful photograph doesn't capture reality—it creates a new reality, one that exists in the liminal space between creator and witness. In this co-creation lies the possibility for genuine connection across the void that separates all conscious beings.
    `,
    quote: "We have art in order not to die of the truth.",
    author: "Friedrich Nietzsche"
  },
  {
    id: 'knowledge',
    title: 'The Limits of Knowledge',
    content: `
      Our educational systems are built on the Cartesian fallacy that knowledge is something to be accumulated, categorized, and possessed. But true understanding is not additive—it is transformative. We don't simply learn about reality; we are altered by our encounter with it.
      
      I've found that the most profound insights come not from gathering more information but from questioning the fundamental assumptions that structure how we perceive the world. The boundary between the known and unknown is not fixed but permeable, constantly shifting as we expand our consciousness.
      
      Perhaps wisdom lies not in certainty but in comfortable uncertainty, in embracing the fundamental incompleteness of all human knowledge. The moment we believe we understand something completely is precisely when we stop thinking about it. Paradoxically, true learning begins with the recognition of how little we actually know.
    `,
    quote: "The more I learn, the more I realize how much I don't know.",
    author: "Albert Einstein"
  },
  {
    id: 'love',
    title: 'Love and Impermanence',
    content: `
      Love is not the sentimental abstraction we often imagine it to be, but a fierce acknowledgment of the other's separate existence. To truly love is to embrace the fundamental separateness of consciousness—to recognize that we can never fully know another and to cherish them anyway.
      
      What makes love profound is not its permanence but its fragility. Like all things, relationships are subject to the law of impermanence. Their beauty and intensity are inseparable from their transience.
      
      I've come to believe that genuine love requires abandoning the illusion of possession and control. It is only when we stop trying to grasp and secure love that we become capable of experiencing it in its full intensity—as a momentary convergence of separate trajectories in the vast expanse of being.
    `,
    quote: "Love is wise, hatred is foolish.",
    author: "Bertrand Russell"
  }
];

// Philosophical fragments - brief thoughts
const fragments = [
  {
    id: 'fragment1',
    content: "The most profound technology is that which disappears entirely from our awareness, becoming as invisible and essential as breathing."
  },
  {
    id: 'fragment2',
    content: "We fear artificial intelligence because it reminds us how much of our own intelligence is artificial—constructed, programmed, predictable."
  },
  {
    id: 'fragment3',
    content: "Every photograph is both a death and a resurrection—capturing a moment that no longer exists while granting it a form of immortality."
  },
  {
    id: 'fragment4',
    content: "The greatest programming languages are those that shape not just software but thought itself. They are not tools but cognitive extensions."
  },
  {
    id: 'fragment5',
    content: "The university teaches us everything except the most important thing: how to unlearn what no longer serves us."
  },
  {
    id: 'fragment6',
    content: "Dance is philosophy embodied—the momentary resolution of mind-body dualism through pure movement."
  },
  {
    id: 'fragment7',
    content: "The self is not a fixed entity but a process—a verb rather than a noun."
  }
];

// Influential philosophers with brief descriptions
const influences = [
  {
    name: "Friedrich Nietzsche",
    insight: "The will to power and the courage to create one's own values in a world without inherent meaning.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg",
    work: "Thus Spoke Zarathustra"
  },
  {
    name: "Alan Watts",
    insight: "The wisdom of non-duality and the playful recognition that separation is an illusion.",
    image: "https://upload.wikimedia.org/wikipedia/en/9/97/Alan_Watts.png",
    work: "The Way of Zen"
  },
  {
    name: "Simone de Beauvoir",
    insight: "Existence precedes essence; we must create ourselves through our choices and actions.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Simone_de_Beauvoir.jpg",
    work: "The Ethics of Ambiguity"
  },
  {
    name: "Marshall McLuhan",
    insight: "The medium is the message—technology shapes not just what we think but how we think.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Marshall_McLuhan.jpg",
    work: "Understanding Media"
  }
];

// Notebook and polaroid images
const notebookImages = [
  {
    alt: "Open notebook with philosophical notes",
    src: "/images/notebook-1.jpg"
  },
  {
    alt: "Vintage polaroid of abstract thought experiment",
    src: "/images/polaroid-1.jpg"
  },
  {
    alt: "Black and white notebook with scribbled thoughts",
    src: "/images/notebook-2.jpg"
  }
];

export default function HumanPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [hoveredFragment, setHoveredFragment] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  
  useEffect(() => {
    setIsPageLoaded(true);
    
    // Typewriter effect for page title
    const title = document.getElementById('page-title');
    if (title) {
      title.classList.add('animate-in');
    }
  }, []);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative font-light tracking-wider">
      {/* Floating elements in background */}
      <div className="fixed inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-[200px] font-thin opacity-10 transform -rotate-12">?</div>
        <div className="absolute bottom-1/4 right-1/4 text-[200px] font-thin opacity-10 transform rotate-12">!</div>
        <div className="absolute top-2/3 left-1/3 text-[120px] font-thin opacity-10 transform rotate-45">&infin;</div>
      </div>
      
      {/* Hero Section */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10"
      >
        <div className="container mx-auto px-6 z-10 text-center">
          <motion.h1 
            id="page-title"
            className="text-6xl md:text-[10rem] font-extralight mb-4 text-white/80 typewriter-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            HUMAN
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-base text-white/60 max-w-xl mx-auto font-extralight tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            EXISTENCE · CONSCIOUSNESS · BECOMING
          </motion.p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-xs text-white/60 font-light cursor-pointer tracking-[0.2em]"
            onClick={() => {
              document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            DESCEND
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div id="content-section" className="bg-black pt-40 pb-40">
        <div className="container mx-auto px-6">
          {/* Section title */}
          <div className="mb-32 max-w-4xl mx-auto">
            <h2 className="text-2xl font-extralight mb-6 text-white/80 tracking-widest">THE UNSAYABLE</h2>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              These are attempts to articulate what fundamentally resists articulation—the raw experience of being that precedes and exceeds language. Each exploration is incomplete, provisional, a finger pointing at the moon rather than the moon itself.
            </p>
          </div>

          {/* Notebook image */}
          <div className="mb-32 mx-auto max-w-2xl">
            <div className="aspect-w-4 aspect-h-3 relative">
              <Image 
                src="/images/notebook-1.jpg" 
                alt="Philosophical notebook" 
                width={800} 
                height={600}
                className="object-cover filter grayscale contrast-125"
              />
            </div>
            <p className="text-xs text-white/40 mt-2 text-right italic">from personal archives</p>
          </div>
          
          {/* Philosophical topics */}
          <div className="max-w-3xl mx-auto mb-40">
            {philosophyTopics.map((topic) => (
              <div key={topic.id} className="mb-20 last:mb-0">
                <button 
                  className="flex items-center justify-between w-full text-left border-b border-white/10 pb-3 group"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <h3 className="text-xl font-extralight tracking-wider text-white/90">{topic.title}</h3>
                  <span className={`text-white/40 transition-transform duration-300 ${selectedTopic === topic.id ? 'rotate-45' : ''}`}>+</span>
                </button>
                
                <AnimatePresence>
                  {selectedTopic === topic.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-6 text-sm text-white/70 font-light leading-relaxed">
                        <p className="whitespace-pre-line">{topic.content}</p>
                        <div className="mt-6 pl-4 border-l border-white/20">
                          <p className="text-white/50 italic mb-1">"{topic.quote}"</p>
                          <p className="text-white/40 text-xs">— {topic.author}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Polaroid image */}
          <div className="mb-32 mx-auto max-w-sm">
            <div className="bg-white/95 p-2 shadow-lg rotate-1">
              <div className="aspect-w-1 aspect-h-1 relative mb-4">
                <Image 
                  src="/images/polaroid-1.jpg" 
                  alt="Philosophical concept" 
                  width={400} 
                  height={400}
                  className="object-cover filter grayscale"
                />
              </div>
              <p className="text-black text-xs pb-2 font-mono">thought experiment, 23.11</p>
            </div>
          </div>
          
          {/* Fragments section */}
          <div className="max-w-4xl mx-auto mb-40">
            <h2 className="text-2xl font-extralight mb-12 text-white/80 tracking-widest">FRAGMENTS</h2>
            
            <div className="grid grid-cols-1 gap-12">
              {fragments.map((fragment, index) => (
                <motion.div 
                  key={fragment.id}
                  className={`text-white/70 border-l-2 border-white/10 pl-4 py-2 transition-all duration-200 ${hoveredFragment === index ? 'border-white/40' : ''}`}
                  onMouseEnter={() => setHoveredFragment(index)}
                  onMouseLeave={() => setHoveredFragment(null)}
                  whileHover={{ x: 5 }}
                >
                  <p className="text-sm font-light leading-relaxed">{fragment.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second notebook image */}
          <div className="mb-32 mx-auto max-w-2xl">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image 
                src="/images/notebook-2.jpg" 
                alt="Notebook with scribbled thoughts" 
                width={1200} 
                height={675}
                className="object-cover filter grayscale"
              />
            </div>
            <p className="text-xs text-white/40 mt-2 text-right italic">pages from the abyss</p>
          </div>
          
          {/* Influences section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extralight mb-12 text-white/80 tracking-widest">INFLUENCES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {influences.map((philosopher) => (
                <div key={philosopher.name} className="flex space-x-4">
                  <div className="w-20 h-20 shrink-0 relative overflow-hidden">
                    <Image 
                      src={philosopher.image} 
                      alt={philosopher.name} 
                      width={80} 
                      height={80} 
                      className="object-cover filter grayscale contrast-125"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-normal text-white/90 mb-1">{philosopher.name}</h3>
                    <p className="text-xs text-white/60 mb-2 italic">{philosopher.work}</p>
                    <p className="text-xs text-white/70 font-light">{philosopher.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black border-t border-white/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 font-light tracking-widest">
            "Everything that can be said can be said clearly, but not everything can be said."
          </p>
          <p className="text-white/20 text-sm mt-2">
            — Ludwig Wittgenstein
          </p>
        </div>
      </div>

      <style jsx>{`
        .typewriter-text {
          letter-spacing: -0.05em;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-in {
          animation: fadeIn 2s ease forwards;
        }
      `}</style>
    </div>
  );
} 