import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { bindDocumentLanguageSync } from './syncDocumentLanguage';
import { FALLBACK_LANG, resolveLanguage, SUPPORTED_LANGS } from './languages';
import { preloadDisplayFonts } from '../utils/preloadFonts';

import ruCommon from '../locales/ru/common.json';
import ruNav from '../locales/ru/nav.json';
import ruHero from '../locales/ru/hero.json';
import ruServices from '../locales/ru/services.json';
import ruPortfolio from '../locales/ru/portfolio.json';
import ruProcess from '../locales/ru/process.json';
import ruAbout from '../locales/ru/about.json';
import ruContact from '../locales/ru/contact.json';
import ruMeta from '../locales/ru/meta.json';

import roCommon from '../locales/ro/common.json';
import roNav from '../locales/ro/nav.json';
import roHero from '../locales/ro/hero.json';
import roServices from '../locales/ro/services.json';
import roPortfolio from '../locales/ro/portfolio.json';
import roProcess from '../locales/ro/process.json';
import roAbout from '../locales/ro/about.json';
import roContact from '../locales/ro/contact.json';
import roMeta from '../locales/ro/meta.json';

import enCommon from '../locales/en/common.json';
import enNav from '../locales/en/nav.json';
import enHero from '../locales/en/hero.json';
import enServices from '../locales/en/services.json';
import enPortfolio from '../locales/en/portfolio.json';
import enProcess from '../locales/en/process.json';
import enAbout from '../locales/en/about.json';
import enContact from '../locales/en/contact.json';
import enMeta from '../locales/en/meta.json';

const namespaces = [
  'common',
  'nav',
  'hero',
  'services',
  'portfolio',
  'process',
  'about',
  'contact',
  'meta',
];

const resources = {
  ru: {
    common: ruCommon,
    nav: ruNav,
    hero: ruHero,
    services: ruServices,
    portfolio: ruPortfolio,
    process: ruProcess,
    about: ruAbout,
    contact: ruContact,
    meta: ruMeta,
  },
  ro: {
    common: roCommon,
    nav: roNav,
    hero: roHero,
    services: roServices,
    portfolio: roPortfolio,
    process: roProcess,
    about: roAbout,
    contact: roContact,
    meta: roMeta,
  },
  en: {
    common: enCommon,
    nav: enNav,
    hero: enHero,
    services: enServices,
    portfolio: enPortfolio,
    process: enProcess,
    about: enAbout,
    contact: enContact,
    meta: enMeta,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: resolveLanguage(),
    fallbackLng: FALLBACK_LANG,
    supportedLngs: SUPPORTED_LANGS,
    ns: namespaces,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  bindDocumentLanguageSync(i18n);
  preloadDisplayFonts();
  i18n.on('languageChanged', preloadDisplayFonts);
}

export default i18n;
