"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { smsSettingsFormConfig } from "./smsSettingsFormConfig";

export default function smsSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <FormRenderer
        config={smsSettingsFormConfig}
        onSubmit={() => {}}
        formMode="add"
        submitButtonText="ذخیره"
        showCancelButton={false}
      />
    </div>
  );
}
