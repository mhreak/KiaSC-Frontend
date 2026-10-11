import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const financialItems = [
  {
    label: "تعداد کل ورزش آموزان",
    value: "۱",
  },
  {
    label: "تعداد در حال ثبت نام",
    value: "۱",
  },
  {
    label: "تعداد ثبت نام نهایی",
    value: "۰",
  },
];

export default function CourseFinancialInfo() {
  return (
    <Card>
      <CardHeader className="bg-primary py-3">
        <CardTitle className="text-right text-sm text-primary-foreground">
          اطلاعات مالی دوره آموزشی
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-5 text-right">
          {financialItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-medium">
                {item.label}:
              </span>

              <span className="text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}