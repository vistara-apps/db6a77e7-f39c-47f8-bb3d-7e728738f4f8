import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      // Custom design tokens from BaseSwap Scout spec
      colors: {
        // Background colors
        bg: "hsl(210 25% 10%)",
        surface: "hsl(210 25% 15%)",

        // Accent colors
        accent: "hsl(140 60% 55%)",
        primary: "hsl(210 60% 50%)",

        // Text colors
        "text-primary": "hsl(0 0% 95%)",
        "text-secondary": "hsl(0 0% 75%)",

        // Status colors
        success: "hsl(140 60% 55%)",
        error: "hsl(0 75% 60%)",
        warning: "hsl(45 100% 60%)",
        info: "hsl(210 60% 50%)",

        // Legacy shadcn colors for compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          500: "hsl(var(--secondary-500))",
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          900: "hsl(var(--secondary-900))",
          950: "hsl(var(--secondary-950))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "hsl(var(--accent-500))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          950: "hsl(var(--accent-950))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      // Custom spacing from design system
      spacing: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        xl: "24px",
      },

      // Custom border radius from design system
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "6px",
        // Legacy shadcn radius for compatibility
        "shadcn-lg": "var(--radius)",
        "shadcn-md": "calc(var(--radius) - 2px)",
        "shadcn-sm": "calc(var(--radius) - 4px)",
      },

      // Custom typography from design system
      fontSize: {
        display: ["2.25rem", { lineHeight: "1", fontWeight: "700" }],
        heading: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.75" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },

      // Custom shadows from design system
      boxShadow: {
        card: "0 4px 12px hsla(0, 0%, 0%, 0.20)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Custom utilities for the design system
    function({ addUtilities, theme }: any) {
      addUtilities({
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.btn-primary': {
          backgroundColor: theme('colors.accent'),
          color: 'black',
          fontWeight: '600',
          padding: '0.5rem 1rem',
          borderRadius: theme('borderRadius.md'),
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.accent'),
            opacity: '0.9',
            transform: 'translateY(-1px)',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
            transform: 'none',
          },
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.text-primary'),
          border: `1px solid ${theme('colors.surface')}`,
          fontWeight: '600',
          padding: '0.5rem 1rem',
          borderRadius: theme('borderRadius.md'),
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.surface'),
            borderColor: theme('colors.accent'),
          },
        },
        '.text-display': {
          fontSize: theme('fontSize.display')[0],
          lineHeight: theme('fontSize.display')[1].lineHeight,
          fontWeight: theme('fontSize.display')[1].fontWeight,
        },
        '.text-heading': {
          fontSize: theme('fontSize.heading')[0],
          lineHeight: theme('fontSize.heading')[1].lineHeight,
          fontWeight: theme('fontSize.heading')[1].fontWeight,
        },
        '.text-body': {
          fontSize: theme('fontSize.body')[0],
          lineHeight: theme('fontSize.body')[1].lineHeight,
        },
        '.text-caption': {
          fontSize: theme('fontSize.caption')[0],
          lineHeight: theme('fontSize.caption')[1].lineHeight,
          color: theme('colors.text-secondary'),
        },
      });
    },
  ],
};
export default config;
