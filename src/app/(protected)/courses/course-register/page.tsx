"use client";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import React, { useEffect, useState } from "react";
import { courseRegisterFormConfig } from "./courseRegisterFormConfig";
import { generateFormConfig, toFieldOptions } from "@/utils/utillityFunctions";
import { useApi } from "@/hooks/useApi";
import { discountCodeApi } from "@/api/services/ApiService/discountCodeApi";
import { toast } from "@/lib/toast/toast";
import { CourseGet } from "@/types/api/endpointTypes/course.types";
import { courseApi } from "@/api/services/ApiService/courseApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  CourseClass,
  CourseClasseGetListParams,
} from "@/types/api/endpointTypes/courseClasses.types";
import { courseClassApi } from "@/api/services/ApiService/courseClassesApi";
import { FieldOption } from "@/components/formBuilder/types";
import { athleteInCourseApi } from "@/api/services/ApiService/athleteInCourseApi";

const paymentTypeOptions: FieldOption[] = [
  { value: 4, label: "پرداخت قسطی" },
  { value: 2, label: "پرداخت نقدی" },
  { value: 3, label: "پرداخت چک" },
];

const validateDiscountCodeRequirenments = (
  formValues: Record<string, any>,
): boolean => {
  if (
    formValues.AthleteId === undefined ||
    formValues.AthleteId === null ||
    formValues.AthleteId === ""
  ) {
    toast.error("لطفا ورزشکار را انتخاب کنید");
    return false;
  }
  if (
    formValues.CourseId === undefined ||
    formValues.CourseId === null ||
    formValues.CourseId === ""
  ) {
    toast.error("لطفا دوره را انتخاب کنید");
    return false;
  }
  if (
    formValues.PaymentTypeId === undefined ||
    formValues.PaymentTypeId === null ||
    formValues.PaymentTypeId === ""
  ) {
    toast.error("لطفا نحوه ی پرداخت را انتخاب کنید");
    return false;
  }
  if (
    formValues.DiscountCode === undefined ||
    formValues.DiscountCode === null ||
    formValues.DiscountCode === ""
  ) {
    toast.error("لطفا کد تخفیف را وارد کنید");
    return false;
  }
  return true;
};

export default function CourseRegisterPage() {
  const [filteredPaymentTypeOptions, setFilteredPaymentTypeOptions] = useState<
    FieldOption[]
  >([]);

  const { data: validatedData, execute: validateDiscountCode } = useApi(
    discountCodeApi.validate,
  );

  const {
    data: courseData,
    isLoading: getLoading,
    execute: getCourse,
  } = useApi<CourseGet, { id: number }>(courseApi.get, {
    onSuccess(response) {
      const filteredOptions = paymentTypeOptions.filter((option) => {
        switch (option.value) {
          case 2:
            return response.AllowCashPay;
          case 3:
            return response.AllowPayWithCheque;
          case 4:
            return response.AllowPayInstallment;
          default:
            return true;
        }
      });
      setFilteredPaymentTypeOptions(filteredOptions);
    },
  });

  const {
    data: allCourseClassesData,
    isLoading: getListCourseClassLoading,
    execute: getListCourseClasses,
  } = useApi<APIGetTemplate<CourseClass[]>, CourseClasseGetListParams>(
    courseClassApi.getList,
  );

  const { isLoading: addLoading, execute: addAthleteInCourse } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(athleteInCourseApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
    },
  });

  useEffect(() => {}, []);

  const formConfig = generateFormConfig(courseRegisterFormConfig, {
    options: {
      PaymentTypeId: filteredPaymentTypeOptions,
    },
    fieldProps: {
      DiscountCode: {
        onClick: (formValues) => {
          const isValid = validateDiscountCodeRequirenments(formValues);
          if (isValid) {
            validateDiscountCode({
              AthleteId: formValues.AthleteId,
              CourseId: formValues.CourseId,
              PaymentTypeId: formValues.PaymentTypeId,
              Code: formValues.DiscountCode,
            });
          }
        },
      },

      CourseClassId: {
        isLoading: getListCourseClassLoading,
        options: toFieldOptions(
          allCourseClassesData?.Items ?? [],
          "ClassName",
          "CourseClassId",
        ),
      },
    },
  });

  const handleFieldChange = (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => {
    if (fieldId !== "CourseId") return;
    getCourse({ id: value });
    getListCourseClasses({ CourseId: value });
  };

  const handleSubmitForm = (data: any) => {
    const clearedData = {
      AthleteId: data.AthleteId,
      CourseId: data.CourseId,
      CourseClassId: data.CourseClassId,
      PaymentTypeId: data.PaymentTypeId,
      RegisterState: data.RegisterState,
      DiscountCodeId: null,
      UsedWalletCredit: data.UsedWalletCredit,
      RegisterOptionIds: null,
    };
    console.log(clearedData);
    addAthleteInCourse(clearedData);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <FormRenderer
        config={formConfig}
        onSubmit={handleSubmitForm}
        formMode="add"
        submitButtonText="ثبت نام"
        showCancelButton={false}
        onFieldChange={handleFieldChange}
        buttonsContainerClassName="bg-transparent"
        isSubmitting={addLoading}
      />
    </div>
  );
}
