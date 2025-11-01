import { SiteHeader } from '@/components/site-header';
import { ProductRecommendationFeature } from '@/components/features/product-recommendation';

export default function RecommendationsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <SiteHeader title="Product Recommendations" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold font-headline">AI-Powered Product Suggestions</h1>
            <p className="text-muted-foreground">
              Enter a user's browsing history to get personalized product recommendations.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <ProductRecommendationFeature />
          </div>
        </main>
      </div>
    </div>
  );
}
