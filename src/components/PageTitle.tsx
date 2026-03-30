import type { ReactNode } from 'react';

type TitleSize = 'sm' | 'md' | 'lg';

interface PageTitleProps {
  children: ReactNode;
  size?: TitleSize;
  className?: string;
  uppercase?: boolean;
}

function PageTitle({ 
  children, 
  size = 'md', 
  className = '',
  uppercase = false
}: PageTitleProps) {
  const baseStyles = 'font-rodfat text-primary tracking-tighter';
  
  const sizeStyles = {
    sm: 'text-4xl md:text-5xl',
    md: 'text-5xl md:text-6xl',
    lg: 'text-7xl md:text-8xl leading-[0.85]'
  };

  // Construct the final class name, replacing multiple spaces with a single space
  const finalClasses = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${uppercase ? 'uppercase' : ''} 
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <h1 className={finalClasses}>
      {children}
    </h1>
  );
}

export default PageTitle;
