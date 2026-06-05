import { motion } from 'framer-motion';
import './ProcessSection.scss';

const STEPS = [
  {
    number: '01',
    title: 'Погружаемся в задачу',
    description:
      'Изучаем ваш бизнес, цели, аудиторию и текущую ситуацию. Определяем, что именно нужно для роста.',
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
    title: 'Строим стратегию',
    description:
      'Формируем план действий и определяем оптимальное сочетание контента, рекламы и веб-инструментов.',
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
    title: 'Создаём материалы',
    description:
      'Снимаем контент, готовим рекламные креативы и разрабатываем сайт или посадочную страницу.',
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
    title: 'Запускаем продвижение',
    description:
      'Публикуем контент, запускаем рекламные кампании и настраиваем каналы привлечения клиентов.',
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
    title: 'Анализируем и улучшаем',
    description:
      'Следим за результатами, собираем данные и улучшаем систему для дальнейшего роста.',
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
            <span className="process__badge">Как мы работаем</span>
            <h2 className="process__title section-title">
              От идеи до{' '}
              <span className="process__title-accent">клиентов</span>
            </h2>
            <p className="process__description">
              Берём на себя контент, рекламу и веб-разработку, чтобы вы могли сосредоточиться на бизнесе.
            </p>
          </motion.div>

          <div className="process__grid">
            {STEPS.map((step) => (
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

                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p className="process__note" variants={headingVariants}>
            После запуска продолжаем сопровождение проекта и помогаем масштабировать результат.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSection;
