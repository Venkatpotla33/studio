'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { segmentCustomersAction } from '@/lib/actions';
import type { CustomerSegmentationOutput } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Lightbulb, ShoppingBag, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState: {
  data?: CustomerSegmentationOutput;
  error?: string;
} = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Wand2 className="mr-2 h-4 w-4 animate-pulse" />
          Segmenting...
        </>
      ) : (
        <>
          <Users className="mr-2 h-4 w-4" />
          Segment Customers
        </>
      )}
    </Button>
  );
}

export function CustomerSegmentationFeature() {
  const [state, formAction] = useFormState(segmentCustomersAction, initialState);
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
              <CardTitle>Segmentation Input</CardTitle>
              <CardDescription>Provide customer data and the criteria for segmentation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customerData">Customer Data (e.g., CSV, JSON)</Label>
                <Textarea
                  id="customerData"
                  name="customerData"
                  placeholder='{"id": 1, "purchase_history": [...], "demographics": {...}}'
                  rows={8}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="segmentationCriteria">Segmentation Criteria</Label>
                <Textarea
                  id="segmentationCriteria"
                  name="segmentationCriteria"
                  placeholder="e.g., Segment by purchase frequency and average order value."
                  rows={3}
                  required
                />
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
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>AI-generated customer groups with tailored strategies.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusWrapper>
              {state.data ? (
                <Accordion type="single" collapsible className="w-full">
                  {state.data.customerSegments.map((segment, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          {segment.segmentName}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pl-4 border-l-2 ml-2 border-primary/50">
                        <p className="text-muted-foreground mb-4">{segment.segmentDescription}</p>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <ShoppingBag className="h-4 w-4 text-accent" />
                              Product Recommendations
                            </h4>
                            <ul className="flex flex-wrap gap-2">
                              {segment.productRecommendations.map((rec, i) => (
                                <li key={i} className="px-3 py-1 bg-accent/10 text-accent-foreground font-medium rounded-full text-sm">
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              Sales Strategies
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {segment.salesStrategies.map((strat, i) => (
                                <li key={i}>{strat}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[250px]">
                  <Users className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    Your customer segments will appear here.
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
            <div className="w-full space-y-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="border-b">
                        <div className="flex items-center justify-between py-4">
                           <Skeleton className="h-6 w-48 rounded-md" />
                           <Skeleton className="h-4 w-4 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return children;
}
