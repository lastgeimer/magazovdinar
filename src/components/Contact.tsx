import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { playSound } from '../utils/sounds';

export default function Contact() {
  const { language } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('dinarix_work@mail.ru').then(() => {
      playSound('success');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const contacts = [
    {
      name: 'Telegram',
      value: '@ManFairFold',
      href: 'https://t.me/ManFairFold',
      color: '#229ED9',
      isEmail: false,
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.34 4.24 12.42c-.642-.204-.655-.642.135-.955l11.15-4.3c.539-.194 1.01.131.83.944l-.461.112z" />
        </svg>
      ),
    },
    {
      name: copiedEmail ? (language === 'ru' ? '✓ Скопировано' : '✓ Copied') : 'Email',
      value: copiedEmail ? '' : 'dinarix_work@mail.ru',
      href: '#',
      color: copiedEmail ? '#22c55e' : '#a855f7',
      isEmail: true,
      icon: copiedEmail ? (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'MAX',
      value: language === 'ru' ? 'Профиль на MAX' : 'MAX Profile',
      href: 'https://max.ru/u/f9LHodD0cOJylTeCWGav5B2LnEMTuGGDV26Iv8XhNlzfGIEnOucRJkZyLCQ',
      color: '#FF6B35',
      isEmail: false,
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        <ScrollReveal direction="up" delay={0}>
          <div className="contact-header">
            <div className="contact-tag">
              <span className="font-mono text-xs text-purple-500 tracking-[0.3em] uppercase">
                {language === 'ru' ? '04 — Контакты' : '04 — Contact'}
              </span>
            </div>
            <h2 className="contact-title">
              {language === 'ru' ? 'Давайте создадим' : "Let's create"}{' '}
              <span className="text-gradient">
                {language === 'ru' ? 'что-то вместе' : 'something together'}
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="contact-cards">
          {contacts.map((contact, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 150 + 200}>
              <a
                href={contact.href}
                target={contact.isEmail ? undefined : '_blank'}
                rel={contact.isEmail ? undefined : 'noopener noreferrer'}
                onClick={(e) => {
                  if (contact.isEmail) {
                    handleEmailClick(e);
                  } else {
                    playSound('pop');
                  }
                }}
                className="contact-card-link"
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  playSound('hover');
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                data-hover
              >
                <div
                  className="contact-card"
                  style={{
                    borderColor: hoveredIdx === idx ? `${contact.color}60` : '#1e1e2e',
                    transform: hoveredIdx === idx ? 'translateY(-12px)' : 'translateY(0)',
                    boxShadow: hoveredIdx === idx
                      ? `0 20px 60px ${contact.color}15, 0 0 40px ${contact.color}08`
                      : 'none',
                  }}
                >
                  <div
                    className="contact-card-glow"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${contact.color}10, transparent 70%)`,
                      opacity: hoveredIdx === idx ? 1 : 0,
                    }}
                  />
                  <div
                    className="contact-card-line-top"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${contact.color}, transparent)`,
                      width: hoveredIdx === idx ? '100%' : '0%',
                    }}
                  />
                  <div
                    className="contact-card-icon"
                    style={{
                      background: hoveredIdx === idx ? `${contact.color}20` : 'rgba(168,85,247,0.08)',
                      borderColor: hoveredIdx === idx ? `${contact.color}40` : 'rgba(168,85,247,0.15)',
                      color: hoveredIdx === idx ? contact.color : 'rgba(168,85,247,0.6)',
                      transform: hoveredIdx === idx ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {contact.icon}
                  </div>
                  <h3
                    className="contact-card-name"
                    style={{ color: hoveredIdx === idx ? contact.color : 'rgba(255,255,255,0.9)' }}
                  >
                    {contact.name}
                  </h3>
                  {contact.value && <p className="contact-card-value">{contact.value}</p>}
                  <div className="contact-card-arrow">
                    <div
                      className="contact-card-arrow-circle"
                      style={{
                        background: hoveredIdx === idx ? `${contact.color}20` : 'transparent',
                        borderColor: hoveredIdx === idx ? `${contact.color}40` : 'rgba(255,255,255,0.1)',
                        transform: hoveredIdx === idx ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      <svg className="w-4 h-4" fill="none"
                        stroke={hoveredIdx === idx ? contact.color : 'rgba(255,255,255,0.3)'}
                        viewBox="0 0 24 24" style={{ transition: 'stroke 0.3s ease' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="contact-card-line-bottom"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${contact.color}, transparent)`,
                      width: hoveredIdx === idx ? '100%' : '0%',
                    }}
                  />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={700}>
          <div className="contact-response">
            <div className="contact-response-inner">
              <div className="contact-response-dot" />
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
                {language === 'ru' ? 'Отвечаю в течение часа' : 'Response within an hour'}
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        .contact-section { padding: 160px 0 128px; border-top: 1px solid #1e1e2e; width: 100%; }
        .contact-container { width: 100%; padding: 0 clamp(24px, 8vw, 120px); box-sizing: border-box; }
        .contact-header { margin-bottom: 80px; text-align: center; }
        .contact-tag { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; }
        .contact-title { font-size: clamp(32px, 5vw, 60px); font-weight: 800; color: rgba(255,255,255,0.9); line-height: 1.1; }
        .contact-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 900px; margin: 0 auto; }
        .contact-card-link { display: block; text-decoration: none; color: inherit; }
        .contact-card {
          position: relative; padding: 40px 24px; border: 1px solid #1e1e2e; border-radius: 4px;
          background: rgba(10,10,15,0.8); transition: all 0.5s ease; overflow: hidden;
          text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .contact-card-glow { position: absolute; inset: 0; transition: opacity 0.7s ease; pointer-events: none; }
        .contact-card-line-top { position: absolute; top: 0; left: 0; height: 2px; transition: width 0.7s ease; }
        .contact-card-line-bottom { position: absolute; bottom: 0; right: 0; height: 2px; transition: width 0.7s ease 0.1s; }
        .contact-card-icon {
          width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; border: 1px solid; margin-bottom: 20px; transition: all 0.5s ease;
        }
        .contact-card-name { font-size: 18px; font-weight: 700; margin-bottom: 6px; transition: color 0.3s ease; }
        .contact-card-value { color: rgba(255,255,255,0.4); font-family: monospace; font-size: 13px; transition: color 0.3s ease; }
        .contact-card-link:hover .contact-card-value { color: rgba(255,255,255,0.6); }
        .contact-card-arrow { margin-top: 20px; display: flex; justify-content: center; }
        .contact-card-arrow-circle {
          width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; border: 1px solid; transition: all 0.5s ease;
        }
        .contact-response { margin-top: 64px; text-align: center; }
        .contact-response-inner {
          display: inline-flex; align-items: center; gap: 12px; padding: 12px 24px;
          border: 1px solid #1e1e2e; border-radius: 100px; background: rgba(10,10,15,0.5);
        }
        .contact-response-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          animation: contactPulse 1.5s ease-in-out infinite; box-shadow: 0 0 8px rgba(34,197,94,0.6);
        }
        @keyframes contactPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @media (max-width: 768px) {
          .contact-section { padding: 100px 0 80px; }
          .contact-header { margin-bottom: 48px; }
          .contact-cards { grid-template-columns: 1fr; gap: 20px; max-width: 400px; }
          .contact-card { padding: 32px 20px; }
          .contact-card-icon { width: 56px; height: 56px; }
          .contact-response { margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}