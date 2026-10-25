"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { athleteExcelReportFormConfig } from "./athleteExcelReportFormConfig";
import { toast } from "@/lib/toast/toast";
import { validateExcelReportFieldSelection } from "@/utils/utillityFunctions";

export default function AthleteExcelReport() {
  const handleSubmitForm = (data: Record<string, any>) => {
    const { isValid, message } = validateExcelReportFieldSelection(data);
    if (!isValid) {
      toast.error(message);
      return;
    }

    console.log(data);
  };

  return (
    <div>
      <FormRenderer
        config={athleteExcelReportFormConfig}
        onSubmit={handleSubmitForm}
        onInvalid={(errors) => {
          console.log(errors);
        }}
        buttonsContainerClassName="bg-transparent"
        showCancelButton={false}
        formMode="add"
        submitButtonText="ایجاد گزارش"
      />
    </div>
  );
}
