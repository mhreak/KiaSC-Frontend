import LabelValue from "@/components/shared/LabelValue";
import { PrivateMessageDetails } from "@/types/api/endpointTypes/messages.types";
import { dateFormatter } from "@/components/ui/data-table/formatters";

const sampleData: PrivateMessageDetails = {
  id: "ivsjekflisjdjj-aejfaek",
  sender: "مهدی مهدوی",
  receiver: "علی علوی",
  title: "عنوان پیام",
  text: "متن پیام",
  status: "published",
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
          <LabelValue label="ارسال‌کننده" value={sampleData.sender} />
          <LabelValue label="گیرنده" value={sampleData.receiver} />
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
