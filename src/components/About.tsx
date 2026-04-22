import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const { language } = useLanguage();
  const [photoHovered, setPhotoHovered] = useState(false);

  const skills = ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D', 'Photoshop', 'Final Cut Pro'];

  const timeline = [
    { year: '2023', text: language === 'ru' ? 'Старт карьеры в монтаже' : 'Started editing career' },
    { year: '2024', text: language === 'ru' ? 'Клипы, эдиты, реклама' : 'Music videos, edits, ads' },
    { year: '2025', text: language === 'ru' ? 'YouTube, рилс, инфлюенсеры' : 'YouTube, reels, influencers' },
  ];

  return (
    <section id="about" className="py-32 relative w-full border-t border-[#1e1e2e]">
      <div style={{ width: '100%', padding: '0 clamp(24px, 8vw, 120px)', boxSizing: 'border-box' }}>

        {/* Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-16">
            <div className="inline-block px-4 py-2 border border-purple-800/40 bg-purple-950/20 rounded-full mb-6">
              <span className="text-xs font-mono text-purple-300 tracking-widest uppercase">
                {language === 'ru' ? 'Обо мне' : 'About'}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Main — photo + text */}
        <div className="flex flex-col md:flex-row gap-16 items-start mb-20">

          {/* Photo */}
          <ScrollReveal direction="left" delay={200}>
            <div
              className="flex-shrink-0"
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
            >
              <div
                style={{
                  width: 'clamp(180px, 22vw, 260px)',
                  aspectRatio: '3/4',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: photoHovered ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.2)',
                  transition: 'all 0.6s ease',
                  transform: photoHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: photoHovered
                    ? '0 20px 60px rgba(168,85,247,0.15), 0 0 40px rgba(168,85,247,0.05)'
                    : 'none',
                }}
              >
                <img
                  src="/photo/me.jpg"
                  alt="DINARIX"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                    transform: photoHovered ? 'scale(1.05)' : 'scale(1)',
                    zIndex: 2,
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(107,33,168,0.15), rgba(168,85,247,0.08))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                  }}
                >
                  <div style={{
                    fontSize: '64px', transition: 'transform 0.6s ease',
                    transform: photoHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}>🎬</div>
                </div>

                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(168,85,247,0.1))',
                  opacity: photoHovered ? 1 : 0, transition: 'opacity 0.6s ease',
                  pointerEvents: 'none', zIndex: 3,
                }} />

                <div style={{
                  position: 'absolute', top: '-1px', left: '-1px', width: '20px', height: '20px',
                  borderTop: '2px solid rgba(168,85,247,0.5)', borderLeft: '2px solid rgba(168,85,247,0.5)',
                  opacity: photoHovered ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 4,
                }} />
                <div style={{
                  position: 'absolute', bottom: '-1px', right: '-1px', width: '20px', height: '20px',
                  borderBottom: '2px solid rgba(168,85,247,0.5)', borderRight: '2px solid rgba(168,85,247,0.5)',
                  opacity: photoHovered ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 4,
                }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <div className="flex-1">
            <ScrollReveal direction="right" delay={300}>
              <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-8 leading-tight">
                {language === 'ru' ? (
                  <>Делаю видео,<br /><span className="text-gradient">которое запоминается</span></>
                ) : (
                  <>I make videos<br /><span className="text-gradient">that stick</span></>
                )}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={450}>
              <p className="text-white/50 text-lg leading-relaxed mb-6 max-w-lg">
                {language === 'ru'
                  ? 'Монтаж, цвет, моушн — от идеи до финального рендера. Работаю быстро, слышу задачу, делаю так, чтобы зритель не листал дальше.'
                  : 'Editing, color, motion — from idea to final render. I work fast, understand the brief, and make content that stops the scroll.'
                }
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={550}>
              <p className="text-white/30 text-sm font-mono mb-10">
                {language === 'ru' ? '📍 Казань, Россия · Работаю удалённо' : '📍 Kazan, Russia · Working remotely'}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={650}>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border border-purple-800/30 bg-purple-950/10 hover:border-purple-600/60 hover:bg-purple-900/20 text-sm text-white/50 hover:text-white/70 font-mono rounded-sm transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {timeline.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 150}>
              <div className="p-6 border border-[#1e1e2e] hover:border-purple-700/40 bg-[#08080f] rounded-sm transition-all duration-300 group hover:translate-y-[-4px]">
                <div className="font-mono text-2xl font-bold text-purple-500 mb-3">{item.year}</div>
                <div className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {item.text}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Signature */}
        <ScrollReveal direction="left" delay={100}>
          <div className="pt-8 border-t border-[#1e1e2e]">
            <div className="text-gradient font-mono text-2xl">— DINARIX</div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}