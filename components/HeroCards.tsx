"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// La azul va ÚLTIMA (queda a la derecha y es la que sube primero)
const cards = [
  { id: 1, gradient: "from-rose-400 via-pink-400 to-orange-300", label: "Portafolio" },
  { id: 3, gradient: "from-amber-300 via-yellow-400 to-orange-500", label: "Stack" },
  { id: 4, gradient: "from-emerald-400 via-green-400 to-teal-500", label: "Contacto" },
  { id: 2, gradient: "from-sky-400 via-blue-400 to-indigo-500", label: "Quien soy" }, // azul (líder)
];

const N = cards.length;
const CENTER = (N - 1) / 2; // 1.5 con 4 cards
const LEAD = N - 1; // la azul: sube al centro y termina a la derecha
const SPACING = 145; // separación horizontal entre cards
const ROTATE = 12; // grados de inclinación por card (abanico)
const ARC_Y = 26; // cuánto bajan las cards de los extremos (arco)
const PUSH = 170; // cuánto se abre la vecina más cercana al hacer hover
const SPREAD = 90; // separación extra por cada card más lejana (evita que se monten)
const LIFT = 48; // cuánto se levanta la card activa
const STEP = 0.15; // segundos entre que sale una card y la siguiente (intro)

// Curva suave para la subida de la card líder
const riseTransition = {
  type: "tween" as const,
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function HeroCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  // expanded: ya salieron las demás. settled: terminó toda la intro.
  const [expanded, setExpanded] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // 1) la azul ya está en el centro → se va a la derecha y salen las demás
    //    desde atrás → 2) asentado
    const t1 = setTimeout(() => setExpanded(true), 50);
    const t2 = setTimeout(() => setSettled(true), 1550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-6">
      <p
        style={{ fontFamily: "var(--font-hand)" }}
        className="absolute left-[42%] top-28 -translate-x-1/2 -rotate-6 text-center text-4xl leading-snug text-zinc-700 sm:top-36 sm:text-5xl"
      >
        Bienvenido a mi rincón
        <br />
        en internet :)
      </p>

      <div className="relative mt-40 flex h-72 w-full items-center justify-center sm:mt-48">
        {cards.map((card, i) => {
          const baseX = (i - CENTER) * SPACING;
          const baseRotate = (i - CENTER) * ROTATE;
          const baseY = Math.abs(i - CENTER) * ARC_Y;

          let x = baseX;
          let y = baseY;
          let rotate = baseRotate;
          let scale = 1;
          let zIndex = i;
          let opacity = 1;

          if (!expanded) {
            // ---- Intro: la azul aparece CENTRADA, el resto detrás de ella ----
            if (i === LEAD) {
              x = 0;
              y = 0;
              rotate = 0;
            } else {
              // apiladas EXACTAMENTE detrás de la azul (en el centro), invisibles
              x = 0;
              y = 0;
              rotate = 0;
              opacity = 0;
            }
          } else if (hovered !== null) {
            // ---- Ya expandido, con hover ----
            if (i === hovered) {
              rotate = 0;
              y = baseY - LIFT;
              scale = 1.12;
            } else {
              const dir = i < hovered ? -1 : 1;
              const dist = Math.abs(i - hovered);
              x = baseX + dir * (PUSH + (dist - 1) * SPREAD);
            }
          }

          // La azul se queda ADELANTE hasta que toda la intro termina, así las
          // demás salen genuinamente desde atrás de ella.
          if (i === LEAD && !settled) zIndex = 50;

          // El escalonado es SOLO durante la intro. Una vez asentado todo, el
          // hover y el volver a su lugar pasan sin delay → todas a la vez.
          const revealDelay =
            expanded && !settled ? Math.abs(i - LEAD) * STEP : 0;

          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => expanded && setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              // La azul arranca centrada y a color pleno. Las demás arrancan
              // detrás de la azul, en su color pero ocultas.
              initial={
                i === LEAD
                  ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                  : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 0 }
              }
              animate={{ x, y, rotate, scale, opacity, zIndex }}
              transition={{
                // Subida suave para la azul; resorte para el resto del movimiento
                ...(i === LEAD && !expanded
                  ? riseTransition
                  : {
                      type: "spring",
                      stiffness: 200,
                      damping: 26,
                      // la azul se mueve primero, y cada card sale tras la anterior
                      delay: revealDelay,
                    }),
                // Cada card aparece con un fundido suave, escalonado, mientras la
                // azul se va moviendo hacia la derecha.
                opacity: { duration: 0.6, ease: "easeOut", delay: revealDelay },
              }}
              className={`absolute h-60 w-60 cursor-pointer rounded-3xl bg-gradient-to-br ${card.gradient} shadow-2xl ring-1 ring-black/5`}
            />
          );
        })}

        {/* Etiquetas: fila recta y alineada debajo de las cards */}
        {cards.map((card, i) => {
          const x = (i - CENTER) * SPACING;
          return (
            <motion.span
              key={`label-${card.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.08, duration: 0.4, ease: "easeOut" }}
              style={{ left: `calc(50% + ${x}px)` }}
              className="absolute -bottom-12 -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-600 shadow-sm ring-1 ring-black/5"
            >
              {card.label}
            </motion.span>
          );
        })}
      </div>

      <p className="mt-24 max-w-xl text-center text-lg leading-relaxed text-zinc-600 sm:mt-32 sm:text-xl">
        ¡Hola! Soy <span className="font-medium text-zinc-900">Santiago</span>,
        un desarrollador con muchas ganas de construir cosas geniales. Acá
        comparto algunos de los proyectos en los que trabajé, desde apps hasta
        experimentos web, siempre buscando llevar nuevas ideas a la vida.
      </p>
    </section>
  );
}
