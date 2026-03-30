import React from 'react';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

function Card({ className = "", children }: CardProps) {
  // We check if children is a video to remove padding, or we could just let the user handle it
  // But for now, let's keep it simple as requested.
  return (
    <div className={`w-full max-w-4xl bg-gradient-to-tr bg-card rounded-4xl border border-border shadow-xl shadow-gray-200/50 overflow-hidden group relative ${className}`}>
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Card;
