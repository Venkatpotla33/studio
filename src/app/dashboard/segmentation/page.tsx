import { SiteHeader } from '@/components/site-header';
import { CustomerSegmentationFeature } from '@/components/features/customer-segmentation';

export default function SegmentationPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <SiteHeader title="Customer Segmentation" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold font-headline">Optimize with Customer Segmentation</h1>
            <p className="text-muted-foreground">
              Group customers to tailor product placement and sales strategies effectively.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <CustomerSegmentationFeature />
          </div>
        </main>
      </div>
    </div>
  );
}
