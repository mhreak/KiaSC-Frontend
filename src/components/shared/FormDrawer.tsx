"use client";

import * as React from "react";
import { toast } from "@/components/ui/toast";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormRenderer } from "@/components/formBuilder/components/form-renderer";
import { FormConfig } from "@/components/formBuilder/types";

interface Props {
  drawerTitle: string;
  formConfig: FormConfig;
}

export function FormDrawer({ drawerTitle, formConfig }: Readonly<Props>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  function handleConfirm() {
    setOpen(false);
    toast.add({ description: "مسافر ثبت شد." });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={"down"}
    >
      <DrawerTrigger render={<Button variant="secondary">ثبت جدید</Button>} />
      <DrawerContent className="max-h-150 h-full">
        <DrawerHeader>
          <DrawerTitle className="text-2xl mb-3">ثبت شخص جدید</DrawerTitle>
        </DrawerHeader>
        {/* drawer content */}
        <hr className="mb-5" />
        <div className="pt-8 px-70 h-full overflow-auto">
          <FormRenderer
            config={formConfig}
            onSubmit={(data) => console.log("data in formRendere: ", data)}
            onCancel={() => setOpen(false)}
          />
        </div>
        {/* <DrawerFooter className="flex flex-row justify-between">
          <Button onClick={handleConfirm} className="h-8.5 min-w-32">
            ثبت
          </Button>
          <DrawerClose render={<Button variant="destructive" className={"min-w-32"}>لغو</Button>} />
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
