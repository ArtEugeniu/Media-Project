import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './ProjectCards.scss';
import projectCardData from '../../../assets/data/projectCardData.json';

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
  };

  return (
    <article
      className={`projectCards__card${hasVideo ? ' projectCards__card--video' : ''}${item.comingSoon ? ' projectCards__card--soon' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              Посмотреть кейс <ExternalIcon />
            </span>
          )}

          {item.comingSoon && (
            <span className="projectCards__soon-label">Кейс скоро появится</span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCards() {
  const swiperRef = useRef(null);

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
          loop={projectCardData.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {projectCardData.map((item) => (
            <SwiperSlide key={item.id} className="projectCards__slide">
              <ProjectCard item={item} />
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
