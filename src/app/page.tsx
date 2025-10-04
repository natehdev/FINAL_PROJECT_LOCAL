"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import { ArrowRight, BookOpen, Calendar, Gift, Home as HomeIcon, Image as ImageIcon, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";

const bestSellers = [
  {
    name: "Álbum de Fotos Clásico",
    price: "Desde 29,95 €",
    image: "https://www.fotoprix.com/uploads/media/700x875/09/125939-Fotolibro_web_008.webp?v=1-0",
    hint: "photo album"
  },
  {
    name: "Lienzo 30x40",
    price: "Desde 19,95 €",
    image: "https://www.fotoprix.com/uploads/media/700x875/06/126016-Lienzo_Web_005.webp?v=1-0",
    hint: "canvas print"
  },
  {
    name: "Taza Personalizada",
    price: "Desde 9,95 €",
    image: "https://www.fotoprix.com/uploads/media/700x875/06/125976-TazaBlanca_Web_003.webp?v=1-0",
    hint: "custom mug"
  },
  {
    name: "100 Impresiones de Fotos",
    price: "Desde 15,00 €",
    image: "https://www.fotoprix.com/uploads/media/700x875/04/125994-Copias_web_009.webp?v=1-0",
    hint: "photo prints"
  },
];

const categories = [
  {
    name: "Regalos Personalizados",
    icon: <Gift className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/07/126187-PuzzleA4_Web_001.webp?v=1-0",
    hint: "personalized gift"
  },
  {
    name: "Decoración del Hogar",
    icon: <HomeIcon className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/00/128300-Marco_Timeless_negro_web_1600x2300_007.webp?v=1-0",
    hint: "home decor"
  },
  {
    name: "Álbumes de Fotos",
    icon: <BookOpen className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/02/125882-FotolibroPlus_web_001.webp?v=1-0",
    hint: "photo album book"
  },
  {
    name: "Calendarios",
    icon: <Calendar className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/04/126624-Calendario_Pared_04.webp?v=1-0",
    hint: "wall calendar"
  },
  {
    name: "Impresiones de Fotos",
    icon: <ImageIcon className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/07/577-imprimir-copias-11x15-hogar-fotoprix.webp?v=2-3",
    hint: "stack photos"
  },
    {
    name: "Tarjetas e Invitaciones",
    icon: <Gift className="w-12 h-12 mb-4 text-primary" />,
    image: "https://www.fotoprix.com/uploads/media/700x875/02/128332-Tarjetas_visita_web_1600x2300px_006.webp?v=1-0",
    hint: "greeting cards"
  },
];


const DynamicPlaceholderInput = () => {
  const placeholders = ["'Barcelona'", "'28001'", "'Cerca de mi'"];
  const [placeholder, setPlaceholder] = useState("Por ejemplo, ");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const fullPlaceholder = `${placeholders[index]}`;

    if (subIndex === fullPlaceholder.length + 1 && !reverse) {
      setReverse(true);
      setTimeout(() => {}, 1500); // Wait before deleting
      return;
    }

    if (subIndex === "".length && reverse) {
      setReverse(false);
      setSubIndex("".length);
      setIndex((prev) => (prev + 1) % placeholders.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setPlaceholder(fullPlaceholder.substring(0, subIndex));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="bg-white h-12 pl-12 pr-28 rounded-full w-full"
    />
  );
};


export default function Home() {
  return (
    <div className="space-y-12 md:space-y-20 bg-gray-50">
      <HeroSection />

      <section className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-600 drop-shadow-sm">Nuestros más <span className="text-red-600">vendidos</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {bestSellers.map((product) => (
            <Card key={product.name} className="group overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-auto aspect-square object-cover"
                  data-ai-hint={product.hint}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="font-bold text-primary relative inline-block">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{product.price}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-md transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-600 drop-shadow-sm">Crea algo <span className="text-red-600">único</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category) => (
             <Card key={category.name} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <Image src={category.image} alt={category.name} width={600} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={category.hint} />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center group-hover:invisible">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
                <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center p-4 text-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   {category.icon}
                   <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                   <Button variant="secondary">
                     Comprar Ahora <ArrowRight className="ml-2 h-4 w-4"/>
                   </Button>
                </div>
             </Card>
          ))}
        </div>
      </section>

      <section
        className="py-20 md:py-32 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/6193933/pexels-photo-6193933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
            Da rienda suelta a tu <span className="text-accent">CREATIVIDAD</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Convierte tus momentos favoritos en recuerdos atemporales. Con nuestras
            herramientas de IA y la impresión de alta calidad, tus fotos están en
            buenas manos.
          </p>
          <Link href="/enhance">
            <Button size="lg" variant="secondary" className="text-lg">
              Mejora tus fotos con IA
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section
        className="py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.fotoprix.com/uploads/media/2000x800/01/5111-tienda_postas_vitoria_fotoprix.webp?v=1-0')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex justify-center items-center gap-2 mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Encuentra tu tienda
              </h2>
              <div className="-ml-3 relative top-1">
                <Logo />
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Busca por ciudad, código postal o dirección.
            </p>
            <form className="max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <DynamicPlaceholderInput />
                <Button type="submit" size="lg" className="absolute right-1.5 rounded-full h-9 px-6">
                  Buscar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
