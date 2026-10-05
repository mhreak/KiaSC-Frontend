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
    type: "cash",
    label: "پرداخت نقدی",
    value: 1,
    fill: "var(--color-cash)",
  },
  {
    type: "check",
    label: "پرداخت چک",
    value: 0,
    fill: "var(--color-check)",
  },
  {
    type: "installment",
    label: "پرداخت قسطی",
    value: 0,
    fill: "var(--color-installment)",
  },
  {
    type: "card",
    label: "کارت به کارت",
    value: 0,
    fill: "var(--color-card)",
  },
  {
    type: "bank",
    label: "فیش بانکی",
    value: 0,
    fill: "var(--color-bank)",
  },
  {
    type: "wallet",
    label: "اعتبار از کیف پول",
    value: 0,
    fill: "var(--color-wallet)",
  },
];

const chartConfig = {
  cash: {
    label: "پرداخت نقدی",
    color: "#f59e0b",
  },
  check: {
    label: "پرداخت چک",
    color: "#ef4444",
  },
  installment: {
    label: "پرداخت قسطی",
    color: "#3b82f6",
  },
  card: {
    label: "کارت به کارت",
    color: "#8b5cf6",
  },
  bank: {
    label: "فیش بانکی",
    color: "#34d399",
  },
  wallet: {
    label: "اعتبار از کیف پول",
    color: "#f97316",
  },
} satisfies ChartConfig;

export default function RegistrationTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-base">
          ورزش آموزان بر اساس نوع ثبت نام
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

              <ChartLegend
                content={<ChartLegendContent />}
                className="flex-wrap gap-x-4 gap-y-2"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
