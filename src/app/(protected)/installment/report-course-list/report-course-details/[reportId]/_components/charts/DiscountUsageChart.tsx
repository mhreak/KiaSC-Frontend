"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  {
    type: "used",
    label: "استفاده",
    value: 0,
    fill: "var(--color-used)",
  },
  {
    type: "unused",
    label: "عدم استفاده",
    value: 1,
    fill: "var(--color-unused)",
  },
];

const chartConfig = {
  used: {
    label: "استفاده",
    color: "#3b82f6",
  },
  unused: {
    label: "عدم استفاده",
    color: "#4ade80",
  },
} satisfies ChartConfig;

export default function DiscountUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-base">
          استفاده از کد تخفیف
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-75"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                innerRadius="58%"
                outerRadius="78%"
                strokeWidth={2}
                labelLine={false}
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
