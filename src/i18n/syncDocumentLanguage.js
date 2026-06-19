export function syncDocumentLanguage(language) {
  if (typeof document === 'undefined' || !language) {
    return;
  }

  document.documentElement.lang = language;
}

export function bindDocumentLanguageSync(i18n) {
  syncDocumentLanguage(i18n.language);

  const handleLanguageChanged = (language) => {
    syncDocumentLanguage(language);
  };

  i18n.on('languageChanged', handleLanguageChanged);

  return () => {
    i18n.off('languageChanged', handleLanguageChanged);
  };
}
