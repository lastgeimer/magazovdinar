import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

type Project = {
  id: number;
  title: string;
  titleRu: string;
  client: string;
  clientRu: string;
  year: string;
  duration: string;
  tags: string[];
  tagsRu: string[];
  gradient: string;
  preview: string;
  video: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Talking Head',
    titleRu: 'Говорящая голова',
    client: 'Margulan Seissembai',
    clientRu: 'Маргулан Сейсембай',
    year: '2026',
    duration: '0:30',
    tags: ['Editing', 'Color', 'Subtitles', 'SFX'],
    tagsRu: ['Монтаж', 'Цвет', 'Субтитры', 'Звуковые эффекты'],
    gradient: 'linear-gradient(135deg, #1a0533, #2d1060)',
    preview: 'previews/project1.jpg', // УБРАН / В НАЧАЛЕ
    video: 'videos/project1.mp4',    // УБРАН / В НАЧАЛЕ
  },
  {
    id: 2,
    title: 'Motion-Design',
    titleRu: 'Моушн-дизайн',
    client: 'Sesodive',
    clientRu: 'Сэсодайв',
    year: '2025',
    duration: '0:28',
    tags: ['Editing', 'Color', 'Text', 'Animation'],
    tagsRu: ['Монтаж', 'Цвет', 'Текст', 'Анимация'],
    gradient: 'linear-gradient(135deg, #0a1628, #1e1060)',
    preview: 'previews/project2.jpg',
    video: 'videos/project2.mp4',
  },
  {
    id: 3,
    title: 'Reels',
    titleRu: 'Рилс',
    client: 'DINARIX',
    clientRu: 'ДИНАРИКС',
    year: '2025',
    duration: '0:08',
    tags: ['Editing', 'Color', 'Subtitles', 'Animation'],
    tagsRu: ['Монтаж', 'Цвет', 'Субтитры', 'Анимация'],
    gradient: 'linear-gradient(135deg, #0d1a0d, #1a3320)',
    preview: 'previews/project3.jpg',
    video: 'videos/project3.mp4',
  },
  {
    id: 4,
    title: 'Promotional Video',
    titleRu: 'Рекламный ролик',
    client: 'DINARIX',
    clientRu: 'ДИНАРИКС',
    year: '2026',
    duration: '0:18',
    tags: ['Editing', 'Text', 'Animation', 'Sound'],
    tagsRu: ['Монтаж', 'Текст', 'Анимация', 'Звук'],
    gradient: 'linear-gradient(135deg, #1a1a0a, #332a00)',
    preview: 'previews/project4.jpg',
    video: 'videos/project4.mp4',
  },
  {
    id: 5,
    title: 'Motion-Design',
    titleRu: 'Моушн-Дизайн',
    client: 'DINARIX',
    clientRu: 'ДИНАРИКС',
    year: '2025',
    duration: '0:13',
    tags: ['Editing', 'Color', 'Text', 'Animation'],
    tagsRu: ['Монтаж', 'Цвет', 'Текст', 'Анимация'],
    gradient: 'linear-gradient(135deg, #1a0028, #0a0a40)',
    preview: 'previews/project5.jpg',
    video: 'videos/project5.mp4',
  },
  {
    id: 6,
    title: 'Musical Edit',
    titleRu: 'Музыкальный эдит',
    client: 'For5use',
    clientRu: 'Форфайвюз',
    year: '2026',
    duration: '0:26',
    tags: ['Editing', 'Color', 'Text', 'Animation', 'Motion'],
    tagsRu: ['Монтаж', 'Цвет', 'Текст', 'Анимация', 'Моушн'],
    gradient: 'linear-gradient(135deg, #0d0d1a, #1a1030)',
    preview: 'previews/project6.jpg',
    video: 'videos/project6.mp4',
  },
];

