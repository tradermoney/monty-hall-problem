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
    // 暗色主题变量
    root.style.setProperty('--bg-primary', '#1f2937');
    root.style.setProperty('--bg-secondary', '#111827');
    root.style.setProperty('--text-primary', '#f9fafb');
    root.style.setProperty('--text-secondary', '#d1d5db');
    root.style.setProperty('--border-color', '#374151');
    root.style.setProperty('--card-bg', '#1f2937');
    root.style.setProperty('--button-bg', '#374151');
    root.style.setProperty('--button-hover', '#4b5563');
    root.style.setProperty('--switcher-bg', '#374151');
    root.style.setProperty('--info-bg', '#1e3a8a');
    root.style.setProperty('--info-border', '#3b82f6');
    root.style.setProperty('--success-bg', '#064e3b');
    root.style.setProperty('--success-text', '#10b981');
    root.style.setProperty('--success-border', '#059669');
    root.style.setProperty('--error-bg', '#7f1d1d');
    root.style.setProperty('--error-text', '#ef4444');
    root.style.setProperty('--error-border', '#dc2626');
  } else {
    // 亮色主题变量
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f9fafb');
    root.style.setProperty('--text-primary', '#1f2937');
    root.style.setProperty('--text-secondary', '#6b7280');
    root.style.setProperty('--border-color', '#d1d5db');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-hover', '#f3f4f6');
    root.style.setProperty('--switcher-bg', '#f9fafb');
    root.style.setProperty('--info-bg', '#eff6ff');
    root.style.setProperty('--info-border', '#dbeafe');
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