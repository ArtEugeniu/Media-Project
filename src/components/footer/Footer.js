import { Link } from 'react-scroll';
import './Footer.scss';
import { NAV_ITEMS } from '../../config/navigation';
import {
  DEFAULT_LANG,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_NAME,
  TELEGRAM_URL,
} from '../../config/site';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link
            className="footer__logo"
            to="home"
            smooth
            offset={0}
            duration={800}
          >
            {SITE_NAME[DEFAULT_LANG]}
          </Link>
          <p className="footer__tagline">Контент, реклама и веб-разработка для бизнеса</p>
        </div>

        <nav className="footer__nav" aria-label="Навигация по странице">
          <ul className="footer__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.section}>
                <Link
                  className="footer__nav-link"
                  to={item.section}
                  smooth
                  offset={item.section === 'home' ? 0 : -16}
                  duration={800}
                >
                  {item.label[DEFAULT_LANG]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <a
            className="footer__social-link"
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.5 3.5L2.5 10.5l6 2 2 6 3-4 5 4 3-15z"
                stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            className="footer__social-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5"
                stroke="currentColor" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4"
                stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
            </svg>
          </a>
          <a
            className="footer__social-link"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v9h4v-9h3.5l.5-4H14V7a1 1 0 011-1h3V2z"
                stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            © {YEAR} {SITE_NAME[DEFAULT_LANG]}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
