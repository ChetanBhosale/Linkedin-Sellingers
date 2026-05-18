import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border border-default bg-primary cursor-pointer select-none text-interactive-surface-default ring-offset-primary transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-surface-default focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-heavy hover:bg-alpha-2 data-[state=checked]:border-[var(--alpha-10)] data-[state=checked]:bg-interactive-surface-default data-[state=checked]:shadow-[0_1px_3px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.14)] data-[state=checked]:hover:bg-interactive-surface-hover",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-interactive-surface-onsurface animate-[radio-pop_200ms_ease-out]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
