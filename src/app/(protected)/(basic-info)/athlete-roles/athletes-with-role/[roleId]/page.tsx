"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import BackButton from "@/components/shared/BackButton";
import { Athlete } from "@/types/api/endpointTypes/athlete.types";

const sampleData: Athlete[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullName: "مبین عاطفی",
    teamName: "زیر ۱۳ سال",
    ageGroup: "",
    fatherName: "",
    gender: 1,
    genderStr: "",
    nationalCole: "",
  },
];

export default function AthletesWithRolePage() {
  const athleteColumns: ColumnDef<Athlete>[] = [
    {
      accessorKey: "fullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "teamName",
      header: "نام تیم",
    },
  ];
  return (
    <div className="space-y-5">
      <DataTable columns={athleteColumns} data={sampleData} />
      <div className="flex-between">
        <div />
        <BackButton />
      </div>
    </div>
  );
}
