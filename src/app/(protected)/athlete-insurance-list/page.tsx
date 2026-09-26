"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FileChartColumn } from "lucide-react";
import React from "react";
import { athleteInsuranceListFilterConfig } from "./athleteInsuranceListFilterConfig";

export default function AthleteInsuranceList() {
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteInsuranceListFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={[]} data={[]} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
