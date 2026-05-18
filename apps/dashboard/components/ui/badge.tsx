import * as React from "react";

// Badge variant styles
const variantStyles = {
  success: "bg-status-success text-status-success border-status-success",
  warning: "bg-status-warning text-status-warning border-status-warning",
  info: "bg-status-info text-status-info border-status-info",
  default: "bg-status-neutral text-status-neutral border-status-neutral",
  error: "bg-status-error text-status-error border-status-error",
};

// Badge size styles
const sizeStyles = {
  sm: "h-4 px-2 text-badge-label-sm leading-badge-label-sm tracking-badge-label-sm",
  md: "h-5 px-3 text-badge-label-md leading-badge-label-md tracking-badge-label-md",
  lg: "h-6 px-4 text-badge-label-lg leading-badge-label-lg tracking-badge-label-lg",
};

// Icon size mapping
const iconSizeMap = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "info" | "default" | "error";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}

function Badge({
  className = "",
  variant = "default",
  size = "md",
  leftIcon,
  children,
  ...props
}: BadgeProps) {
  const iconSize = iconSizeMap[size];

  // Build base classes
  const baseClasses =
    "inline-flex items-center border border-solid font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm gap-1.5 hover:opacity-90 active:opacity-80";

  // Get variant classes
  const variantClass = variantStyles[variant] || variantStyles.default;

  // Get size classes
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

  // Render icon helper
  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      const iconProps = (icon as React.ReactElement<any>).props || {};
      const isLucideIcon =
        "width" in iconProps ||
        (icon.type && typeof icon.type === "function");

      // For Lucide icons, add size props directly
      if (isLucideIcon) {
        return React.cloneElement(icon as React.ReactElement<any>, {
          className: `flex-shrink-0 ${iconProps.className || ""}`.trim(),
          width: iconSize,
          height: iconSize,
          strokeWidth: 2,
        });
      }

      // For other icons, wrap in a span with inline styles
      return (
        <span
          className="flex-shrink-0 inline-flex items-center justify-center"
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
        >
          {React.cloneElement(icon as React.ReactElement<any>, {
            style: {
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              ...iconProps.style,
            },
          })}
        </span>
      );
    }

    // For non-React elements, wrap in span
    return (
      <span
        className="flex-shrink-0 inline-flex items-center justify-center"
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      >
        {icon}
      </span>
    );
  };

  return (
    <div className={combinedClasses} {...props}>
      {leftIcon && (
        <span
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
        >
          {renderIcon(leftIcon)}
        </span>
      )}
      {children && <span className="whitespace-nowrap select-none">{children}</span>}
    </div>
  );
}

export { Badge };
