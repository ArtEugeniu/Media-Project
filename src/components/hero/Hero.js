import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-scroll';
import './Hero.scss';

const GLOW_SPOTS = [
  { variant: 'cyan', shift: 72 },
  { variant: 'blue', shift: 108 },
  { variant: 'violet', shift: 88 },
  { variant: 'lower-left', shift: 124 },
  { variant: 'accent', shift: 56 },
  { variant: 'left-mid', shift: 96 },
  { variant: 'center', shift: 80 },
];

function HeroGlow({ variant, shift, scrollYProgress }) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [0, shift]);

  return (
    <motion.span
      className={`hero__glow-track hero__glow-track--${variant}`}
      style={reduceMotion ? undefined : { y }}
      aria-hidden="true"
    >
      <span className={`hero__glow hero__glow--${variant}`} />
    </motion.span>
  );
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const visualVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.45 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// S-curve through actual node centers in the SVG space.
const RIBBON_PATH =
  'M 134 -28 C 134 12, 124 36, 118 60 C 104 112, 60 160, 78 232 C 93 292, 150 344, 128 412 C 118 444, 110 464, 110 508';

const PULSE_DURATION = '6.5s';

const CAPABILITIES = [
  {
    id: 'content',
    color: 'cyan',
    tag: 'Content',
    desc: 'Привлекаем внимание',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="13" rx="2"
          stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.5" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 12l4-3.5 4 3.5 3-2.5 7 5.5"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20h6M12 16v4"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'traffic',
    color: 'blue',
    tag: 'Targeting',
    desc: 'Приводим аудиторию',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'conversion',
    color: 'violet',
    tag: 'Web Site',
    desc: 'Превращаем в клиентов',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    label: 'Стратегия и креатив',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4.5 5L2 8l2.5 3M11.5 5L14 8l-2.5 3M9 3.5l-2 9"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Трафик и перформанс',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="2" width="13" height="9" rx="1.2"
          stroke="currentColor" strokeWidth="1.3" />
        <circle cx="5" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 8.5l3-2.5 3 2.5 2-1.5 4 3.5"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 14h4M8 11v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Веб-разработка и аналитика',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3a5 5 0 100 10A5 5 0 008 3zM8 8h3.5"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8 5.5v5"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__grid" />
        {GLOW_SPOTS.map((spot) => (
          <HeroGlow
            key={spot.variant}
            variant={spot.variant}
            shift={spot.shift}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <span className="hero__volume" />
        <span className="hero__dust" />
        <span className="hero__vignette" />
      </div>

      <div className="container hero__container">
        <div className="hero__layout">

          <motion.div
            className="hero__content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className="hero__title" variants={itemVariants}>
              Контент привлекает.<br />
              Реклама приводит.<br />
              Сайт{' '}
              <span className="hero__title-accent">продаёт.</span>
            </motion.h1>

            <motion.p className="hero__subtitle" variants={itemVariants}>
              Создаём систему привлечения клиентов под ключ.
              Одна команда вместо трёх подрядчиков.
            </motion.p>

            <motion.div className="hero__actions" variants={itemVariants}>
              <Link
                className="hero__btn hero__btn--primary"
                to="contact"
                smooth
                offset={-16}
                duration={800}
                spy={false}
              >
                Обсудить проект
                <svg className="hero__btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                className="hero__btn hero__btn--secondary"
                to="portfolio"
                smooth
                offset={-16}
                duration={800}
                spy={false}
              >
                Смотреть кейсы
              </Link>
            </motion.div>

            <motion.div className="hero__services" variants={itemVariants}>
              {SERVICES.map((s) => (
                <span className="hero__service" key={s.label}>
                  <span className="hero__service-icon">{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            variants={visualVariants}
            initial="hidden"
            animate="visible"
          >
            <svg
              className="hero__ribbon"
              viewBox="0 0 140 480"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="hero-ribbon-gradient"
                  x1="80"
                  y1="8"
                  x2="90"
                  y2="480"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#18e0ff" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#18e0ff" />
                  <stop offset="72%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <filter id="hero-ribbon-blur-wide" x="-80%" y="-8%" width="260%" height="116%">
                  <feGaussianBlur stdDeviation="20" />
                </filter>
                <filter id="hero-ribbon-blur" x="-50%" y="-8%" width="200%" height="116%">
                  <feGaussianBlur stdDeviation="10" />
                </filter>
                <radialGradient id="hero-pulse-gradient">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="45%" stopColor="#18e0ff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#18e0ff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                className="hero__ribbon-halo"
                d={RIBBON_PATH}
                filter="url(#hero-ribbon-blur-wide)"
              />
              <path
                className="hero__ribbon-glow"
                d={RIBBON_PATH}
                filter="url(#hero-ribbon-blur)"
              />
              <path className="hero__ribbon-body" d={RIBBON_PATH} />
              <path className="hero__ribbon-core" d={RIBBON_PATH} />

              <circle className="hero__pulse" r="5" fill="url(#hero-pulse-gradient)">
                <animateMotion
                  dur={PULSE_DURATION}
                  repeatCount="indefinite"
                  path={RIBBON_PATH}
                />
              </circle>
            </svg>

            <div className="hero__stack">
              {CAPABILITIES.map((cap) => (
                <motion.div
                  key={cap.id}
                  className={`hero__row hero__row--${cap.color}`}
                  variants={rowVariants}
                >
                  <div className={`hero__node hero__node--${cap.color}`}>
                    <span className="hero__node-glow" aria-hidden="true" />
                    <span className="hero__node-ring" aria-hidden="true" />
                    <span className="hero__node-core">{cap.icon}</span>
                  </div>
                  <div className="hero__card">
                    <span className="hero__card-tag">{cap.tag}</span>
                    <span className="hero__card-desc">{cap.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

export default Hero;
