'use client';

import { motion } from 'framer-motion';

export default function CodeDroppingAnimation() {
  const codeLines = [
    'const portfolio = {',
    '  name: "Adriel",',
    '  role: "Software Engineer",',
    '  skills: ["React", "Next.js", "Python"]',
    '};'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeLines.map((line, index) => (
        <motion.div
          key={index}
          className="absolute text-gray-200/20 font-mono text-xs md:text-sm"
          initial={{ 
            y: -100,
            opacity: 0,
            x: `${10 + index * 15}%`
          }}
          animate={{ 
            y: ['100vh', '-100px'],
            opacity: [0, 0.2, 0.2, 0]
          }}
          transition={{
            duration: 8 + index * 0.5,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}






