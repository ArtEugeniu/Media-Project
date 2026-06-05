import { motion } from 'framer-motion';
import './ServicesSection.scss';
import { TELEGRAM_URL } from '../../../config/site';

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

const SERVICES = [
  {
    id: 'content-production',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 8.5v4l4-2-4-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'ПРИВЛЕКАЕМ ВНИМАНИЕ',
    title: 'Контент и продакшн',
    description:
      'Создаём контент, который показывает ваш бизнес, вызывает доверие и помогает выделиться среди конкурентов.',
    features: [
      'Съёмка Reels',
      'Монтаж видео',
      'Контент для соцсетей',
      'Креативные публикации',
      'Контент-план',
    ],
    accent: 'cyan',
  },
  {
    id: 'performance-marketing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 13.5h4l2.5 5 3-13 2.5 8h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      </svg>
    ),
    label: 'ПРИВОДИМ АУДИТОРИЮ',
    title: 'Реклама и продвижение',
    description:
      'Настраиваем рекламные кампании в Meta и Google, чтобы привлекать целевую аудиторию и получать заявки.',
    features: [
      'Meta Ads',
      'Google Ads',
      'Настройка аудиторий',
      'Аналитика',
      'Оптимизация рекламы',
    ],
    accent: 'blue',
  },
  {
    id: 'web-development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13.5 8.5l-3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'ПРЕВРАЩАЕМ В КЛИЕНТОВ',
    title: 'Веб-разработка',
    description:
      'Создаём сайты и посадочные страницы, которые помогают превращать посетителей в клиентов.',
    features: [
      'Лендинги',
      'Корпоративные сайты',
      'Онлайн-меню',
      'Адаптивная разработка',
      'Базовая SEO-оптимизация',
    ],
    accent: 'violet',
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
            <span className="services__badge">НАШИ УСЛУГИ</span>
            <h2 className="services__title section-title">
              Объединяем контент, рекламу и веб-разработку
            </h2>
            <p className="services__description">
              Одна команда ведёт путь от идеи и креатива до заявок и конверсии.
            </p>
          </motion.div>

          <div className="services__grid">
            {SERVICES.map((service) => (
              <motion.article
                key={service.id}
                className={`services__card services__card--${service.accent}`}
                variants={cardVariants}
              >
                <div className="services__card-top">
                  <div className="services__card-icon">{service.icon}</div>
                  <span className="services__card-label">{service.label}</span>
                </div>

                <div className="services__card-header">
                  <h3 className="services__card-title">{service.title}</h3>
                  <p className="services__card-description">{service.description}</p>
                </div>

                <ul className="services__card-list">
                  {service.features.map((item) => (
                    <li key={item} className="services__card-item">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  className="services__card-btn"
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Обсудить проект
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
