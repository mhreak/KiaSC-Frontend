import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/utils/numberConversions";

interface GradientTopBoxProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  colorSchema?: "sonset" | "sky" | "royal" | "rose";
}

export default function GradientTopBox({
  label,
  value,
  isCurrency = false,
  colorSchema = "sonset",
}: GradientTopBoxProps) {
  const formatedValu = isCurrency
    ? toPersianDigits(value.toLocaleString()) + " ریال"
    : toPersianDigits(value);

  const getBgClasses = (): string => {
    switch (colorSchema) {
      case "sonset":
        return "from-sunset-start to-sunset-end";
      case "sky":
        return "from-sky-start to-sky-end";
      case "royal":
        return "from-royal-start to-royal-end";
      case "rose":
        return "from-rose-start to-rose-end";

      default:
        return "from-sunset-start to-sunset-end";
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg shadow-xl p-4 flex items-center justify-center gap-2 bg-linear-to-r text-white",
        getBgClasses(),
      )}
    >
      <div>{label}</div>
      <div>{formatedValu}</div>
    </div>
  );
}
