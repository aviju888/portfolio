'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber';

// Philosophical content from Markdown already available to use
const philosophyContent = [
  {
    id: 'perpetual-learner',
    title: 'The Perpetual Learner',
    content: `
      I believe that constant learning is the foundation of a fulfilling life. Each day presents countless opportunities to expand our understanding of the world. The moment we stop being curious is the moment we stop truly living.

      Learning isn't just about acquiring knowledge—it's about continuous transformation. When I approach any challenge, I start by asking: &quot;What can this teach me?&quot; This mindset has transformed seemingly mundane experiences into profound lessons.

      My approach to learning blends systematic study with intuitive exploration—structured enough to make progress, flexible enough to follow curiosity. I've found that the most valuable insights often emerge at the intersection of disciplines, where different mental models collide and create new understanding.
    `,
    quote: "We don't stop playing because we grow old; we grow old because we stop playing.",
    author: "George Bernard Shaw"
  },
  {
    id: 'duality',
    title: 'The Beauty of Duality',
    content: `
      Throughout my journey, I've been fascinated by how seemingly opposite forces often complement and enhance each other. Logic and creativity. Structure and chaos. Technology and humanity.

      Rather than seeing these as contradictions, I view them as essential polarities that create a dynamic balance. My engineering mind delights in logical problem-solving, while my artistic soul craves creative expression through photography and dance.

      This duality extends to how I approach problems—both methodically breaking them down into components and intuitively feeling my way through possibilities. Some of my best work emerges when I allow these approaches to dance together.
    `,
    quote: "Life is a balance of holding on and letting go.",
    author: "Rumi"
  },
  {
    id: 'human-connection',
    title: 'Human Connection',
    content: `
      In an increasingly digital world, authentic human connection remains irreplaceable. Technology should enhance our humanity, not diminish it.

      Through leading dance teams and collaborative projects, I've experienced how shared purpose creates bonds that transcend background and circumstance. Those connections have taught me more than any textbook could.

      I believe that empathy—truly seeking to understand others' perspectives—is both a moral imperative and a practical advantage. The best systems, whether social or technological, are built with deep empathy for those they serve.
    `,
    quote: "The most basic and powerful way to connect to another person is to listen.",
    author: "Rachel Naomi Remen"
  },
  {
    id: 'elegant-simplicity',
    title: 'Elegant Simplicity',
    content: `
      I'm drawn to the philosophy that the most elegant solutions aren't the most complex, but rather those that achieve maximum impact with minimum complexity.
      
      This pursuit of simplicity isn't about oversimplification—it's about finding the elegant core of an idea, solution, or expression. The Japanese concept of &quot;shibui&quot; captures this well: simple, subtle, and unobtrusive beauty.
    `,
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    id: 'present-awareness',
    title: 'Present Awareness',
    content: `
      Photography has taught me the value of being fully present. When I'm behind the camera, I'm completely immersed in the moment—aware of light, composition, emotion, and timing.

      I've come to apply this heightened awareness to other areas of life. Whether writing code, engaging in conversation, or solving problems, there's a quality of attention that transforms ordinary experience into something extraordinary.

      This isn't about constant focus—it's about cultivating the ability to be fully present when it matters, allowing for both intense concentration and creative wandering of the mind.
    `,
    quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
    author: "Marcel Proust"
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

// Three.js Animations Components
const FloatingParticles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 150;
  const particleSpeed = 0.01;
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Set initial positions
    const dummy = new THREE.Object3D();
    const particles = meshRef.current;
    
    // Create particles at random positions
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 15;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    }
    
    particles.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state: RootState) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Slowly rotate the entire particle system
      meshRef.current.rotation.y = time * particleSpeed;
      meshRef.current.rotation.x = Math.sin(time * particleSpeed) * 0.1;
    }
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <circleGeometry args={[0.05, 8]} />
      <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
    </instancedMesh>
  );
};

