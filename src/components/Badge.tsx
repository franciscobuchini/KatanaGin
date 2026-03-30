import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}: BadgeProps) {
  // Base classes (Identical to Button, but without interactive states)
  const baseClasses = "flex items-center justify-center gap-2 transition-all duration-200 border border-transparent font-medium whitespace-nowrap";

  // Variant classes (Exactly like Button, without hover)
  const variantStyles = {
    primary: "bg-primary text-secondary",
    secondary: "bg-secondary text-primary",
    outline: "bg-transparent border-border text-primary",
    ghost: "bg-transparent text-primary transition-colors border-none",
    success: "bg-success text-white",
  };

  // Size-based constants (Same as Button, adding xs)
  const sizeStyles = {
    xs: "h-7 text-[10px] rounded-lg font-normal",
    sm: "h-9 text-xs rounded-lg",
    md: "h-11 text-sm rounded-lg",
    lg: "h-14 text-base rounded-xl",
  };

  // Content-based sizing (Same logic as Button)
  const isIconOnly = !children && !!icon;
  
  const widthAndPadding = isIconOnly 
    ? { xs: "w-7 px-0", sm: "w-9 px-0", md: "w-11 px-0", lg: "w-14 px-0" }[size]
    : { xs: "px-2", sm: "px-3", md: "px-5", lg: "px-8" }[size];

  // Icon sizing (Same as Button)
  const iconSize = { xs: 14, sm: 16, md: 20, lg: 24 }[size];

  const finalClasses = `
    ${baseClasses} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthAndPadding} 
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <span className={finalClasses}>
      {icon && (
        <Icon 
          icon={icon} 
          width={iconSize} 
          height={iconSize} 
          className="flex-shrink-0"
        />
      )}
      {children && <span>{children}</span>}
    </span>
  );
}
