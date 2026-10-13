import { Card } from "@/components/ui/card";

const summaryItems = [
  {
    label: "دوره آموزشی",
    value: "پاییز و زمستان ۱۴۰۴",
  },
  {
    label: "هزینه ثبت نام",
    value: "۷۲,۰۰۰,۰۰۰ ریال",
  },
  {
    label: "تعداد کل ورزش آموزان",
    value: "۱",
  },
];

export default function CourseSummary() {
  return (
    <Card className="p-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 text-right"
          >
            <span className="text-sm text-muted-foreground">
              {item.label}
            </span>

            <span className="text-base font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}