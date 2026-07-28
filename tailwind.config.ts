import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      colors: {
        // shadcn/ui semantic tokens — mapped to CSS vars
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Cyber Learn brand palette
        cyber: {
          blue: {
            DEFAULT: '#00D9FF',
            50:  '#E6FAFF',
            100: '#CCF5FF',
            200: '#99EBFF',
            300: '#66E2FF',
            400: '#33D8FF',
            500: '#00D9FF',
            600: '#00ADCC',
            700: '#008299',
            800: '#005766',
            900: '#002B33',
          },
          green: {
            DEFAULT: '#00FF87',
            50:  '#E6FFF1',
            100: '#CCFFE4',
            200: '#99FFC9',
            300: '#66FFAD',
            400: '#33FF96',
            500: '#00FF87',
            600: '#00CC6C',
            700: '#009951',
            800: '#006636',
            900: '#00331B',
          },
          purple: {
            DEFAULT: '#7B5EA7',
            50:  '#F0ECF6',
            100: '#E2D9EE',
            200: '#C5B3DC',
            300: '#A88DCB',
            400: '#8B67B9',
            500: '#7B5EA7',
            600: '#624B86',
            700: '#4A3864',
            800: '#312543',
            900: '#191221',
          },
          red: {
            DEFAULT: '#FF4757',
            50:  '#FFE9EB',
            100: '#FFD3D7',
            200: '#FFA7AF',
            300: '#FF7B87',
            400: '#FF4F5F',
            500: '#FF4757',
            600: '#CC3946',
            700: '#992B34',
            800: '#661C23',
            900: '#330E11',
          },
          orange: {
            DEFAULT: '#FF6B35',
            50:  '#FFEDE6',
            100: '#FFDBCC',
            200: '#FFB799',
            300: '#FF9366',
            400: '#FF6F33',
            500: '#FF6B35',
            600: '#CC562A',
            700: '#994020',
            800: '#662B15',
            900: '#33150B',
          },
        },

        // Background scale
        base: {
          950: '#0A0B0F',
          900: '#111318',
          800: '#1A1D26',
          700: '#252836',
          600: '#2F3347',
          500: '#3A3F57',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'cyber-sm':  '0 0 8px 0 rgba(0, 217, 255, 0.15)',
        'cyber-md':  '0 0 20px 0 rgba(0, 217, 255, 0.20)',
        'cyber-lg':  '0 0 40px 0 rgba(0, 217, 255, 0.25)',
        'cyber-xl':  '0 0 80px 0 rgba(0, 217, 255, 0.30)',
        'green-sm':  '0 0 8px 0 rgba(0, 255, 135, 0.15)',
        'green-md':  '0 0 20px 0 rgba(0, 255, 135, 0.25)',
        'purple-sm': '0 0 8px 0 rgba(123, 94, 167, 0.20)',
        'card-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'card':      '0 4px 16px 0 rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-cyber':   'linear-gradient(135deg, #00D9FF 0%, #7B5EA7 100%)',
        'gradient-green':   'linear-gradient(135deg, #00FF87 0%, #00D9FF 100%)',
        'gradient-dark':    'linear-gradient(135deg, #1A1D26 0%, #111318 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(26,29,38,0.8) 0%, rgba(17,19,24,0.8) 100%)',
        'gradient-radial':  'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'noise':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':        'fadeIn 0.3s ease-out',
        'fade-up':        'fadeUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left':  'slideInLeft 0.3s ease-out',
        'pulse-cyber':    'pulseCyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow':           'glow 2s ease-in-out infinite alternate',
        'shimmer':        'shimmer 2s linear infinite',
        'float':          'float 3s ease-in-out infinite',
        'spin-slow':      'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseCyber: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 8px 0 rgba(0, 217, 255, 0.3)' },
          '100%': { boxShadow: '0 0 24px 4px rgba(0, 217, 255, 0.6)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
