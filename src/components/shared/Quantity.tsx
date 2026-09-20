import { toPersianDigits } from "@/utils/numberConversions";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface QuantityProps {
  value: number;
  onChange: (val: number) => void;
}

export default function Quantity({ value, onChange }: QuantityProps) {
  return (
    <div className="rounded-3xl bg-muted flex-between items-center gap-5 p-2">
      <span
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <Plus size={15} className="text-muted-foreground" />
      </span>
      <span className="flex-1">{toPersianDigits(value)}</span>
      <span
        onClick={() => {
          onChange(value - 1);
        }}
      >
        <Minus size={15} className="text-muted-foreground" />
      </span>
    </div>
  );
}
