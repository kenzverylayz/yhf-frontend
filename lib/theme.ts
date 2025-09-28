/**
 * Professional Dashboard Theme Configuration
 * Inspired by modern SaaS dashboards with a cohesive color palette
 */

export const theme = {
  // Background Colors
  background: {
    primary: '#0F172A',      // Very dark blue-grey (slate-900)
    secondary: '#1E293B',    // Dark blue-grey (slate-800)
    tertiary: '#334155',     // Medium blue-grey (slate-700)
    card: '#1E293B',         // Card background
    hover: '#334155',        // Hover states
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',      // Pure white for main text
    secondary: '#CBD5E1',    // Light grey for secondary text
    muted: '#94A3B8',        // Muted grey for labels
    accent: '#60A5FA',       // Blue accent for highlights
  },

  // Accent Colors - Professional Palette
  accent: {
    primary: '#3B82F6',      // Blue-500 - Primary actions
    secondary: '#8B5CF6',    // Violet-500 - Secondary elements
    tertiary: '#06B6D4',     // Cyan-500 - Tertiary elements
    success: '#10B981',      // Emerald-500 - Success states
    warning: '#F59E0B',      // Amber-500 - Warning states
    error: '#EF4444',        // Red-500 - Error states
  },

  // Chart Colors - Consistent palette for data visualization
  chart: {
    colors: [
      '#3B82F6',  // Blue-500
      '#8B5CF6',  // Violet-500
      '#06B6D4',  // Cyan-500
      '#10B981',  // Emerald-500
      '#F59E0B',  // Amber-500
      '#EF4444',  // Red-500
      '#84CC16',  // Lime-500
      '#F97316',  // Orange-500
    ],
    // Specific colors for different chart types
    line: '#3B82F6',
    bar: '#8B5CF6',
    pie: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
    grid: '#334155',
    tooltip: '#1E293B',
  },

  // Border and Divider Colors
  border: {
    primary: '#334155',      // Main borders
    secondary: '#475569',    // Subtle borders
    accent: '#3B82F6',       // Accent borders
  },

  // Shadow and Effects
  shadow: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    hover: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
  },

  // Spacing and Layout
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },

  // Border Radius
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
} as const;

// Helper function to get chart colors
export const getChartColor = (index: number): string => {
  return theme.chart.colors[index % theme.chart.colors.length];
};

// Helper function to get pie chart colors
export const getPieColors = (count: number): string[] => {
  return theme.chart.pie.slice(0, count);
};
