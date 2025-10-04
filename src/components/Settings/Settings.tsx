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
            <FieldTooltip content="选择应用程序的外观主题。浅色主题适合明亮环境，深色主题适合低光环境，可以减轻眼睛疲劳。" />
          </h2>
          <div className="settings-item">
            <ThemeSwitcher />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="language-heading">
          <h2 id="language-heading">
            {t('settings.language')}
            <FieldTooltip content="选择应用程序的显示语言。目前支持中文和英文。更改语言后，所有界面文本将立即更新。" />
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