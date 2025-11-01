'use server';

/**
 * @fileOverview An AI agent that suggests negotiation strategies based on real-time data and predicted outcomes.
 *
 * - suggestNegotiationStrategy - A function that suggests negotiation strategies.
 * - SuggestNegotiationStrategyInput - The input type for the suggestNegotiationStrategy function.
 * - SuggestNegotiationStrategyOutput - The return type for the suggestNegotiationStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNegotiationStrategyInputSchema = z.object({
  productDetails: z.string().describe('Details of the product being negotiated.'),
  currentOffer: z.number().describe('The current offer price.'),
  sellerBehavior: z.string().describe('Description of the seller behavior.'),
  marketTrends: z.string().describe('Current market trends for the product.'),
});
export type SuggestNegotiationStrategyInput = z.infer<
  typeof SuggestNegotiationStrategyInputSchema
>;

const SuggestNegotiationStrategyOutputSchema = z.object({
  suggestedStrategy: z
    .string()
    .describe('A detailed negotiation strategy suggested by the AI.'),
  predictedOutcome: z
    .string()
    .describe('The predicted outcome of the suggested strategy.'),
  riskAssessment: z.string().describe('A risk assessment of the suggested strategy.'),
});
export type SuggestNegotiationStrategyOutput = z.infer<
  typeof SuggestNegotiationStrategyOutputSchema
>;

export async function suggestNegotiationStrategy(
  input: SuggestNegotiationStrategyInput
): Promise<SuggestNegotiationStrategyOutput> {
  return suggestNegotiationStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNegotiationStrategyPrompt',
  input: {schema: SuggestNegotiationStrategyInputSchema},
  output: {schema: SuggestNegotiationStrategyOutputSchema},
  prompt: `You are an AI-powered negotiation expert. Based on the provided information, suggest the best negotiation strategy to get the best deal.

Product Details: {{{productDetails}}}
Current Offer: {{{currentOffer}}}
Seller Behavior: {{{sellerBehavior}}}
Market Trends: {{{marketTrends}}}

Consider all factors and provide a detailed negotiation strategy, a predicted outcome, and a risk assessment.
`,
});

const suggestNegotiationStrategyFlow = ai.defineFlow(
  {
    name: 'suggestNegotiationStrategyFlow',
    inputSchema: SuggestNegotiationStrategyInputSchema,
    outputSchema: SuggestNegotiationStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
