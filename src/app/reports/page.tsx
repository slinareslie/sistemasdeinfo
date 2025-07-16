"use client";

import * as React from "react";
import jsPDF from "jspdf";
import { DashboardLayout } from "@/components/pages/dashboard-page";
import PowerBiEmbed from "@/components/dashboard/power-bi-embed";
import { Button } from "@/components/ui/button";
import { FileDown, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { suggestMetrics, type SuggestMetricsOutput } from "@/ai/flows/suggest-metrics";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const powerBiRef = React.useRef<{ getIframe: () => HTMLIFrameElement | null }>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { toast } = useToast();

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

  const generateExecutiveReport = async () => {
    setIsGenerating(true);
    try {
      const aiResult = await suggestMetrics({
        dataDescription: "Datos de ventas de e-commerce con producto, precio, fecha y ciudad. Necesito un resumen ejecutivo para tomar decisiones de marketing."
      });

      const doc = new jsPDF();
      
      // Título
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Reporte Gerencial - InsightFlow", 105, 20, { align: "center" });

      // Fecha
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(new Date().toLocaleDateString('es-ES', { dateStyle: 'long' }), 105, 28, { align: "center" });

      // Sección de Métricas Clave
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("1. Resumen de Métricas Clave", 14, 45);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("- Ingresos Totales: $125,450", 20, 55);
      doc.text("- Tasa de Conversión: 3.5%", 20, 62);
      doc.text("- Valor Promedio de Orden (AOV): $85.60", 20, 69);
      doc.text("- Crecimiento Mensual: 15%", 20, 76);

      // Sección de Análisis IA
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("2. Análisis y Recomendaciones (IA)", 14, 95);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const rationaleLines = doc.splitTextToSize(aiResult.rationale, 175);
      doc.text(rationaleLines, 20, 105);

      // Sección de Tabla de datos
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("3. Detalle de Ventas por Región", 14, 150);
      doc.table(20, 160, [
          { region: "Norte", ventas: "$45,000", crecimiento: "20%" },
          { region: "Sur", ventas: "$35,500", crecimiento: "12%" },
          { region: "Centro", ventas: "$25,150", crecimiento: "8%" },
          { region: "Oeste", ventas: "$19,800", crecimiento: "18%" },
      ], {
          headers: ["Región", "Ventas", "Crecimiento"],
          autoSize: true,
      });


      doc.save("Reporte_Gerencial_InsightFlow.pdf");
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        toast({
            variant: "destructive",
            title: "Error en el Reporte",
            description: "No se pudo generar el reporte en PDF. Por favor, inténtalo de nuevo.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout title="Reportes">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Generar Reporte Gerencial</CardTitle>
                    <CardDescription>
                        Crea un reporte en PDF con un resumen de métricas clave y recomendaciones de IA, ideal para la toma de decisiones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={generateExecutiveReport} disabled={isGenerating}>
                        <FileDown className="mr-2" />
                        {isGenerating ? "Generando..." : "Descargar Reporte PDF"}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Exportar Vista del Dashboard</CardTitle>
                    <CardDescription>
                    Guarda una vista visual de tu dashboard de Power BI como PDF a través de la función de impresión de tu navegador.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleExportToPdf}>
                        <FileDown className="mr-2" />
                        Exportar a PDF
                    </Button>
                </CardContent>
            </Card>
        </div>

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
