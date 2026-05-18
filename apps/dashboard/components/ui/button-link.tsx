import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleNotch } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const buttonLinkVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-surface-default)] focus-visible:ring-offset-2 no-underline",
    {
        variants: {
            variant: {
                primary:
                    "bg-[var(--interactive-surface-default)] !text-[var(--interactive-surface-onsurface)] hover:bg-[var(--interactive-surface-hover)] active:bg-[var(--interactive-surface-pressed)] [&>*]:!text-[var(--interactive-surface-onsurface)]",
                secondary:
                    "bg-secondary text-primary border border-default hover:bg-elevated-primary hover:border-heavy active:bg-alpha-5",
                outlined:
                    "border border-[var(--border-default)] bg-transparent text-primary hover:border-[var(--border-heavy)] hover:bg-alpha-2 active:bg-[var(--bg-elevated-primary)]",
                text: "bg-transparent text-[var(--interactive-text-default)] hover:bg-[var(--gray-transparent-0-a5)] hover:text-[var(--interactive-text-hover)] active:bg-[var(--bg-elevated-primary)] active:text-[var(--interactive-text-pressed)]",
                hybrid:
                    "border border-[var(--border-heavy)] bg-transparent text-primary hover:bg-[var(--gray-transparent-0-a5)] hover:border-[var(--border-heavy)]",
                unstyled: "",
            },
            size: {
                lg: "h-10 px-4 py-2.5 rounded-md text-button-lg leading-button-lg gap-2",
                md: "h-[34px] px-3 py-2 rounded-[0.375rem] text-button-md leading-button-md gap-2",
                sm: "h-6 px-2 py-1 rounded-sm text-button-sm leading-button-sm gap-2",
                unstyled: "",
            },
        },
        compoundVariants: [
            {
                variant: "hybrid",
                size: "lg",
                class: "h-10 px-4 py-2.5 rounded text-button-lg leading-button-lg gap-2",
            },
            {
                variant: "hybrid",
                size: "md",
                class: "h-[34px] px-3 py-2 rounded text-button-md leading-button-md gap-2",
            },
            {
                variant: "hybrid",
                size: "sm",
                class: "h-6 px-2.5 py-1 rounded-sm text-button-sm leading-button-sm gap-2",
            },
        ],
        defaultVariants: {
            variant: "unstyled",
            size: "unstyled",
        },
    }
);

export interface ButtonLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof buttonLinkVariants> {
    href: string;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    external?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
    (
        {
            className,
            variant,
            size,
            loading,
            leftIcon,
            rightIcon,
            children,
            href,
            external = false,
            ...props
        },
        ref
    ) => {
        const iconSizes = {
            lg: "w-5 h-5",
            md: "w-[18px] h-[18px]",
            sm: "w-3.5 h-3.5",
            unstyled: "",
        };

        const iconSizeClass = size ? iconSizes[size] : "";

        const loadingClasses = loading
            ? (!variant || variant === "primary")
                ? "!bg-[var(--interactive-surface-default)] !text-[var(--interactive-surface-onsurface)] [&>*]:!text-[var(--interactive-surface-onsurface)] hover:!bg-[var(--interactive-surface-default)]"
                : variant === "secondary"
                    ? "!bg-secondary !border-[var(--border-default)] !text-primary [&>*]:!text-primary hover:!bg-secondary hover:!border-[var(--border-default)]"
                    : variant === "outlined"
                        ? "!bg-transparent !border-[var(--border-default)] !text-primary [&>*]:!text-primary hover:!bg-transparent hover:!border-[var(--border-default)]"
                        : variant === "hybrid"
                            ? "!bg-transparent !border-[var(--border-heavy)] !text-primary [&>*]:!text-primary hover:!bg-transparent hover:!border-[var(--border-heavy)]"
                            : "!bg-transparent !text-[var(--interactive-text-default)] [&>*]:!text-[var(--interactive-text-default)] hover:!bg-transparent"
            : "";

        const content = (
            <>
                {loading ? (
                    <CircleNotch
                        className={cn(
                            iconSizeClass,
                            "animate-spin flex-shrink-0",
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
                        {leftIcon && iconSizeClass && <span className={cn(iconSizeClass, "flex-shrink-0")}>{leftIcon}</span>}
                        {leftIcon && !iconSizeClass && leftIcon}
                        {children && <span>{children}</span>}
                        {rightIcon && iconSizeClass && <span className={cn(iconSizeClass, "flex-shrink-0")}>{rightIcon}</span>}
                        {rightIcon && !iconSizeClass && rightIcon}
                    </>
                )}
            </>
        );

        if (external) {
            return (
                <a
                    className={cn(
                        buttonLinkVariants({ variant, size }),
                        loadingClasses,
                        className
                    )}
                    href={href}
                    ref={ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {content}
                </a>
            );
        }

        return (
            <Link
                className={cn(
                    buttonLinkVariants({ variant, size }),
                    loadingClasses,
                    className
                )}
                href={href}
                ref={ref}
                {...props}
            >
                {content}
            </Link>
        );
    }
);
ButtonLink.displayName = "ButtonLink";

export { ButtonLink, buttonLinkVariants };
