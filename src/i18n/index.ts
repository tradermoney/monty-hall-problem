import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { zhTranslations } from './zh';
import { enTranslations } from './en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: zhTranslations,
      en: enTranslations
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;