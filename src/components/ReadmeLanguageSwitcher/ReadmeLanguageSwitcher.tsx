import React from 'react';
import './ReadmeLanguageSwitcher.css';

interface ReadmeLanguageSwitcherProps {
  currentLang: 'en' | 'zh-CN';
  onLanguageChange: (lang: 'en' | 'zh-CN') => void;
}

export const ReadmeLanguageSwitcher: React.FC<ReadmeLanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange
}) => {
  return (
    <div className="readme-language-switcher">
      <div className="language-switcher-container">
        <button
          className={`language-switcher-button ${currentLang === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
          disabled={currentLang === 'en'}
        >
          English
        </button>
        <span className="language-switcher-separator">|</span>
        <button
          className={`language-switcher-button ${currentLang === 'zh-CN' ? 'active' : ''}`}
          onClick={() => onLanguageChange('zh-CN')}
          disabled={currentLang === 'zh-CN'}
        >
          简体中文
        </button>
      </div>
    </div>
  );
};