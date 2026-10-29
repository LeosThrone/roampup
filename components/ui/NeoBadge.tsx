import React from "react";

export interface NeoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "yellow" | "green" | "teal" | "red" | "gray";
  icon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<NeoBadgeProps["variant"]>, string> = {
  yellow: "bg-[#ffe500] text-[#1b1c1a]",
  green: "bg-[#7af8a5] text-[#004d28]",
  teal: "bg-[#249e90] text-white",
  red: "bg-[#ffdad6] text-[#93000a]",
  gray: "bg-[#efeeeb] text-[#4b4731]",
};

export const NeoBadge = React.forwardRef<HTMLSpanElement, NeoBadgeProps>(
  (
    {
      variant = "yellow",
      icon,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`border border-[#1b1c1a] rounded-full font-headline font-black text-xs px-2.5 py-0.5 inline-flex items-center gap-1 ${variantStyles[variant]} ${className}`.trim()}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

NeoBadge.displayName = "NeoBadge";
