"use client";

import { DashboardLayout } from "@/components/pages/dashboard-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

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
            Aquí puedes ver y gestionar las fuentes de datos conectadas a tus dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Actualmente no hay fuentes de datos conectadas.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
