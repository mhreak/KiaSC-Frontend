import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscountInfo() {
  return (
    <Card>
      <CardHeader className="bg-primary py-3">
        <CardTitle className="text-right text-sm text-primary-foreground">
          اطلاعات استفاده از کد های تخفیف
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-25 items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          در این دوره آموزشی از هیچ کد تخفیفی استفاده نشده است
        </p>
      </CardContent>
    </Card>
  );
}
