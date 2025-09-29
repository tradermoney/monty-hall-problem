import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'auto';

interface ThemeState {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  updateSystemTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'auto',
  systemTheme: 'light',
  isDark: false,
  
  setTheme: (theme: Theme) => {
    set({ theme });
    applyTheme(theme, get().systemTheme);
    localStorage.setItem('monty-hall-theme', theme);
  },
  
  updateSystemTheme: () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    set({ systemTheme });
    
    const { theme } = get();
    if (theme === 'auto') {
      applyTheme('auto', systemTheme);
    }
  }
}));

/**
 * 应用主题到DOM
 */
function applyTheme(theme: Theme, systemTheme: 'light' | 'dark') {
  const root = document.documentElement;
  const isDark = theme === 'dark' || (theme === 'auto' && systemTheme === 'dark');
  
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // 更新CSS变量
  updateCSSVariables(isDark);
}

/**
 * 更新CSS变量
 */
function updateCSSVariables(isDark: boolean) {
  const root = document.documentElement;
  
  if (isDark) {
    // 深色主题使用深绿色系
    root.style.setProperty('--bg-primary', '#0f2027');
    root.style.setProperty('--bg-secondary', '#064e3b');
    root.style.setProperty('--text-primary', '#f0fdf4');
    root.style.setProperty('--text-secondary', '#bbf7d0');
    root.style.setProperty('--border-color', '#166534');
    root.style.setProperty('--card-bg', '#065f46');
    root.style.setProperty('--button-bg', '#059669');
    root.style.setProperty('--button-hover', '#10b981');
    root.style.setProperty('--switcher-bg', '#047857');
    root.style.setProperty('--info-bg', '#065f46');
    root.style.setProperty('--info-border', '#10b981');
    root.style.setProperty('--success-bg', '#064e3b');
    root.style.setProperty('--success-text', '#10b981');
    root.style.setProperty('--success-border', '#059669');
    root.style.setProperty('--error-bg', '#7f1d1d');
    root.style.setProperty('--error-text', '#ef4444');
    root.style.setProperty('--error-border', '#dc2626');
  } else {
    // 浅色主题使用淡绿色系
    root.style.setProperty('--bg-primary', '#f0fdf4');
    root.style.setProperty('--bg-secondary', '#dcfce7');
    root.style.setProperty('--text-primary', '#14532d');
    root.style.setProperty('--text-secondary', '#166534');
    root.style.setProperty('--border-color', '#22c55e');
    root.style.setProperty('--card-bg', '#f0fdf4');
    root.style.setProperty('--button-bg', '#bbf7d0');
    root.style.setProperty('--button-hover', '#22c55e');
    root.style.setProperty('--switcher-bg', '#ecfdf5');
    root.style.setProperty('--info-bg', '#dbeafe');
    root.style.setProperty('--info-border', '#93c5fd');
    root.style.setProperty('--success-bg', '#f0fdf4');
    root.style.setProperty('--success-text', '#166534');
    root.style.setProperty('--success-border', '#bbf7d0');
    root.style.setProperty('--error-bg', '#fef2f2');
    root.style.setProperty('--error-text', '#dc2626');
    root.style.setProperty('--error-border', '#fecaca');
  }
}

/**
 * 初始化主题
 */
export function initializeTheme() {
  const savedTheme = localStorage.getItem('monty-hall-theme') as Theme || 'auto';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    useThemeStore.getState().updateSystemTheme();
  });
  
  // 应用主题
  applyTheme(savedTheme, systemTheme);
  
  // 更新store
  useThemeStore.setState({ 
    theme: savedTheme, 
    systemTheme,
    isDark: savedTheme === 'dark' || (savedTheme === 'auto' && systemTheme === 'dark')
  });
}