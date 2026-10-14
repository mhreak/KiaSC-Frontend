export interface Athlete {
  AthleteId: number;
  FullName: string;
  FatherName: string | null;
  Gender: boolean;
  NationalCode: string;
  Mobile: string;
  AgeGroupName: string | null;
}

export interface AthleteGetListParams {
  FilterFullName?: string;
  FilterNationalCode?: string;
  FilterMobile?: string;
  FilterAgeGroupId?: number;
  PageNumber?: number;
  PageSize?: number;
  SortField?: string;
  SortDirection?: string;
}

export interface AthleteGet {
  AthleteId: number;
  FirstName: string;
  LastName: string;
  AthleteFullName: string;
  Gender: boolean;
  GenderName: string;
  NationalCode: string;
  FatherName: string;
  BirthDate: string; // ISO 8601 date-time string
  ShamsiBirthDate: string;
  PhoneNumber: string;
  PhoneNumber2: string;
  Mobile: string;
  Email: string;
  Address: string;
  ParentPhoneNumber: string;
  ParentMobile: string;
  IntroducingCode: string;
  IntroducerCode: string;
  IntroducerAthleteId: number;
  IntroducerPersonId: number;
  IntroducerFullName: string;
  WalletCredit: number;
  ShamsiLastWalletUpdate: string;
  PersonalImageName: string;
  LastSeenPublicMessageId: number;
  LastSeenPrivateMessageId: number;
  SportHistory: string;
  IntroducingWalletChargePercent: number;
  AgeGroupName: string;
  BirthdayGiftId: number;
  BirthdayGiftName: string;
  PromoTypeId: number;
  PromoTypeName: string;
  InsertDate: string; // ISO 8601 date-time string
  InsuranceNumber: string;
  InsuranceExpirationDate: string; // ISO 8601 date-time string
  InsuranceRenewalType: number;
  InsuranceRenewalTypeStr: string;
  ShirtNumber: string; // "stri" در داده نمونه، احتمالاً string
}
