'use server';

/**
 * @fileOverview Customer segmentation flow for optimizing product placement and sales strategies.
 *
 * - segmentCustomers - A function that handles the customer segmentation process.
 * - CustomerSegmentationInput - The input type for the segmentCustomers function.
 * - CustomerSegmentationOutput - The return type for the segmentCustomers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerSegmentationInputSchema = z.object({
  customerData: z.string().describe('Customer data, including browsing history, purchase history, demographics, and preferences.'),
  segmentationCriteria: z.string().describe('Criteria for segmenting customers, such as purchase frequency, average order value, product category preferences, or demographics.'),
});
export type CustomerSegmentationInput = z.infer<typeof CustomerSegmentationInputSchema>;

const CustomerSegmentationOutputSchema = z.object({
  customerSegments: z.array(
    z.object({
      segmentName: z.string().describe('Name of the customer segment.'),
      segmentDescription: z.string().describe('Description of the customer segment, including key characteristics and behaviors.'),
      productRecommendations: z.array(z.string()).describe('Product recommendations tailored to this customer segment.'),
      salesStrategies: z.array(z.string()).describe('Sales strategies optimized for this customer segment.'),
    })
  ).describe('Customer segments with descriptions, product recommendations, and sales strategies.'),
});
export type CustomerSegmentationOutput = z.infer<typeof CustomerSegmentationOutputSchema>;

export async function segmentCustomers(input: CustomerSegmentationInput): Promise<CustomerSegmentationOutput> {
  return customerSegmentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSegmentationPrompt',
  input: {schema: CustomerSegmentationInputSchema},
  output: {schema: CustomerSegmentationOutputSchema},
  prompt: `You are an expert marketing analyst specializing in customer segmentation for e-commerce businesses.

  Given the following customer data and segmentation criteria, segment customers into distinct groups and provide tailored product recommendations and sales strategies for each segment.

  Customer Data: {{{customerData}}}
  Segmentation Criteria: {{{segmentationCriteria}}}

  Format your response as a JSON object that adheres to the following schema:
  ${JSON.stringify(CustomerSegmentationOutputSchema)}

  Ensure the customerSegments array contains detailed descriptions, relevant product recommendations, and effective sales strategies for each segment.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const customerSegmentationFlow = ai.defineFlow(
  {
    name: 'customerSegmentationFlow',
    inputSchema: CustomerSegmentationInputSchema,
    outputSchema: CustomerSegmentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
