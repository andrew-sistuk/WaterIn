import { use } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import uaTranslation from './locales/ua/translation.json';
import frTranslation from './locales/fr/translation.json';
import geTranslation from './locales/ge/translation.json';
import itaTranslation from './locales/ita/translation.json';
import noTranslation from './locales/no/translation.json';
import plTranslation from './locales/pl/translation.json';

const i18n = use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: enTranslation,
      },
      ua: {
        translation: uaTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      de: {
        translation: geTranslation,
      },
      it: {
        translation: itaTranslation,
      },
      no: {
        translation: noTranslation,
      },
      pl: {
        translation: plTranslation,
      },
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
