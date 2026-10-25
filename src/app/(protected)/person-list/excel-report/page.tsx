"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";

import { toast } from "@/lib/toast/toast";
import { validateExcelReportFieldSelection } from "@/utils/utillityFunctions";
import { personExcelReportFormConfig } from "./personExcelReportFormConfig";

export default function PersonExcelReport() {
  const handleSubmitForm = (data: Record<string, any>) => {
    const { isValid, message } = validateExcelReportFieldSelection(data);
    if (!isValid) toast.error(message);
  };

  return (
    <div>
      <FormRenderer
        config={personExcelReportFormConfig}
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
