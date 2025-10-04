"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { UploadCloud, X, Wand2, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getPhotoEnhancementSuggestions } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;

export default function PhotoEnhancerClient() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resolutionWarning, setResolutionWarning] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Tipo de archivo no válido",
          description: "Por favor, sube un archivo de imagen.",
        });
        return;
      }

      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPhotoPreview(dataUrl);

        const img = document.createElement("img");
        img.onload = () => {
          if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
            setResolutionWarning(`Advertencia: La resolución de la imagen es ${img.width}x${img.height}. Para una mejor calidad, recomendamos al menos ${MIN_WIDTH}x${MIN_HEIGHT} píxeles.`);
          } else {
            setResolutionWarning(null);
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
      setSuggestions(null);
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setSuggestions(null);
    setResolutionWarning(null);
  };

  const handleGetSuggestions = async () => {
    if (!photoPreview) {
      toast({
        variant: "destructive",
        title: "No hay foto",
        description: "Por favor, sube una foto primero.",
      });
      return;
    }
    setIsLoading(true);
    setSuggestions(null);

    const result = await getPhotoEnhancementSuggestions(photoPreview);

    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Falló la mejora",
        description: result.error,
      });
    } else if (result.suggestions) {
      setSuggestions(result.suggestions);
    }
    setIsLoading(false);
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <Card
          className={`transition-all duration-300 ${isDragging ? "border-primary ring-2 ring-primary" : ""}`}
          onDragEnter={onDragEnter}
          onDragOver={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <CardContent className="p-4">
            {!photoPreview ? (
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-center h-80">
                  <UploadCloud className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">
                    Arrastra y suelta tu foto aquí
                  </h3>
                  <p className="text-muted-foreground">o haz clic para seleccionar un archivo</p>
                  <input
                    id="photo-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                </div>
              </label>
            ) : (
              <div className="relative group">
                <Image
                  src={photoPreview}
                  alt="Photo preview"
                  width={500}
                  height={500}
                  className="rounded-lg w-full h-auto object-contain max-h-[400px]"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={clearPhoto}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {resolutionWarning && (
            <div className="flex items-start p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
                <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                <p className="text-sm">{resolutionWarning}</p>
            </div>
        )}
        {!resolutionWarning && photoPreview && (
          <div className="flex items-start p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
            <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="text-sm">
              ¡La resolución de la imagen se ve bien para imprimir!
            </p>
          </div>
        )}

        <Button
          onClick={handleGetSuggestions}
          disabled={!photoPreview || isLoading}
          size="lg"
          className="w-full"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          {isLoading ? "Analizando..." : "Obtener Sugerencias de IA"}
        </Button>
      </div>

      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Sugerencias de Mejora</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {!isLoading && !suggestions && (
              <div className="text-center text-muted-foreground py-10">
                <p>Sube una foto y haz clic en el botón para ver las sugerencias de la IA aquí.</p>
              </div>
            )}
            {suggestions && (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: suggestions.replace(/\n/g, "<br />") }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
