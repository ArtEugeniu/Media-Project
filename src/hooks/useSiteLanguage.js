import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  hasStoredLanguage,
  persistLanguage,
  SUPPORTED_LANGS,
} from '../i18n/languages';

export function useSiteLanguage() {
  const { i18n } = useTranslation();

  const currentLang = SUPPORTED_LANGS.includes(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage;

  const setLanguage = useCallback((language) => {
    if (!SUPPORTED_LANGS.includes(language)) {
      return;
    }

    persistLanguage(language);
    i18n.changeLanguage(language);
  }, [i18n]);

  return {
    currentLang,
    setLanguage,
    isAutoDetected: !hasStoredLanguage(),
    supportedLangs: SUPPORTED_LANGS,
  };
}
