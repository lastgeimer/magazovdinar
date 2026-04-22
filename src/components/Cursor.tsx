import { useEffect, useRef, useState } from "react";

const FRAME_SIZE = 128; // подгони если нужно

const COLS = 3;
const ROWS = 4;

const IDLE_ROW = 0;
const RUN_ROW = 2;
const SIT_ROW = 3;
const SLEEP_ROW = 3; // можно оставить тот же ряд если нет отдельной позы сна

const RUN_FRAMES = 3;

const FRICTION = 0.90;
const SPEED = 0.15;

const SLEEP_DELAY = 10000; // 10 секунд

type TrailDot = {
  x: number;
  y: number;
  life: number;
  id: number;
};

export default function Cursor() {
  const dogRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const velocity = useRef({ x: 0, y: 0 });

  const [frame, setFrame] = useState(0);
  const [row, setRow] = useState(IDLE_ROW);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);

  const lastMoveTime = useRef(Date.now());

  // ✅ Определение мобильного устройства
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsMobile(mobile);

    if (!mobile) {
      document.body.style.cursor = "none";
    }
  }, []);

  // ✅ Движение мыши
  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lastMoveTime.current = Date.now();

      if (isSleeping) {
        setIsSleeping(false);
        setRow(IDLE_ROW);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile, isSleeping]);

  // ✅ Основная анимация
  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number;

    const animate = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      velocity.current.x += dx * SPEED;
      velocity.current.y += dy * SPEED;

      velocity.current.x *= FRICTION;
      velocity.current.y *= FRICTION;

      pos.current.x += velocity.current.x;
      pos.current.y += velocity.current.y;

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      const idleTime = Date.now() - lastMoveTime.current;

      // ✅ Сон через 10 секунд
      if (idleTime > SLEEP_DELAY) {
        setIsSleeping(true);
        setRow(SLEEP_ROW);
      }

      // ✅ Если не спит
      if (!isSleeping) {
        if (velocity.current.x !== 0) {
          setDirection(velocity.current.x > 0 ? 1 : -1);
        }

        if (speed > 0.5) {
          setRow(RUN_ROW);

          // след
          setTrail((prev) => [
            ...prev,
            {
              x: pos.current.x,
              y: pos.current.y,
              life: 1,
              id: Date.now(),
            },
          ].slice(-15));
        } else {
          setRow(IDLE_ROW);
        }
      }

      // ✅ обновление следа
      setTrail((prev) =>
        prev
          .map((t) => ({ ...t, life: t.life - 0.03 }))
          .filter((t) => t.life > 0)
      );

      // ✅ дыхание во сне
      const breathe = isSleeping
        ? 1 + Math.sin(Date.now() * 0.002) * 0.05
        : 1;

      if (dogRef.current) {
        dogRef.current.style.transform = `
          translate(${pos.current.x - FRAME_SIZE / 2}px, ${
          pos.current.y - FRAME_SIZE / 2
        }px)
          scaleX(${direction})
          scale(${breathe})
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile, isSleeping]);

  // ✅ Анимация бега
  useEffect(() => {
    if (row !== RUN_ROW || isSleeping) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % RUN_FRAMES);
    }, 120);

    return () => clearInterval(interval);
  }, [row, isSleeping]);

  // ✅ Полностью отключаем на мобилках
  if (isMobile) return null;

  return (
    <>
      {/* След */}
      {!isSleeping &&
        trail.map((dot) => (
          <div
            key={dot.id}
            style={{
              position: "fixed",
              left: dot.x,
              top: dot.y,
              width: 6,
              height: 6,
              background: "#a855f7",
              borderRadius: "50%",
              pointerEvents: "none",
              opacity: dot.life,
              transform: "translate(-50%, -50%)",
              zIndex: 9998,
            }}
          />
        ))}

      {/* Собака */}
      <div
        ref={dogRef}
        style={{
          position: "fixed",
          width: FRAME_SIZE,
          height: FRAME_SIZE,
          backgroundImage: "url('/dog.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${frame * FRAME_SIZE}px -${
            row * FRAME_SIZE
          }px`,
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
