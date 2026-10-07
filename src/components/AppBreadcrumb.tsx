"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { BREADCRUMB_LABELS } from "@/constants/sidebar/breadcrumbLabels";
import { BREADCRUMB_IGNORE_LIST } from "@/constants/sidebar/breadcrumbIgnoreList";
import { DynamicIcon } from "./formBuilder/components/icon-renderer";
import { SIDEBAR_ICON_NAMES } from "@/constants/sidebar/sidebarIconNames";

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);

  // -----------------------------
  // Dashboard
  // -----------------------------
  if (pathname === "/") {
    return (
      <div className="flex flex-row items-center justify-start gap-5">
        <div className="rounded-2xl border border-border bg-muted p-4">
          <DynamicIcon name="Home" className="size-9 text-sky-400" />
        </div>

        <div>
          <div className="mb-3 text-2xl font-extrabold">پیشخوان</div>

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
  // Query params
  // -----------------------------
  const name = searchParams.get("name");
  const idName = searchParams.get("idName");

  // -----------------------------
  // Remove ignored segments
  // -----------------------------
  const filteredSegments = segments
    .map((segment, originalIndex) => ({
      segment,
      originalIndex,
    }))
    .filter(({ segment }) => !BREADCRUMB_IGNORE_LIST.includes(segment));

  // -----------------------------
  // Remove dynamic route
  // -----------------------------
  const lastSegment = filteredSegments.at(-1)?.segment;

  const isDynamicRoute =
    lastSegment !== undefined && !BREADCRUMB_LABELS[lastSegment];

  const visibleSegments = isDynamicRoute
    ? filteredSegments.slice(0, -1)
    : filteredSegments;

  // -----------------------------
  // Last visible segment
  // -----------------------------
  const lastVisibleSegment = visibleSegments.at(-1)?.segment;

  const iconName = lastVisibleSegment
    ? SIDEBAR_ICON_NAMES[lastVisibleSegment]
    : undefined;

  // -----------------------------
  // Page title
  // -----------------------------
  const pageTitle = name
    ? name
    : lastVisibleSegment
      ? BREADCRUMB_LABELS[lastVisibleSegment]
      : "";

  return (
    <div className="flex flex-row items-center justify-start gap-3">
      <div className="rounded-2xl border border-border bg-stone-50 p-2">
        <div className="relative aspect-square size-12">
          {iconName && (
            <Image
              src={iconName}
              alt={lastVisibleSegment ?? ""}
              className="size-9"
              fill
            />
          )}
        </div>
      </div>

      <div>
        <div className="mb-2 text-2xl font-extrabold">{pageTitle}</div>

        <Breadcrumb>
          <BreadcrumbList>
            {visibleSegments.map(({ segment, originalIndex }, index) => {
              const href = "/" + segments.slice(0, originalIndex + 1).join("/");

              const isLast = index === visibleSegments.length - 1 && !name;

              const label =
                BREADCRUMB_LABELS[segment] ?? decodeURIComponent(segment);

              return (
                <div
                  key={`${segment}-${originalIndex}`}
                  className="flex items-center gap-2"
                >
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

            {/* Dynamic route + name */}
            {isDynamicRoute && name && (
              <>
                {visibleSegments.length > 0 && <BreadcrumbSeparator />}

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
