import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "button" | "project";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // ✅ Mobile detection
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsMobile(mobile);
  }, []);

  // ✅ Mouse tracking
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

    const buttons = document.querySelectorAll("a, button");
    const projects = document.querySelectorAll("[data-project]");

    buttons.forEach((el) => {
      el.addEventListener("mouseenter", () => setMode("button"));
      el.addEventListener("mouseleave", () => setMode("default"));
    });

    projects.forEach((el) => {
      el.addEventListener("mouseenter", () => setMode("project"));
      el.addEventListener("mouseleave", () => setMode("default"));
    });
  }, [isMobile]);

  // ✅ Smooth animation
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

      if (liquidRef.current) {
        liquidRef.current.style.transform = `
          translate(-50%, -50%)
          rotate(${Date.now() * 0.05}deg)
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile]);

  if (isMobile) return null;

  // ✅ Размеры по режимам
  const size =
    mode === "default" ? 28 :
    mode === "button" ? 60 :
    80;

  const isRing = mode !== "default";

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition:
          "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        borderRadius: mode === "project" ? "35%" : "50%",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: isRing
          ? "rgba(168,85,247,0.08)"
          : "rgba(168,85,247,0.15)",
        border: isRing
          ? "2px solid rgba(168,85,247,0.9)"
          : "1px solid rgba(168,85,247,0.6)",
        boxShadow: isRing
          ? `
            0 0 25px rgba(168,85,247,0.9),
            0 0 70px rgba(168,85,247,0.4)
          `
          : `
            0 0 15px rgba(168,85,247,0.6),
            0 0 40px rgba(168,85,247,0.3)
          `,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* ✅ Liquid animation */}
      <div
        ref={liquidRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "140%",
          height: "140%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(233,213,255,0.6), rgba(168,85,247,0.4), transparent 70%)",
          borderRadius: "45%",
          filter: "blur(12px)",
          opacity: mode === "default" ? 0.7 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
