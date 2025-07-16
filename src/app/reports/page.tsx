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

// Helper para dibujar la tabla
const createTable = (doc: jsPDF, startX: number, startY: number, headers: string[], data: (string|number)[][]) => {
    const headStyles = {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontStyle: 'bold'
    };
    const bodyStyles = {
        fillColor: [245, 245, 245]
    };
    const alternateRowStyles = {
        fillColor: [255, 255, 255]
    };

    const columnWidths = [60, 50, 50];
    const rowHeight = 10;
    let currentY = startY;

    // Draw header
    doc.setFontSize(10);
    doc.setFillColor(...(headStyles.fillColor as [number, number, number]));
    doc.setTextColor(headStyles.textColor);
    doc.setFont('helvetica', 'bold');
    doc.rect(startX, currentY, columnWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');

    headers.forEach((header, i) => {
        doc.text(header, startX + (columnWidths.slice(0, i).reduce((a, b) => a + b, 0)) + 5, currentY + rowHeight / 2, { verticalAlign: 'middle' });
    });
    currentY += rowHeight;

    // Draw body
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);

    data.forEach((row, rowIndex) => {
        const fillColor = rowIndex % 2 === 0 ? bodyStyles.fillColor : alternateRowStyles.fillColor;
        doc.setFillColor(...(fillColor as [number, number, number]));
        doc.rect(startX, currentY, columnWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
        row.forEach((cell, colIndex) => {
            doc.text(String(cell), startX + (columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0)) + 5, currentY + rowHeight / 2, { verticalAlign: 'middle' });
        });
        currentY += rowHeight;
    });

    return currentY;
}

// Helpers para generar datos aleatorios
const getRandomNumber = (min: number, max: number, decimals: number = 0) => {
    return (Math.random() * (max - min) + min).toFixed(decimals);
};

const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


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

      // Sección de Métricas Clave (Datos Aleatorios)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("1. Resumen de Métricas Clave", 14, 45);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`- Ingresos Totales: ${formatCurrency(parseFloat(getRandomNumber(100000, 250000)))}`, 20, 55);
      doc.text(`- Tasa de Conversión: ${getRandomNumber(1.5, 5, 1)}%`, 20, 62);
      doc.text(`- Valor Promedio de Orden (AOV): ${formatCurrency(parseFloat(getRandomNumber(70, 150)))}`, 20, 69);
      doc.text(`- Crecimiento Mensual: ${getRandomNumber(5, 25, 0)}%`, 20, 76);

      // Sección de Análisis IA
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("2. Análisis y Recomendaciones (IA)", 14, 95);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const rationaleLines = doc.splitTextToSize(aiResult.rationale, 175);
      doc.text(rationaleLines, 20, 105);

      // Sección de Tabla de datos (Datos Aleatorios)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("3. Detalle de Ventas por Región", 14, 150);
      const tableHeaders = ["Región", "Ventas", "Crecimiento"];
      const tableData = [
          ["Norte", formatCurrency(parseFloat(getRandomNumber(40000, 60000))), `${getRandomNumber(10, 25, 0)}%`],
          ["Sur", formatCurrency(parseFloat(getRandomNumber(30000, 50000))), `${getRandomNumber(5, 15, 0)}%`],
          ["Centro", formatCurrency(parseFloat(getRandomNumber(20000, 40000))), `${getRandomNumber(2, 10, 0)}%`],
          ["Oeste", formatCurrency(parseFloat(getRandomNumber(15000, 35000))), `${getRandomNumber(8, 20, 0)}%`],
      ];
      createTable(doc, 20, 160, tableHeaders, tableData);

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
