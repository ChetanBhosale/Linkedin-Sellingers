import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    // Determine border and background based on state (matching Input component)
    const getBorderClasses = () => {
      if (disabled) {
        return "border-0";
      }
      if (error) {
        return "border border-status-error";
      }
      if (isFocused) {
        return "border border-selected";
      }
      if (isHovered) {
        return "border border-heavy";
      }
      return "border border-default";
    };

    const getBackgroundClasses = () => {
      if (disabled) {
        return "bg-secondary";
      }
      return "bg-primary";
    };

    const getTextColorClasses = () => {
      if (disabled) {
        return "text-disabled";
      }
      return "text-primary";
    };

    return (
      <textarea
        className={cn(
          // Base styling - Figma design system alignment
          "flex min-h-[80px] w-full",
          // Border & Border Radius
          "rounded-[10px]",
          getBorderClasses(),
          // Background
          getBackgroundClasses(),
          // Padding - matches Figma input padding
          "px-[10px] py-2",
          // Typography - Input value/md from design system
          "font-['Inter'] font-normal text-[14px] leading-[18px] tracking-[0.15px]",
          getTextColorClasses(),
          // Placeholder styling
          "placeholder:text-placeholder placeholder:font-normal",
          // Focus state
          "focus-visible:outline-none",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Resize behavior - allow vertical resize (resize handle on bottom right)
          "resize-y",
          // Transition
          "transition-colors duration-150",
          className
        )}
        ref={ref}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
