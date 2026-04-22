import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // ✅ Hover detection
  useEffect(() => {
    if (isMobile) return;

    const hoverElements = document.querySelectorAll(
      "a, button, [data-magnetic]"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHovering(true));
      el.addEventListener("mouseleave", () => setIsHovering(false));
    });
  }, [isMobile]);

  // ✅ Анимация движения
  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
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
        left: 0,
        top: 0,
        width: isHovering ? 60 : 28,
        height: isHovering ? 60 : 28,
        borderRadius: isHovering ? "40%" : "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        // ✅ MORPH: шар → кольцо
        background: isHovering
          ? "transparent"
          : "radial-gradient(circle at 30% 30%, rgba(233,213,255,0.9), rgba(168,85,247,0.5) 40%, rgba(124,58,237,0.2) 70%)",

        border: isHovering
          ? "2px solid rgba(168,85,247,0.9)"
          : "1px solid rgba(168,85,247,0.6)",

        boxShadow: isHovering
          ? `
            0 0 20px rgba(168,85,247,0.9),
            0 0 60px rgba(168,85,247,0.5),
            inset 0 0 20px rgba(168,85,247,0.4)
          `
          : `
            0 0 15px rgba(168,85,247,0.6),
            0 0 40px rgba(168,85,247,0.3)
          `,

        zIndex: 9999,
      }}
    />
  );
}
