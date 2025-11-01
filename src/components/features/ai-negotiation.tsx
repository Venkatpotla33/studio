'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { suggestNegotiationStrategyAction } from '@/lib/actions';
import type { SuggestNegotiationStrategyOutput } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Gavel, Lightbulb, ShieldCheck, AlertTriangle, Wand2, DollarSign } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState: {
  data?: SuggestNegotiationStrategyOutput;
  error?: string;
} = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Wand2 className="mr-2 h-4 w-4 animate-pulse" />
          Thinking...
        </>
      ) : (
        <>
          <Gavel className="mr-2 h-4 w-4" />
          Suggest Strategy
        </>
      )}
    </Button>
  );
}

export function AiNegotiationFeature() {
  const [state, formAction] = useActionState(suggestNegotiationStrategyAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <CardTitle>Negotiation Details</CardTitle>
              <CardDescription>Provide details about the deal to get a strategy.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="productDetails">Product Details</Label>
                <Input id="productDetails" name="productDetails" placeholder="e.g., High-End Laptop Model X" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentOffer">Current Offer ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="currentOffer" name="currentOffer" type="number" placeholder="1200" required className="pl-8" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sellerBehavior">Seller Behavior</Label>
                <Textarea id="sellerBehavior" name="sellerBehavior" placeholder="e.g., Seems hesitant, mentioned other offers" rows={3} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="marketTrends">Market Trends</Label>
                <Textarea id="marketTrends" name="marketTrends" placeholder="e.g., Similar models are on sale this month" rows={3} required />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <StatusWrapper>
          {state.data ? (
            <div className="grid gap-6">
              <Card className="bg-primary/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Gavel className="h-6 w-6 text-primary" />
                  <CardTitle>Suggested Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.suggestedStrategy}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  <CardTitle>Predicted Outcome</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.predictedOutcome}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.riskAssessment}</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <Gavel className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                Your AI-powered negotiation strategy will appear here.
              </p>
            </Card>
          )}
        </StatusWrapper>
      </div>
    </div>
  );
}

function StatusWrapper({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    if (pending) {
        return (
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48 rounded-md" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-5/6 rounded-md" />
                         <Skeleton className="h-4 w-full rounded-md" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40 rounded-md" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-4/6 rounded-md" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-56 rounded-md" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                    </CardContent>
                </Card>
            </div>
        );
    }
    return children;
}
