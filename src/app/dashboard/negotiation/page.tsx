import { SiteHeader } from '@/components/site-header';
import { AiNegotiationFeature } from '@/components/features/ai-negotiation';

export default function NegotiationPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <SiteHeader title="AI Negotiation Tool" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold font-headline">Get the Best Deal with AI</h1>
            <p className="text-muted-foreground">
              Generate effective negotiation strategies based on real-time data.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <AiNegotiationFeature />
          </div>
        </main>
      </div>
    </div>
  );
}
