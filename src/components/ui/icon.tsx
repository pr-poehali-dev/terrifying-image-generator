
import { LucideIcon, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
} & Omit<LucideProps, "size">;

const Icon = ({ name, size = 24, className, fallback, ...props }: IconProps) => {
  // Берем иконку по имени
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  
  // Если иконки нет, используем запасной вариант
  const FallbackIcon = fallback 
    ? (LucideIcons as unknown as Record<string, LucideIcon>)[fallback]
    : LucideIcons.HelpCircle;

  const DisplayIcon = IconComponent || FallbackIcon;
  
  return <DisplayIcon size={size} className={cn("", className)} {...props} />;
};

export default Icon;
