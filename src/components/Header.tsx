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
// Add this import if DynamicSearchInput exists in your project
import { DynamicSearchInput } from "@/components/dynamic-search-input";


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
