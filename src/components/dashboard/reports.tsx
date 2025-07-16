"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import jsPDF from "jspdf";

const reports = [
  {
    name: "Reporte de Ventas Trimestral",
    date: "2024-03-31",
    author: "Sofia Diaz",
  },
  {
    name: "Análisis de Rendimiento Anual",
    date: "2023-12-31",
    author: "Equipo de BI",
  },
  {
    name: "Informe de Inventario Mensual",
    date: "2024-04-30",
    author: "Automatizado",
  },
];

type Report = typeof reports[0];

export default function Reports() {
  const handleDownload = (report: Report) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de InsightFlow", 14, 22);

    doc.setFontSize(12);
    doc.text(`Nombre: ${report.name}`, 14, 40);
    doc.text(`Fecha: ${report.date}`, 14, 50);
    doc.text(`Autor: ${report.author}`, 14, 60);

    doc.text("Este es un reporte generado automáticamente.", 14, 80);

    const fileName = `${report.name.toLowerCase().replace(/\s/g, '_')}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Generar y Descargar Reportes</h2>
        <Button>
          <PlusCircle className="mr-2" />
          Nuevo Reporte
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reportes Disponibles</CardTitle>
          <CardDescription>
            Descarga los reportes generados o crea uno nuevo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Reporte</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.name}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.name}
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(report)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
