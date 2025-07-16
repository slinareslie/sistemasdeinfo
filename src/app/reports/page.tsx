"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/pages/dashboard-page";
import PowerBiEmbed from "@/components/dashboard/power-bi-embed";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  const powerBiRef = React.useRef<{ getIframe: () => HTMLIFrameElement | null }>(null);

  const handleExportToPdf = () => {
    const iframe = powerBiRef.current?.getIframe();
    if (iframe?.src) {
      const printWindow = window.open(iframe.src, '_blank');
      printWindow?.addEventListener('load', () => {
        printWindow?.print();
      });
    } else {
      alert("El dashboard de Power BI no está cargado o no tiene una URL válida.");
    }
  };

  return (
    <DashboardLayout title="Reportes">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Exportar Dashboard</CardTitle>
            <CardDescription>
              Genera una versión en PDF de tu dashboard de Power BI. Esto abrirá el dashboard en una nueva pestaña para que puedas usar la función de "Guardar como PDF" de tu navegador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportToPdf}>
              <FileDown className="mr-2" />
              Exportar a PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Vista Previa del Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="h-[600px]">
                    <PowerBiEmbed ref={powerBiRef} />
                 </div>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
