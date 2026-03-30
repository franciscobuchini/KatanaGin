import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  gap?: 8 | 12 | 16 | 20;
}

export default function PageContainer({ children, className = "", gap = 8 }: PageContainerProps) {
  // Base classes including pt-40 to compensate for the fixed header
  const baseClasses = `pt-40 pb-20 px-4 flex flex-col items-center justify-center w-full min-h-full max-w-7xl mx-auto`;
  
  // Responsive gap
  const gapClass = {
    8: "gap-8",
    12: "gap-12",
    16: "gap-16",
    20: "gap-20",
  }[gap];

  return (
    <main className={`${baseClasses} ${gapClass} md:px-24 lg:px-48 ${className}`}>
      {children}
    </main>
  );
}
