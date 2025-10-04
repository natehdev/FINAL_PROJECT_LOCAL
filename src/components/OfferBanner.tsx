"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default function OfferBanner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative bg-primary text-primary-foreground z-50">
      <div className="container mx-auto px-4 h-12 flex items-center justify-center text-center">
        <p className="text-sm font-medium">
          ¡Oferta especial de verano! Hasta un 55% de descuento en tus fotos.
        </p>
        <Link href="#" className="ml-4">
          <Button variant="secondary" size="sm" className="h-7">
            Lo quiero
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/80"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
