import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: {
    root: "h-4 w-4",
    icon: "h-3 w-3",
  },
  md: {
    root: "h-5 w-5",
    icon: "h-4 w-4",
  },
  lg: {
    root: "h-6 w-6",
    icon: "h-5 w-5",
  },
};

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer shrink-0 rounded-sm border border-default bg-primary ring-offset-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-surface-default focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-heavy hover:bg-alpha-2 data-[state=checked]:bg-interactive-surface-default data-[state=checked]:text-interactive-surface-onsurface data-[state=checked]:border-[var(--alpha-10)] data-[state=checked]:shadow-[0_1px_3px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.14)] data-[state=checked]:hover:bg-interactive-surface-hover cursor-pointer",
      sizeVariants[size].root,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <svg
        className={cn(sizeVariants[size].icon, "animate-check-draw")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5 12l5 5L19 7"
          className="[stroke-dasharray:24] [stroke-dashoffset:24] animate-[check-stroke_200ms_ease-out_forwards]"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
