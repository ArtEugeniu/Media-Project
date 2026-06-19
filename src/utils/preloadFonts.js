const DISPLAY_FONT_FAMILY = 'Montserrat';
const DISPLAY_FONT_WEIGHTS = [400, 500, 600, 700];

/** Latin, Cyrillic, and Romanian diacritics used across locales. */
const DISPLAY_FONT_SAMPLE = [
  'Montserrat Content Advertising Web Development Portfolio Process Contact',
  'Контент Реклама Веб-разработка Портфолио Процесс Контакт',
  'Conținut Publicitate Dezvoltare web Portofoliu Proces Contact',
].join(' ');

export function preloadDisplayFonts() {
  if (typeof document === 'undefined' || !document.fonts?.load) {
    return Promise.resolve();
  }

  return Promise.all(
    DISPLAY_FONT_WEIGHTS.map((weight) => (
      document.fonts.load(`${weight} 16px ${DISPLAY_FONT_FAMILY}`, DISPLAY_FONT_SAMPLE)
    )),
  ).catch(() => {});
}
