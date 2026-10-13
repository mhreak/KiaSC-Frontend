"use client";

import BackButton from "@/components/shared/BackButton";
import { useParams } from "next/navigation";
import ReportCourseInfo from "./_components/ReportCourseInfo";

export default function ReportCourseDetailsPage() {
  const { reportCourseId } = useParams<{ reportCourseId: string }>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <ReportCourseInfo courseId={reportCourseId} />
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
