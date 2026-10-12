"use client";

import BackButton from "@/components/shared/BackButton";
import { useParams } from "next/navigation";
import TransactionInfo from "./_components/TransactionInfo";

export default function TransactionDetailsPage() {
  const { transactionId } = useParams<{ transactionId: string }>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <TransactionInfo />
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
