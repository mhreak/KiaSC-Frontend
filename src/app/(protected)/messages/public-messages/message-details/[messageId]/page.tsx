"use client";

import BackButton from "@/components/shared/BackButton";
import { Tabs } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import MessageInfo from "./_components/MessageInfo";

export default function MessageDetailsPage() {
  const { messageId } = useParams<{ messageId: string }>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <Tabs className={"mb-auto h-full"}>
          <MessageInfo />
        </Tabs>
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
