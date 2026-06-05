import { useRef } from 'react';
import { motion } from 'framer-motion';
import './ProjectCards.scss';
import projectCardData from '../../../assets/data/projectCardData.json';

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2 12L12 2M12 2H6M12 2V8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function resolvePublicPath(path) {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${process.env.PUBLIC_URL || ''}${path}`;
}

function canPlayVideoOnHover() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function CaseMedia({ item, videoRef }) {
  if (item.media?.type === 'video') {
    return (
      <video
        ref={videoRef}
        className="projectCards__img"
        src={resolvePublicPath(item.media.video)}
        poster={item.media.poster ? resolvePublicPath(item.media.poster) : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.title}
      />
    );
  }

  const imageName = item.media?.image || item.imageURL;
  const image = require(`../../../assets/images/${imageName}`);

  return (
    <img
      className="projectCards__img"
      src={image}
      alt={item.title}
      loading="lazy"
    />
  );
}

function ProjectCard({ item }) {
  const videoRef = useRef(null);
  const hasVideo = item.media?.type === 'video';

  const handleMouseEnter = () => {
    if (!hasVideo || !canPlayVideoOnHover()) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!hasVideo) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore seek errors while metadata is still loading.
    }
  };

  return (
    <motion.article
      className={`projectCards__card${item.comingSoon ? ' projectCards__card--soon' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="projectCards__image-wrap">
        <CaseMedia item={item} videoRef={videoRef} />
        <span className="projectCards__type">{item.type}</span>

        {item.comingSoon && (
          <div className="projectCards__soon-overlay">
            <span>Скоро появится</span>
          </div>
        )}

        {!item.comingSoon && item.link && (
          <a
            className="projectCards__image-cta"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            Посмотреть кейс
          </a>
        )}
      </div>

      <div className="projectCards__body">
        <ul className="projectCards__tags">
          {item.tags.map((tag) => (
            <li key={tag} className="projectCards__tag">{tag}</li>
          ))}
        </ul>

        <h3 className="projectCards__title">{item.title}</h3>
        <p className="projectCards__description">{item.description}</p>

        <div className="projectCards__footer">
          {!item.comingSoon && item.link && (
            <a
              className="projectCards__btn projectCards__btn--primary"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть кейс <ExternalIcon />
            </a>
          )}

          {!item.comingSoon && !item.link && (
            <span className="projectCards__btn projectCards__btn--primary">
              Посмотреть кейс
            </span>
          )}

          {item.comingSoon && (
            <span className="projectCards__soon-label">Кейс скоро появится</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCards() {
  return (
    <div className="projectCards">
      {projectCardData.map((item) => (
        <ProjectCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProjectCards;
