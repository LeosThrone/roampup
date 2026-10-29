import React from "react";

export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<NeoButtonProps["variant"]>, string> = {
  primary:
    "bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:shadow-[6px_6px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 neo-press-none",
  secondary:
    "bg-white hover:bg-[#fbf9f6] text-[#1b1c1a] border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] hover:shadow-[5px_5px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 neo-press",
  danger:
    "bg-[#ffdad6] hover:bg-[#ffb4ab] border-2 border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a] text-[#93000a] hover:-translate-x-0.5 hover:-translate-y-0.5 neo-press",
  ghost:
    "bg-transparent hover:bg-[#f5f3f0] text-[#1b1c1a] border-2 border-transparent",
};

const sizeStyles: Record<NonNullable<NeoButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      children,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`font-headline font-bold rounded-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

NeoButton.displayName = "NeoButton";
