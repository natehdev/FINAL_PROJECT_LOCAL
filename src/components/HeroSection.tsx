"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  
  {
    image: "https://images.pexels.com/photos/1683975/pexels-photo-1683975.jpeg?_gl=1*1kypmp2*_ga*MTc0MzU5NTM4MS4xNzU1Njc2ODE1*_ga_8JE65Q40S6*czE3NTYxMjYxODgkbzMkZzEkdDE3NTYxMjYyNDMkajUkbDAkaDA.",
    hint: "family photos",
    title: "Tus recuerdos, bellamente impresos",
    description:
      "Desde impresionantes álbumes de fotos hasta vibrantes obras de arte para la pared, convierte tus momentos favoritos en tesoros duraderos.",
    buttonText: "Descubrir productos",
    href: "#",
  },
  {
    image: "https://www.fotoprix.com/uploads/media/2000x400/05/128455-2A_General_Copias_3000x1800px_02.webp?v=1-0",
    hint: "home interior",
    title: "Decora tu vida con fotos",
    description:
      "Personaliza tu espacio con lienzos, pósteres y más. Decoración de alta calidad que cuenta tu historia.",
    buttonText: "Comprar arte de pared",
    href: "#",
  },
  {
    image: "https://www.fotoprix.com/uploads/media/2000x400/04/128504-5A_General_regalos_3000x1800px_03.webp?v=1-0",
    hint: "gifts wrapping",
    title: "El regalo personalizado perfecto",
    description:
      "Crea regalos únicos como tazas, cojines y calendarios personalizados para tus seres queridos.",
    buttonText: "Encontrar un regalo",
    href: "#",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
                <div className={"absolute inset-0 bg-black/40 flex items-center justify-center"}>
                  <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
                      {slide.description}
                    </p>
                    {slide.href && (
                      <Link href={slide.href}>
                        <Button size="lg" variant="default">
                          {slide.buttonText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    </section>
  );
}
