import { useState, useEffect } from 'react';

const greetings = [
  { text: 'Привет', lang: 'RU' },
  { text: 'Hello', lang: 'EN' },
  { text: 'Bonjour', lang: 'FR' },
  { text: 'Ni Hao', lang: 'ZH' },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(107,33,168,0.3), transparent 70%)',
        filter: 'blur(60px)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: 'rgba(107,33,168,0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: '#c084fc',
          fontWeight: 'bold',
          fontSize: '14px',
        }}>DX</div>
        <span style={{
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '4px',
          fontSize: '14px',
          textTransform: 'uppercase',
        }}>DINARIX</span>
      </div>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div
          key={index}
          style={{
            fontSize: 'clamp(60px, 12vw, 120px)',
            fontWeight: 800,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'greetingIn 0.5s ease forwards',
            letterSpacing: '-2px',
          }}
        >
          {greetings[index].text}
        </div>
        <div style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          letterSpacing: '6px',
          color: 'rgba(255,255,255,0.2)',
          marginTop: '8px',
          textTransform: 'uppercase',
        }}>
          {greetings[index].lang}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #7c3aed, #c084fc)',
            width: `${((index + 1) / greetings.length) * 100}%`,
            transition: 'width 0.5s ease',
            borderRadius: '1px',
          }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {greetings.map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: i <= index ? '#a855f7' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes greetingIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
