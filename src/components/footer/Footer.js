import { Link } from 'react-scroll';
import './Footer.scss';
import { NAV_ITEMS } from '../../config/navigation';
import { DEFAULT_LANG, SITE_NAME, TELEGRAM_URL } from '../../config/site';

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
            href="https://github.com/ArtEugeniu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
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
