"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import React from "react";
import { courseRegisterFormConfig } from "./courseRegisterFormConfig";

export default function CourseRegisterPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <FormRenderer
        config={courseRegisterFormConfig}
        onSubmit={() => {}}
        formMode="add"
        submitButtonText="ثبت نام"
        showCancelButton={false}
      />
    </div>
  );
}
