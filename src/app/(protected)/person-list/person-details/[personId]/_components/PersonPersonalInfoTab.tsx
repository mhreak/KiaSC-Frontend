import React from "react";
import LabelValue from "@/components/shared/LabelValue";
import { Athlete } from "@/types/api/endpointTypes/athlete.types";
const sampleData: Athlete = {
  id: "ivsjekflisjdjj-aejfaek",
  fullNama: "محمد هادی رادان",
  fatherName: "محمد تقی",
  nationalCole: "1272244581",
  gender: 2,
  genderStr: "مرد",
  ageGroup: "",
};

export default function PersonPersonalInfoTab() {
  return (
    <div className="p-8 h-full mb-auto">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8">
          <LabelValue label="نام" value={sampleData.fullNama} />
          <LabelValue label="نام خانوادگی" value={sampleData.fullNama} />
          <LabelValue label="نام پدر" value={sampleData.fatherName} />
          <LabelValue label="جنسیت" value={sampleData.genderStr} />
          <LabelValue label="کد ملی" value={sampleData.nationalCole} />
          <LabelValue label="تاریخ تولد" value={sampleData.ageGroup} />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-3 gap-x-20 gap-y-5 ml-8"></div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}
