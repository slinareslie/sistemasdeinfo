"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Sparkles, Wand2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { suggestMetrics, type SuggestMetricsOutput } from "@/ai/flows/suggest-metrics"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  dataDescription: z.string().min(10, { message: "Por favor, proporciona una descripción detallada de tus datos." }),
});

export default function AiInsights() {
  const [result, setResult] = React.useState<SuggestMetricsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await suggestMetrics(values);
      setResult(aiResult);
    } catch (error) {
      console.error("Error en AI Insight:", error);
      toast({
        variant: "destructive",
        title: "Error al generar sugerencias",
        description: "Hubo un problema al contactar a la IA. Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg transition-all hover:shadow-xl w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span>Ideas impulsadas por IA</span>
        </CardTitle>
        <CardDescription>Describe tus datos y deja que la IA sugiera nuevas métricas y visualizaciones para tu dashboard.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="dataDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe tus datos</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ej: Tengo datos de ventas de e-commerce con producto, precio, fecha y ciudad. Quiero ideas para optimizar mis campañas de marketing." 
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando...</>
              ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generar Sugerencias</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <div className="p-6 pt-0">
          <Separator className="my-4" />
          <div className="space-y-4">
              <h3 className="font-semibold">Sugerencias de la IA</h3>
              <div>
                  <h4 className="font-medium text-sm mb-2">Métricas Sugeridas</h4>
                  <div className="flex flex-wrap gap-2">
                      {result.suggestedMetrics.map((metric) => (
                          <Badge key={metric} variant="secondary">{metric}</Badge>
                      ))}
                  </div>
              </div>
              <div>
                  <h4 className="font-medium text-sm mb-2">Visualizaciones Sugeridas</h4>
                  <div className="flex flex-wrap gap-2">
                      {result.suggestedVisualizations.map((viz) => (
                          <Badge key={viz} variant="secondary">{viz}</Badge>
                      ))}
                  </div>
              </div>
              <div>
                  <h4 className="font-medium text-sm mb-2">Justificación</h4>
                  <p className="text-sm text-muted-foreground">{result.rationale}</p>
              </div>
          </div>
        </div>
      )}
    </Card>
  )
}
