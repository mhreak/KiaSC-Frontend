"use client";

import React, { forwardRef, useImperativeHandle } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { FormConfig } from "@/components/formBuilder/types";

import { Edit, Eye, Plus, PlusSquare, X } from "lucide-react";

import CardSkeleton from "./skeletons/CardSkeleton";
import LinearLoadingProgress from "./LinearLoadingProgress";
import { cn } from "@/lib/utils";

interface Props {
  formConfig: FormConfig;
  onSubmit?: (data: any) => void;

  drawerTitle?: string;
  buttonText?: string;
  buttonComponent?: React.ReactElement;

  showTriggerButton?: boolean;

  formMode?: FormMode;

  isLoading?: boolean;
  loadingComponent?: React.ReactNode;

  isSubmitting?: boolean;
  submitButtonText?: string;

  modalContentClassName?: string;

  onTriggerButtonClick?: () => void;
}

export type FormMode = "add" | "edit" | "view";

const formIcons: Record<FormMode, React.ReactNode> = {
  add: <PlusSquare className="text-emerald-600 size-9" />,
  edit: <Edit className="text-amber-500 size-9" />,
  view: <Eye className="text-blue-500 size-9" />,
};

export interface FormModalRef {
  open: () => void;
  close: () => void;
}

const defaultLoadingComponent = (
  <div className="space-y-8">
    <CardSkeleton />
  </div>
);

export const FormModal = forwardRef<FormModalRef, Props>(
  (
    {
      drawerTitle = "ثبت جدید",
      formConfig,
      buttonText = "ثبت جدید",
      buttonComponent,
      showTriggerButton = true,
      onSubmit,
      formMode = "add",
      isLoading = false,
      loadingComponent = defaultLoadingComponent,
      isSubmitting = false,
      submitButtonText,
      modalContentClassName,
      onTriggerButtonClick,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const formIcon = formIcons[formMode];

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {showTriggerButton && (
          <DialogTrigger
            render={
              buttonComponent ? (
                buttonComponent
              ) : (
                <Button variant="default" onClick={onTriggerButtonClick}>
                  <Plus strokeWidth={5} />
                  {buttonText}
                </Button>
              )
            }
          />
        )}

        <DialogContent
          className={cn(
            "w-full h-full max-w-none rounded-2xl p-5 sm:max-w-3xl md:w-[55vw] md:h-fit md:max-w-4xl shadow-2xl flex flex-col gap-12",
            modalContentClassName,
          )}
          showCloseButton={false}
        >
          <DialogHeader className="flex flex-row justify-start items-center gap-5 h-fit">
            {formIcon}

            <DialogTitle
              className="
                  text-2xl
                  text-right
                  text-text
                  font-semibold
                  flex-1
                "
            >
              {formMode === "add"
                ? "ثبت"
                : formMode === "edit"
                  ? "ویرایش"
                  : "اطلاعات"}{" "}
              {drawerTitle}
            </DialogTitle>

            <Button
              size="icon-lg"
              variant="destructive"
              className="rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </DialogHeader>

          <hr />

          {/* Dialog content */}
          <div
            className={cn(
              "-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4",
              isLoading && "overflow-hidden",
            )}
          >
            {isLoading ? (
              loadingComponent
            ) : (
              <FormRenderer
                config={formConfig}
                onSubmit={(data) => onSubmit?.(data)}
                onCancel={() => setOpen(false)}
                submitButtonText={
                  formMode === "add"
                    ? `ثبت ${drawerTitle}`
                    : `ویرایش ${drawerTitle}`
                }
                isSubmitting={isSubmitting}
                formMode={formMode}
                buttonsContainerClassName="mt-5"
              />
            )}

            {isLoading && (
              <div className="absolute top-28 right-0 left-0 h-5">
                <LinearLoadingProgress className="w-full h-1" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

FormModal.displayName = "FormModal";
