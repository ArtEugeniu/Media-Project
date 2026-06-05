import './Nav.scss';
import { Link } from 'react-scroll';
import { useRef, useEffect } from 'react';
import { NAV_ITEMS } from '../../config/navigation';
import { DEFAULT_LANG, TELEGRAM_URL, SITE_NAME } from '../../config/site';

function Nav({ headerHeight, isBurgerOpen, toggleBurger, burgerButton }) {
  const burgerMenu = useRef();

  const getLabel = (item) => item.label[DEFAULT_LANG] ?? item.label.ru;

  useEffect(() => {
    function handleClickOutsideBurger(event) {
      if (burgerMenu.current?.contains(event.target)) return;
      if (burgerButton.current?.contains(event.target)) return;
      if (isBurgerOpen) toggleBurger();
    }

    document.addEventListener('click', handleClickOutsideBurger);
    return () => document.removeEventListener('click', handleClickOutsideBurger);
  }, [isBurgerOpen, toggleBurger, burgerButton]);

  // -(headerHeight - 56): компенсирует padding-top секций (64px) и оставляет ~8px зазор под хедером
  const scrollOffset = -(headerHeight - 56);

  function scrollToTop() {
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
              <Link
                to={item.section}
                smooth
                offset={scrollOffset}
                duration={800}
                className="nav__link"
                activeClass="nav__link--active"
                spy
                onClick={() => isBurgerOpen && toggleBurger()}
              >
                {getLabel(item)}
              </Link>
            </li>
          ))}
        </ul>

        <a
          className="nav__cta"
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => isBurgerOpen && toggleBurger()}
        >
          Telegram
        </a>
      </div>
    </nav>
  );
}

export default Nav;
