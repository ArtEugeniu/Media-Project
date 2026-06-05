import { motion } from 'framer-motion';
import './PortfolioSection.scss';
import ProjectCards from '../../cards/ProjectCards/ProjectCards';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function PortfolioSection() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="portfolio__heading" variants={headingVariants}>
            <span className="portfolio__badge">НАШИ КЕЙСЫ</span>
            <h2 className="portfolio__title section-title">
              Как мы помогаем бизнесу расти
            </h2>
            <p className="portfolio__description">
              Контент, реклама и веб-разработка для решения реальных бизнес-задач.
            </p>
          </motion.div>

          <ProjectCards />
        </motion.div>
      </div>
    </section>
  );
}

export default PortfolioSection;
