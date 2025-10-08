"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  className?: string;
  placeholders?: string[];
  intervalMs?: number;
};

export const DynamicSearchInput: React.FC<Props> = ({
  className,
  placeholders = ["Fotolibros", "Tazas personalizadas", "Impresiones 10x15", "Dibuñecos"],
  intervalMs = 3000,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [rowHeight, setRowHeight] = useState<number>(44); // fallback seguro

  const firstRowRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Duplicamos el primero al final para loop continuo
  const looped = useMemo(() => [...placeholders, placeholders[0]], [placeholders]);

  // Medimos la altura real de una fila (según tipografía y altura del input)
  useEffect(() => {
    const measure = () => {
      const h = firstRowRef.current?.clientHeight;
      if (h && h > 0) setRowHeight(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (firstRowRef.current) ro.observe(firstRowRef.current);
    return () => ro.disconnect();
  }, []);

  // Avance automático
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        // Avanza hasta el duplicado inclusive
        if (prev + 1 <= placeholders.length) return prev + 1;
        return prev;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, placeholders.length]);

  // Reset sin parpadeo al llegar al duplicado (último elemento)
  useEffect(() => {
    if (index === placeholders.length) {
      // 1) quita transición
      setTransitioning(false);

      // 2) en el siguiente frame, salta a 0 (misma posición visual que el duplicado)
      requestAnimationFrame(() => {
        setIndex(0);

        // 3) otro frame para reactivar transición
        requestAnimationFrame(() => {
          setTransitioning(true);

          // 4) pequeña espera y avanza a 1 para seguir el loop
          setTimeout(() => setIndex(1), 50);
        });
      });
    }
  }, [index, placeholders.length]);

  return (
    <div className={cn("relative flex-1 max-w-xl", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-gray-100 h-11 rounded-full w-full pl-12 pr-4"
      />

      {inputValue === "" && (
        // Overlay a toda altura del input, centrado verticalmente
        <div
          className="absolute inset-0 left-12 right-4 pointer-events-none flex items-center"
          aria-hidden="true"
        >
          {/* Viewport con altura de una fila; overflow oculta el resto */}
          <div
            ref={viewportRef}
            style={{ height: rowHeight }}
            className="w-full overflow-hidden"
          >
            <div
              className={cn(
                "will-change-transform ease-in-out",
                transitioning && "transition-transform duration-500"
              )}
              style={{
                transform: `translate3d(0, -${index * rowHeight}px, 0)`,
              }}
            >
              {looped.map((text, i) => (
                <div
                  key={`${text}-${i}`}
                  ref={i === 0 ? firstRowRef : undefined}
                  // Alinear exactamente con el Input: text-sm, altura de fila y centrado
                  className="flex items-center text-muted-foreground text-sm"
                  style={{ height: rowHeight }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicSearchInput;
