import { useEffect, useRef, useState } from "react";

type Trail = {
  x: number;
  y: number;
  id: number;
};

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<Trail[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // ✅ Проверка мобилки
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsMobile(mobile);
  }, []);

  // ✅ Движение мыши
  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // создаём след
      setTrail((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ].slice(-20));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // ✅ Плавное следование
  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile]);

  // ✅ Удаление старых точек следа
  useEffect(() => {
    if (trail.length === 0) return;

    const timeout = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 40);

    return () => clearTimeout(timeout);
  }, [trail]);

  if (isMobile) return null;

  return (
    <>
      {/* След */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            width: 8,
            height: 8,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, #c084fc 0%, #7c3aed 60%, transparent 100%)",
            opacity: index / trail.length,
            zIndex: 9998,
          }}
        />
      ))}

      {/* Основной курсор */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 18,
          height: 18,
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle at 30% 30%, #e9d5ff, #a855f7 40%, #6b21a8 80%)",
          boxShadow: `
            0 0 10px #a855f7,
            0 0 25px rgba(168,85,247,0.6),
            0 0 60px rgba(168,85,247,0.4)
          `,
          zIndex: 9999,
        }}
      />
    </>
  );
}
