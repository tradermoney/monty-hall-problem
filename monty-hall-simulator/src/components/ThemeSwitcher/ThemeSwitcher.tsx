import React from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../stores/themeStore';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { value: 'light' as const, label: t('theme.light'), icon: '☀️' },
    { value: 'dark' as const, label: t('theme.dark'), icon: '🌙' },
    { value: 'auto' as const, label: t('theme.auto'), icon: '🔄' }
  ];

  return (
    <div className="theme-switcher">
      <h4 className="theme-switcher-title">{t('theme.title')}</h4>
      <div className="theme-options">
        {themes.map(({ value, label, icon }) => (
          <button
            key={value}
            className={`theme-option ${theme === value ? 'active' : ''}`}
            onClick={() => setTheme(value)}
            aria-label={label}
            title={label}
          >
            <span className="theme-icon">{icon}</span>
            <span className="theme-label">{label}</span>
            {theme === value && (
              <span className="theme-check" aria-hidden="true">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};