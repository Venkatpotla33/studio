// product-recommendation-from-browsing-history.ts
'use server';
/**
 * @fileOverview Provides product recommendations based on user's browsing history.
 *
 * - getProductRecommendations - A function that returns personalized product recommendations.
 * - ProductRecommendationInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  browsingHistory: z.array(z.string()).describe('List of product names from browsing history.'),
  customerData: z.string().optional().describe('Optional customer data to further personalize recommendations.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('List of recommended product names.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `Based on the user's browsing history:

  {{#each browsingHistory}}
  - {{this}}
  {{/each}}

  {% if customerData %}Customer data: {{{customerData}}}{% endif %}

  Recommend products that the user might be interested in.  Return a list of product names.  Do not include any explanations or conversational text.  Only return the list of product names.`, 
});

const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
