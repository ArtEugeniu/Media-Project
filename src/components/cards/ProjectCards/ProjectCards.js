import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import './ProjectCards.scss';
import projectCardData from '../../../assets/data/projectCardData.json';
import licuriciImg from '../../../assets/images/licurici.jpg';
import taxiProjectImg from '../../../assets/images/taxi-project.jpg';
import ecommerceImg from '../../../assets/images/ecommerce.jpg';
import myPortfolioSiteImg from '../../../assets/images/myPortfolioSite.jpg';
import simpleFoodImg from '../../../assets/images/simpleFood.jpg';

const PROJECT_IMAGES = {
  'licurici.jpg': licuriciImg,
  'taxi-project.jpg': taxiProjectImg,
  'ecommerce.jpg': ecommerceImg,
  'myPortfolioSite.jpg': myPortfolioSiteImg,
  'simpleFood.jpg': simpleFoodImg,
};

const COMPACT_CARD_QUERY = '(max-width: 1199px)';

const ArrowIcon = ({ direction }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d={direction === 'prev' ? 'M10 4L6 8l4 4' : 'M6 4l4 4-4 4'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

function canToggleMobileDetails() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(COMPACT_CARD_QUERY).matches;
}

function CaseMedia({ item, videoRef }) {
  if (item.media?.type === 'video') {
    return (
      <video
        ref={videoRef}
        className="projectCards__img projectCards__video"
        src={item.media.webm ? undefined : resolvePublicPath(item.media.video)}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.title}
      >
        {item.media.webm && (
          <source src={resolvePublicPath(item.media.webm)} type="video/webm" />
        )}
        <source src={resolvePublicPath(item.media.video)} type="video/mp4" />
      </video>
    );
  }

  const imageName = item.media?.image || item.imageURL;
  const image = PROJECT_IMAGES[imageName];

  if (!image) {
    return null;
  }

  return (
    <img
      className="projectCards__img"
      src={image}
      alt={item.title}
      loading="lazy"
    />
  );
}

function ProjectCard({ item, activeCardId, onToggleDetails, viewCaseLabel, comingSoonOverlay, comingSoonLabel }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hasVideo = item.media?.type === 'video';
  const detailsOpen = activeCardId === item.id;

  useEffect(() => {
    if (!hasVideo || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video) {
      return undefined;
    }

    const compactCardQuery = window.matchMedia(COMPACT_CARD_QUERY);
    let observer;
    let isVisible = false;

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {});
      }
    };

    const syncPlayback = () => {
      if (compactCardQuery.matches && isVisible && !document.hidden) {
        playVideo();
        return;
      }

      video.pause();
    };

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
        observer = undefined;
      }

      isVisible = false;

      if (!compactCardQuery.matches || typeof IntersectionObserver === 'undefined') {
        syncPlayback();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          syncPlayback();
        },
        { threshold: [0, 0.35, 0.65] },
      );

      observer.observe(card);
    };

    const handleVisibilityChange = () => {
      syncPlayback();
    };

    setupObserver();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (typeof compactCardQuery.addEventListener === 'function') {
      compactCardQuery.addEventListener('change', setupObserver);
    } else {
      compactCardQuery.addListener(setupObserver);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (typeof compactCardQuery.removeEventListener === 'function') {
        compactCardQuery.removeEventListener('change', setupObserver);
      } else {
        compactCardQuery.removeListener(setupObserver);
      }

      video.pause();
    };
  }, [hasVideo]);

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
  };

  const handleCardClick = () => {
    if (!canToggleMobileDetails()) {
      return;
    }

    onToggleDetails(item.id);
  };

  return (
    <article
      ref={cardRef}
      className={`projectCards__card${hasVideo ? ' projectCards__card--video' : ''}${detailsOpen ? ' projectCards__card--details-open' : ''}${item.comingSoon ? ' projectCards__card--soon' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="projectCards__image-wrap">
        <CaseMedia item={item} videoRef={videoRef} />
        {hasVideo && (
          <span className="projectCards__play" aria-hidden="true">
            <span className="projectCards__play-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 7.5v9l8-4.5-8-4.5z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        )}
        <span className="projectCards__type">{item.type}</span>

        {item.comingSoon && (
          <div className="projectCards__soon-overlay">
            <span>{comingSoonOverlay}</span>
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
            {viewCaseLabel}
          </a>
        )}
      </div>

      <div className="projectCards__body" onClick={(event) => event.stopPropagation()}>
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
              {viewCaseLabel} <ExternalIcon />
            </a>
          )}

          {!item.comingSoon && !item.link && (
            <span className="projectCards__btn projectCards__btn--primary">
              {viewCaseLabel} <ExternalIcon />
            </span>
          )}

          {item.comingSoon && (
            <span className="projectCards__soon-label">{comingSoonLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCards() {
  const { t } = useTranslation('portfolio');
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);

  const localizedProjects = useMemo(() => projectCardData.map((item) => {
    const caseKey = String(item.id);
    const tags = t(`cases.${caseKey}.tags`, { returnObjects: true });

    return {
      ...item,
      title: t(`cases.${caseKey}.title`),
      description: t(`cases.${caseKey}.description`),
      type: t(`cases.${caseKey}.type`),
      tags: Array.isArray(tags) ? tags : [],
    };
  }), [t]);

  useEffect(() => {
    if (!swiperInstance?.autoplay) {
      return;
    }

    const shouldPauseAutoplay = activeCardId
      && typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia(COMPACT_CARD_QUERY).matches;

    if (shouldPauseAutoplay) {
      swiperInstance.autoplay.stop();
      return;
    }

    swiperInstance.autoplay.start();
  }, [activeCardId, swiperInstance]);

  const handleToggleDetails = (cardId) => {
    setActiveCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
  };

  return (
    <div className="projectCards">
      <div className="projectCards__slider">
        <button
          type="button"
          className="projectCards__nav projectCards__nav--prev"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowIcon direction="prev" />
        </button>

        <Swiper
          className="projectCards__swiper"
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          speed={650}
          loop={localizedProjects.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setSwiperInstance(swiper);
          }}
          breakpoints={{
            900: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {localizedProjects.map((item) => (
            <SwiperSlide key={item.id} className="projectCards__slide">
              <ProjectCard
                item={item}
                activeCardId={activeCardId}
                onToggleDetails={handleToggleDetails}
                viewCaseLabel={t('viewCase')}
                comingSoonOverlay={t('comingSoonOverlay')}
                comingSoonLabel={t('comingSoonLabel')}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="projectCards__nav projectCards__nav--next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
    </div>
  );
}

export default ProjectCards;
