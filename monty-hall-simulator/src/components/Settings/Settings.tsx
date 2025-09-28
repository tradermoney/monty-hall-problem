import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
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
          <h2 id="appearance-heading">{t('settings.appearance')}</h2>
          <div className="settings-item">
            <ThemeSwitcher />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="language-heading">
          <h2 id="language-heading">{t('settings.language')}</h2>
          <div className="settings-item">
            <LanguageSwitcher />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="accessibility-heading">
          <h2 id="accessibility-heading">{t('settings.accessibility')}</h2>
          <div className="settings-item">
            <div className="accessibility-info">
              <h3>{t('settings.accessibilityFeatures')}</h3>
              <ul className="accessibility-list">
                <li>{t('settings.keyboardNavigation')}</li>
                <li>{t('settings.screenReaderSupport')}</li>
                <li>{t('settings.highContrastMode')}</li>
                <li>{t('settings.focusIndicators')}</li>
                <li>{t('settings.skipLinks')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="shortcuts-heading">
          <h2 id="shortcuts-heading">{t('settings.keyboardShortcuts')}</h2>
          <div className="settings-item">
            <div className="shortcuts-info">
              <h3>{t('settings.navigation')}</h3>
              <div className="shortcut-item">
                <kbd>Tab</kbd>
                <span>{t('settings.nextElement')}</span>
              </div>
              <div className="shortcut-item">
                <kbd>Shift</kbd> + <kbd>Tab</kbd>
                <span>{t('settings.previousElement')}</span>
              </div>
              <div className="shortcut-item">
                <kbd>Enter</kbd> / <kbd>Space</kbd>
                <span>{t('settings.activate')}</span>
              </div>
              <div className="shortcut-item">
                <kbd>Escape</kbd>
                <span>{t('settings.closeModal')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};