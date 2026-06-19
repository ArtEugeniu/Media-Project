import Nav from "../nav/Nav";
import BurgerMenuButton from "../burgerMenu/BurgerMenu";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import './Header.scss'
import { useEffect, useState, useRef } from "react";

function Header({ isBurgerOpen, toggleBurger }) {

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const burgerButton = useRef();


  useEffect(() => {
    const headerEl = document.querySelector('.header');

    if (!headerEl) {
      return undefined;
    }

    const updateHeaderHeight = () => {
      setHeaderHeight(headerEl.offsetHeight);
    };

    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 50);
    };

    updateHeaderHeight();
    updateScrolledState();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerEl);

    let scrollFrame = 0;

    const handleScroll = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        updateScrolledState();
        scrollFrame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderHeight);

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-lock', isBurgerOpen);
    document.body.classList.toggle('menu-lock', isBurgerOpen);

    function handleEscape(event) {
      if (event.key === 'Escape' && isBurgerOpen) {
        toggleBurger();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.documentElement.classList.remove('menu-lock');
      document.body.classList.remove('menu-lock');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isBurgerOpen, toggleBurger]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isBurgerOpen ? 'header--opacity' : ''}`}>
      <div className="container">
        <Nav headerHeight={headerHeight} isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} burgerButton={burgerButton} />
        <LanguageSwitcher variant="header" />
        <BurgerMenuButton toggleBurger={toggleBurger} isBurgerOpen={isBurgerOpen} burgerButton={burgerButton} />
      </div>
    </header>
  )
}

export default Header;
