"use client";

import { useEffect, useState } from "react";
import NumberFlow, { type Value, NumberFlowGroup } from "@number-flow/react";
import { cn } from "@/lib/utils";

type NumberTickerProps = {
  seconds: number;
  className?: string;
  showHours?: boolean;
  numberClassName?: string;
  seperatorClassName?: string;
};

/**
 * NumberTicker 03 - Time Chronometer
 * Specialized HH:MM:SS timer with per-segment rolling.
 */
export function NumberTicker({
  seconds,
  className,
  showHours = true,
  numberClassName,
  seperatorClassName,
}: NumberTickerProps) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div
      className={cn(`flex items-center justify-center w-full gap-2`, className)}
    >
      <NumberFlow
        value={s}
        format={{ minimumIntegerDigits: 2 }}
        className={cn(
          "bg-card rounded-lg size-12 flex-center text-text",
          numberClassName,
        )}
      />
      <span className={cn("text-primary-foreground", seperatorClassName)}>
        :
      </span>
      <NumberFlow
        value={m}
        format={{ minimumIntegerDigits: 2 }}
        className={cn(
          "bg-card rounded-lg size-12 flex-center text-text",
          numberClassName,
        )}
      />
      {showHours && (
        <span className={cn("text-primary-foreground", seperatorClassName)}>
          :
        </span>
      )}
      {showHours && (
        <NumberFlowGroup>
          <NumberFlow
            value={h}
            format={{ minimumIntegerDigits: 2 }}
            className={cn(
              "bg-card rounded-lg size-12 flex-center text-text",
              numberClassName,
            )}
          />
        </NumberFlowGroup>
      )}
    </div>
  );
}

const NumberTickerDemo = () => {
  const [sec, setSec] = useState(3665); // 01:01:05

  useEffect(() => {
    const timer = setInterval(() => {
      setSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <NumberTicker
        seconds={sec}
        className="text-foreground font-medium lg:text-5xl sm:text-4xl text-3xl tabular-nums tracking-tighter"
      />
    </div>
  );
};

export default NumberTickerDemo;
