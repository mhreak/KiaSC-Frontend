"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { FormConfig, FormMode } from "@/components/formBuilder/types";
import { Edit, Eye, Plus, PlusSquare, X } from "lucide-react";
import CardSkeleton from "./skeletons/CardSkeleton";
import { cn } from "@/lib/utils";
import LinearLoadingProgress from "./LinearLoadingProgress";

interface Props {
  formConfig: FormConfig;
  onSubmit?: (data: any) => void;
  onFieldChange?: (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => void;
  drawerTitle?: string;
  buttonText?: string;
  buttonComponent?: React.ReactElement;
  showTriggerButton?: boolean;
  formMode?: FormMode;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  isSubmitting?: boolean;
  isSubmittingText?: string;
}

const formIcons: Record<FormMode, React.ReactNode> = {
  add: <PlusSquare className="text-emerald-600 size-9" />,
  edit: <Edit className="text-amber-500 size-9" />,
  view: <Eye className="text-blue-300 size-9" />,
};

export interface FormDrawerRef {
  open: () => void;
  close: () => void;
}

const defaultLoadingComponent = (
  <div className="space-y-8">
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

export const FormDrawer = forwardRef<FormDrawerRef, Props>(
  (
    {
      drawerTitle = "ثبت جدید",
      formConfig,
      buttonText = "ثبت جدید",
      buttonComponent,
      showTriggerButton = true,
      onSubmit,
      onFieldChange,
      formMode = "add",
      isLoading = false,
      loadingComponent = defaultLoadingComponent,
      isSubmitting = false,
      isSubmittingText,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const isMobile = useIsMobile();

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const formIcon = formIcons[formMode];

    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
        showSwipeHandle={isMobile}
        swipeDirection={"down"}
      >
        {showTriggerButton && (
          <DrawerTrigger
            render={
              buttonComponent ? (
                buttonComponent
              ) : (
                <Button variant="default" className={"min-w-40"}>
                  <Plus />
                  {buttonText}
                </Button>
              )
            }
          />
        )}
        <DrawerContent className="max-h-[90%] h-full">
          <DrawerHeader className="pb-4">
            <div className="flex flex-row justify-start items-center gap-5">
              {formIcon}
              <DrawerTitle className="text-2xl text-right text-text font-semibold flex-1">
                {formMode === "add"
                  ? "ثبت"
                  : formMode === "edit"
                    ? "ویرایش"
                    : "اطلاعات"}{" "}
                {drawerTitle}
              </DrawerTitle>
              <Button
                size="icon-lg"
                variant="destructive"
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </Button>
            </div>
          </DrawerHeader>
          {/* drawer content */}
          <hr className="mb-5" />
          <div
            className={cn(
              "pt-8 px-70 h-full overflow-auto",
              isLoading && "overflow-hidden",
            )}
          >
            {isLoading ? (
              loadingComponent
            ) : (
              <FormRenderer
                config={formConfig}
                onSubmit={(data) => onSubmit?.(data)}
                onFieldChange={onFieldChange}
                onCancel={() => setOpen(false)}
                isSubmitting={isSubmitting}
                isSubmittingText={isSubmittingText}
                submitButtonText={`${
                  formMode === "add"
                    ? "ثبت"
                    : formMode === "edit"
                      ? "ویرایش"
                      : "اطلاعات"
                } ${drawerTitle}`}
                formMode={formMode}
              />
            )}
          </div>
          {isLoading && (
            <div className="absolute top-19 right-0 left-0 h-5">
              <LinearLoadingProgress className="w-[110%] h-1" />
            </div>
          )}
        </DrawerContent>
      </Drawer>
    );
  },
);
