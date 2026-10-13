"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toPersianDigits } from "@/utils/numberConversions";
import { toJalaliDate } from "@/utils/utillityFunctions";
import { FileText } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const sampleData = [
  {
    id: "aldkfj-riugn-ejdjh",
    promoType: "دوستان و آشنایان",
    status: "فعال",
    athleteCount: 855,
    lastSignupDate: "2026-02-04",
  },
  {
    id: "aldkfj-riugn-yf",
    promoType: "معرفی از طریق ارگان ها",
    status: "فعال",
    athleteCount: 72,
    lastSignupDate: "2026-02-04",
  },
];

const chartData = [
  {
    type: "cash",
    label: "دوستان و آشنایان",
    value: 855,
    fill: "var(--color-cash)",
  },
  {
    type: "check",
    label: "معرفی از طریق ارگان ها",
    value: 72,
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
    label: "دوستان و آشنایان",
    color: "#f59e0b",
  },
  check: {
    label: "معرفی از طریق ارگان ها",
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

export default function PromoReportPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>روش آشنایی با موسسه</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تعداد ورزشکاران</TableHead>
                  <TableHead>تاریخ آخرین ثبت نام</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sampleData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <p className="max-w-55 truncate text-sm font-light">
                        {data.promoType}
                      </p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm font-light">
                      {data.status}
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-light">
                      {toPersianDigits(data.athleteCount)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-light">
                      {toPersianDigits(toJalaliDate(data.lastSignupDate))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-150"
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
    </div>
  );
}
