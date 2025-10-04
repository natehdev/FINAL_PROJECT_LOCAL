"use client";

import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  Gift,
  Home,
  Image as ImageIcon,
  Menu,
  ShoppingCart,
  User,
  MapPin,
  Clock,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


const navItems = [
  {
    name: "Impresiones",
    icon: ImageIcon,
    href: "#",
    subItems: [
      { name: "Impresiones normales", href: "/impresiones-normales" },
      { name: "Impresiones Retro", href: "#" },
      { name: "Impresiones Grandes", href: "#" },
    ],
  },
  {
    name: "Álbumes",
    icon: BookOpen,
    href: "#",
    subItems: [
      { name: "Tapa Dura", href: "#" },
      { name: "Tapa Blanda", href: "#" },
      { name: "Booklet 10x15", href: "#" },
    ],
  },
  {
    name: "Calendarios",
    icon: Calendar,
    href: "#",
    subItems: [
      { name: "Calendarios de Pared", href: "#" },
      { name: "Calendarios de Escritorio", href: "#" },
    ],
  },
  {
    name: "Regalos",
    icon: Gift,
    href: "#",
    subItems: [
      { name: "Tazas", href: "#" },
      { name: "Cojines", href: "#" },
      { name: "Llaveros", href: "#" },
    ],
  },
  {
    name: "Decoración",
    icon: Home,
    href: "#",
    subItems: [
      { name: "Lienzos", href: "#" },
      { name: "Pósteres", href: "#" },
      { name: "Fotocerámicas", href: "#" },
    ],
  },
  {
    name: "Empresas",
    icon: Briefcase,
    href: "#",
    subItems: [
      { name: "Tarjetas de Visita", href: "#" },
      { name: "Folletos", href: "#" },
    ],
  },
];

const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div onMouseLeave={() => setIsOpen(false)} className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-base font-semibold text-black hover:bg-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            onMouseEnter={() => setIsOpen(true)}
          >
            {item.name} <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        {isOpen && (
          <PopoverContent
            className="w-56"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="grid gap-4">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className="text-sm p-2 hover:bg-red-500 text-black hover:text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </PopoverContent>
        )}
      </div>
    </Popover>
  );
};


const DynamicSearchInput = () => {
  const placeholders = [
    "Fotolibros",
    "Tazas personalizadas",
    "Impresiones 10x15",
    "Dibuñecos"
  ];
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const loopedPlaceholders = [...placeholders, placeholders[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === placeholders.length) {
          setIsTransitioning(false);
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  useEffect(() => {
    if (currentIndex === 0 && !isTransitioning) {
       setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 50);
    }
  }, [currentIndex, isTransitioning]);

  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-gray-100 h-11 rounded-full w-full pl-12 pr-4"
      />
      {inputValue === "" && (
        <div className="absolute inset-0 left-12 flex items-center pointer-events-none">
          <div className="h-11 overflow-hidden">
            <div
              className={cn(
                "ease-in-out",
                isTransitioning ? "transition-transform duration-500" : ""
              )}
              style={{ transform: `translateY(-${currentIndex * 44}px)` }}
            >
              {loopedPlaceholders.map((text, index) => (
                <div key={index} className="h-11 flex items-center text-muted-foreground">
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


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        {/* Top line */}
        <div className="flex h-20 items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
             <DynamicSearchInput />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" className="hover:bg-red-100 hover:text-black">
                <MapPin className="mr-2 h-5 w-5 text-red-500" />
                175 Tiendas
              </Button>
              <Button variant="default" className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <Clock className="mr-2 h-5 w-5" />
                Click para pedir en 1 hora
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="hover:bg-red-600 group">
              <User className="h-10 w-10 text-red-600 group-hover:text-white" />
              <span className="sr-only">Cuenta</span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-red-600 group">
              <ShoppingCart className="h-6 w-6 text-red-600 group-hover:text-white" />
              <span className="sr-only">Cesta</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-red-600">
                  <Menu className="h-6 w-6 text-red-600" />
                  <span className="sr-only">Alternar Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                      <Logo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <h3 className="font-semibold flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </h3>
                      <div className="grid gap-2 ml-7 mt-2">
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href} className="text-muted-foreground hover:text-foreground">
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Bottom line */}
        <div className="hidden md:flex h-12 items-center justify-center">
            <nav className="flex items-center gap-4">
                {navItems.map((item) => (
                <NavItem key={item.name} item={item} />
                ))}
            </nav>
        </div>
      </div>
    </header>
  );
}
