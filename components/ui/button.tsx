import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "gold" | "soft";
  size?: "sm" | "md" | "lg" | "icon";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-white/25",
  outline:
    "bg-transparent text-white border border-amber-200/20 hover:bg-amber-50/10 hover:border-amber-200/40",
  ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent",
  gold:
    "bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-200 text-slate-950 border border-amber-100/60 hover:shadow-[0_0_30px_rgba(248,211,122,0.4)]",
  soft:
    "bg-white/8 text-white border border-amber-100/10 hover:bg-white/12 hover:border-amber-100/25",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";