export default function HumanPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFragment, setHoveredFragment] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('intro');
  const sectionRefs = {
    intro: useRef<HTMLElement>(null),
    philosophy: useRef<HTMLElement>(null),
    fragments: useRef<HTMLElement>(null)
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Add state for controlling hero animation
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false);

  // Scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  }, []);

  // Enhanced section detection using scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      
      // Get all sections and their positions
      const sections = ['intro', 'philosophy', 'fragments'];
      
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants for the hero section
  const titleVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.3
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.0,
        ease: "easeOut",
        delay: 1.0
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative font-light tracking-wider">
      {/* Three.js Background Animation */}
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.1} />
          <FloatingParticles />
        </Canvas>
      </div>
      
      {/* Hero Section - Updated with more dynamic animations */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10"
      >
        <AnimatePresence>
          <div className="container mx-auto px-6 z-10 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              onAnimationComplete={() => setHeroAnimationComplete(true)}
            >
              <motion.h1 
                className="text-6xl md:text-[10rem] font-extralight mb-4 text-white/80 typewriter-text"
                variants={titleVariants}
              >
                HUMAN
              </motion.h1>
              
              <motion.p 
                className="text-sm md:text-base text-white/60 max-w-xl mx-auto font-extralight tracking-widest"
                variants={subtitleVariants}
              >
                THOUGHTS · PHILOSOPHY · REFLECTIONS
              </motion.p>
            </motion.div>
          </div>
        </AnimatePresence>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: heroAnimationComplete ? 0.6 : 0,
            y: heroAnimationComplete ? 0 : 10
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div 
            className="text-xs text-white/60 font-light cursor-pointer tracking-[0.2em]"
            onClick={() => scrollToSection('intro')}
          >
            SCROLL DOWN
          </div>
        </motion.div>
      </motion.div>

      {/* Section Navigation */}
      <div className="sticky top-[72px] z-40 bg-black border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-white/70 hover:text-white text-sm tracking-wider transition-colors">
              ← BACK HOME
            </Link>
            
            <div className="hidden md:flex items-center justify-center space-x-12">
              {['intro', 'philosophy', 'fragments'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-xs tracking-wider transition-colors ${
                    activeSection === section ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {section.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="content-section">
        {/* Introduction */}
        <section id="intro" ref={sectionRefs.intro} className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-extralight mb-6 text-white/80 tracking-widest">INTRODUCTION</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Welcome to my space for reflection and thought. This page is a digital canvas for the ideas and perspectives that shape my understanding of the world, technology, and humanity itself. Here, I explore the intersections of logic and creativity, technology and consciousness, being and becoming.
              </p>
              <p className="text-white/70 leading-relaxed">
                These writings are not definitive statements but ongoing explorations—thoughts in progress that evolve as I do. They represent my attempt to articulate the inarticulable, to give form to the formless stream of consciousness that constitutes our inner experience.
              </p>
              
              {/* Notebook image */}
              <div className="mt-16 mx-auto">
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
            </div>
          </div>
        </section>

        {/* Philosophy Content */}
        <section id="philosophy" ref={sectionRefs.philosophy} className="py-32 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-extralight mb-12 text-white/80 tracking-widest">PHILOSOPHY</h2>
              
              {philosophyContent.map((philosophy, index) => (
                <div key={philosophy.id} className="mb-24 last:mb-0">
                  <h3 className="text-xl font-extralight tracking-wider text-white/80 mb-8 border-b border-white/10 pb-2">
                    {philosophy.title}
                  </h3>
                  
                  <div className="text-sm text-white/70 font-light leading-relaxed space-y-4">
                    {philosophy.content.trim().split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph.trim()}</p>
                    ))}
                    
                    <div className="mt-8 pl-4 border-l border-white/20">
                      <p className="text-white/50 italic mb-1">&quot;{philosophy.quote}&quot;</p>
                      <p className="text-white/40 text-xs">— {philosophy.author}</p>
                    </div>
                  </div>
                  
                  {/* Add an image after some sections */}
                  {index === 1 && (
                    <div className="mt-16 mx-auto relative">
                      <div className="bg-white/95 p-2 shadow-lg rotate-1 max-w-sm mx-auto">
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
                  )}
                  
                  {index === 3 && (
                    <div className="mt-16 mx-auto">
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
          
        {/* Fragments section */}
        <section id="fragments" ref={sectionRefs.fragments} className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
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
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-black border-t border-white/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 font-light tracking-widest">
            &quot;Everything that can be said can be said clearly, but not everything can be said.&quot;
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