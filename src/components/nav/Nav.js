import './Nav.scss';
import { Link } from 'react-scroll';
import { useRef, useEffect, useState } from 'react';
import { NAV_ITEMS } from '../../config/navigation';
import { DEFAULT_LANG, SITE_NAME } from '../../config/site';

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
    function updateActiveSection() {
      const marker = window.scrollY + headerHeight + 80;
      let currentSection = 'home';

      NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.section);

        if (section && section.offsetTop <= marker) {
          currentSection = item.section;
        }
      });

      setActiveSection(currentSection);
    }

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [headerHeight]);

  // -(headerHeight - 56): компенсирует padding-top секций (64px) и оставляет ~8px зазор под хедером
  const scrollOffset = -(headerHeight - 56);

  function scrollToTop() {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isBurgerOpen) toggleBurger();
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
                  activeClass="nav__link--active"
                  spy
                  onClick={() => {
                    setActiveSection(item.section);
                    if (isBurgerOpen) toggleBurger();
                  }}
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
