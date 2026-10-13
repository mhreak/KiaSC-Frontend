import LabelValue from "@/components/shared/LabelValue";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { ReviewDetails } from "@/types/api/endpointTypes/reviews.types";

const sampleData: ReviewDetails = {
  id: "ethdfh-aejfaek",
  subject: "پیشنهاد",
  text: "سایت رو خوشگلتر کنید",
  sender: "مهدی مهدوی",
  createdAt: "2026-10-23",
  email: "mmahdavai@gmail.com",
  phoneNumber: "09123456789",
};

export default function ReviewInfo() {
  return (
    <div className="p-8 h-full mb-auto">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="موضوع" value={sampleData.subject} />
          <LabelValue label="متن" value={sampleData.text} />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="ارسال کننده" value={sampleData.sender} />
          <LabelValue label="تلفن همراه" value={sampleData.phoneNumber} />
          <LabelValue label="ایمیل" value={sampleData.email} />
          <LabelValue
            label="تاریخ ثبت"
            value={String(dateFormatter(sampleData.createdAt))}
          />
        </div>
      </div>
    </div>
  );
}
