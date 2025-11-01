'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  getProductRecommendationsAction,
} from '@/lib/actions';
import type { ProductRecommendationOutput } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingBag, AlertTriangle, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState: {
  data?: ProductRecommendationOutput;
  error?: string;
} = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Wand2 className="mr-2 h-4 w-4 animate-pulse" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function ProductRecommendationFeature() {
  const [state, formAction] = useFormState(getProductRecommendationsAction, initialState);
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
              <CardTitle>User Browsing History</CardTitle>
              <CardDescription>
                Enter product names from a user's browsing history, separated by commas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="browsingHistory">Products</Label>
                  <Textarea
                    id="browsingHistory"
                    name="browsingHistory"
                    placeholder="e.g., Smart TV, Wireless Headphones, Fitness Tracker"
                    rows={5}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customerData">Customer Profile (Optional)</Label>
                  <Textarea
                    id="customerData"
                    name="customerData"
                    placeholder="e.g., Age: 30-40, Interests: Tech, Fitness"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Products the user might be interested in, based on the provided data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusWrapper>
              {state.data ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {state.data.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:bg-accent/50">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{rec}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[250px]">
                  <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    Your product recommendations will appear here.
                  </p>
                </div>
              )}
            </StatusWrapper>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusWrapper({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <li key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-5 w-32 rounded-md" />
          </li>
        ))}
      </ul>
    );
  }
  return children;
}
