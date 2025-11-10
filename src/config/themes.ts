// Theme Configuration for LumaShy
// Users can switch between different visual themes

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    glow: string;
    background: string;
    backgroundSecondary: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'aurora-dark',
    name: 'Aurora Dark',
    description: 'Soft purple and pink gradients with aurora effects',
    colors: {
      primary: '#d946ef', // fuchsia-500
      secondary: '#ec4899', // pink-500
      accent: '#a855f7', // purple-500
      gradient: 'linear-gradient(135deg, #d946ef, #ec4899, #a855f7)',
      glow: 'rgba(217, 70, 239, 0.3)',
      background: '#0f172a', // slate-900
      backgroundSecondary: '#1e293b', // slate-800
      border: 'rgba(168, 85, 247, 0.3)',
      text: '#ffffff',
      textSecondary: '#94a3b8',
    },
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    description: 'Electric blue and cyan with futuristic vibes',
    colors: {
      primary: '#06b6d4', // cyan-500
      secondary: '#3b82f6', // blue-500
      accent: '#0ea5e9', // sky-500
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6, #0ea5e9)',
      glow: 'rgba(6, 182, 212, 0.3)',
      background: '#0c1220',
      backgroundSecondary: '#1a2332',
      border: 'rgba(6, 182, 212, 0.3)',
      text: '#ffffff',
      textSecondary: '#94a3b8',
    },
  },
  {
    id: 'sunset-fire',
    name: 'Sunset Fire',
    description: 'Warm orange and red sunset gradients',
    colors: {
      primary: '#f97316', // orange-500
      secondary: '#ef4444', // red-500
      accent: '#fb923c', // orange-400
      gradient: 'linear-gradient(135deg, #f97316, #ef4444, #fb923c)',
      glow: 'rgba(249, 115, 22, 0.3)',
      background: '#1c1410',
      backgroundSecondary: '#2d2218',
      border: 'rgba(249, 115, 22, 0.3)',
      text: '#ffffff',
      textSecondary: '#a8a29e',
    },
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    description: 'Fresh green and teal nature theme',
    colors: {
      primary: '#10b981', // emerald-500
      secondary: '#14b8a6', // teal-500
      accent: '#22c55e', // green-500
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6, #22c55e)',
      glow: 'rgba(16, 185, 129, 0.3)',
      background: '#0a1612',
      backgroundSecondary: '#162520',
      border: 'rgba(16, 185, 129, 0.3)',
      text: '#ffffff',
      textSecondary: '#94a3b8',
    },
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blue with indigo accents',
    colors: {
      primary: '#6366f1', // indigo-500
      secondary: '#3b82f6', // blue-500
      accent: '#8b5cf6', // violet-500
      gradient: 'linear-gradient(135deg, #6366f1, #3b82f6, #8b5cf6)',
      glow: 'rgba(99, 102, 241, 0.3)',
      background: '#0f0f1e',
      backgroundSecondary: '#1a1a2e',
      border: 'rgba(99, 102, 241, 0.3)',
      text: '#ffffff',
      textSecondary: '#94a3b8',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Elegant pink and gold combination',
    colors: {
      primary: '#f43f5e', // rose-500
      secondary: '#ec4899', // pink-500
      accent: '#f59e0b', // amber-500
      gradient: 'linear-gradient(135deg, #f43f5e, #ec4899, #f59e0b)',
      glow: 'rgba(244, 63, 94, 0.3)',
      background: '#1a0f14',
      backgroundSecondary: '#2a1a20',
      border: 'rgba(244, 63, 94, 0.3)',
      text: '#ffffff',
      textSecondary: '#a8a29e',
    },
  },
  {
    id: 'matrix-green',
    name: 'Matrix Green',
    description: 'Classic hacker terminal green',
    colors: {
      primary: '#22c55e', // green-500
      secondary: '#84cc16', // lime-500
      accent: '#10b981', // emerald-500
      gradient: 'linear-gradient(135deg, #22c55e, #84cc16, #10b981)',
      glow: 'rgba(34, 197, 94, 0.3)',
      background: '#0a1a0a',
      backgroundSecondary: '#142814',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '#ffffff',
      textSecondary: '#86efac',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Rich purple with magenta highlights',
    colors: {
      primary: '#a855f7', // purple-500
      secondary: '#d946ef', // fuchsia-500
      accent: '#9333ea', // purple-600
      gradient: 'linear-gradient(135deg, #a855f7, #d946ef, #9333ea)',
      glow: 'rgba(168, 85, 247, 0.3)',
      background: '#1a0f2e',
      backgroundSecondary: '#2a1a40',
      border: 'rgba(168, 85, 247, 0.3)',
      text: '#ffffff',
      textSecondary: '#c4b5fd',
    },
  },
];

export const defaultTheme = themes[0]; // Aurora Dark

export function getThemeById(id: string): Theme {
  return themes.find(theme => theme.id === id) || defaultTheme;
}

export function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  
  const savedThemeId = localStorage.getItem('lumashy-theme');
  return savedThemeId ? getThemeById(savedThemeId) : defaultTheme;
}

export function saveThemeToStorage(themeId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lumashy-theme', themeId);
}

export function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply CSS variables
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-glow', theme.colors.glow);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-background-secondary', theme.colors.backgroundSecondary);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  
  // Set data attribute for theme-specific styles
  root.setAttribute('data-theme', theme.id);
}
