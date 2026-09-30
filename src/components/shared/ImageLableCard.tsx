import { cn } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";

const themes = {
  amber: {
    card: "border-amber-200 shadow-amber-100",
    footer: "bg-amber-100 text-amber-800",
  },
  yellow: {
    card: "border-yellow-200 shadow-yellow-100",
    footer: "bg-yellow-100 text-yellow-800",
  },
  orange: {
    card: "border-orange-200 shadow-orange-100",
    footer: "bg-orange-100 text-orange-800",
  },
  red: {
    card: "border-red-200 shadow-red-100",
    footer: "bg-red-100 text-red-800",
  },
  rose: {
    card: "border-rose-200 shadow-rose-100",
    footer: "bg-rose-100 text-rose-800",
  },
  pink: {
    card: "border-pink-200 shadow-pink-100",
    footer: "bg-pink-100 text-pink-800",
  },
  fuchsia: {
    card: "border-fuchsia-200 shadow-fuchsia-100",
    footer: "bg-fuchsia-100 text-fuchsia-800",
  },
  purple: {
    card: "border-purple-200 shadow-purple-100",
    footer: "bg-purple-100 text-purple-800",
  },
  violet: {
    card: "border-violet-200 shadow-violet-100",
    footer: "bg-violet-100 text-violet-800",
  },
  indigo: {
    card: "border-indigo-200 shadow-indigo-100",
    footer: "bg-indigo-100 text-indigo-800",
  },
  blue: {
    card: "border-blue-200 shadow-blue-100",
    footer: "bg-blue-100 text-blue-800",
  },
  sky: {
    card: "border-sky-200 shadow-sky-100",
    footer: "bg-sky-100 text-sky-800",
  },
  cyan: {
    card: "border-cyan-200 shadow-cyan-100",
    footer: "bg-cyan-100 text-cyan-800",
  },
  teal: {
    card: "border-teal-200 shadow-teal-100",
    footer: "bg-teal-100 text-teal-800",
  },
  emerald: {
    card: "border-emerald-200 shadow-emerald-100",
    footer: "bg-emerald-100 text-emerald-800",
  },
  green: {
    card: "border-green-200 shadow-green-100",
    footer: "bg-green-100 text-green-800",
  },
  lime: {
    card: "border-lime-200 shadow-lime-100",
    footer: "bg-lime-100 text-lime-800",
  },
  stone: {
    card: "border-stone-200 shadow-stone-100",
    footer: "bg-stone-100 text-stone-800",
  },
  neutral: {
    card: "border-neutral-200 shadow-neutral-100",
    footer: "bg-neutral-100 text-neutral-800",
  },
  zinc: {
    card: "border-zinc-200 shadow-zinc-100",
    footer: "bg-zinc-100 text-zinc-800",
  },
  slate: {
    card: "border-slate-200 shadow-slate-100",
    footer: "bg-slate-100 text-slate-800",
  },
  gray: {
    card: "border-gray-200 shadow-gray-100",
    footer: "bg-gray-100 text-gray-800",
  },
} as const;

export interface ImageLableCardProps {
  imageSrc: string;
  label: string;
  onClick?: () => void;
  className?: string;
  headerClassName?: string;
  themeColor?: keyof typeof themes;
  link?: string;
}

export default function ImageLableCard({
  imageSrc,
  label,
  onClick,
  className,
  headerClassName,
  themeColor,
  link,
}: ImageLableCardProps) {
  const router = useTransitionRouter();

  const theme = themes[themeColor as keyof typeof themes] ?? themes.emerald;

  const handleOnClick = () => {
    if (link) {
      router.push(link);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        "bg-card border shadow rounded-2xl cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl",
        theme.card,
        className,
      )}
      onClick={handleOnClick}
    >
      <div
        className={cn("flex-center p-3 py-16 rounded-t-2xl", headerClassName)}
      >
        <div className="relative size-32 aspect-square">
          <Image src={imageSrc} alt={label} fill />
        </div>
      </div>
      <hr />
      <div
        className={cn(
          "text-center p-3 py-5 text-xl text-text rounded-b-2xl",
          theme.footer,
        )}
      >
        {label}
      </div>
    </div>
  );
}
