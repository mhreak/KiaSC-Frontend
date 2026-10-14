"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { generalSettingsFormConfig } from "./generalSettingsFormConfig";

export default function generalSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <FormRenderer
        config={generalSettingsFormConfig}
        onSubmit={() => {}}
        formMode="add"
        submitButtonText="ذخیره"
        showCancelButton={false}
      />
    </div>
  );
}
