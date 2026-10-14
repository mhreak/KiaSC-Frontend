"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import ToastItem from "./ToastItem";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const MAX_VISIBLE = 3; // حداکثر تست قابل نمایش
const GAP = 12; // فاصله‌ی تست‌ها در حالت باز (hover)
const PEEK = 10; // مقدار بیرون‌زدگی هر تست در حالت stack
const SCALE_STEP = 0.05; // کوچک شدن هر لایه در حالت stack

const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.9,
} as const;

type Toast = ReturnType<typeof useToast>["toasts"][number];

interface StackedToastProps {
  toast: Toast;
  index: number;
  total: number;
  expanded: boolean;
  y: number;
  height?: number; // ارتفاع نهایی این تست
  onHeight: (id: Toast["id"], h: number) => void;
  onClose: () => void;
}

const StackedToast: React.FC<StackedToastProps> = ({
  toast,
  index,
  total,
  expanded,
  y,
  height,
  onHeight,
  onClose,
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const hidden = index >= MAX_VISIBLE;
  const layer = Math.min(index, MAX_VISIBLE - 1);

  // اندازه‌گیری ارتفاع طبیعی تست
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    onHeight(toast.id, el.offsetHeight);
    const ro = new ResizeObserver(() => onHeight(toast.id, el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [toast.id, onHeight]);

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{
        zIndex: total - index,
        transformOrigin: "top center",
        // در حالت stack، تست‌های پشتی نباید از زیر اولین تست بیرون بزنند
        overflow: !expanded && index > 0 ? "hidden" : "visible",
        pointerEvents: hidden ? "none" : "auto",
      }}
      initial={{ opacity: 0, y: -24, scale: 0.94 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y,
        scale: expanded ? 1 : 1 - layer * SCALE_STEP,
        height,
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      transition={SPRING}
    >
      <div ref={innerRef}>
        <ToastItem toast={toast} onClose={onClose} />
      </div>
    </motion.div>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // وقتی همه‌ی تست‌ها بسته شدند، حالت hover را ریست کن
  useEffect(() => {
    if (toasts.length === 0) setExpanded(false);
  }, [toasts.length]);

  const handleHeight = React.useCallback((id: Toast["id"], h: number) => {
    setHeights((prev) =>
      prev[String(id)] === h ? prev : { ...prev, [String(id)]: h },
    );
  }, []);

  if (!mounted) return null;

  const h = (t: Toast) => heights[String(t.id)] ?? 0;
  const frontHeight = toasts[0] ? h(toasts[0]) : 0;
  const visible = toasts.slice(0, MAX_VISIBLE);

  // محاسبه‌ی y هر تست
  const positions: number[] = [];
  let acc = 0;
  toasts.forEach((t, i) => {
    if (i < MAX_VISIBLE) {
      positions.push(expanded ? acc : i * PEEK);
      acc += h(t) + GAP;
    } else {
      // تست‌های مخفی دقیقاً پشت آخرین تست قابل‌دیدن می‌مانند
      positions.push(positions[MAX_VISIBLE - 1]);
    }
  });

  const expandedHeight =
    visible.reduce((sum, t) => sum + h(t), 0) +
    Math.max(visible.length - 1, 0) * GAP;
  const collapsedHeight = frontHeight + Math.max(visible.length - 1, 0) * PEEK;
  const stackHeight = expanded ? expandedHeight : collapsedHeight;

  const containerClasses = cn(
    // Position
    "fixed top-4 left-1/2 z-50",
    "-translate-x-1/2",
    // Size
    "w-[calc(100%-2rem)]",
    "sm:w-[calc(100%-4rem)]",
    "md:w-[calc(100%-6rem)]",
    "max-w-xl",
    // Padding
    "p-4 sm:p-6",
    // PWA / Safe area
    "pt-safe",
    "pb-safe",
    "safe-bottom",
    "safe-right",
    // خود کانتینر هیچ‌وقت کلیک را نمی‌گیرد؛ فقط خود stack می‌گیرد
    "pointer-events-none",
  );

  return createPortal(
    <div className={containerClasses} aria-live="polite" aria-atomic="false">
      <motion.div
        className="relative w-full pointer-events-auto"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        animate={{ height: stackHeight }}
        initial={false}
        transition={SPRING}
        style={{ pointerEvents: toasts.length === 0 ? "none" : "auto" }}
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast, index) => (
            <StackedToast
              key={toast.id}
              toast={toast}
              index={index}
              total={toasts.length}
              expanded={expanded}
              y={positions[index]}
              height={
                !expanded && index > 0 && frontHeight
                  ? frontHeight
                  : h(toast) || undefined
              }
              onHeight={handleHeight}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>,
    document.body,
  );
};

export default ToastContainer;
