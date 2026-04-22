import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { language, t } = useLanguage();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: t('services.service1'),
      description: t('services.desc1'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: t('services.service2'),
      description: t('services.desc2'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('services.service3'),
      description: t('services.desc3'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: t('services.service4'),
      description: t('services.desc4'),
    },
  ];

  return (
    <section id="services" className="py-40 border-t border-[#1e1e2e] w-full">
      <div style={{ width: '100%', padding: '0 clamp(24px, 8vw, 120px)', boxSizing: 'border-box' }}>
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-purple-500 tracking-[0.3em] uppercase">
              {language === 'ru' ? '03 — Услуги' : '03 — Services'}
            </span>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white/90 mb-6 leading-tight">
              {t('services.title')}
            </h2>
            <p className="text-white/40 text-lg leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-8 border border-[#1e1e2e] hover:border-purple-700/60 bg-[#0a0a0f]/50 hover:bg-[#0a0a0f] rounded-sm transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-purple-900/20"
              data-hover
            >
              <div className="text-purple-400 mb-6 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white/90 mb-4">{service.title}</h3>
              <p className="text-white/40 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
<<<<<<< HEAD

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white font-mono text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
            data-hover
          >
            {t('services.cta')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
=======
>>>>>>> 7139c61b7c643a4e850fd2bffa8d2abe8b79ed79
      </div>
    </section>
  );
}
