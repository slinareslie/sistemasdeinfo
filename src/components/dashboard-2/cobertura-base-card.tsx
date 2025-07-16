
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CoberturaBaseProps {
  value: number;
}

export function CoberturaBaseCard({ value }: CoberturaBaseProps) {
  return (
    <Card className="h-full flex flex-col justify-center items-center">
      <CardHeader className="text-center">
        <CardDescription>Cobertura base</CardDescription>
        <CardTitle className="text-6xl font-bold text-primary">
          {new Intl.NumberFormat('es-PE').format(value)}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
