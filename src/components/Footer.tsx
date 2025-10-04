import Link from "next/link";
import Logo from "./Logo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const footerLinks = {
  "Descarga nuestra app": [],
  "Atención al Cliente": [
    { title: "Contáctanos", href: "/" },
    { title: "Preguntas frecuentes", href: "#" },
    { title: "Información de envío", href: "#" },
    { title: "Devoluciones y cambios", href: "#" },
  ],
  "Sobre Nosotros": [
    { title: "Nuestra historia", href: "#" },
    { title: "Trabaja con nosotros", href: "#" },
    {title: "Franquicias", href: "#" },
    { title: "Prensa", href: "#" },
  ],
  "Productos": [
    { title: "Álbumes de fotos", href: "#" },
    { title: "Arte de pared", href: "#" },
    { title: "Regalos", href: "#" },
    { title: "Impresiones", href: "#" },
  ],
};

const SocialIcon = ({ children, href }: {children: React.ReactNode, href: string}) => (
  <Link href={href} className="inline-block text-primary transition-transform hover:scale-110">
    {children}
  </Link>
)

const AppStoreBadge = ({ href }: { href: string }) => (
    <Link href={href} className="inline-block">
        <Image src="https://prd-static.sf-cdn.com/resources/images/footer/new-footer/ios-app-store-badge.svg" alt="Download on the App Store" width={120} height={40} />
    </Link>
)

const GooglePlayBadge = ({ href }: { href: string }) => (
    <Link href={href} className="inline-block">
        <Image src="https://prd-static.sf-cdn.com/resources/images/footer/new-footer/android-app-store-badge.svg" alt="Get it on Google Play" width={135} height={40} />
    </Link>
)

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <section className="bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Únete a nuestra newsletter</h2>
          <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
            Consigue 10 € de descuento en tu próxima creación y sé el primero en enterarte de nuestras novedades y ofertas exclusivas.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu dirección de correo electrónico"
              className="bg-background border-primary text-foreground focus-visible:ring-primary flex-grow"
            />
            <Button type="submit" variant="default" className="w-full sm:w-auto">
              Suscribirme
            </Button>
          </form>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo />
            <p className="text-muted-foreground">
              Productos fotográficos de alta calidad elaborados con esmero.
            </p>
            <div className="flex space-x-4 mt-2">
                <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></SocialIcon>
                <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></SocialIcon>
                <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3 3.4 3 5.4 0 4.4-4 8-8 8s-8-3.6-8-8c0-2 1.4-4 3-5.4-1.3-1.3-2-3.4-2-3.4s4.6 2.7 8 2.7 8-2.7 8-2.7z"></path><path d="M12 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg></SocialIcon>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              {links.length > 0 ? (
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col space-y-2">
                    <AppStoreBadge href="#" />
                    <GooglePlayBadge href="#" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
       <div className="bg-card border-t">
          <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Fotoprix. Todos los derechos reservados.</p>
          </div>
        </div>
    </footer>
  );
}