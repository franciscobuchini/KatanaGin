import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isTextarea?: boolean;
}

const Input = ({ className = "", isTextarea = false, ...props }: InputProps) => {
  const baseStyles = "w-full bg-white border border-border/50 rounded-2xl px-6 outline-none focus:border-primary/30 transition-all duration-300 font-normal text-muted placeholder:text-muted/60 focus:bg-secondary";
  
  if (isTextarea) {
    return (
      <textarea 
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={`${baseStyles} py-5 min-h-[160px] resize-none ${className}`}
      />
    );
  }

  return (
    <input 
      className={`${baseStyles} h-14 ${className}`}
      {...props}
    />
  );
};

export default Input;
