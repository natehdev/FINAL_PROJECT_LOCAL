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
  const contentRef = useRef<HTMLDivElement | null>(null);        // 👈 NUEVO
  const indexRef = useRef(index);                                 // 👈 NUEVO
  indexRef.current = index;                                       // 👈 NUEVO

  const looped = useMemo(() => [...placeholders, placeholders[0]], [placeholders]);

  // Medir altura real de fila
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

  // Avance automático por intervalo (incluye el duplicado)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1 <= placeholders.length ? prev + 1 : prev));
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, placeholders.length]);

  // ⬇️ IMPORTANTE: Reset SOLO cuando termina la transición al duplicado
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const onTransitionEnd = () => {
      if (indexRef.current === placeholders.length) {
        // Quitar transición -> saltar a 0 -> reactivar transición (siguiente frame)
        setTransitioning(false);
        requestAnimationFrame(() => {
          setIndex(0);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }
    };

    node.addEventListener("transitionend", onTransitionEnd);
    return () => node.removeEventListener("transitionend", onTransitionEnd);
  }, [placeholders.length]);

  return (
    <div className={cn("relative flex-1 max-w-xl", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-gray-100 h-11 rounded-full w-full pl-12 pr-4"
      />

      {inputValue === "" && (
        <div
          className="absolute inset-0 left-12 right-4 pointer-events-none flex items-center"
          aria-hidden="true"
        >
          <div
            ref={viewportRef}
            style={{ height: rowHeight }}
            className="w-full overflow-hidden"
          >
            <div
              ref={contentRef} // 👈 NUEVO: escuchamos transitionend aquí
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
