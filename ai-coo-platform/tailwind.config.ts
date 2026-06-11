import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    // ─── Custom Breakpoints ───────────────────────────────────────────────────
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
      '3xl': '1600px',
    },

    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      // ─── Color System ──────────────────────────────────────────────────────
      colors: {
        // Semantic tokens (CSS vars driven – light & dark modes)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary – Violet / Purple gradient brand
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },

        // Secondary – Blue
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Accent – Emerald (success / growth)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        // Destructive – Rose
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },

        // Warning – Amber
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },

        // Info – Cyan
        info: {
          DEFAULT: '#06b6d4',
          foreground: '#ffffff',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },

        // Muted / surface tokens
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // AI-specific brand gradient stops (use in bg-gradient-*)
        'brand-violet': '#7c3aed',
        'brand-purple': '#9333ea',
        'brand-indigo': '#4f46e5',
        'brand-blue': '#2563eb',

        // Chart tokens
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        // Sidebar tokens
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        display: ['var(--font-cal-sans)', 'var(--font-inter)', ...fontFamily.sans],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      letterSpacing: {
        tightest: '-0.075em',
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'display-wide': '0.15em',
      },

      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },

      // ─── Spacing Extras ────────────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '74': '18.5rem',
        '78': '19.5rem',
        '82': '20.5rem',
        '86': '21.5rem',
        '90': '22.5rem',
        '94': '23.5rem',
        '98': '24.5rem',
        '100': '25rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '136': '34rem',
        '144': '36rem',
        '152': '38rem',
        '160': '40rem',
        '168': '42rem',
        '176': '44rem',
        '184': '46rem',
        '192': '48rem',
        '200': '50rem',
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        none: '0',
        xs: '0.125rem',
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': '1.5rem',
        '4xl': '2rem',
        full: '9999px',
      },

      // ─── Box Shadow ────────────────────────────────────────────────────────
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
        // Brand glows
        'glow-primary': '0 0 20px 4px rgba(124, 58, 237, 0.35)',
        'glow-primary-lg': '0 0 40px 8px rgba(124, 58, 237, 0.3)',
        'glow-secondary': '0 0 20px 4px rgba(37, 99, 235, 0.35)',
        'glow-accent': '0 0 20px 4px rgba(5, 150, 105, 0.35)',
        'glow-white': '0 0 20px 4px rgba(255, 255, 255, 0.1)',
        // Card elevation levels
        'card-sm': '0 2px 8px -2px rgba(0,0,0,0.12), 0 1px 3px -1px rgba(0,0,0,0.08)',
        'card': '0 4px 16px -4px rgba(0,0,0,0.14), 0 2px 6px -2px rgba(0,0,0,0.1)',
        'card-lg': '0 8px 32px -8px rgba(0,0,0,0.18), 0 4px 12px -4px rgba(0,0,0,0.12)',
        'card-xl': '0 16px 48px -12px rgba(0,0,0,0.22), 0 8px 20px -6px rgba(0,0,0,0.14)',
        // Dark mode card shadows
        'card-dark': '0 4px 16px -4px rgba(0,0,0,0.6), 0 2px 6px -2px rgba(0,0,0,0.5)',
        'card-dark-lg': '0 8px 32px -8px rgba(0,0,0,0.7), 0 4px 12px -4px rgba(0,0,0,0.6)',
      },

      // ─── Background Gradients ──────────────────────────────────────────────
      backgroundImage: {
        // Core brand gradients
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #4f46e5 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #e0e7ff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%)',
        'gradient-accent': 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',

        // Hero / marketing
        'gradient-hero': 'linear-gradient(135deg, #0f0a1e 0%, #1a0533 25%, #0d1a3d 75%, #040d1e 100%)',
        'gradient-hero-light': 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 25%, #eff6ff 75%, #f0f9ff 100%)',

        // Subtle surface gradients
        'gradient-surface': 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
        'gradient-card': 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)',

        // Mesh / noise effect via gradients
        'gradient-mesh': `
          radial-gradient(at 40% 20%, rgba(124, 58, 237, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(5, 150, 105, 0.08) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(147, 51, 234, 0.12) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(79, 70, 229, 0.1) 0px, transparent 50%)
        `,

        // Shimmer / skeleton loading
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',

        // Radial overlays
        'radial-primary': 'radial-gradient(circle at center, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
        'radial-glow': 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.3) 0%, transparent 60%)',

        // None
        'none': 'none',
      },

      // ─── Animations ────────────────────────────────────────────────────────
      keyframes: {
        // shadcn/ui built-ins
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Fade
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        // Scale
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.92)' },
        },
        'scale-in-center': {
          from: { opacity: '0', transform: 'scale(0.5)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        // Slide
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        // Bounce variations
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(-6px)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        // Pulse / glow
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(124, 58, 237, 0)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(124, 58, 237, 0.4)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // Shimmer / skeleton
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Typing cursor
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        // Spin variations
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        // Float
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        // Gradient shift (for animated gradient backgrounds)
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        // Wiggle
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        // Ping expanded
        'ping-slow': {
          '75%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        // Number counter (opacity trick for stagger)
        'count-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // AI typing dots
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      animation: {
        // shadcn/ui
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Fade
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in-down': 'fade-in-down 0.4s ease-out',
        'fade-in-left': 'fade-in-left 0.4s ease-out',
        'fade-in-right': 'fade-in-right 0.4s ease-out',
        // Slower variants
        'fade-in-slow': 'fade-in 0.6s ease-out',
        'fade-in-up-slow': 'fade-in-up 0.7s ease-out',
        // Scale
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.15s ease-in',
        'scale-in-center': 'scale-in-center 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        // Slide
        'slide-in-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-right': 'slide-in-from-right 0.3s ease-out',
        // Bounce
        'bounce-soft': 'bounce-soft 2s infinite',
        // Pulse
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        // Shimmer
        'shimmer': 'shimmer 2s linear infinite',
        // Blink
        'blink': 'blink 1s step-start infinite',
        // Spin
        'spin-slow': 'spin-slow 6s linear infinite',
        'spin-reverse': 'spin-reverse 4s linear infinite',
        // Float
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        // Gradient
        'gradient-x': 'gradient-x 4s ease infinite',
        'gradient-y': 'gradient-y 4s ease infinite',
        'gradient-xy': 'gradient-xy 6s ease infinite',
        // Wiggle
        'wiggle': 'wiggle 0.5s ease-in-out',
        // Ping
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        // AI specific
        'dot-bounce-1': 'dot-bounce 1.4s ease-in-out 0s infinite',
        'dot-bounce-2': 'dot-bounce 1.4s ease-in-out 0.2s infinite',
        'dot-bounce-3': 'dot-bounce 1.4s ease-in-out 0.4s infinite',
        // Enter/exit
        'enter': 'fade-in-up 0.4s ease-out, scale-in 0.3s ease-out',
        'exit': 'fade-out 0.2s ease-in, scale-out 0.15s ease-in',
      },

      // ─── Transitions ───────────────────────────────────────────────────────
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },

      // ─── Z-Index ───────────────────────────────────────────────────────────
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'sticky': '1100',
        'fixed': '1200',
        'modal-backdrop': '1300',
        'modal': '1400',
        'popover': '1500',
        'tooltip': '1600',
        'toast': '1700',
        'max': '9999',
      },

      // ─── Opacity ───────────────────────────────────────────────────────────
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },

      // ─── Min/Max Sizes ─────────────────────────────────────────────────────
      minWidth: {
        '0': '0',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        full: '100%',
        screen: '100vw',
      },

      maxWidth: {
        '0': '0',
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        prose: '65ch',
        full: '100%',
        screen: '100vw',
      },

      // ─── Blur ──────────────────────────────────────────────────────────────
      blur: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
        '4xl': '96px',
      },

      // ─── Backdrop Blur ─────────────────────────────────────────────────────
      backdropBlur: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        glass: '20px',
      },

      // ─── Aspect Ratios ─────────────────────────────────────────────────────
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        portrait: '3 / 4',
        wide: '21 / 9',
        golden: '1.618 / 1',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
