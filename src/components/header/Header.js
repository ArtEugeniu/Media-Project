import Nav from "../nav/Nav";
import BurgerMenuButton from "../burgerMenu/BurgerMenu";
import './Header.scss'
import { useEffect, useState, useRef } from "react";

function Header({ isBurgerOpen, toggleBurger }) {

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const burgerButton = useRef();


  useEffect(() => {

    function actualHeaderHeight() {
      const header = document.querySelector('.header').offsetHeight;
      setHeaderHeight(header);
    }

    actualHeaderHeight();


    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', actualHeaderHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', actualHeaderHeight);
    }

  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isBurgerOpen ? 'header--opacity' : ''}`}>
      <div className="container">
        <Nav headerHeight={headerHeight} isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} burgerButton={burgerButton} />
        <BurgerMenuButton toggleBurger={toggleBurger} isBurgerOpen={isBurgerOpen} burgerButton={burgerButton} />
        <div className={isBurgerOpen ? 'header__overlay' : ''}></div>
      </div>
    </header>
  )
}

export default Header;