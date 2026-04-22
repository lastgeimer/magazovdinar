import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  // ✅ Проверка мобильного
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsMobile(mobile);
  }, []);

  // ✅ Отслеживание мыши
  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // ✅ Магнит к кнопкам
  useEffect(() => {
    if (isMobile) return;

    const magneticElements = document.querySelectorAll(
      "a, button, [data-magnetic]"
    );

    magneticElements.forEach((el) => {
      const element = el as HTMLElement;

      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        mouse.current.x = centerX + distanceX * 0.3;
        mouse.current.y = centerY + distanceY * 0.3;

        targetScale.current = 1.8;
      });

      element.addEventListener("mouseleave", () => {
        targetScale.current = 1;
      });
    });
  }, [isMobile]);

  // ✅ Анимация
  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      currentScale.current +=
        (targetScale.current - currentScale.current) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate(${pos.current.x}px, ${pos.current.y}px)
          scale(${currentScale.current})
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: 28,
        height: 28,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background:
          "radial-gradient(circle at 30% 30%, rgba(233,213,255,0.8), rgba(168,85,247,0.4) 40%, rgba(124,58,237,0.2) 70%, transparent 100%)",
        border: "1px solid rgba(168,85,247,0.6)",
        boxShadow: `
          0 0 15px rgba(168,85,247,0.7),
          0 0 40px rgba(168,85,247,0.4)
        `,
        zIndex: 9999,
      }}
    />
  );
}
