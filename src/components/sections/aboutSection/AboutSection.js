import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './AboutSection.scss';
import myPhoto from '../../../assets/images/my-photo.jpg';

const PERK_CONFIG = [
  {
    id: 'content',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 5l4 5-4 5V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'advertising',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'web',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'communication',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12v8H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 13l2-2 2 2 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const leftVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const perkVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function AboutSection() {
  const { t } = useTranslation('about');
  const bioParagraphs = t('bio', { returnObjects: true });

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__badge-wrap">
          <span className="about__badge">{t('badge')}</span>
        </div>

        <motion.div
          className="about__inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="about__photo-wrap" variants={leftVariants}>
            <img
              className="about__photo"
              src={myPhoto}
              alt={t('photoAlt')}
              loading="lazy"
            />
          </motion.div>

          <motion.div className="about__content" variants={rightVariants}>
            <h2 className="about__title section-title">
              {t('title')}{' '}
              <span className="about__title-accent">{t('titleAccent')}</span>
            </h2>

            {Array.isArray(bioParagraphs) && bioParagraphs.map((paragraph) => (
              <p key={paragraph} className="about__bio">
                {paragraph}
              </p>
            ))}

            <ul className="about__perks">
              {PERK_CONFIG.map((perk) => (
                <motion.li
                  key={perk.id}
                  className="about__perk"
                  variants={perkVariants}
                >
                  <span className="about__perk-icon">{perk.icon}</span>
                  <span className="about__perk-label">{t(`perks.${perk.id}`)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
