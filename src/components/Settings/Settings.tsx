import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { AccessibilityInfo } from './AccessibilityInfo';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { FieldTooltip } from '../Tooltip/Tooltip';
import './Settings.css';

export const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="settings" role="main" aria-label={t('settings.title')}>
      <header className="settings-header">
        <h1>{t('settings.title')}</h1>
        <p className="settings-description">
          {t('settings.description')}
        </p>
      </header>

      <div className="settings-content">
        <section className="settings-section" aria-labelledby="appearance-heading">
          <h2 id="appearance-heading">
            {t('settings.appearance')}
            <FieldTooltip content="外观主题设置" />
          </h2>
          <div className="settings-item">
            <ThemeSwitcher />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="language-heading">
          <h2 id="language-heading">
            {t('settings.language')}
            <FieldTooltip content="界面语言选择" />
          </h2>
          <div className="settings-item">
            <LanguageSwitcher />
          </div>
        </section>

        <AccessibilityInfo />
        <KeyboardShortcuts />
      </div>
    </div>
  );
};