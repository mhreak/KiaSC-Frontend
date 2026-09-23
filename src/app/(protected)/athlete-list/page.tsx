"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import React from "react";
import { athleteListFilterConfig } from "./athleteListFilterConfig";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FormDrawer } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";

export default function AthleteListPage() {
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteListFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={[]} data={[]} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer formConfig={[]} drawerTitle="ورزشکار" />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
