
'use server';

import { z } from 'zod';
import { getProductRecommendations } from '@/ai/flows/product-recommendation-from-browsing-history';
import { analyzeSalesTrendsAndPredict } from '@/ai/flows/sales-trend-analysis-and-prediction';
import { segmentCustomers } from '@/ai/flows/customer-segmentation-for-optimized-sales';
import { suggestNegotiationStrategy } from '@/ai/flows/ai-powered-negotiation-strategy-suggestion';
import type {
  ProductRecommendationOutput,
  SalesTrendAnalysisAndPredictionOutput,
  CustomerSegmentationOutput,
  SuggestNegotiationStrategyOutput,
} from './types';

const productRecommendationSchema = z.object({
  browsingHistory: z.string().min(1, 'Browsing history cannot be empty.'),
  customerData: z.string().optional(),
});

const salesTrendSchema = z.object({
  salesData: z.string().min(1, 'Sales data cannot be empty.'),
  predictionHorizon: z.string().min(1, 'Prediction horizon cannot be empty.'),
});

const customerSegmentationSchema = z.object({
  customerData: z.string().min(1, 'Customer data cannot be empty.'),
  segmentationCriteria: z.string().min(1, 'Segmentation criteria cannot be empty.'),
});

const negotiationStrategySchema = z.object({
  productDetails: z.string().min(1, 'Product details cannot be empty.'),
  currentOffer: z.coerce.number().positive('Current offer must be a positive number.'),
  sellerBehavior: z.string().min(1, 'Seller behavior cannot be empty.'),
  marketTrends: z.string().min(1, 'Market trends cannot be empty.'),
});

type ActionState<T> = {
  data?: T;
  error?: string;
};

export async function getProductRecommendationsAction(
  prevState: ActionState<ProductRecommendationOutput>,
  formData: FormData
): Promise<ActionState<ProductRecommendationOutput>> {
  try {
    const validatedFields = productRecommendationSchema.safeParse({
      browsingHistory: formData.get('browsingHistory'),
      customerData: formData.get('customerData'),
    });

    if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors.browsingHistory?.[0] };
    }

    const { browsingHistory, customerData } = validatedFields.data;
    const historyArray = browsingHistory.split(',').map((item) => item.trim()).filter(Boolean);

    if (historyArray.length === 0) {
      return { error: 'Please enter at least one product in the browsing history.' };
    }

    const result = await getProductRecommendations({
      browsingHistory: historyArray,
      customerData,
    });
    return { data: result };
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function analyzeSalesTrendsAction(
  prevState: ActionState<SalesTrendAnalysisAndPredictionOutput>,
  formData: FormData
): Promise<ActionState<SalesTrendAnalysisAndPredictionOutput>> {
  try {
    const validatedFields = salesTrendSchema.safeParse({
      salesData: formData.get('salesData'),
      predictionHorizon: formData.get('predictionHorizon'),
    });

    if (!validatedFields.success) {
      return { error: 'Invalid input. Please check your data and try again.' };
    }

    const result = await analyzeSalesTrendsAndPredict(validatedFields.data);
    return { data: result };
  } catch (error) {
    return { error: 'An unexpected error occurred during analysis. Please try again.' };
  }
}

export async function segmentCustomersAction(
  prevState: ActionState<CustomerSegmentationOutput>,
  formData: FormData
): Promise<ActionState<CustomerSegmentationOutput>> {
  try {
    const validatedFields = customerSegmentationSchema.safeParse({
      customerData: formData.get('customerData'),
      segmentationCriteria: formData.get('segmentationCriteria'),
    });

    if (!validatedFields.success) {
      return { error: 'Invalid input. Please check your data and try again.' };
    }
    const result = await segmentCustomers(validatedFields.data);
    return { data: result };
  } catch (error) {
    return { error: 'An unexpected error occurred during segmentation. Please try again.' };
  }
}

export async function suggestNegotiationStrategyAction(
  prevState: ActionState<SuggestNegotiationStrategyOutput>,
  formData: FormData
): Promise<ActionState<SuggestNegotiationStrategyOutput>> {
  try {
    const validatedFields = negotiationStrategySchema.safeParse({
      productDetails: formData.get('productDetails'),
      currentOffer: formData.get('currentOffer'),
      sellerBehavior: formData.get('sellerBehavior'),
      marketTrends: formData.get('marketTrends'),
    });
    
    if (!validatedFields.success) {
      return { error: 'Invalid input. Please ensure all fields are filled correctly.' };
    }

    const result = await suggestNegotiationStrategy(validatedFields.data);
    return { data: result };
  } catch (error) {
    return { error: 'An unexpected error occurred while generating strategy. Please try again.' };
  }
}
