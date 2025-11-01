'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { analyzeSalesTrendsAction } from '@/lib/actions';
import type { SalesTrendAnalysisAndPredictionOutput } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LineChart, Lightbulb, ShoppingBag, AlertTriangle, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState: {
  data?: SalesTrendAnalysisAndPredictionOutput;
  error?: string;
} = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Wand2 className="mr-2 h-4 w-4 animate-pulse" />
          Analyzing...
        </>
      ) : (
        <>
          <LineChart className="mr-2 h-4 w-4" />
          Analyze Trends
        </>
      )}
    </Button>
  );
}

export function SalesTrendFeature() {
  const [state, formAction] = useFormState(analyzeSalesTrendsAction, initialState);
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
              <CardTitle>Sales Data Input</CardTitle>
              <CardDescription>Provide sales data in CSV format and select a prediction horizon.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="salesData">Sales Data (CSV)</Label>
                <Textarea
                  id="salesData"
                  name="salesData"
                  placeholder="product,date,sales
Product A,2023-01-01,100
Product B,2023-01-01,150"
                  rows={8}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="predictionHorizon">Prediction Horizon</Label>
                <Select name="predictionHorizon" defaultValue="next quarter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next week">Next Week</SelectItem>
                    <SelectItem value="next month">Next Month</SelectItem>
                    <SelectItem value="next quarter">Next Quarter</SelectItem>
                    <SelectItem value="next year">Next Year</SelectItem>
                  </SelectContent>
                </Select>
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
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <LineChart className="h-6 w-6 text-primary" />
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.trendAnalysis}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  <CardTitle>Sales Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.salesPrediction}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <CardTitle>Recommended Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {state.data.recommendedProducts.map((product, index) => (
                      <li key={index} className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm">
                        {product}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
             <Card className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                <LineChart className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Your sales trend analysis will appear here.
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
                    <CardContent className="flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-32 rounded-full" />
                        <Skeleton className="h-7 w-28 rounded-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }
    return children;
}
