import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bb: {
          base:    '#08090E',
          deep:    '#0D0F1A',
          surface: '#111827',
          card:    '#13151F',
          border:  'rgba(255,255,255,0.07)',
        },
        volt:  '#6EE7B7',
        blaze: '#F59E0B',
        bolt:  '#3B82F6',
        danger:'#EF4444',
        win:   '#10B981',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"DM Sans"',       'sans-serif'],
        mono:    ['"JetBrains Mono"','monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(0.88)' },
          '60%':  { transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center'  },
        },
        timerWarn: {
          '0%,100%': { filter: 'drop-shadow(0 0 6px #EF4444)' },
          '50%':     { filter: 'drop-shadow(0 0 18px #EF4444)' },
        },
        revealBar: {
          '0%':   { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-30px) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'translateY(380px) rotate(900deg)', opacity: '0' },
        },
        floatBrain: {
          '0%,100%': { transform: 'translateY(0px)'   },
          '50%':     { transform: 'translateY(-8px)'  },
        },
        scoreRing: {
          '0%':   { strokeDashoffset: '408' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
        bgMove: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '24px 24px' }
        },
        floatOrb1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.04' },
          '50%': { transform: 'translate(40px, -50px) scale(1.1)', opacity: '0.07' },
        },
        floatOrb2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.03' },
          '50%': { transform: 'translate(-30px, 40px) scale(0.95)', opacity: '0.06' },
        },
        floatOrb3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.02' },
          '50%': { transform: 'translate(20px, 30px) scale(1.05)', opacity: '0.05' },
        },
      },
      animation: {
        fadeUp:     'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        popIn:      'popIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer:    'shimmer 2.5s linear infinite',
        timerWarn:  'timerWarn 0.7s ease-in-out infinite',
        revealBar:  'revealBar 0.3s ease-out forwards',
        confetti:   'confettiFall var(--duration,2s) ease-in forwards',
        floatBrain: 'floatBrain 3s ease-in-out infinite',
        scoreRing:  'scoreRing 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        bgMove:     'bgMove 20s linear infinite',
        floatOrb1:  'floatOrb1 15s ease-in-out infinite',
        floatOrb2:  'floatOrb2 20s ease-in-out infinite',
        floatOrb3:  'floatOrb3 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
