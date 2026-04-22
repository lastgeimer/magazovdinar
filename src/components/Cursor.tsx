import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "button" | "project";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // ✅ Detect mobile
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsMobile(mobile);
  }, []);

  // ✅ Mouse move
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

  // ✅ Smooth follow
  useEffect(() => {
    if (isMobile) return;

    let frame: number;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.16;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
      }

      if (liquidRef.current) {
        liquidRef.current.style.transform = `
          translate(-50%, -50%)
          rotate(${Date.now() * 0.03}deg)
        `;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  if (isMobile) return null;

  // ✅ Refined sizes (уменьшили project)
  const size =
    mode === "default"
      ? 22
      : mode === "button"
      ? 42
      : 56; // project (было 80)

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
          "width 0.25s ease, height 0.25s ease, border-radius 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
        borderRadius: mode === "project" ? "40%" : "50%",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: isRing
          ? "rgba(168,85,247,0.06)"
          : "rgba(168,85,247,0.12)",
        border: isRing
          ? "1.5px solid rgba(192,132,252,0.9)"
          : "1px solid rgba(168,85,247,0.6)",
        boxShadow: isRing
          ? `
            0 0 20px rgba(168,85,247,0.6),
            0 0 50px rgba(168,85,247,0.25)
          `
          : `
            0 0 10px rgba(168,85,247,0.5),
            0 0 25px rgba(168,85,247,0.2)
          `,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* ✅ Subtle liquid */}
      <div
        ref={liquidRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "130%",
          height: "130%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(233,213,255,0.4), rgba(168,85,247,0.25), transparent 70%)",
          borderRadius: "45%",
          filter: "blur(14px)",
          opacity: mode === "default" ? 0.6 : 0.35,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
