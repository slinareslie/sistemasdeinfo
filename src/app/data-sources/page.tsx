"use client";

import { DashboardLayout } from "@/components/pages/dashboard-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const dataSources = [
  {
    name: "Base de Datos de Ventas",
    type: "Azure SQL",
    status: "Conectado",
    lastUpdate: "Hace 5 minutos",
  },
  {
    name: "CRM de Clientes",
    type: "Salesforce",
    status: "Conectado",
    lastUpdate: "Hace 1 hora",
  },
  {
    name: "Google Analytics",
    type: "Web Analytics",
    status: "Conectado",
    lastUpdate: "Hace 15 minutos",
  },
  {
    name: "Hoja de Cálculo - Proyecciones",
    type: "Excel Online",
    status: "Error",
    lastUpdate: "Ayer",
  },
];


export default function DataSourcesPage() {
  return (
    <DashboardLayout title="Fuentes de Datos">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestionar Fuentes de Datos</h2>
        <Button>
          <PlusCircle className="mr-2" />
          Añadir Fuente de Datos
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fuentes de Datos Conectadas</CardTitle>
          <CardDescription>
            Aquí puedes ver, actualizar y gestionar las fuentes de datos conectadas a tus dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de la Fuente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((source) => (
                <TableRow key={source.name}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>{source.type}</TableCell>
                  <TableCell>
                    <Badge variant={source.status === 'Conectado' ? 'default' : 'destructive'} className="gap-1">
                      {source.status === 'Conectado' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {source.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{source.lastUpdate}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" title="Actualizar">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                     <Button variant="destructive" size="icon" title="Desconectar">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
