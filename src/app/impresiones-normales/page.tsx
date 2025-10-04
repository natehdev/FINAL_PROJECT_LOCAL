
"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gift, Sparkles, Star, ArrowRight, Rocket, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
      name: "Calidad de Laboratorio",
      description: "Usamos papel fotográfico premium para colores vivos y duraderos.",
      icon: <Star className="h-8 w-8 text-primary" />,
    },
    {
      name: "Acabado Profesional",
      description: "Elige entre acabado brillo, mate, satén o ecológico.",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
    },
    {
      name: "Perfecto para Regalar",
      description: "Enmarca tus recuerdos o compártelos. Siempre un acierto.",
      icon: <Gift className="h-8 w-8 text-primary" />,
    },
];

const productSlides = [
  {
    image: "https://www.fotoprix.com/blog/content/images/size/w2000/2023/08/03_00_portada.jpg",
    title: "Impresiones Clásicas 10x15",
    description: "El formato de toda la vida para tus mejores momentos.",
    hint: "classic photo prints",
    size: "10x15",
    price: "0.69€",
    discountPrice: "0.29€",
    url: "/impresiones-estandar/10x15",
    units: 100
  },
  {
    image: "https://images.pexels.com/photos/9219061/pexels-photo-9219061.jpeg",
    title: "Formato Cuadrado 13x13",
    description: "Perfectas para tus fotos de Instagram y composiciones creativas.",
    hint: "square format prints",
    size: "13x13",
    price: "0.79€",
    discountPrice: "0.39€",
    url: "/impresiones-estandar/13x13",
    units: 500
  },
  {
    image: "https://images.pexels.com/photos/3831861/pexels-photo-3831861.jpeg",
    title: "Cuadro Medianos 13x18",
    description: "Un formato más grande para que tus recuerdos luzcan aún más.",
    hint: "large classic photos",
    size: "13x18",
    price: "0.79€",
    discountPrice: "0.39€",
    url: "/impresiones-estandar/13x18",
    units: 500
  }
]

const deliveryOptions = [
    {
        title: "Impresión Express",
        description: "En tu tienda más cercana en solo 1 hora.",
        icon: <Rocket className="h-10 w-10 mb-4 text-primary group-hover:text-primary-foreground"/>,
        url: "https://www.fotoprix.com/pedido-1-hora",
    },
    {
        title: "Impresión Estándar",
        description: "Recógelo en tienda en 72 horas.",
        icon: <Calendar className="h-10 w-10 mb-4 text-primary group-hover:text-primary-foreground"/>,
        url: "/impresiones-estandar/estandar",
    }
]

export default function StandardPrintsPage() {
    return (
      <div className="bg-background">
        <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center mb-16">
            <Image
                src="https://www.fotoprix.com/blog/content/images/size/w2000/2023/08/04_02-2.jpg"
                alt="Impresión de fotos"
                fill
                className="object-cover"
                data-ai-hint="photo printing action"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="bg-white/90 text-card-foreground rounded-2xl p-6 md:p-12 max-w-4xl mx-auto shadow-2xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Inmortaliza tus recuerdos</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">Elige cómo quieres recibir tus fotos. Rápido y fácil.</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deliveryOptions.map((option) => (
                           <Link href={option.url} key={option.title} className="group">
                             <div className="bg-card hover:bg-primary border border-border rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col items-center justify-center">
                                 <div className="transition-transform duration-300 group-hover:scale-110">
                                     {option.icon}
                                 </div>
                                 <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary-foreground">{option.title}</h2>
                                 <p className="mt-2 text-sm md:text-base text-muted-foreground group-hover:text-primary-foreground">{option.description}</p>
                                 <Button variant="default" className="mt-6 group-hover:bg-secondary group-hover:text-secondary-foreground">
                                     Empezar a Crear
                                 </Button>
                             </div>
                           </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <main className="container mx-auto max-w-7xl px-4 py-16 md:py-24 space-y-16 md:space-y-24">
            
            <section>
                <h2 className="text-3xl font-bold text-center mb-12">Elige tu formato ideal</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {productSlides.map((product) => (
                        <Card key={product.size} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group bg-card">
                            <CardContent className="p-0">
                                <div className="relative aspect-square w-full">
                                     <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={product.hint}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">{product.title}</h3>
                                    <p className="text-muted-foreground mt-2 min-h-[40px]">{product.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            {product.discountPrice ? (
                                                <>
                                                    <p className="text-lg font-semibold text-muted-foreground">
                                                        <span className="line-through">{product.price}</span>
                                                    </p>
                                                    <p className="text-2xl font-bold text-primary">Desde {product.discountPrice}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {product.units === 100 
                                                            ? "Activando el código de descuento o imprimiendo más de 100 unidades"
                                                            : `Activando el código de descuento o imprimiendo más de ${product.units} unidades`
                                                        }
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-lg font-semibold">Desde <span className="text-primary">{product.price}</span></p>
                                            )
                                            }
                                        </div>
                                        <Link href={product.url}>
                                            <Button>
                                                Empezar a Crear
                                                <ArrowRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="bg-card border rounded-2xl p-6 md:p-10 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col items-center p-4">
                            {feature.icon}
                            <h3 className="mt-4 text-xl font-semibold">{feature.name}</h3>
                            <p className="mt-1 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="bg-card border rounded-2xl p-6 md:p-10 shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona?</h2>
                <div className="flex flex-col md:flex-row justify-around gap-8">
                    <div className="flex flex-col items-center text-center max-w-xs mx-auto">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-4 ring-primary/20">
                            <span className="text-3xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold">Elige tus opciones</h3>
                        <p className="mt-1 text-muted-foreground">Selecciona tamaño, acabado y el tipo de entrega que prefieras.</p>
                    </div>
                        <div className="flex flex-col items-center text-center max-w-xs mx-auto">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-4 ring-primary/20">
                            <span className="text-3xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold">Sube tus fotos</h3>
                        <p className="mt-1 text-muted-foreground">Añade tus imágenes favoritas desde tu móvil, ordenador o redes sociales.</p>
                    </div>
                        <div className="flex flex-col items-center text-center max-w-xs mx-auto">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-4 ring-primary/20">
                            <span className="text-3xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold">Recoge tu pedido</h3>
                        <p className="mt-1 text-muted-foreground">En 1 hora o 72 horas, ¡tú decides! Te avisaremos cuando esté listo.</p>
                    </div>
                </div>
            </section>

            <section className="bg-card border rounded-2xl p-6 md:p-10 shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg">¿Qué tipo de papel utilizan?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            Utilizamos papel fotográfico de alta gama Fujifilm Crystal Archive para asegurar que los colores se mantengan vivos y los detalles nítidos durante años. Ofrecemos diferentes acabados como brillo, mate, satén y nuestro papel ecológico Green Digital.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg">¿Puedo elegir un acabado mate?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            ¡Sí! Ofrecemos acabados en brillo, mate, satén y Green Digital. Podrás seleccionarlo fácilmente al hacer tu pedido.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg">¿Cuál es la diferencia entre la entrega Express y la Estándar?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            La entrega Express te permite recoger tus fotos en tu tienda más cercana en solo 1 hora por un pequeño coste adicional. La entrega Estándar es para recogida en tienda en 72 horas.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg">¿Qué resolución de imagen se recomienda?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            Para obtener los mejores resultados, te recomendamos que tus fotos tengan una resolución de al menos 300 ppp (píxeles por pulgada). Nuestro sistema te avisará si la calidad de una imagen es demasiado baja para el tamaño de impresión seleccionado.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
      </div>
    );
  }

    
    

    
