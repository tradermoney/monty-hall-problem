import React from 'react';
import { useTranslation } from 'react-i18next';

export const AccessibilityInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};