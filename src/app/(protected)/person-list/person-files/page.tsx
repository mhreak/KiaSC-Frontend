import { FormDrawer } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FileChartColumn } from "lucide-react";
import React from "react";
import { personFileFormConfig } from "./personFileFormConfig";

export default function PersonFilesPage() {
  return (
    <div className="space-y-5">
      <DataTable columns={[]} data={[]} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            formConfig={personFileFormConfig}
            drawerTitle="فایل فرد"
          />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
