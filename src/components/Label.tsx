import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label 
      className={`text-md text-muted-foreground mb-2 ml-4 block ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
