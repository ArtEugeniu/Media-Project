import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function setMetaDescription(content) {
  if (typeof document === 'undefined' || !content) {
    return;
  }

  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

export function usePageMeta() {
  const { t, i18n } = useTranslation('meta');

  useEffect(() => {
    document.title = t('title');
    setMetaDescription(t('description'));
  }, [t, i18n.language]);
}
