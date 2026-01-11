/**
 * Theme Configuration
 * Dark theme with modern UI color palette
 */

export const theme = {
  colors: {
    // Primary colors
    primary: '#6366f1', // Indigo
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',
    
    // Secondary colors
    secondary: '#8b5cf6', // Purple
    secondaryDark: '#7c3aed',
    secondaryLight: '#a78bfa',
    
    // Background colors
    background: '#0f172a', // Slate 900
    backgroundElevated: '#1e293b', // Slate 800
    backgroundCard: '#334155', // Slate 700
    backgroundHover: '#475569', // Slate 600
    
    // Surface colors
    surface: '#1e293b',
    surfaceElevated: '#334155',
    surfaceHover: '#475569',
    
    // Text colors
    textPrimary: '#f1f5f9', // Slate 100
    textSecondary: '#cbd5e1', // Slate 300
    textTertiary: '#94a3b8', // Slate 400
    textDisabled: '#64748b', // Slate 500
    
    // Border colors
    border: '#334155', // Slate 700
    borderLight: '#475569', // Slate 600
    borderDark: '#1e293b', // Slate 800
    
    // Status colors
    success: '#10b981', // Emerald 500
    successDark: '#059669',
    successLight: '#34d399',
    
    error: '#ef4444', // Red 500
    errorDark: '#dc2626',
    errorLight: '#f87171',
    
    warning: '#f59e0b', // Amber 500
    warningDark: '#d97706',
    warningLight: '#fbbf24',
    
    info: '#3b82f6', // Blue 500
    infoDark: '#2563eb',
    infoLight: '#60a5fa',
    
    // Accent colors
    accent: '#ec4899', // Pink 500
    accentDark: '#db2777',
    accentLight: '#f472b6',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export default theme;
