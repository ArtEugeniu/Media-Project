import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { getSectionScrollOffset } from '../../../utils/scrollOffset';
import './ServicesSection.scss';

const CheckIcon = () => (
  <svg
    className="services__card-check"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <polyline
      points="2.5,8.5 6,12 13.5,4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SERVICE_CONFIG = [
  {
    id: 'content-production',
    accent: 'cyan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 8.5v4l4-2-4-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'performance-marketing',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 13.5h4l2.5 5 3-13 2.5 8h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      </svg>
    ),
  },
  {
    id: 'web-development',
    accent: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13.5 8.5l-3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function ServicesSection() {
  const { t } = useTranslation(['services', 'common']);
  const sectionScrollOffset = getSectionScrollOffset();

  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="services__heading" variants={headingVariants}>
            <span className="services__badge">{t('services:badge')}</span>
            <h2 className="services__title section-title">
              {t('services:title')}
            </h2>
            <p className="services__description">
              {t('services:description')}
            </p>
          </motion.div>

          <div className="services__grid">
            {SERVICE_CONFIG.map((service) => {
              const features = t(`services:cards.${service.id}.features`, { returnObjects: true });

              return (
                <motion.article
                  key={service.id}
                  className={`services__card services__card--${service.accent}`}
                  variants={cardVariants}
                >
                  <div className="services__card-top">
                    <div className="services__card-icon">{service.icon}</div>
                    <span className="services__card-label">
                      {t(`services:cards.${service.id}.label`)}
                    </span>
                  </div>

                  <div className="services__card-header">
                    <h3 className="services__card-title">
                      {t(`services:cards.${service.id}.title`)}
                    </h3>
                    <p className="services__card-description">
                      {t(`services:cards.${service.id}.description`)}
                    </p>
                  </div>

                  <ul className="services__card-list">
                    {Array.isArray(features) && features.map((item) => (
                      <li key={item} className="services__card-item">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    className="services__card-btn"
                    to="contact"
                    smooth
                    offset={sectionScrollOffset}
                    duration={800}
                    spy={false}
                  >
                    {t('common:buttons.discuss')}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
