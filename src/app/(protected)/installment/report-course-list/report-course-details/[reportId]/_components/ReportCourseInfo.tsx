import CourseCharts from "./CourseCharts";
import CourseFinancialInfo from "./CourseFinancialInfo";
import CoursePaymentReport from "./CoursePaymentReport";
import CourseSummary from "./CourseSummery";
import DiscountInfo from "./DiscountInfo";

interface ReportCourseInfoProps {
  courseId: string;
}

export default function ReportCourseInfo({ courseId }: ReportCourseInfoProps) {
  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <CourseSummary />
      <CourseCharts />
      <CourseFinancialInfo />
      <CoursePaymentReport />
      <DiscountInfo />
    </div>
  );
}
