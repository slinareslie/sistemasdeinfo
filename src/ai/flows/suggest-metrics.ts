'use server';

/**
 * @fileOverview AI-powered metric suggestion flow.
 *
 * - suggestMetrics - A function that analyzes data and suggests relevant metrics and visualizations.
 * - SuggestMetricsInput - The input type for the suggestMetrics function.
 * - SuggestMetricsOutput - The return type for the suggestMetrics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMetricsInputSchema = z.object({
  dataDescription: z
    .string()
    .describe('Una descripción de los datos, incluyendo su fuente y estructura.'),
  dataSample: z.string().describe('A sample of the data in JSON format.'),
});
export type SuggestMetricsInput = z.infer<typeof SuggestMetricsInputSchema>;

const SuggestMetricsOutputSchema = z.object({
  suggestedMetrics: z
    .array(z.string())
    .describe('Una lista de métricas de marketing sugeridas basadas en los datos.'),
  suggestedVisualizations: z
    .array(z.string())
    .describe('Una lista de visualizaciones sugeridas para el análisis de marketing.'),
  rationale: z
    .string()
    .describe(
      'Una justificación explicando cómo estas métricas y visualizaciones pueden ayudar a optimizar las estrategias de marketing.'
    ),
});
export type SuggestMetricsOutput = z.infer<typeof SuggestMetricsOutputSchema>;

export async function suggestMetrics(input: SuggestMetricsInput): Promise<SuggestMetricsOutput> {
  return suggestMetricsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMetricsPrompt',
  input: {schema: SuggestMetricsInputSchema},
  output: {schema: SuggestMetricsOutputSchema},
  prompt: `Eres un experto en marketing digital y análisis de datos. Tu objetivo es analizar la descripción y muestra de datos proporcionada para ofrecer recomendaciones de marketing accionables en español.

Datos del Usuario:
Descripción: {{{dataDescription}}}
Muestra JSON: {{{dataSample}}}

Basado en estos datos, proporciona lo siguiente:
1.  **Métricas de Marketing Sugeridas**: Identifica y lista las métricas de marketing más relevantes que se pueden derivar de los datos.
2.  **Visualizaciones de Marketing Sugeridas**: Propón los tipos de gráficos o visualizaciones que mejor representarían estas métricas para un análisis de marketing efectivo.
3.  **Justificación**: Explica de manera concisa por qué estas métricas y visualizaciones son importantes y cómo pueden ayudar al usuario a tomar mejores decisiones de marketing (por ejemplo, segmentación de clientes, optimización de campañas, etc.).

Asegúrate de que toda tu respuesta esté en español.
`,
});

const suggestMetricsFlow = ai.defineFlow(
  {
    name: 'suggestMetricsFlow',
    inputSchema: SuggestMetricsInputSchema,
    outputSchema: SuggestMetricsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
