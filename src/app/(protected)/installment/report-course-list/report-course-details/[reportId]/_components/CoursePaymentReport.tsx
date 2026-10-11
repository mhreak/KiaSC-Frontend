import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    status: "در حال ثبت نام",
    students: "۱",
    registrationAmount: "۷۲,۰۰۰,۰۰۰",
    totalAmount: "۷۲,۰۰۰,۰۰۰",
  },
  {
    status: "ثبت نام نهایی",
    students: "۰",
    registrationAmount: "۰",
    totalAmount: "۰",
  },
  {
    status: "حذف شده",
    students: "۰",
    registrationAmount: "۰",
    totalAmount: "۰",
  },
];

export default function CoursePaymentReport() {
  return (
    <Card>
      <CardHeader className="bg-primary py-3">
        <CardTitle className="text-right text-sm text-primary-foreground">
          گزارش مالی ثبت نام بصورت پرداخت با چک
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">
                  وضعیت ثبت نام
                </TableHead>

                <TableHead className="text-center">
                  تعداد ورزش آموزان
                </TableHead>

                <TableHead className="text-center">
                  مجموع مبالغ ثبت نام دوره (ریال)
                </TableHead>

                <TableHead className="text-center">
                  مجموعه مبالغ کل (ریال)
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.status}>
                  <TableCell className="font-medium">
                    {row.status}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.students}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.registrationAmount}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.totalAmount}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="font-semibold">
                <TableCell>
                  مجموع
                </TableCell>

                <TableCell className="text-center text-blue-500">
                  ۱
                </TableCell>

                <TableCell className="text-center text-blue-500">
                  ۷۲,۰۰۰,۰۰۰
                </TableCell>

                <TableCell className="text-center text-blue-500">
                  ۷۲,۰۰۰,۰۰۰
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}