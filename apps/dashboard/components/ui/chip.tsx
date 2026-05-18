import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-interactive-surface-default focus:ring-offset-2",
  {
    variants: {
      variant: {
        filled:
          "bg-secondary border-transparent text-primary hover:border-heavy hover:bg-alpha-2 focus-visible:border-selected focus-visible:bg-status-info",
        outlined:
          "bg-transparent border-default text-primary hover:border-heavy hover:bg-alpha-2 focus-visible:border-selected focus-visible:bg-status-info",
      },
      size: {
        sm: "h-[19px] px-2 py-0.5 text-chip-label-sm leading-chip-label-sm",
        md: "h-6 px-2 py-0.5 text-chip-label-md leading-chip-label-md",
        lg: "h-[34px] px-4 py-2 text-chip-label-lg leading-chip-label-lg",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        disabled: true,
        class: "bg-tertiary text-disabled border-transparent hover:border-transparent hover:bg-tertiary",
      },
      {
        variant: "outlined",
        disabled: true,
        class: "text-disabled border-default hover:border-default hover:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
      disabled: false,
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
}

function Chip({
  className,
  variant,
  size,
  disabled,
  onRemove,
  leftIcon,
  children,
  ...props
}: ChipProps) {
  // Left icon sizes (different from remove icon)
  const leftIconSizes = {
    sm: "h-3.5 w-3.5", // 14px
    md: "h-[15px] w-[15px]", // 15px
    lg: "h-[18px] w-[18px]", // 18px
  };

  // Remove icon (X) sizes
  const removeIconSizes = {
    sm: "h-3.5 w-3.5", // 14px
    md: "h-3 w-3", // 12px
    lg: "h-3 w-3", // 12px
  };

  const leftIconSizeClass = size ? leftIconSizes[size] : leftIconSizes.md;
  const removeIconSizeClass = size ? removeIconSizes[size] : removeIconSizes.md;

  return (
    <div
      className={cn(chipVariants({ variant, size, disabled }), className)}
      {...props}
    >
      {leftIcon && (
        <span className={cn(leftIconSizeClass, "flex-shrink-0 text-current", disabled && "text-disabled")}>
          {leftIcon}
        </span>
      )}
      <span className="select-none">{children}</span>
      {onRemove && (
        <Button
          onClick={onRemove}
          className={cn(
            removeIconSizeClass,
            "flex-shrink-0 rounded-full hover:bg-tertiary focus:outline-none text-current transition-colors",
            disabled && "text-disabled cursor-not-allowed"
          )}
          variant="text"
          size="sm"
          disabled={disabled!}
        >
          <X className={cn(removeIconSizeClass, disabled && "text-disabled")} />
        </Button>
      )}
    </div>
  );
}

export { Chip, chipVariants };

