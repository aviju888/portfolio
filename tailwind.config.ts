import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.05' }], // 80px
        'display-sm': ['3.75rem', { lineHeight: '1.05' }], // 60px
        'h1': ['3.25rem', { lineHeight: '1.15' }], // 52px
        'h1-sm': ['2.75rem', { lineHeight: '1.18' }], // 44px
        'h2': ['2.25rem', { lineHeight: '1.25' }], // 36px
        'h3': ['1.375rem', { lineHeight: '1.4' }], // 22px
        'body': ['1.125rem', { lineHeight: '1.65' }], // 18px
        'body-sm': ['1rem', { lineHeight: '1.6' }], // 16px
        'small': ['0.875rem', { lineHeight: '1.5' }], // 14px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
      },
      colors: {
        accent: {
          DEFAULT: '#ffffff', // white
          hover: '#e5e5e5', // white/90
        },
        surface: {
          base: '#111827', // gray-900
          raised: '#1f2937', // gray-800
          overlay: 'rgba(31, 41, 55, 0.5)', // gray-800/50
        },
        text: {
          primary: 'white',
          secondary: '#e5e7eb', // gray-200
          muted: '#9ca3af', // gray-400
        },
        borders: {
          default: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.14)',
        },
        decor: {
          grid_glow: 'bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),rgba(59,130,246,0.06)_45%,transparent_60%)]',
          panel_tint: 'bg-white/[0.02]',
        }
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.18)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.25)',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        tightest: '-0.02em',
        tighter: '-0.01em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh-1': 'radial-gradient(at 40% 20%, rgba(96,165,250,0.15) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(147,51,234,0.1) 0, transparent 50%)',
        'gradient-mesh-2': 'radial-gradient(at 0% 50%, rgba(59,130,246,0.1) 0, transparent 50%), radial-gradient(at 100% 50%, rgba(96,165,250,0.08) 0, transparent 50%)',
        'gradient-mesh-3': 'radial-gradient(at 20% 80%, rgba(59,130,246,0.06) 0, transparent 40%), radial-gradient(at 60% 20%, rgba(96,165,250,0.08) 0, transparent 50%)',
      }
    },
  },
  plugins: [],
}
export default config
