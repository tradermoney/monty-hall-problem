import React from 'react';
import { useTranslation } from 'react-i18next';

export const KeyboardShortcuts: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};