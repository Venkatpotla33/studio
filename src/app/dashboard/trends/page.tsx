import { SiteHeader } from '@/components/site-header';
import { SalesTrendFeature } from '@/components/features/sales-trends';

export default function TrendsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <SiteHeader title="Sales Trend Analysis" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold font-headline">Analyze and Predict Sales Trends</h1>
            <p className="text-muted-foreground">
              Leverage AI to understand past performance and forecast future sales.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <SalesTrendFeature />
          </div>
        </main>
      </div>
    </div>
  );
}
