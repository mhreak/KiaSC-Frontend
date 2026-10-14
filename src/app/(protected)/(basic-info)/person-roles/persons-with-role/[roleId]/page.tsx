"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import BackButton from "@/components/shared/BackButton";
import { Person } from "@/types/api/endpointTypes/person.types";

const sampleData: Person[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullName: "مبین عاطفی",
    ageGroup: "",
    fatherName: "",
    gender: 1,
    genderStr: "",
    nationalCole: "",
  },
];

export default function AthletesWithRolePage() {
  const athleteColumns: ColumnDef<Person>[] = [
    {
      accessorKey: "fullName",
      header: "نام و نام خانوادگی",
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
