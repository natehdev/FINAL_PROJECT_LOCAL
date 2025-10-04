import PhotoEnhancerClient from "./photo-enhancer-client";

export default function EnhancePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Mejorador de Fotos con IA</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sube tu foto y obtén sugerencias instantáneas para que quede perfecta para imprimir.
        </p>
      </div>
      <PhotoEnhancerClient />
    </div>
  );
}
