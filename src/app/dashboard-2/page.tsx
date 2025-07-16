
"use client";

import * as React from 'react';
import { DashboardLayout } from "@/components/pages/dashboard-page";
import { KpiCards } from "@/components/dashboard-2/kpi-cards";
import { CoberturaBaseCard } from "@/components/dashboard-2/cobertura-base-card";
import { EntidadesChart } from "@/components/dashboard-2/entidades-chart";
import { ClusterChart } from "@/components/dashboard-2/cluster-chart";
import { SituacionLaboralChart } from "@/components/dashboard-2/situacion-laboral-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const initialData = {
  kpis: {
    edad: { avg: 53.75, range: "25 a 80" },
    ingreso: { avg: 1980, range: "414 a 16k" },
    saldo: { avg: 21760, range: "0 a 223.15k" },
  },
  coberturaBase: 2400,
  entidades: [
    { name: '0', value: 12 }, { name: '1', value: 444 }, { name: '2', value: 951 },
    { name: '3', value: 611 }, { name: '4', value: 251 }, { name: '5', value: 90 },
    { name: '6', value: 38 }, { name: '7', value: 10 }, { name: '8', value: 1 }
  ],
  cluster: [
    { name: 'Conservador Estable', value: 1219, percentage: 50.79, fill: 'hsl(var(--chart-1))' },
    { name: 'Alto Potencial', value: 779, percentage: 32.46, fill: 'hsl(var(--chart-2))' },
    { name: 'Nuevo/Ocasional', value: 398, percentage: 16.58, fill: 'hsl(var(--chart-3))' },
    { name: 'VIP', value: 2, percentage: 0.12, fill: 'hsl(var(--chart-4))' },
  ],
  situacionLaboral: [
    { name: 'DEPENDIENTE', value: 601, percentage: 25.04, fill: 'hsl(var(--chart-1))' },
    { name: 'INDEPENDIENTE', value: 1769, percentage: 73.72, fill: 'hsl(var(--chart-5))' },
    { name: 'MKTG', value: 37, percentage: 1.24, fill: 'hsl(var(--chart-2))' },
  ]
};


export default function Dashboard2Page() {
  const [filteredData, setFilteredData] = React.useState(initialData);
  const [filter, setFilter] = React.useState('all');

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === 'all') {
      setFilteredData(initialData);
    } else {
      // Simulate filtering by reducing data randomly
      const randomFactor = 0.5 + Math.random() * 0.4; // between 0.5 and 0.9
      
      const newFilteredData = {
        kpis: {
            edad: { ...initialData.kpis.edad, avg: 25 + Math.random() * (80 - 25) },
            ingreso: { ...initialData.kpis.ingreso, avg: 414 + Math.random() * (16000 - 414) },
            saldo: { ...initialData.kpis.saldo, avg: 0 + Math.random() * (223150 - 0) },
        },
        coberturaBase: Math.floor(initialData.coberturaBase * randomFactor),
        entidades: initialData.entidades.map(e => ({ ...e, value: Math.floor(e.value * randomFactor) })),
        cluster: initialData.cluster.map(c => ({ ...c, value: Math.floor(c.value * randomFactor) })),
        situacionLaboral: initialData.situacionLaboral.map(s => ({ ...s, value: Math.floor(s.value * randomFactor) })),
      };
      setFilteredData(newFilteredData);
    }
  }


  return (
    <DashboardLayout title="Dashboard Analítico">
       <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>
                  Selecciona una característica para segmentar los datos.
                </CardDescription>
              </div>
              <div className="w-[200px]">
                <Select value={filter} onValueChange={handleFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="conservador">Conservador Estable</SelectItem>
                    <SelectItem value="potencial">Alto Potencial</SelectItem>
                    <SelectItem value="nuevo">Nuevo/Ocasional</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="dependiente">Dependiente</SelectItem>
                    <SelectItem value="independiente">Independiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </CardHeader>
        </Card>

        <KpiCards kpis={filteredData.kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <CoberturaBaseCard value={filteredData.coberturaBase} />
          </div>
          <div className="lg:col-span-3">
            <EntidadesChart data={filteredData.entidades} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClusterChart data={filteredData.cluster} />
          <SituacionLaboralChart data={filteredData.situacionLaboral} />
        </div>
       </div>
    </DashboardLayout>
  );
}
