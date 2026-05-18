"use client"

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleNotch, CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-surface-default)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--interactive-surface-default)] !text-[var(--interactive-surface-onsurface)] hover:bg-[var(--interactive-surface-hover)] active:bg-[var(--interactive-surface-pressed)] [&>*]:!text-[var(--interactive-surface-onsurface)] border border-[var(--alpha-10)] shadow-xs [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] shadow-[0_1px_3px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.14)]",
        secondary:
          "bg-secondary text-primary border border-default hover:bg-elevated-primary hover:border-heavy active:bg-alpha-5",
        outlined:
          "border border-[var(--border-default)] bg-transparent text-primary hover:border-[var(--border-heavy)] hover:bg-alpha-2 active:bg-[var(--bg-elevated-primary)]",
        text: "bg-transparent text-[var(--interactive-text-default)] hover:bg-[var(--gray-transparent-0-a5)] hover:text-[var(--interactive-text-hover)] active:bg-[var(--bg-elevated-primary)] active:text-[var(--interactive-text-pressed)]",
        hybrid:
          "border border-[var(--border-heavy)] bg-transparent text-primary hover:bg-[var(--gray-transparent-0-a5)] hover:border-[var(--border-heavy)]"
      },
      size: {
        lg: "h-10 px-4 py-2.5 rounded-md text-button-lg leading-button-lg gap-2",
        md: "h-[34px] px-3 py-2 rounded-[0.375rem] text-button-md leading-button-md gap-2",
        sm: "h-6 px-2 py-1 rounded-sm text-button-sm leading-button-sm gap-2"
      }
    },
    compoundVariants: [
      {
        variant: "hybrid",
        size: "lg",
        class: "h-10 px-4 py-2.5 rounded text-button-lg leading-button-lg gap-2"
      },
      {
        variant: "hybrid",
        size: "md",
        class: "h-[34px] px-3 py-2 rounded text-button-md leading-button-md gap-2"
      },
      {
        variant: "hybrid",
        size: "sm",
        class: "h-6 px-2.5 py-1 rounded-sm text-button-sm leading-button-sm gap-2"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      loading,
      leftIcon,
      rightIcon,
      dropdownIcon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const iconSizes = {
      lg: "w-5 h-5",
      md: "w-[18px] h-[18px]",
      sm: "w-3.5 h-3.5"
    };

    const iconSizeClass = size ? iconSizes[size] : iconSizes.md;

    // Padding for hybrid button right section (dropdown icon area)
    const hybridRightPadding = {
      lg: "p-2.5",
      md: "p-2",
      sm: "p-1"
    };

    const hybridRightPaddingClass = size ? hybridRightPadding[size] : hybridRightPadding.md;

    // Padding for hybrid button left section (main button area)
    const hybridLeftPadding = {
      lg: "px-4",
      md: "px-3",
      sm: "px-2.5"
    };

    const hybridLeftPaddingClass = size ? hybridLeftPadding[size] : hybridLeftPadding.md;

    const disabledClasses =
      isDisabled && !loading
        ? {
            primary:
              "bg-[var(--interactive-surface-disabled)] !text-[var(--text-disabled)] hover:bg-[var(--interactive-surface-disabled)] [&>*]:!text-[var(--text-disabled)] opacity-100 [text-shadow:none] !shadow-none",
            secondary:
              "bg-tertiary border-[var(--border-light)] !text-[var(--text-disabled)] hover:bg-tertiary hover:border-[var(--border-light)] [&>*]:!text-[var(--text-disabled)] opacity-100",
            outlined:
              "border-[var(--border-light)] !text-[var(--text-disabled)] hover:bg-transparent hover:border-[var(--border-light)] [&>*]:!text-[var(--text-disabled)] opacity-100",
            text: "!text-[var(--text-disabled)] hover:bg-transparent hover:!text-[var(--text-disabled)] [&>*]:!text-[var(--text-disabled)] opacity-100",
            hybrid:
              "border-[var(--border-light)] !text-[var(--text-disabled)] hover:bg-transparent hover:border-[var(--border-light)] [&>*]:!text-[var(--text-disabled)] opacity-100"
          }[variant || "primary"]
        : "";

    const loadingClasses = loading
      ? !variant || variant === "primary"
        ? "!bg-[var(--interactive-surface-default)] !text-[var(--interactive-surface-onsurface)] [&>*]:!text-[var(--interactive-surface-onsurface)] hover:!bg-[var(--interactive-surface-default)]"
        : variant === "secondary"
          ? "!bg-secondary !border-[var(--border-default)] !text-primary [&>*]:!text-primary hover:!bg-secondary hover:!border-[var(--border-default)]"
          : variant === "outlined"
            ? "!bg-transparent !border-[var(--border-default)] !text-primary [&>*]:!text-primary hover:!bg-transparent hover:!border-[var(--border-default)]"
            : variant === "hybrid"
              ? "!bg-transparent !border-[var(--border-heavy)] !text-primary [&>*]:!text-primary hover:!bg-transparent hover:!border-[var(--border-heavy)]"
              : "!bg-transparent !text-[var(--interactive-text-default)] [&>*]:!text-[var(--interactive-text-default)] hover:!bg-transparent"
      : "";

    // Hybrid button has special structure with divider
    if (variant === "hybrid") {
      const borderColor = isDisabled && !loading ? "border-[var(--border-light)]" : "border-[var(--border-default)]";

      return (
        <div
          className={cn(
            "inline-flex items-center overflow-hidden border transition-colors duration-150",
            borderColor,
            !isDisabled && "hover:border-[var(--border-heavy)]",
            isDisabled && !loading && "opacity-100",
            size === "sm" && "rounded-sm",
            size === "md" && "rounded-[0.375rem]",
            size === "lg" && "rounded-md",
            className
          )}
        >
          <Comp
            className={cn(
              buttonVariants({ variant, size }),
              "rounded-none border-0",
              hybridLeftPaddingClass,
              "py-0",
              "hover:bg-[var(--alpha-5)] active:bg-[var(--alpha-10)] transition-colors",
              disabledClasses,
              loadingClasses
            )}
            ref={ref}
            disabled={isDisabled}
            {...props}
          >
            {loading ? (
              <CircleNotch
                className={cn(
                  iconSizeClass,
                  "flex-shrink-0 animate-spin",
                  isDisabled && !loading ? "!text-[var(--text-disabled)]" : "!text-[var(--text-primary)]"
                )}
                weight="bold"
                aria-label="Loading"
              />
            ) : (
              <>
                {leftIcon && (
                  <span
                    className={cn(
                      iconSizeClass,
                      "flex-shrink-0 flex items-center justify-center",
                      isDisabled && !loading && "!text-[var(--text-disabled)]"
                    )}
                  >
                    {leftIcon}
                  </span>
                )}
                {children && (
                  <span className={cn(isDisabled && !loading && "!text-[var(--text-disabled)]")}>{children}</span>
                )}
                {rightIcon && (
                  <span
                    className={cn(
                      iconSizeClass,
                      "flex-shrink-0 flex items-center justify-center",
                      isDisabled && !loading && "!text-[var(--text-disabled)]"
                    )}
                  >
                    {rightIcon}
                  </span>
                )}
              </>
            )}
          </Comp>
          {(dropdownIcon || (!loading && !rightIcon)) && (
            <button
              type="button"
              disabled={isDisabled}
              className={cn(
                "flex items-center justify-center border-l transition-colors",
                borderColor,
                hybridRightPaddingClass,
                !isDisabled && "hover:bg-[var(--alpha-5)] active:bg-[var(--alpha-10)] cursor-pointer",
                isDisabled && !loading && "opacity-100 cursor-not-allowed"
              )}
            >
              {loading ? null : (
                <span
                  className={cn(
                    iconSizeClass,
                    "flex-shrink-0 flex items-center justify-center",
                    isDisabled && !loading && "!text-[var(--text-disabled)]"
                  )}
                >
                  {dropdownIcon || <CaretDown className={iconSizeClass} />}
                </span>
              )}
            </button>
          )}
        </div>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), disabledClasses, loadingClasses, className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <CircleNotch
            className={cn(
              iconSizeClass,
              "flex-shrink-0 animate-spin ",
              (!variant || variant === "primary") && "!text-[var(--interactive-surface-onsurface)]",
              variant === "secondary" && "!text-[var(--text-primary)]",
              variant === "outlined" && "!text-[var(--text-primary)]",
              variant === "text" && "!text-[var(--interactive-text-default)]"
            )}
            weight="bold"
            aria-label="Loading"
          />
        ) : (
          <>
            {leftIcon && <div className={cn(iconSizeClass, "flex-shrink-0 flex items-center justify-center")}>{leftIcon}</div>}
            {children && <div className="flex items-center gap-1">{children}</div>}
            {rightIcon && <div className={cn(iconSizeClass, "flex-shrink-0 flex items-center justify-center")}>{rightIcon}</div>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
