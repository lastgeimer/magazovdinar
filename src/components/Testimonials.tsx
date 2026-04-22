import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
<<<<<<< HEAD
    { quote: t('testimonials.quote1'), author: t('testimonials.author1') },
    { quote: t('testimonials.quote2'), author: t('testimonials.author2') },
    { quote: t('testimonials.quote3'), author: t('testimonials.author3') },
=======
    {
      quote: t('testimonials.quote1'),
      author: t('testimonials.author1'),
    },
    {
      quote: t('testimonials.quote2'),
      author: t('testimonials.author2'),
    },
    {
      quote: t('testimonials.quote3'),
      author: t('testimonials.author3'),
    },
>>>>>>> 7139c61b7c643a4e850fd2bffa8d2abe8b79ed79
  ];

  return (
    <section id="testimonials" className="py-40 border-t border-[#1e1e2e] w-full">
      <div style={{ width: '100%', padding: '0 clamp(24px, 8vw, 120px)', boxSizing: 'border-box' }}>
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 border border-purple-800/40 bg-purple-950/20 rounded-full mb-6">
            <span className="text-xs font-mono text-purple-300 tracking-widest uppercase">{t('testimonials.title')}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white/90 leading-tight">
            {t('testimonials.subtitle')}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 border border-[#1e1e2e] hover:border-purple-700/60 bg-[#0a0a0f]/50 hover:bg-[#0a0a0f] rounded-sm transition-all duration-500 group"
              data-hover
            >
              {/* Quote icon */}
              <div className="text-purple-400/40 mb-6 group-hover:text-purple-400/60 transition-colors">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-white/60 leading-relaxed mb-6 italic">{testimonial.quote}</p>

              <div className="pt-6 border-t border-[#1e1e2e]">
                <div className="font-mono text-white/80">{testimonial.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
