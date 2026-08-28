/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // The design system is intentionally small: one dark surface scale,
    // one accent, one text scale. Everything else is spacing + type.
    extend: {
      colors: {
        ink: {
          DEFAULT: '#080808', // page background
          soft: '#0E0E0E',    // raised surfaces
          line: '#1C1C1C',    // hairline borders
        },
        ember: {
          DEFAULT: '#BD881D', // brand accent
          dim: '#8C6415',
        },
        bone: {
          DEFAULT: '#F5F5F5', // primary text
          muted: '#9A9A9A',   // secondary text
          faint: '#5C5C5C',   // tertiary / labels
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display scale — clamps keep the hero cinematic at 1536px
        // and legible at 320px without breakpoint soup.
        // display-xs fills the gap below display-sm's floor (1.4rem) so
        // the hero heading doesn't fall back to an unstyled inherited
        // size on phones narrower than the sm breakpoint (425px).
        'display-xs': ['clamp(1.3rem, 6vw, 1.4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-2xl': ['clamp(3.5rem, 11vw, 10.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(3rem, 10vw, 9.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.4rem, 7vw, 6.5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.8rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.4rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        label: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      screens: {
        xs: '375px',
        sm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 11rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
    },
  },
  plugins: [],
};
