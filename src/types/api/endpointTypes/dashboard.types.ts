export interface DashboardTopBoxesInfo {
  AthleteCount: number;
  CourseCount: number;
  PaymentSum: number;
  MessageCount: number;
  TodayBirthDayCount: number;
  TodayRegiserationCount: number;
  TodayMessageCount: number;
}

export interface AthleteSignupTrend {
  Year: number;
  Month: number;
  MonthName: string;
  AthleteCount: number;
}

export interface CourseRegisterTrend {
  Year: number;
  Month: number;
  MonthName: string;
  RegisterCount: number;
}
