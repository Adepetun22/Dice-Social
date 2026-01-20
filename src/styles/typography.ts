// Typography system for reusable font styles and sizes
export const typography = {
  // Font families
  fontFamily: {
    sans: ['Open Sans', 'sans-serif'],
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Reusable text styles
  textStyles: {
    heading1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    heading2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    heading3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    bodyMedium: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  }
};

export type Typography = typeof typography;
export default typography;