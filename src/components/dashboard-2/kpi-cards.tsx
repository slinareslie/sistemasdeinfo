
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign } from 'lucide-react'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"

interface KpiProps {
  kpis: {
    edad: { avg: number; range: string };
    ingreso: { avg: number; range: string };
    saldo: { avg: number; range: string };
  };
}

const formatCurrency = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}k`;
  }
  return value.toString();
}

export function KpiCards({ kpis }: KpiProps) {
  const chartData = (value: number, rangeMax: number) => [
    { name: 'value', value: value, fill: 'hsl(var(--primary))' },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Edad</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
             <div className="text-2xl font-bold">{kpis.edad.avg.toFixed(2)}</div>
             <p className="text-xs text-muted-foreground">Rango: {kpis.edad.range}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Ingreso</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">${formatCurrency(kpis.ingreso.avg)}</div>
            <p className="text-xs text-muted-foreground">Rango: {kpis.ingreso.range}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Total en SSFF</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
             <div className="text-2xl font-bold">${formatCurrency(kpis.saldo.avg)}</div>
             <p className="text-xs text-muted-foreground">Rango: {kpis.saldo.range}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
