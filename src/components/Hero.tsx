import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { playSound, preloadSounds } from '../utils/sounds';

const roles = ['hero.role1', 'hero.role2', 'hero.role3', 'hero.role4'];

const marqueeItems = [
  'Premiere Pro', '·', 'After Effects', '·', 'DaVinci Resolve', '·',
  'Цветокоррекция', '·', 'Моушн-дизайн', '·', 'Звуковой дизайн', '·',
  'VFX', '·', 'Операторская работа', '·', 'Сторителлинг', '·', '4K / 8K', '·',
];

export default function Hero() {
  const { language, t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  useEffect(() => {
    const currentRole = t(roles[roleIndex]);
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 60 : 100;
      timeout = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentRole.slice(0, displayedText.length - 1)
            : currentRole.slice(0, displayedText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, language]);

  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="hero-inner">
        <div className="hero-content">
          <ScrollReveal direction="down" delay={200} duration={900}>
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              <span className="hero-badge-text">
                {language === 'ru' ? 'Открыт для проектов' : 'Available for projects'}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400} duration={1000}>
            <h1 className="hero-name">DINARIX</h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={600} duration={900}>
            <div className="hero-typewriter">
              <span className="hero-role">
                {displayedText}
                <span className="hero-cursor" />
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={800} duration={900}>
            <p className="hero-desc">{t('hero.description')}</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={1000} duration={900}>
            <div className="hero-ctas">
              <button
                onClick={() => {
                  playSound('whoosh');
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-btn-primary"
                data-hover
              >
                {t('hero.viewWork')}
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-btn-outline"
                data-hover
              >
                {t('hero.contact')}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={1200} duration={900}>
            <div className="hero-stats">
              {[
                { num: '2+', label: t('hero.stat1') },
                { num: '50+', label: t('hero.stat2') },
                { num: '30+', label: t('hero.stat3') },
              ].map((stat, i) => (
                <div key={i} className="hero-stat">
                  <div className="hero-stat-num">{stat.num}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal direction="up" delay={1400} duration={800}>
        <div className="hero-marquee">
          <div className="hero-marquee-fade-left" />
          <div className="hero-marquee-fade-right" />
          <div className="flex animate-marquee whitespace-nowrap w-max">
            {doubled.map((item, i) => (
              <span
                key={i}
                className={`mx-4 font-mono text-xs tracking-widest uppercase ${
                  item === '·' ? 'text-purple-600' : 'text-white/25'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        .hero-section {
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .hero-orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .hero-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(107,33,168,0.2), transparent 70%);
          filter: blur(80px);
          top: 20%; left: 50%; transform: translateX(-50%);
        }
        .hero-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
          filter: blur(60px);
          bottom: 20%; right: 10%;
        }
        .hero-inner {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 0;
          position: relative;
          z-index: 1;
        }
        .hero-content {
          text-align: center;
          width: 100%;
          max-width: 800px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border: 1px solid rgba(107,33,168,0.4);
          background: rgba(59,7,100,0.2);
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .hero-badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: greenPulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
        }
        .hero-badge-text {
          font-family: monospace;
          font-size: clamp(9px, 1.5vw, 13px);
          color: rgba(255,255,255,0.5);
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        .hero-name {
          font-family: monospace;
          font-size: clamp(40px, 10vw, 140px);
          font-weight: 800;
          color: rgba(255,255,255,0.95);
          line-height: 1;
          letter-spacing: -2px;
          margin-bottom: 16px;
        }
        .hero-typewriter {
          height: clamp(32px, 4vw, 50px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .hero-role {
          font-family: monospace;
          font-size: clamp(16px, 2.5vw, 28px);
          color: #a855f7;
          letter-spacing: 2px;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px; height: 1em;
          background: #a855f7;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: cursorBlink 1s step-start infinite;
        }
        .hero-desc {
          color: rgba(255,255,255,0.4);
          font-size: clamp(13px, 1.8vw, 17px);
          max-width: 550px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: clamp(24px, 5vw, 60px);
          flex-wrap: wrap;
        }
        .hero-stat { text-align: center; }
        .hero-stat-num {
          font-family: monospace;
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 800;
          background: linear-gradient(135deg, #a855f7, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-stat-label {
          font-family: monospace;
          font-size: clamp(9px, 1vw, 11px);
          color: rgba(255,255,255,0.3);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .hero-marquee {
          position: relative;
          padding: 12px 0;
          border-top: 1px solid #1e1e2e;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hero-marquee-fade-left {
          position: absolute; left: 0; top: 0; bottom: 0; width: 80px;
          z-index: 10; pointer-events: none;
          background: linear-gradient(90deg, #0a0a0f, transparent);
        }
        .hero-marquee-fade-right {
          position: absolute; right: 0; top: 0; bottom: 0; width: 80px;
          z-index: 10; pointer-events: none;
          background: linear-gradient(-90deg, #0a0a0f, transparent);
        }
        .hero-btn-primary {
          padding: 12px 28px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; border: none; border-radius: 4px;
          font-family: monospace; font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s ease;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(168,85,247,0.4);
        }
        .hero-btn-outline {
          padding: 12px 28px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px; font-family: monospace;
          font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer; transition: all 0.3s ease;
        }
        .hero-btn-outline:hover {
          transform: translateY(-3px);
          border-color: rgba(168,85,247,0.6);
          color: white;
          box-shadow: 0 10px 30px rgba(168,85,247,0.15);
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes greenPulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(34,197,94,0.6); }
          50% { opacity: 0.4; transform: scale(0.7); box-shadow: 0 0 16px rgba(34,197,94,0.8); }
        }
        @media (max-width: 768px) {
          .hero-inner { padding: 70px 16px 0; }
          .hero-badge { padding: 6px 14px; margin-bottom: 16px; }
          .hero-name { margin-bottom: 12px; }
          .hero-desc { margin-bottom: 24px; }
          .hero-ctas { margin-bottom: 28px; gap: 10px; }
          .hero-btn-primary, .hero-btn-outline { padding: 10px 20px; font-size: 11px; }
          .hero-stats { gap: 20px; }
        }
        @media (max-width: 480px) {
          .hero-ctas { flex-direction: column; }
          .hero-btn-primary, .hero-btn-outline { width: 100%; text-align: center; }
        }
      `}</style>
    </section>
  );
}