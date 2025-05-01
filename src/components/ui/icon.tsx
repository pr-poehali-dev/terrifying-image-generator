
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  fallback?: IconName;
  size?: number;
}

const Icon = ({
  name,
  fallback = 'CircleAlert',
  size = 20,
  className,
  ...props
}: IconProps) => {
  const LucideIcon = LucideIcons[name] || LucideIcons[fallback];

  return (
    <LucideIcon
      size={size}
      className={cn('', className)}
      {...props}
    />
  );
};

export default Icon;
