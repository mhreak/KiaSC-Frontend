"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CourseRegisterTrend } from "@/types/api/endpointTypes/dashboard.types";

const chartConfig = {
  Month: {
    label: "ماه",
    color: "var(--primary)",
  },
  RegisterCount: {
    label: "تعداد دوره های ثبت نام شده: ",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface AthleteSignupTrendChartProps {
  data: CourseRegisterTrend[] | null;
}

export function CourseRegisterTrendChart({
  data,
}: AthleteSignupTrendChartProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>روند ثبت نام در دوره ها</CardTitle>
        <CardDescription>
          تعداد دوره های ثبت‌ نام شده در شش ماه اخیر
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <LineChart
            accessibilityLayer
            data={data ?? []}
            margin={{
              left: 20,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="MonthName"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Line
              dataKey="RegisterCount"
              type="monotone"
              stroke="var(--color-royal-start)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--color-royal-end)",
              }}
              activeDot={{
                r: 6,
              }}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
