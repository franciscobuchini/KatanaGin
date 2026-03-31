import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  gap?: 8 | 12 | 16 | 20;
}

export default function PageContainer({ children, className = "", gap = 8 }: PageContainerProps) {
  // Base classes including pt-32 to compensate for the fixed header on mobile and pt-40 on desktop
  const baseClasses = `pt-32 md:pt-40 pb-16 md:pb-20 px-4 flex flex-col items-center justify-center w-full min-h-full max-w-7xl mx-auto`;
  
  // Responsive gap
  const gapClass = {
    8: "gap-8",
    12: "gap-12",
    16: "gap-16",
    20: "gap-20",
  }[gap];

  return (
    <main className={`${baseClasses} ${gapClass} md:px-8 xl:px-32 ${className}`}>
      {children}
    </main>
  );
}
