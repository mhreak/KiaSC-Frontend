import { toPersianDigits } from "@/utils/numberConversions";
import Image from "next/image";
import React from "react";

interface IconTopBoxProps {
  iconPath: string;
  label: string;
  value: number;
  isCurrency?: boolean;
}

export default function IconTopBox({
  iconPath,
  label,
  value,
  isCurrency = false,
}: IconTopBoxProps) {
  const formatedValu = isCurrency
    ? toPersianDigits(value.toLocaleString())
    : toPersianDigits(value);
  return (
    <div className="w-full rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.15)] p-4 flex items-center">
      <div className="relative aspect-square size-12">
        <Image src={iconPath} fill alt={label} />
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center">
        <div>{label}</div>
        <div>{formatedValu}</div>
      </div>
    </div>
  );
}
