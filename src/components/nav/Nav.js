import './Nav.scss';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/navigation';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import {
  MOBILE_MENU_SCROLL_DELAY_MS,
  scrollToSection,
} from '../../utils/scrollOffset';

function Nav({ headerHeight, isBurgerOpen, toggleBurger, burgerButton }) {
  const { t } = useTranslation(['nav', 'common']);
  const burgerMenu = useRef();
  const [activeSection, setActiveSection] = useState('home');

  const getLabel = (section) => t(section, { ns: 'nav' });
  const getLinkClassName = (section) => (
    `nav__link${section === 'contact' ? ' nav__link--cta' : ''}${activeSection === section ? ' nav__link--active' : ''}`
  );

  useEffect(() => {
    function handleClickOutsideBurger(event) {
      if (burgerMenu.current?.contains(event.target)) return;
      if (burgerButton.current?.contains(event.target)) return;
      if (isBurgerOpen) toggleBurger();
    }

    document.addEventListener('click', handleClickOutsideBurger);
    return () => document.removeEventListener('click', handleClickOutsideBurger);
  }, [isBurgerOpen, toggleBurger, burgerButton]);

  useEffect(() => {
    if (headerHeight === 0) {
      return undefined;
    }

    const sectionIds = NAV_ITEMS.map((item) => item.section);
    const visibilityRatios = new Map(sectionIds.map((id) => [id, id === 'home' ? 1 : 0]));
    const observedElements = new WeakSet();
    let observer;
    let reconnectTimer;

    const pickActiveSection = () => {
      let current = 'home';
      let bestRatio = visibilityRatios.get('home') ?? 0;

      sectionIds.forEach((id) => {
        const ratio = visibilityRatios.get(id) ?? 0;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          current = id;
        }
      });

      setActiveSection(current);
    };

    const connectObserver = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (!elements.length) {
        reconnectTimer = window.setTimeout(connectObserver, 200);
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visibilityRatios.set(
                entry.target.id,
                entry.isIntersecting ? entry.intersectionRatio : 0,
              );
            });
            pickActiveSection();
          },
          {
            root: null,
            rootMargin: `-${headerHeight + 8}px 0px -45% 0px`,
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          },
        );
      }

      elements.forEach((element) => {
        if (observedElements.has(element)) {
          return;
        }

        observedElements.add(element);
        observer.observe(element);
      });

      pickActiveSection();

      if (elements.length < sectionIds.length) {
        reconnectTimer = window.setTimeout(connectObserver, 200);
      }
    };

    const scheduleReconnect = () => {
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }

      reconnectTimer = window.setTimeout(connectObserver, 150);
    };

    connectObserver();

    const root = document.getElementById('root') || document.body;
    const mutationObserver = new MutationObserver(scheduleReconnect);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();

      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }

      if (observer) {
        observer.disconnect();
      }
    };
  }, [headerHeight]);

  function scrollToTop(event) {
    event.currentTarget.blur();

    const scrollHome = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isBurgerOpen) {
      toggleBurger();
      window.setTimeout(scrollHome, MOBILE_MENU_SCROLL_DELAY_MS);
      return;
    }

    scrollHome();
  }

  function handleSectionNav(section, event) {
    event.preventDefault();
    event.currentTarget.blur();

    const runScroll = () => scrollToSection(section);

    if (isBurgerOpen) {
      toggleBurger();
      window.setTimeout(runScroll, MOBILE_MENU_SCROLL_DELAY_MS);
      return;
    }

    runScroll();
  }

  return (
    <nav className="nav">
      <button
        className="nav__brand"
        onClick={scrollToTop}
        aria-label={t('aria.scrollTop', { ns: 'common' })}
      >
        <span className="nav__brand-name">{t('brandName', { ns: 'common' })}</span>
      </button>

      <div
        className={`nav__panel ${isBurgerOpen ? 'nav__panel--open' : ''}`}
        ref={burgerMenu}
      >
        <ul className="nav__list">
          {NAV_ITEMS.map((item) => (
            <li className="nav__item" key={item.section}>
              {item.section === 'home' ? (
                <button
                  type="button"
                  className={getLinkClassName(item.section)}
                  onClick={scrollToTop}
                >
                  {getLabel(item.section)}
                </button>
              ) : (
                <button
                  type="button"
                  className={getLinkClassName(item.section)}
                  onClick={(event) => handleSectionNav(item.section, event)}
                >
                  {getLabel(item.section)}
                </button>
              )}
            </li>
          ))}
        </ul>
        <LanguageSwitcher variant="header" />
      </div>
    </nav>
  );
}

export default Nav;
