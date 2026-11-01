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
import { AthleteSignupTrend } from "@/types/api/endpointTypes/dashboard.types";

const chartConfig = {
  Month: {
    label: "ماه",
    color: "var(--primary)",
  },
  AthleteCount: {
    label: "تعداد ورزشکاران ثبت نام شده: ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface AthleteSignupTrendChartProps {
  data: AthleteSignupTrend[] | null;
}

export function AthleteSignupTrendChart({
  data,
}: AthleteSignupTrendChartProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>روند ثبت نام ورزش آموزان</CardTitle>
        <CardDescription>
          تعداد ورزش آموزان ثبت‌ نام شده در شش ماه اخیر
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
              dataKey="AthleteCount"
              type="monotone"
              stroke="var(--color-sunset-start)"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--color-sunset-end)",
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
