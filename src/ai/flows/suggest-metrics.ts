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
    .describe('A description of the data, including its source and structure.'),
  dataSample: z.string().describe('A sample of the data in JSON format.'),
});
export type SuggestMetricsInput = z.infer<typeof SuggestMetricsInputSchema>;

const SuggestMetricsOutputSchema = z.object({
  suggestedMetrics: z
    .array(z.string())
    .describe('A list of suggested metrics based on the data.'),
  suggestedVisualizations: z
    .array(z.string())
    .describe('A list of suggested visualizations for the data.'),
  rationale: z
    .string()
    .describe(
      'A rationale explaining why these metrics and visualizations are appropriate for the data.'
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
  prompt: `You are an expert data analyst. Analyze the provided data description and sample, and suggest relevant metrics and visualizations that would be appropriate for a dashboard.

Data Description: {{{dataDescription}}}

Data Sample: {{{dataSample}}}

Provide a rationale for your suggestions.

Format your response as a JSON object conforming to the following schema:
\{
  "suggestedMetrics": string[],
  "suggestedVisualizations": string[],
  "rationale": string
\}
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
