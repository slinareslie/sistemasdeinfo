"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// IMPORTANTE: Reemplaza esta URL con la URL de tu dashboard de Power BI publicado.
// Para obtener la URL, publica tu archivo .pbix en el servicio de Power BI y luego
// ve a Archivo > Insertar informe > Publicar en la web (público) o Insertar.
const POWER_BI_EMBED_URL = "https://app.powerbi.com/view?r=eyJrIjoiNjI0YzBmZWEtZDljOC00ODEyLThkN2UtMjM3YTI4MjMwYmQzIiwidCI6ImNhMTM5MDUwLWNmYjQtNDUyNy05YmMzLTcyOWZiNTRhYzEzOCJ9";

const PowerBiEmbed = React.forwardRef((props, ref) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useImperativeHandle(ref, () => ({
    getIframe: () => iframeRef.current,
  }));

  return (
    <Card className="h-full shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle>Dashboard de Ventas y Rendimiento</CardTitle>
        <CardDescription>Datos interactivos en tiempo real desde Power BI.</CardDescription>
      </CardHeader>
      <CardContent>
        {POWER_BI_EMBED_URL ? (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md h-full">
            <iframe
              ref={iframeRef}
              title="Power BI Dashboard"
              className="w-full h-full rounded-md border"
              src={POWER_BI_EMBED_URL}
              allowFullScreen
            ></iframe>
          </AspectRatio>
        ) : (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Configuración Requerida</AlertTitle>
            <AlertDescription>
              Para mostrar el dashboard, publica tu archivo .pbix en el servicio de Power BI y pega la URL de inserción en el archivo 
              <code className="mx-1 p-1 bg-secondary rounded text-xs">src/components/dashboard/power-bi-embed.tsx</code>.
              Los archivos .pbix no se pueden renderizar directamente.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
});

PowerBiEmbed.displayName = "PowerBiEmbed";

export default PowerBiEmbed;
