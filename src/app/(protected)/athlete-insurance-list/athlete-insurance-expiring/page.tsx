"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FileChartColumn } from "lucide-react";
import React from "react";
import { athleteInsuranceExpiringFilterConfig } from "./athleteInsuranceExpiringFilterConfig";

export default function AthleteInsuranceExpiringPage() {
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteInsuranceExpiringFilterConfig}
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
