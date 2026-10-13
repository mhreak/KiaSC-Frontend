"use client";

import BackButton from "@/components/shared/BackButton";
import { useParams } from "next/navigation";
import ReviewInfo from "./_components/ReviewInfo";

export default function TransactionDetailsPage() {
  const { reviewId } = useParams<{ reviewId: string }>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <ReviewInfo />
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