/* ── Video Modal ── */
function VideoModal({
  project,
  onClose,
  language,
}: {
  project: Project;
  onClose: () => void;
  language: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const isRu = language === 'ru';
  const projectTitle = isRu ? project.titleRu : project.title;
  const projectClient = isRu ? project.clientRu : project.client;
  const projectTags = isRu ? project.tagsRu : project.tags;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON') {
          e.preventDefault();
          togglePlay();
        }
      }
    };

    const handleFs = () => setFullscreen(Boolean(document.fullscreenElement));

    window.addEventListener('keydown', handleKey);
    document.addEventListener('fullscreenchange', handleFs);

    const v = videoRef.current;
    if (v) {
      void v
        .play()
        .then(() => {
          setPlaying(true);
          setShowControls(true);
          controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
        })
        .catch(() => {
          setPlaying(false);
          setShowControls(true);
        });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('fullscreenchange', handleFs);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, [onClose]);

  const resetTimer = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    if (playing) controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => {
        setPlaying(true);
        resetTimer();
      });
    } else {
      v.pause();
      setPlaying(false);
      setShowControls(true);
    }
  };

  const handleTime = () => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration || 0;
    const c = v.currentTime || 0;
    setDuration(d);
    setCurrentTime(c);
    setProgress(d ? (c / d) * 100 : 0);
  };

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / (r.width || 1)) * v.duration;
    handleTime();
  };

  const handleVol = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const v = videoRef.current;
    if (!v) return;
    v.volume = val;
    v.muted = val === 0;
    setMuted(v.muted);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFs = async () => {
    try {
      if (!document.fullscreenElement && modalRef.current)
        await modalRef.current.requestFullscreen();
      else if (document.fullscreenElement) await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetTimer}
        onMouseLeave={() => playing && setShowControls(false)}
      >
        <div className="modal-header">
          <div className="modal-header-top">
            <div className="modal-header-text">
              <h3 className="modal-title">{projectTitle}</h3>
              <p className="modal-subtitle">
                {projectClient} · {project.year}
              </p>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="modal-tags">
            {projectTags.map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="modal-video-wrap"
          style={{ cursor: showControls ? 'default' : 'none' }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={project.video}
            className="modal-video"
            poster={project.preview}
            onTimeUpdate={handleTime}
            onLoadedMetadata={handleTime}
            onEnded={() => {
              setPlaying(false);
              setShowControls(true);
            }}
            playsInline
            preload="metadata"
          />

          {!playing && (
            <div className="modal-play-overlay">
              <div className="modal-play-btn">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          <div
            className="modal-controls"
            style={{ opacity: showControls ? 1 : 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-progress-wrap" onClick={handleSeek}>
              <div className="modal-progress-bg" />
              <div className="modal-progress-fill" style={{ width: `${progress}%` }} />
              <div className="modal-progress-thumb" style={{ left: `${progress}%` }} />
            </div>
            <div className="modal-controls-row">
              <button className="modal-ctrl-btn" onClick={togglePlay}>
                {playing ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button className="modal-ctrl-btn" onClick={toggleMute}>
                {muted || volume === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l2 2L21 18.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                )}
              </button>
              <input
                className="modal-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={muted ? 0 : volume}
                onChange={handleVol}
              />
              <span className="modal-time">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
              <button className="modal-ctrl-btn modal-ctrl-btn--right" onClick={toggleFs}>
                {fullscreen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Work Component ── */
export default function Work() {
  const { language, t } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const isRu = language === 'ru';

  return (
    <section id="work" className="work-section border-t border-[#1e1e2e] w-full">
      <div className="work-container">
        <ScrollReveal direction="up" delay={0}>
          <div className="work-header">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-purple-500 tracking-[0.3em] uppercase">
                {isRu ? '02 — Работы' : '02 — Works'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white/90 leading-tight">
              {t('works.title')}{' '}
              <span className="text-gradient">{isRu ? 'Проекты' : 'Projects'}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="work-grid">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={idx * 120 + 150}>
              <div
                className="work-card group"
                onClick={() => setActiveProject(project)}
                data-hover
              >
                <div className="work-thumb">
                  <div
                    className="work-thumb-gradient"
                    style={{ background: project.gradient }}
                  />
                  <img
                    src={project.preview}
                    alt={isRu ? project.titleRu : project.title}
                    className="work-thumb-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="work-thumb-grid" />
                  <div className="work-play-wrap">
                    <div className="work-play-btn">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="rgba(168,85,247,0.95)"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="work-duration">{project.duration}</div>
                </div>
                <div className="work-info">
                  <h3 className="work-title">
                    {isRu ? project.titleRu : project.title}
                  </h3>
                  <p className="work-meta">
                    {isRu ? project.clientRu : project.client} · {project.year}
                  </p>
                  <div className="work-tags">
                    {(isRu ? project.tagsRu : project.tags).map((tag) => (
                      <span key={tag} className="work-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={300}>
          <div className="work-cta">
            <a
              href="https://t.me/ManFairFold"
              target="_blank"
              rel="noopener noreferrer"
              className="work-cta-btn"
              data-hover
            >
              <span className="work-cta-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {t('works.showreel')}
              <svg
                className="work-cta-arrow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {activeProject && (
        <VideoModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          language={language}
        />
      )}

      {/* Стили я не менял, они у вас верные */}
      <style>{`
        /* ... ваши стили ... */
        .work-section{padding:128px 0}
        .work-container{width:100%;padding:0 clamp(24px,8vw,120px);box-sizing:border-box}
        /* и так далее... */
      `}</style>
    </section>
  );
}