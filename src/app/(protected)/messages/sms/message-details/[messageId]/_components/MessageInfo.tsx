import LabelValue from "@/components/shared/LabelValue";
import { SmsDetails } from "@/types/api/endpointTypes/messages.types";
import { dateFormatter } from "@/components/ui/data-table/formatters";

const sampleData: SmsDetails = {
  id: "ivsjekflisjdjj-aejfaek",
  text: "متن پیام",
  date: "2026-10-23",
  receiversCount: 12,
  senderNumber: "09111111111",
  phoneNumbers: ["09222222222", "09333333333"],
  athlete: "مهدی مهدوی",
};

export default function MessageInfo() {
  return (
    <div className="p-8 h-full mb-auto">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="متن پیام" value={sampleData.text} />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue
            label="زمان ارسال"
            value={String(dateFormatter(sampleData.date))}
          />
          <LabelValue
            label="تعداد دریافت‌کنندگان"
            value={sampleData.receiversCount}
          />
          <LabelValue
            label="شماره ارسال‌کننده"
            value={sampleData.senderNumber}
          />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue
            label="شماره‌های اضافه"
            value={sampleData.phoneNumbers.join(", ")}
          />
          <LabelValue label="ورزشکار" value={sampleData.athlete} />
        </div>
      </div>
    </div>
  );
}
