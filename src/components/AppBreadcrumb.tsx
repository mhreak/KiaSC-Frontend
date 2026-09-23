"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { BREADCRUMB_LABELS } from "@/constants/sidebar/breadcrumbLabels";
import { DynamicIcon } from "./formBuilder/components/icon-renderer";
import { SIDEBAR_ICON_NAMES } from "@/constants/sidebar/sidebarIconNames";
import Image from "next/image";

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);

  // -----------------------------
  // Dashboard
  // -----------------------------
  if (pathname === "/") {
    return (
      <div className="flex flex-row justify-start items-center gap-5">
        <div className="border border-border rounded-2xl p-4 bg-muted">
          <DynamicIcon name={"Home"} className="size-9 text-sky-400" />
        </div>
        <div>
          <div className="text-2xl font-extrabold mb-3">{"پیشخوان"}</div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-bold">
                  پیشخوان
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Last segment
  // -----------------------------
  const lastSegment = segments.at(-1);

  const isLastSegmentId =
    lastSegment !== undefined && !BREADCRUMB_LABELS[lastSegment];

  // اگر name در query string وجود داشته باشد
  const name = searchParams.get("name");
  const idName = searchParams.get("idName");

  // اگر آخرین segment عدد باشد،
  // آن را از breadcrumb حذف می‌کنیم.
  const visibleSegments = isLastSegmentId ? segments.slice(0, -1) : segments;

  return (
    <div className="flex flex-row justify-start items-center gap-3">
      <div className="border border-border p-2 rounded-2xl bg-stone-50">
        <div className="relative aspect-square size-12 ">
          <Image
            src={
              SIDEBAR_ICON_NAMES[visibleSegments[visibleSegments.length - 1]]
            }
            alt={
              SIDEBAR_ICON_NAMES[visibleSegments[visibleSegments.length - 1]]
            }
            className="size-9 text-yellow-400 "
            fill
          />
        </div>
      </div>
      <div>
        <div className="text-2xl font-extrabold mb-2">
          {name
            ? name
            : BREADCRUMB_LABELS[visibleSegments[visibleSegments.length - 1]]}
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            {visibleSegments.map((segment, index) => {
              const href = "/" + visibleSegments.slice(0, index + 1).join("/");

              const isLast = index === visibleSegments.length - 1 && !name;

              const isNumericSegment = !BREADCRUMB_LABELS[segment];

              const label = isNumericSegment
                ? (idName ?? segment)
                : (BREADCRUMB_LABELS[segment] ?? decodeURIComponent(segment));

              return (
                <div key={href} className="flex items-center gap-2">
                  {index > 0 && <BreadcrumbSeparator />}

                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-sm font-bold">
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="text-xs"
                        render={<Link href={href}>{label}</Link>}
                      />
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}

            {/* اگر آخرین segment عدد بود و name داشتیم */}
            {isLastSegmentId && name && (
              <>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-bold">
                    {name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
