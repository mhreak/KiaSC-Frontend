"use client";

import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { dashboardApi } from "@/api/services/ApiService/dashboardApi";
import IconTopBox from "./_components/IconTopBox";
import GradientTopBox from "./_components/GradientTopBox";
import { AthleteSignupTrendChart } from "./_components/AthleteSignupTrendChart";
import { CourseRegisterTrendChart } from "./_components/CourseRegisterTrendChart";

export default function DashboardPage() {
  const { data: topBoxesData, execute: getTopBoxesInfoData } = useApi(
    dashboardApi.getTopBoxesInfo,
  );

  const { data: athleteSignupTrenData, execute: getAthleteSignupTrend } =
    useApi(dashboardApi.getAthleteSignupTrend);

  const { data: courseRegisterTrenData, execute: getCourseRegisterTrend } =
    useApi(dashboardApi.getCourseRegisterTrend);

  useEffect(() => {
    getTopBoxesInfoData();
    getAthleteSignupTrend();
    getCourseRegisterTrend();
  }, []);

  return (
    <div className="h-full overflow-auto p-5">
      <div className="flex flex-row gap-3 ">
        <IconTopBox
          iconPath="/dashboard/dashboard-insight-athlete.png"
          label="تعداد ورزشکاران"
          value={topBoxesData?.AthleteCount || 0}
        />
        <IconTopBox
          iconPath="/dashboard/dashboard-insight-course.png"
          label="تعداد دوره ها"
          value={topBoxesData?.CourseCount || 0}
        />
        <IconTopBox
          iconPath="/dashboard/dashboard-insight-messages.png"
          label="تعداد پیام ها"
          value={topBoxesData?.MessageCount || 0}
        />
        <IconTopBox
          iconPath="/dashboard/dashboard-insight-dollar.png"
          label="مجموع پرداخت ها"
          value={topBoxesData?.PaymentSum || 0}
          isCurrency={true}
        />
      </div>
      <div className="flex flex-row gap-3 mt-5">
        <GradientTopBox
          label="اعتبار پنل پیامک: "
          value={0}
          colorSchema="sonset"
          isCurrency={true}
        />
        <GradientTopBox
          label="تعداد ثبت نام های امروز: "
          value={topBoxesData?.TodayRegiserationCount || 0}
          colorSchema="sky"
        />
        <GradientTopBox
          label="تعداد پیام های امروز: "
          value={topBoxesData?.TodayMessageCount || 0}
          colorSchema="royal"
        />
        <GradientTopBox
          label="تولد های امروز: "
          value={topBoxesData?.TodayBirthDayCount || 0}
          colorSchema="rose"
        />
      </div>
      <div className="flex items-center gap-3 mt-8">
        <AthleteSignupTrendChart data={athleteSignupTrenData} />
        <CourseRegisterTrendChart data={courseRegisterTrenData} />
      </div>
    </div>
  );
}
