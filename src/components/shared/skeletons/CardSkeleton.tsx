import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CardSkeleton() {
  return (
    <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
      <div className="flex items-center gap-4 border-b p-5">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-62.5" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-16 gap-y-10 p-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i+1} className="space-y-4">
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
