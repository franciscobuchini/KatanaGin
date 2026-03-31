import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  hoverIcon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  hoverIcon,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Base classes for consistent sizing and alignment
  const baseClasses = "flex items-center justify-center gap-2 transition-all duration-200 border border-transparent cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 active:scale-95";

  // Variant classes using centralized theme tokens
  const variantStyles = {
    primary: "bg-primary text-secondary hover:brightness-110",
    secondary: "bg-secondary text-primary hover:brightness-95",
    outline: "bg-transparent border-border text-primary hover:border-primary",
    ghost: "bg-transparent text-primary hover:bg-primary hover:text-secondary transition-colors border-none",
    success: "bg-success text-white hover:brightness-105",
    danger: "text-red-300 hover:bg-secondary transition-colors border-none",
  };

  // Size-based constants (height, text size, rounded corners)
  const sizeStyles = {
    xs: "h-7 text-[10px] rounded-md",
    sm: "h-9 text-xs rounded-md",
    md: "h-11 text-sm rounded-lg",
    lg: "h-14 text-lg rounded-xl",
  };

  // Content-based sizing (ensures square shape for icons and proper padding for text)
  const isIconOnly = !children && !!icon;
  
  const widthAndPadding = isIconOnly 
    ? { xs: "w-7 px-0", sm: "w-9 px-0", md: "w-11 px-0", lg: "w-14 px-0" }[size]
    : { xs: "px-2", sm: "px-3", md: "px-5", lg: "px-8" }[size];

  // Icon sizing
  const iconSize = { xs: 12, sm: 16, md: 20, lg: 24 }[size];

  const finalClasses = `
    ${baseClasses} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthAndPadding} 
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const currentIcon = (isHovered && hoverIcon) ? hoverIcon : icon;

  return (
    <button 
      onClick={onClick} 
      className={finalClasses} 
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentIcon && (
        <Icon 
          key={currentIcon}
          icon={currentIcon} 
          width={iconSize} 
          height={iconSize} 
          className="flex-shrink-0"
        />
      )}
      {children && <span>{children}</span>}
    </button>
  );
}

export default Button;
