'use server';
/**
 * @fileOverview Analyzes sales trends and predicts future sales performance.
 *
 * - analyzeSalesTrendsAndPredict - Analyzes sales trends and predicts future sales performance.
 * - SalesTrendAnalysisAndPredictionInput - The input type for the analyzeSalesTrendsAndPredict function.
 * - SalesTrendAnalysisAndPredictionOutput - The return type for the analyzeSalesTrendsAndPredict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesTrendAnalysisAndPredictionInputSchema = z.object({
  salesData: z.string().describe('Sales data in CSV format.'),
  predictionHorizon: z.string().describe('The time horizon for the prediction (e.g., next month, next quarter).'),
});
export type SalesTrendAnalysisAndPredictionInput = z.infer<typeof SalesTrendAnalysisAndPredictionInputSchema>;

const SalesTrendAnalysisAndPredictionOutputSchema = z.object({
  trendAnalysis: z.string().describe('Analysis of sales trends.'),
  salesPrediction: z.string().describe('Prediction of future sales performance.'),
  recommendedProducts: z.array(z.string()).describe('Recommended products based on the analysis and prediction.'),
});
export type SalesTrendAnalysisAndPredictionOutput = z.infer<typeof SalesTrendAnalysisAndPredictionOutputSchema>;

export async function analyzeSalesTrendsAndPredict(input: SalesTrendAnalysisAndPredictionInput): Promise<SalesTrendAnalysisAndPredictionOutput> {
  return salesTrendAnalysisAndPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesTrendAnalysisAndPredictionPrompt',
  input: {schema: SalesTrendAnalysisAndPredictionInputSchema},
  output: {schema: SalesTrendAnalysisAndPredictionOutputSchema},
  prompt: `You are an expert sales analyst.

You will analyze sales trends from the provided data and predict future sales performance, then recommend which products to focus on.

Sales Data (CSV): {{{salesData}}}
Prediction Horizon: {{{predictionHorizon}}}

Analyze the sales data, predict sales for the {{predictionHorizon}}, identify trends and suggest products for recommendation.`, 
});

const salesTrendAnalysisAndPredictionFlow = ai.defineFlow(
  {
    name: 'salesTrendAnalysisAndPredictionFlow',
    inputSchema: SalesTrendAnalysisAndPredictionInputSchema,
    outputSchema: SalesTrendAnalysisAndPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
