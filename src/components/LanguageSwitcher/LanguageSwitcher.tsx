import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${currentLanguage === 'zh' ? 'active' : ''}`}
        onClick={() => changeLanguage('zh')}
        aria-label="切换到中文"
      >
        中文
      </button>
      <button
        className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
};