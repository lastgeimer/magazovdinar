import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playSound } from '../utils/sounds';
import SoundToggle from './SoundToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { label: t('nav.works'), id: 'work' },
    { label: t('nav.about'), id: 'about' },
    { label: language === 'ru' ? 'Процесс' : 'Process', id: 'process' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    playSound('whoosh');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleLanguage = () => {
    playSound('toggle');
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-blur border-b border-[#1e1e2e]' : 'bg-transparent'
      }`}
    >
      <div
        style={{
          width: '100%',
          padding: '0 clamp(24px, 8vw, 120px)',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => {
            playSound('click');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded bg-purple-600/20 group-hover:bg-purple-600/40 transition-colors duration-300" />
            <span className="text-purple-400 font-mono font-bold text-sm relative z-10">DX</span>
          </div>
          <span className="font-semibold tracking-widest text-sm text-white/90 uppercase">
            DINARIX
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => playSound('hover')}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wider uppercase font-mono relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound toggle */}
          <SoundToggle />

          {/* Language */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-mono tracking-wider text-white/70 border border-white/10 hover:border-purple-500/50 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
          >
            {language === 'ru' ? 'RU' : 'EN'}
          </button>

          {/* Hire */}
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 text-sm font-mono tracking-wider text-purple-300 border border-purple-700/60 hover:border-purple-500 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300 rounded-sm"
          >
            {t('nav.hire')}
          </button>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden flex items-center gap-3">
          <SoundToggle />
          <button
            onClick={() => {
              playSound('click');
              setMenuOpen(!menuOpen);
            }}
            className="flex flex-col gap-1.5 p-1"
          >
            <span
              className={`block w-6 h-px bg-white/70 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-4 h-px bg-white/70 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white/70 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden nav-blur ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-[#1e1e2e]">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-sm text-white/60 hover:text-white font-mono tracking-wider uppercase transition-colors"
            >
              {link.label}
            </button>
          ))}

          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <button
              onClick={toggleLanguage}
              className="text-left text-sm text-white/60 hover:text-white font-mono tracking-wider uppercase transition-colors"
            >
              {language === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
            </button>
          </div>

          <button
            onClick={() => scrollTo('contact')}
            className="text-left text-sm text-purple-400 hover:text-purple-300 font-mono tracking-wider uppercase transition-colors"
          >
            {t('nav.hire')}
          </button>
        </div>
      </div>
    </nav>
  );
}