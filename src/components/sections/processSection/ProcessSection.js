import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ProcessSection.scss';

const STEP_CONFIG = [
  {
    number: '01',
    stepKey: '1',
    accent: 'cyan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    stepKey: '2',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h16"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    number: '03',
    stepKey: '3',
    accent: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    stepKey: '4',
    accent: 'cyan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    stepKey: '5',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 18V10M10 18V6M16 18v-8M22 18H2"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ProcessSection() {
  const { t } = useTranslation('process');

  return (
    <section className="process" id="process">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="process__heading" variants={headingVariants}>
            <span className="process__badge">{t('badge')}</span>
            <h2 className="process__title section-title">
              {t('title')}{' '}
              <span className="process__title-accent">{t('titleAccent')}</span>
            </h2>
            <p className="process__description">
              {t('description')}
            </p>
          </motion.div>

          <div className="process__grid">
            {STEP_CONFIG.map((step) => (
              <motion.div
                key={step.number}
                className={`process__step process__step--${step.accent}`}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <div className="process__step-connector" aria-hidden="true" />

                <div className="process__step-top">
                  <span className="process__step-number">{step.number}</span>
                  <div className="process__step-icon">{step.icon}</div>
                </div>

                <h3 className="process__step-title">
                  {t(`steps.${step.stepKey}.title`)}
                </h3>
                <p className="process__step-desc">
                  {t(`steps.${step.stepKey}.description`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p className="process__note" variants={headingVariants}>
            {t('note')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSection;
