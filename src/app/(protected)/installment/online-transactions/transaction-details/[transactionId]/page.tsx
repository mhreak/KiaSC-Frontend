"use client";

import BackButton from "@/components/shared/BackButton";
import { Tabs } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import TransactionInfo from "./_components/TransactionInfo";

export default function TransactionDetailsPage() {
  const { transactionId } = useParams<{ transactionId: string }>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <Tabs className={"mb-auto h-full"}>
            <TransactionInfo />
        </Tabs>
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
