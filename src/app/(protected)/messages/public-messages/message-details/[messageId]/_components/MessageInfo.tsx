import LabelValue from "@/components/shared/LabelValue";
import { MessageDetails } from "@/types/api/endpointTypes/messages.types";
import { dateFormatter } from "@/components/ui/data-table/formatters";

const sampleData: MessageDetails = {
  id: "ivsjekflisjdjj-aejfaek",
  title: "عنوان پیام",
  text: "متن پیام",
  status: "published",
  field: "فوتبال",
  term: "پاییز",
  course: "دورۀ فلان",
  team: "تیم بهمان",
  createdAt: "2026-10-23",
  publishedAt: "2026-10-23",
};

export default function MessageInfo() {
  return (
    <div className="p-8 h-full mb-auto">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="عنوان پیام" value={sampleData.title} />
          <LabelValue label="متن پیام" value={sampleData.text} />
          <LabelValue
            label="وضعیت انتشار"
            value={
              sampleData.status === "published" ? "منتشر شده" : "منتشر نشده"
            }
          />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="رشتۀ ورزشی" value={sampleData.field} />
          <LabelValue label="ترم" value={sampleData.term} />
          <LabelValue label="دورۀ آموزشی" value={sampleData.course} />
          <LabelValue label="تیم" value={sampleData.team} />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue
            label="زمان ایجاد"
            value={String(dateFormatter(sampleData.createdAt))}
          />
          <LabelValue
            label="زمان ارسال"
            value={String(dateFormatter(sampleData.publishedAt))}
          />
        </div>
      </div>
    </div>
  );
}
