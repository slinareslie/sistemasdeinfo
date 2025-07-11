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

const formSchema = z.object({
  dataDescription: z.string().min(10, { message: "Please provide a detailed data description." }),
  dataSample: z.string().min(20, { message: "Please provide a valid JSON data sample." }),
});

export default function AiInsights() {
  const [result, setResult] = React.useState<SuggestMetricsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataDescription: "",
      dataSample: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await suggestMetrics(values);
      setResult(aiResult);
    } catch (error) {
      console.error("AI Insight Error:", error);
      // Here you would use a toast to show the error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span>AI-Powered Insights</span>
        </CardTitle>
        <CardDescription>Let AI analyze your data and suggest new metrics and visualizations for your dashboard.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="dataDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Monthly sales data from our e-commerce platform including product category, price, and region." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataSample"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Sample (JSON)</FormLabel>
                  <FormControl>
                    <Textarea placeholder='[{"product": "Laptop", "sales": 4500, "region": "North"}, ...]' {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generate Suggestions</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <div className="p-6 pt-0">
          <Separator className="my-4" />
          <div className="space-y-4">
              <h3 className="font-semibold">AI Suggestions</h3>
              <div>
                  <h4 className="font-medium text-sm mb-2">Suggested Metrics</h4>
                  <div className="flex flex-wrap gap-2">
                      {result.suggestedMetrics.map((metric) => (
                          <Badge key={metric} variant="secondary">{metric}</Badge>
                      ))}
                  </div>
              </div>
              <div>
                  <h4 className="font-medium text-sm mb-2">Suggested Visualizations</h4>
                  <div className="flex flex-wrap gap-2">
                      {result.suggestedVisualizations.map((viz) => (
                          <Badge key={viz} variant="secondary">{viz}</Badge>
                      ))}
                  </div>
              </div>
              <div>
                  <h4 className="font-medium text-sm mb-2">Rationale</h4>
                  <p className="text-sm text-muted-foreground">{result.rationale}</p>
              </div>
          </div>
        </div>
      )}
    </Card>
  )
}
