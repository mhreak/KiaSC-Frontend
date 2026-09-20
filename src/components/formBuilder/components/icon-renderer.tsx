import * as Icons from "lucide-react";

interface DynamicIconProps {
  name?: string;
  className?: string;
  iconSize?: number;
  onClick?: () => void;
}

export function DynamicIcon({
  name,
  className,
  iconSize,
  onClick,
}: Readonly<DynamicIconProps>) {
  if (!name) return null;

  // ۱. تبدیل ایمن به نوع مجهول و سپس ایندکس سیگنچر برای فرار از خطای کامپایلر
  const IconsNode = Icons as unknown as Record<
    string,
    React.ComponentType<any>
  >;

  const IconComponent = IconsNode[name];

  if (!IconComponent) {
    console.warn(`آیکون یافت نشد: ${name}`);
    return null;
  }

  // ۲. رندر استاندارد آیکون لوساید
  return (
    <IconComponent className={className} size={iconSize} onClick={onClick} />
  );
}
