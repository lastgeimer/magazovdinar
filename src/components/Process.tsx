import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { playSound } from '../utils/sounds';

export default function Process() {
  const { language } = useLanguage();

  const steps = [
    {
      number: '01',
      title: language === 'ru' ? 'Задача' : 'Brief',
      description: language === 'ru'
        ? 'Вы отправляете материал, референсы и цель ролика.'
        : 'You send the material, references and the goal of the video.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: language === 'ru' ? 'Монтаж' : 'Editing',
      description: language === 'ru'
        ? 'Собираю первый вариант под формат, задачу и площадку.'
        : 'I assemble the first version for the format, task and platform.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: language === 'ru' ? 'Правки' : 'Revisions',
      description: language === 'ru'
        ? 'Быстро вносим правки при наличии.'
        : 'We quickly make revisions if needed.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: language === 'ru' ? 'Финал' : 'Final',
      description: language === 'ru'
        ? 'Отдаю готовый ролик.'
        : 'I deliver the finished video.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">

        <ScrollReveal direction="up" delay={0}>
          <div className="process-header">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-purple-500 tracking-[0.3em] uppercase">
                {language === 'ru' ? '03 — Процесс' : '03 — Process'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 leading-tight">
              {language === 'ru' ? 'Как проходит ' : 'How it '}
              <span className="text-gradient">{language === 'ru' ? 'работа' : 'works'}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 150 + 100}>
              <div
                className="process-card group"
                data-hover
                onMouseEnter={() => playSound('hover')}
              >
                <div className="process-card-watermark">{step.number}</div>

                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-xs text-purple-500 tracking-[0.3em]">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-800/60 to-transparent" />
                </div>

                <div className="text-purple-400 mb-6 group-hover:text-purple-300 transition-colors duration-300">
                  {step.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-4 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm md:text-base group-hover:text-white/60 transition-colors duration-300">
                  {step.description}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-purple-600 to-transparent transition-all duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={700}>
          <div className="process-cta">
            <button
              onClick={() => {
                playSound('whoosh');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="process-cta-btn"
              data-hover
            >
              {language === 'ru' ? 'Обсудить проект' : 'Discuss project'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        .process-section { padding: 128px 0; border-top: 1px solid #1e1e2e; width: 100%; }
        .process-container { width: 100%; padding: 0 clamp(24px, 8vw, 120px); box-sizing: border-box; }
        .process-header { margin-bottom: 80px; }
        .process-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px; }
        .process-card {
          position: relative; padding: 40px; background: #08080f;
          border: 1px solid #1e1e2e; border-radius: 4px; transition: all 0.5s ease;
        }
        .process-card:hover {
          border-color: rgba(124,58,237,0.4); transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(124,58,237,0.08);
        }
        .process-card-watermark {
          position: absolute; top: 24px; right: 32px;
          font-family: monospace; font-weight: 800; font-size: 80px; line-height: 1;
          color: rgba(255,255,255,0.02); user-select: none; pointer-events: none;
          transition: color 0.5s ease;
        }
        .process-card:hover .process-card-watermark { color: rgba(255,255,255,0.05); }
        .process-cta { margin-top: 100px; text-align: center; }
        .process-cta-btn {
          display: inline-flex; align-items: center; gap: 16px; padding: 18px 48px;
          background: linear-gradient(135deg, #7c3aed, #a855f7); color: white;
          font-family: monospace; font-size: 15px; letter-spacing: 3px; text-transform: uppercase;
          border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s ease;
        }
        .process-cta-btn:hover {
          transform: translateY(-4px); box-shadow: 0 15px 40px rgba(168,85,247,0.35);
        }
        @media (max-width: 768px) {
          .process-section { padding: 80px 0; }
          .process-header { margin-bottom: 48px; }
          .process-grid { grid-template-columns: 1fr; gap: 24px; }
          .process-card { padding: 28px; }
          .process-card-watermark { font-size: 50px; top: 16px; right: 20px; }
          .process-cta { margin-top: 60px; }
          .process-cta-btn {
            padding: 14px 32px; font-size: 13px; letter-spacing: 2px;
            width: 100%; justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}