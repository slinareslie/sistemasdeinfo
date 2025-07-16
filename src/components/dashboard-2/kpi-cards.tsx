
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign } from 'lucide-react'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
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
    const parts = range.replace('k', '000').split(' a ');
    return { min: parseFloat(parts[0]), max: parseFloat(parts[1]) };
}


export function KpiCards({ kpis }: KpiProps) {
    const edadRange = parseRange(kpis.edad.range);
    const ingresoRange = parseRange(kpis.ingreso.range);
    const saldoRange = parseRange(kpis.saldo.range);
  
    const edadChartData = [{ name: 'edad', value: kpis.edad.avg, fill: 'hsl(var(--chart-1))' }];
    const ingresoChartData = [{ name: 'ingreso', value: kpis.ingreso.avg, fill: 'hsl(var(--chart-2))' }];
    const saldoChartData = [{ name: 'saldo', value: kpis.saldo.avg, fill: 'hsl(var(--chart-4))' }];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Edad</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div>
                 <div className="text-2xl font-bold">{kpis.edad.avg.toFixed(1)}</div>
                 <p className="text-xs text-muted-foreground">Rango: {kpis.edad.range}</p>
            </div>
            <div className="h-[60px] w-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={edadChartData} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[edadRange.min, edadRange.max]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" angleAxisId={0} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio de Ingreso</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">${formatCurrency(kpis.ingreso.avg)}</div>
            <p className="text-xs text-muted-foreground">Rango: {kpis.ingreso.range}</p>
          </div>
          <div className="h-[60px] w-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={ingresoChartData} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[ingresoRange.min, ingresoRange.max]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" angleAxisId={0} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Total en SSFF</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
             <div className="text-2xl font-bold">${formatCurrency(kpis.saldo.avg)}</div>
             <p className="text-xs text-muted-foreground">Rango: {kpis.saldo.range}</p>
          </div>
           <div className="h-[60px] w-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={saldoChartData} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[saldoRange.min, saldoRange.max]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" angleAxisId={0} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
