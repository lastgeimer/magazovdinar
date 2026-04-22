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
    preview: '/previews/project1.jpg',
    video: '/videos/project1.mp4',
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
    preview: '/previews/project2.jpg',
    video: '/videos/project2.mp4',
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
    preview: '/previews/project3.jpg',
    video: '/videos/project3.mp4',
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
    preview: '/previews/project4.jpg',
    video: '/videos/project4.mp4',
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
    preview: '/previews/project5.jpg',
    video: '/videos/project5.mp4',
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
    preview: '/previews/project6.jpg',
    video: '/videos/project6.mp4',
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
  const [isVertical, setIsVertical] = useState(false);

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
      const handleLoadedMetadata = () => {
        if (v.videoWidth && v.videoHeight) {
          setIsVertical(v.videoHeight > v.videoWidth);
        }
        handleTime();
      };

      v.addEventListener('loadedmetadata', handleLoadedMetadata);

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

      return () => {
        v.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
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
      if (!document.fullscreenElement && modalRef.current) {
        await modalRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
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
        className={`modal-container ${isVertical ? 'modal-container--vertical' : ''} ${
          fullscreen ? 'modal-container--fullscreen' : ''
        }`}
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

      <style>{`
        .work-section{padding:128px 0}
        .work-container{width:100%;padding:0 clamp(24px,8vw,120px);box-sizing:border-box}
        .work-header{margin-bottom:64px}
        .work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-bottom:96px}
        .work-card{position:relative;border-radius:6px;overflow:hidden;border:1px solid #1e1e2e;background:#0a0a0f;cursor:pointer;transition:border-color .4s,transform .4s,box-shadow .4s}
        .work-card:hover{border-color:rgba(168,85,247,.5);transform:translateY(-6px);box-shadow:0 24px 48px rgba(124,58,237,.12)}
        .work-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;background:#0a0a0f}
        .work-thumb-gradient{position:absolute;inset:0;z-index:1}
        .work-thumb-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;transition:transform .6s}
        .work-card:hover .work-thumb-img{transform:scale(1.05)}
        .work-thumb-grid{position:absolute;inset:0;z-index:3;opacity:.06;background-image:linear-gradient(rgba(168,85,247,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.45) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        .work-play-wrap{position:absolute;inset:0;z-index:4;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;background:rgba(0,0,0,.28)}
        .work-card:hover .work-play-wrap{opacity:1}
        .work-play-btn{width:60px;height:60px;border-radius:50%;background:rgba(124,58,237,.25);border:1.5px solid rgba(168,85,247,.5);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;transition:transform .3s,background .3s;box-shadow:0 0 32px rgba(124,58,237,.18)}
        .work-card:hover .work-play-btn{transform:scale(1.12);background:rgba(124,58,237,.42)}
        .work-duration{position:absolute;right:10px;bottom:8px;z-index:5;padding:3px 8px;border-radius:4px;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);font-family:monospace;font-size:10px;color:rgba(255,255,255,.75)}
        .work-info{padding:16px;background:rgba(10,10,15,.92)}
        .work-title{font-size:14px;font-weight:700;color:rgba(255,255,255,.9);margin-bottom:4px}
        .work-meta{font-family:monospace;font-size:11px;color:rgba(255,255,255,.35);margin-bottom:10px}
        .work-tags{display:flex;flex-wrap:wrap;gap:6px}
        .work-tag{font-family:monospace;font-size:10px;color:rgba(255,255,255,.32);border:1px solid #1e1e2e;padding:2px 7px;border-radius:3px}
        .work-cta{text-align:center;margin-top:24px}
        .work-cta-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:14px;padding:22px 62px;border:1.5px solid rgba(168,85,247,.5);border-radius:6px;text-decoration:none;font-family:monospace;font-size:14px;letter-spacing:3px;text-transform:uppercase;color:rgba(192,132,252,.95);background:rgba(124,58,237,.06);transition:all .35s}
        .work-cta-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,.16),rgba(168,85,247,.08));opacity:0;transition:opacity .35s}
        .work-cta-btn:hover::before{opacity:1}
        .work-cta-btn:hover{transform:translateY(-4px);border-color:rgba(192,132,252,.85);color:#e9d5ff;box-shadow:0 18px 42px rgba(124,58,237,.22)}
        .work-cta-icon,.work-cta-arrow,.work-cta-btn>span,.work-cta-btn>svg{position:relative;z-index:1}
        .work-cta-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.3);flex-shrink:0;transition:background .3s}
        .work-cta-btn:hover .work-cta-icon{background:rgba(168,85,247,.22)}
        .work-cta-arrow{flex-shrink:0;transition:transform .3s}
        .work-cta-btn:hover .work-cta-arrow{transform:translateX(4px)}

        .modal-backdrop{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(5,5,7,.78);backdrop-filter:blur(24px) saturate(120%);-webkit-backdrop-filter:blur(24px) saturate(120%);animation:backdropIn .35s ease forwards}
        @keyframes backdropIn{from{opacity:0}to{opacity:1}}
        
        .modal-container{
          width:100%;
          max-width:960px;
          position:relative;
          overflow:hidden;
          border-radius:10px;
          background:#08080f;
          border:1px solid rgba(168,85,247,.24);
          box-shadow:0 0 0 1px rgba(168,85,247,.08),0 40px 100px rgba(0,0,0,.8),0 0 80px rgba(124,58,237,.12);
          animation:modalIn .4s cubic-bezier(.16,1,.3,1) forwards;
          display:flex;
          flex-direction:column;
          max-height:90vh;
        }
        
        .modal-container--vertical{
          max-width:540px;
          max-height:95vh;
        }
        
        .modal-container--fullscreen{
          max-width:100%;
          max-height:100%;
          width:100%;
          height:100%;
          border-radius:0;
        }
        
        .modal-container--fullscreen .modal-header{
          position:absolute;
          top:0;
          left:0;
          right:0;
          z-index:10;
          background:linear-gradient(180deg,rgba(8,8,15,.95),transparent);
        }
        
        .modal-container--fullscreen .modal-video-wrap{
          height:100vh;
        }
        
        @keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        
        .modal-header{padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.05);background:linear-gradient(180deg,rgba(168,85,247,.03),transparent),#08080f;flex-shrink:0}
        .modal-header-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px}
        .modal-header-text{min-width:0;flex:1;padding-top:2px}
        .modal-title{font-size:18px;font-weight:700;color:rgba(255,255,255,.92);margin-bottom:4px;line-height:1.25}
        .modal-subtitle{font-family:monospace;font-size:12px;color:rgba(255,255,255,.35);line-height:1.4}
        .modal-tags{display:flex;flex-wrap:wrap;gap:8px}
        .modal-tag{font-family:monospace;font-size:10px;padding:3px 10px;border-radius:999px;color:rgba(192,132,252,.9);border:1px solid rgba(168,85,247,.25);background:rgba(168,85,247,.08)}
        .modal-close{width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);cursor:pointer;transition:all .25s}
        .modal-close:hover{background:rgba(168,85,247,.2);border-color:rgba(168,85,247,.5);color:#c084fc;transform:rotate(90deg)}
        
        .modal-video-wrap{
          position:relative;
          flex:1;
          background:#000;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
        }
        
        .modal-video{
          width:100%;
          height:100%;
          display:block;
          object-fit:contain;
          background:#000;
        }
        
        .modal-play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:3}
        .modal-play-btn{width:80px;height:80px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:#c084fc;background:rgba(124,58,237,.25);border:2px solid rgba(168,85,247,.6);backdrop-filter:blur(12px);box-shadow:0 0 40px rgba(124,58,237,.3);animation:playPulse 2s ease-in-out infinite}
        @keyframes playPulse{0%,100%{box-shadow:0 0 40px rgba(124,58,237,.3)}50%{box-shadow:0 0 60px rgba(124,58,237,.5)}}
        .modal-controls{position:absolute;left:0;right:0;bottom:0;z-index:5;padding:48px 20px 16px;background:linear-gradient(transparent,rgba(0,0,0,.86));transition:opacity .3s}
        .modal-progress-wrap{position:relative;height:4px;margin-bottom:12px;cursor:pointer;border-radius:2px}
        .modal-progress-bg{position:absolute;inset:0;border-radius:2px;background:rgba(255,255,255,.15)}
        .modal-progress-fill{position:absolute;top:0;left:0;bottom:0;border-radius:2px;background:linear-gradient(90deg,#7c3aed,#a855f7);transition:width .1s linear}
        .modal-progress-thumb{position:absolute;top:50%;width:12px;height:12px;border-radius:50%;transform:translate(-50%,-50%);background:#c084fc;box-shadow:0 0 8px rgba(168,85,247,.8);pointer-events:none;opacity:0;transition:opacity .2s}
        .modal-progress-wrap:hover .modal-progress-thumb{opacity:1}
        .modal-controls-row{display:flex;align-items:center;gap:12px}
        .modal-ctrl-btn{border:none;background:none;color:rgba(255,255,255,.75);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:color .2s,background .2s;flex-shrink:0}
        .modal-ctrl-btn:hover{color:#c084fc;background:rgba(168,85,247,.12)}
        .modal-ctrl-btn--right{margin-left:auto}
        .modal-volume-slider{width:72px;height:3px;appearance:none;-webkit-appearance:none;background:rgba(255,255,255,.2);border-radius:2px;outline:none;cursor:pointer}
        .modal-volume-slider::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#a855f7;cursor:pointer;border:none}
        .modal-volume-slider::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:#a855f7;cursor:pointer;border:none}
        .modal-time{font-family:monospace;font-size:11px;color:rgba(255,255,255,.5);white-space:nowrap;user-select:none}

        @media(max-width:1024px){.work-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:640px){
          .work-section{padding:80px 0}
          .work-header{margin-bottom:40px}
          .work-grid{grid-template-columns:1fr;gap:20px;margin-bottom:64px}
          .work-cta-btn{width:100%;justify-content:center;padding:18px 24px;font-size:12px;letter-spacing:2px}
          .modal-backdrop{padding:12px}
          .modal-container{max-height:95vh}
          .modal-container--vertical{max-width:100%}
          .modal-header{padding:14px 16px 12px}
          .modal-header-top{gap:12px;margin-bottom:12px}
          .modal-title{font-size:15px}
          .modal-subtitle{font-size:11px}
          .modal-close{width:34px;height:34px}
          .modal-controls{padding:32px 14px 12px}
          .modal-volume-slider{width:56px}
          .modal-time{font-size:10px}
        }
      `}</style>
    </section>
  );
}
