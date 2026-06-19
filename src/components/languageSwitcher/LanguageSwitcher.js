import { useTranslation } from 'react-i18next';
import { LANG_LABELS } from '../../i18n/languages';
import { useSiteLanguage } from '../../hooks/useSiteLanguage';
import './LanguageSwitcher.scss';

function LanguageSwitcher({ variant = 'header' }) {
  const { t } = useTranslation('common');
  const { currentLang, setLanguage, supportedLangs } = useSiteLanguage();

  return (
    <div
      className={`language-switcher language-switcher--${variant}`}
      role="group"
      aria-label={t('aria.languageSwitcher')}
    >
      {supportedLangs.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`language-switcher__btn${currentLang === lang ? ' language-switcher__btn--active' : ''}`}
          aria-current={currentLang === lang ? 'true' : undefined}
          onClick={() => setLanguage(lang)}
        >
          {LANG_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
