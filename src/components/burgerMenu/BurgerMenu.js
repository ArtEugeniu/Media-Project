import './BurgerMenu.scss';

function BurgerMenu({ toggleBurger, isBurgerOpen, burgerButton }) {
  return(
    <button
      type="button"
      className={`header__burger-menu ${isBurgerOpen ? 'header__burger-menu--active' : ''}`}
      onClick={toggleBurger}
      ref={burgerButton}
      aria-label={isBurgerOpen ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={isBurgerOpen}
    >
      <span></span>
    </button>
  )
}

export default BurgerMenu;
