export const SUPPORTED_LANGS = ['ru', 'ro', 'en'];

export const FALLBACK_LANG = 'ro';

export const STORAGE_KEY = 'media-project-lang';

export const LANG_LABELS = {
  ru: 'RU',
  ro: 'RO',
  en: 'EN',
};

function normalizeLanguageCode(raw) {
  if (!raw || typeof raw !== 'string') {
    return null;
  }

  const base = raw.toLowerCase().split('-')[0];

  if (base === 'ro') return 'ro';
  if (base === 'en') return 'en';
  if (base === 'ru') return 'ru';

  return null;
}

export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return null;
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const resolved = normalizeLanguageCode(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return null;
}

export function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return SUPPORTED_LANGS.includes(stored) ? stored : null;
}

export function resolveLanguage() {
  return getStoredLanguage() ?? detectBrowserLanguage() ?? FALLBACK_LANG;
}

export function persistLanguage(language) {
  if (typeof window === 'undefined' || !SUPPORTED_LANGS.includes(language)) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
}

export function hasStoredLanguage() {
  return Boolean(getStoredLanguage());
}
