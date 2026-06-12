import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#1D1D1F]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-[#D2D2D7] bg-white px-4 text-sm text-[#1D1D1F] placeholder:text-[#86868B]",
            "transition-all duration-200 outline-none",
            "focus:border-[#1D1D1F] focus:ring-2 focus:ring-[#1D1D1F]/10",
            "disabled:bg-[#F5F5F7] disabled:cursor-not-allowed",
            error && "border-red-400 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-[#86868B]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
