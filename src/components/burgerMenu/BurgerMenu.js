import './BurgerMenu.scss';
import { useTranslation } from 'react-i18next';

function BurgerMenu({ toggleBurger, isBurgerOpen, burgerButton }) {
  const { t } = useTranslation('common');

  return(
    <button
      type="button"
      className={`header__burger-menu ${isBurgerOpen ? 'header__burger-menu--active' : ''}`}
      onClick={toggleBurger}
      ref={burgerButton}
      aria-label={isBurgerOpen ? t('aria.closeMenu') : t('aria.openMenu')}
      aria-expanded={isBurgerOpen}
    >
      <span></span>
    </button>
  )
}

export default BurgerMenu;
