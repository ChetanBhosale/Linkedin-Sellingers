import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "default" | "outlined";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "md", variant = "ghost", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-[34px] w-[34px] p-2",
      md: "h-10 w-10 p-2.5",
      lg: "h-12 w-12 p-3",
    };

    const borderRadiusClasses = {
      sm: "rounded-[0.375rem]",
      md: "rounded-lg",
      lg: "rounded-lg",
    };

    const variantClasses = {
      ghost:
        "bg-transparent hover:bg-[var(--alpha-5)] active:bg-[var(--alpha-10)] text-[var(--icon-secondary)] hover:text-[var(--icon-primary)]",
      default:
        "bg-[var(--bg-elevated-primary)] hover:bg-[var(--bg-elevated-secondary)] text-[var(--icon-primary)]",
      outlined:
        "border border-[var(--border-default)] bg-transparent hover:bg-[var(--bg-elevated-primary)] hover:border-[var(--border-heavy)] text-[var(--icon-primary)]",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-surface-default)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          sizeClasses[size],
          borderRadiusClasses[size],
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };

