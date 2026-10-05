import LabelValue from "@/components/shared/LabelValue";
import { currencyFormatter, dateFormatter } from "@/components/ui/data-table/formatters";
import { OnlineTransaction } from "@/types/api/endpointTypes/installment.types";

const sampleData: OnlineTransaction = {
  id: "ethdfh-aejfaek",
  athleteName: "مهدی مهدوی",
  course: "24 جلسه فوتبال",
  date: "2026-10-23",
  status: "success",
  price: 12000000,
  trackingNumber: 0,
  description: "شرح",
};

export default function TransactionInfo() {
  return (
    <div className="p-8 h-full mb-auto">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="شناسه تراکنش" value={sampleData.id} />
          <LabelValue label="ورزش آموز" value={sampleData.athleteName} />
          <LabelValue label="دوره آموزشی" value={sampleData.course} />
          <LabelValue label="تاریخ ثبت" value={String(dateFormatter(sampleData.date))} />
          <LabelValue label="مبلغ" value={currencyFormatter(sampleData.price)} />
          <LabelValue label="وضعیت" value={sampleData.status === "success" ? "موفق" : "ناموفق"} />
          <LabelValue label="شماره پیگیری" value={sampleData.trackingNumber} />
          <LabelValue label="شرح" value={sampleData.description} />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8"></div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}
