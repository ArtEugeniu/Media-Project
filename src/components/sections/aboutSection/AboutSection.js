import { motion } from 'framer-motion';
import './AboutSection.scss';
import myPhoto from '../../../assets/images/my-photo.jpg';

const PERKS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 5l4 5-4 5V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Контент и видеопродакшн',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    label: 'Таргетированная реклама',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Веб-разработка и лендинги',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12v8H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 13l2-2 2 2 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Единая коммуникация по проекту',
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
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__badge-wrap">
          <span className="about__badge">О нас</span>
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
              alt="Представитель команды агентства"
              loading="lazy"
            />
          </motion.div>

          <motion.div className="about__content" variants={rightVariants}>
            <h2 className="about__title section-title">
              Одна команда вместо{' '}
              <span className="about__title-accent">трёх подрядчиков</span>
            </h2>

            <p className="about__bio">
              Мы объединяем контент, рекламу и веб-разработку в одну систему
              привлечения клиентов.
            </p>

            <p className="about__bio">
              Вместо поиска нескольких специалистов вы работаете с одной командой,
              которая сопровождает проект от идеи до запуска и дальнейшего развития.
            </p>

            <p className="about__bio">
              Работаем с малым и средним бизнесом и помогаем выстраивать понятную
              систему привлечения клиентов через контент, рекламу и современные
              веб-решения.
            </p>

            <ul className="about__perks">
              {PERKS.map((perk) => (
                <motion.li
                  key={perk.label}
                  className="about__perk"
                  variants={perkVariants}
                >
                  <span className="about__perk-icon">{perk.icon}</span>
                  <span className="about__perk-label">{perk.label}</span>
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
