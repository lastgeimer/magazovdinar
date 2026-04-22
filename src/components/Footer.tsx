import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-[#1e1e2e] w-full">
      <div style={{ width: '100%', padding: '0 clamp(24px, 8vw, 120px)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-purple-600/20 rounded flex items-center justify-center">
            <span className="text-purple-400 font-mono font-bold text-xs">DX</span>
          </div>
          <span className="font-semibold tracking-widest text-xs text-white/60 uppercase font-mono">DINARIX</span>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-xs font-mono tracking-wider">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
