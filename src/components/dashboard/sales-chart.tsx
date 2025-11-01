'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', sales: 18600 },
  { month: 'February', sales: 30500 },
  { month: 'March', sales: 23700 },
  { month: 'April', sales: 73000 },
  { month: 'May', sales: 20900 },
  { month: 'June', sales: 21400 },
];

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function SalesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <RechartsBarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickFormatter={(value) => `$${Number(value) / 1000}k`}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
      </RechartsBarChart>
    </ChartContainer>
  );
}
