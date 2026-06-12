import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "beta" | "soon";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#F5F5F7] text-[#1D1D1F]",
    outline: "border border-[#D2D2D7] text-[#6E6E73]",
    success: "bg-green-50 text-green-700 border border-green-200",
    beta: "bg-blue-50 text-blue-700 border border-blue-200",
    soon: "bg-orange-50 text-orange-700 border border-orange-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
