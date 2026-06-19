import './Nav.scss';
import { Link } from 'react-scroll';
import { useRef, useEffect, useState } from 'react';
import { NAV_ITEMS } from '../../config/navigation';
import { DEFAULT_LANG, SITE_NAME } from '../../config/site';
import { getSectionScrollOffset } from '../../utils/scrollOffset';

function Nav({ headerHeight, isBurgerOpen, toggleBurger, burgerButton }) {
  const burgerMenu = useRef();
  const [activeSection, setActiveSection] = useState('home');

  const getLabel = (item) => item.label[DEFAULT_LANG] ?? item.label.ru;
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
    const visibility = new Map(sectionIds.map((id) => [id, id === 'home']));
    const observedElements = new WeakSet();
    let observer;
    let reconnectTimer;

    const pickActiveSection = () => {
      let current = 'home';

      sectionIds.forEach((id) => {
        if (visibility.get(id)) {
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
              visibility.set(entry.target.id, entry.isIntersecting);
            });
            pickActiveSection();
          },
          {
            root: null,
            rootMargin: `-${headerHeight + 80}px 0px -55% 0px`,
            threshold: 0,
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

  const scrollOffset = getSectionScrollOffset(headerHeight);

  function scrollToTop(event) {
    event.currentTarget.blur();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isBurgerOpen) {
      toggleBurger();
    }
  }

  function handleNavClick(event) {
    event.currentTarget.blur();

    if (isBurgerOpen) {
      toggleBurger();
    }
  }

  return (
    <nav className="nav">
      <button
        className="nav__brand"
        onClick={scrollToTop}
        aria-label="Наверх"
      >
        <span className="nav__brand-name">{SITE_NAME[DEFAULT_LANG]}</span>
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
                  {getLabel(item)}
                </button>
              ) : (
                <Link
                  to={item.section}
                  smooth
                  offset={scrollOffset}
                  duration={800}
                  className={getLinkClassName(item.section)}
                  onClick={handleNavClick}
                >
                  {getLabel(item)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
