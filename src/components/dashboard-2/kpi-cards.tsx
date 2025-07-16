
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign } from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
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
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
}

const parseRange = (range: string) => {
    const parts = range.replace(/k/g, '000').split(' a ');
    return { min: parseFloat(parts[0]), max: parseFloat(parts[1]) };
}


export function KpiCards({ kpis }: KpiProps) {
    const edadRange = parseRange(kpis.edad.range);
    const ingresoRange = parseRange(kpis.ingreso.range);
    const saldoRange = parseRange(kpis.saldo.range);

    const createChartData = (value: number, range: { min: number, max: number }) => {
        const percentage = ((value - range.min) / (range.max - range.min)) * 100;
        return [
            { name: 'value', value: percentage },
            { name: 'background', value: 100 - percentage },
        ];
    }
  
    const edadChartData = createChartData(kpis.edad.avg, edadRange);
    const ingresoChartData = createChartData(kpis.ingreso.avg, ingresoRange);
    const saldoChartData = createChartData(kpis.saldo.avg, saldoRange);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Edad</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[140px] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">{kpis.edad.avg.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Rango: {kpis.edad.range}</p>
          </div>
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={edadChartData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="70%"
                  outerRadius="100%"
                  cy="50%"
                  cx="50%"
                  paddingAngle={0}
                  stroke="none"
                >
                  <Cell fill="hsl(var(--chart-1))" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Ingreso</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[140px] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">${formatCurrency(kpis.ingreso.avg)}</div>
            <p className="text-xs text-muted-foreground">Rango: {kpis.ingreso.range}</p>
          </div>
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ingresoChartData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="70%"
                  outerRadius="100%"
                  cy="50%"
                  cx="50%"
                  paddingAngle={0}
                  stroke="none"
                >
                  <Cell fill="hsl(var(--chart-2))" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Total en SSFF</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[140px] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">${formatCurrency(kpis.saldo.avg)}</div>
            <p className="text-xs text-muted-foreground">Rango: {kpis.saldo.range}</p>
          </div>
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={saldoChartData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="70%"
                  outerRadius="100%"
                  cy="50%"
                  cx="50%"
                  paddingAngle={0}
                  stroke="none"
                >
                  <Cell fill="hsl(var(--chart-4))" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
