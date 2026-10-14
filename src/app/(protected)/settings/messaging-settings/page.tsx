"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { messagingSettingsFormConfig } from "./messagingSettingsFormConfig";

export default function messagingSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <FormRenderer
        config={messagingSettingsFormConfig}
        onSubmit={() => {}}
        formMode="add"
        submitButtonText="ذخیره"
        showCancelButton={false}
      />
    </div>
  );
}
