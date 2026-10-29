import React from "react";

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const shadowStyles: Record<NonNullable<NeoCardProps["size"]>, string> = {
  sm: "neo-shadow-sm",
  md: "neo-shadow",
  lg: "neo-shadow-lg",
};

export const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ size = "lg", children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white border-[3px] border-[#1b1c1a] rounded-2xl ${shadowStyles[size]} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoCard.displayName = "NeoCard";
