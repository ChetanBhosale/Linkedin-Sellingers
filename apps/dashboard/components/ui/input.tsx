import * as React from "react";
import { X, Question } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  showLabel?: boolean;
  showHelperText?: boolean;
  isMandatory?: boolean;
  showTooltip?: { text: string; side?: "top" | "right" | "bottom" | "left" };
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      helperText,
      error = false,
      showLabel = true,
      showHelperText = false,
      isMandatory = false,
      showTooltip,
      iconLeading,
      iconTrailing,
      showClear = false,
      onClear,
      size = "lg",
      variant = "default",
      disabled,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const inputId = React.useId();
    const finalInputId = props.id || inputId;

    const restProps: any = { ...props };
    if ("defaultValue" in restProps) {
      delete restProps.defaultValue;
    }
    if ("id" in restProps) {
      delete restProps.id;
    }

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(isControlled ? undefined : props.defaultValue || "");

    const currentValue = isControlled ? (value ?? "") : (internalValue ?? "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      if (onClear) {
        onClear();
      } else {
        const syntheticEvent = {
          target: { value: "" }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }
    };

    // Size configurations - matching Figma exactly
    const sizeConfig = {
      sm: {
        height: "h-[24px]",
        paddingX: "px-[10px]",
        paddingXWithIcon: "pl-0 pr-[10px]",
        borderRadius: "rounded-[4px]",
        fontSize: "text-[12px]",
        lineHeight: "leading-[16px]",
        iconSize: "w-4 h-4",
        tooltipIconSize: "w-5 h-5",
        labelGap: "gap-[6px]"
      },
      md: {
        height: "h-[34px]",
        paddingX: "px-[10px]",
        paddingXWithIcon: "pl-0 pr-[10px]",
        borderRadius: "rounded-[6px]",
        fontSize: "text-[14px]",
        lineHeight: "leading-[18px]",
        iconSize: "w-4 h-4",
        tooltipIconSize: "w-5 h-5",
        labelGap: "gap-[6px]"
      },
      lg: {
        height: "h-10",
        paddingX: "px-3",
        paddingXWithIcon: "pl-0 pr-3",
        borderRadius: "rounded-[8px]",
        fontSize: "text-[16px]",
        lineHeight: "leading-5",
        iconSize: "w-5 h-5",
        tooltipIconSize: "w-5 h-5",
        labelGap: "gap-[6px]"
      }
    };

    const config = sizeConfig[size];

    const getBorderClasses = () => {
      if (disabled) return "border-0";
      if (variant === "filled") {
        if (isFocused) return "border border-selected";
        return "border-0";
      }
      if (error) return "border border-[#ffe1e0]";
      if (isFocused) return "border border-selected";
      if (isHovered) return "border border-heavy";
      return "border border-default";
    };

    const getBackgroundClasses = () => {
      if (variant === "filled") return "bg-secondary";
      if (disabled) return "bg-secondary";
      return "bg-primary";
    };

    const getTextColorClasses = () => {
      if (disabled) return "text-disabled";
      if (error && (isFocused || currentValue)) return "text-primary";
      if (isFocused || currentValue) return "text-primary";
      return "text-placeholder";
    };

    const getLabelColorClasses = () => {
      if (disabled) return "text-disabled";
      if (error) return "text-status-error";
      return "text-tertiary";
    };

    const getHelperTextColorClasses = () => {
      if (error) return "text-status-error";
      return "text-tertiary";
    };

    const shouldShowClear =
      showClear && !disabled && currentValue && typeof currentValue === "string" && currentValue.length > 0;

    const tooltipText = showTooltip?.text;
    const tooltipSide = showTooltip?.side || "top";
    const shouldShowTooltip = !!showTooltip && !!tooltipText;

    const tooltipIcon = (
      <Question
        className={cn("h-full w-full", disabled ? "text-[#212121]" : error ? "text-[#212121]" : "text-tertiary")}
        weight="regular"
      />
    );

    return (
      <div className={cn("flex w-full flex-col items-start", config.labelGap)}>
        {showLabel && label && (
          <div className="flex w-full items-center gap-2.5 py-0">
            <div className="flex items-center gap-0.5 capitalize not-italic tracking-[0.15px]">
              <Label
                htmlFor={finalInputId}
                className={cn(
                  "flex flex-col justify-center whitespace-pre text-[12px] font-medium leading-[1.45] tracking-[0.15px]",
                  getLabelColorClasses()
                )}
              >
                {label}
              </Label>
              {isMandatory && (
                <span className="flex flex-col justify-center whitespace-pre text-[14px] leading-[1.45] text-status-error">
                  *
                </span>
              )}
            </div>
            {shouldShowTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex shrink-0 items-center justify-center rounded-full focus:outline-none",
                        config.tooltipIconSize
                      )}
                      disabled={disabled}
                    >
                      {tooltipIcon}
                    </button>
                  </TooltipTrigger>
                  {tooltipText && (
                    <TooltipContent side={tooltipSide}>
                      <p>{tooltipText}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        <div
          className={cn(
            "relative flex w-full items-center overflow-hidden transition-[border-color] duration-200",
            config.height,
            config.paddingX,
            config.borderRadius,
            getBorderClasses(),
            getBackgroundClasses()
          )}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {iconLeading && (
            <div className="flex shrink-0 items-center pr-2">
              <span className={cn(config.iconSize, "flex-shrink-0", disabled && "text-disabled")}>{iconLeading}</span>
            </div>
          )}
          <input
            id={finalInputId}
            type={type}
            className={cn(
              "min-w-0 flex-1 grow appearance-none border-0 bg-transparent outline-none",
              config.fontSize,
              config.lineHeight,
              "overflow-hidden overflow-ellipsis font-normal not-italic",
              "tracking-[0.15px]",
              getTextColorClasses(),
              "placeholder:text-nowrap placeholder:text-placeholder",
              "disabled:cursor-not-allowed",
              "file:border-0 file:bg-transparent file:text-body-md file:font-medium"
            )}
            ref={ref}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            {...restProps}
          />
          {shouldShowClear && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full p-0.5 text-tertiary transition-colors hover:bg-tertiary hover:text-primary focus:outline-none"
              aria-label="Clear input"
            >
              <X className="h-full w-full" strokeWidth={2.5} />
            </button>
          )}
          {iconTrailing && !shouldShowClear && (
            <div className="flex shrink-0 items-center pl-2">
              <span className={cn(config.iconSize, "flex-shrink-0", disabled && "text-disabled")}>{iconTrailing}</span>
            </div>
          )}
        </div>
        {showHelperText && helperText && (
          <div className="flex w-full flex-col items-start pb-0 pt-[3px]">
            <span
              className={cn(
                "flex w-full flex-col justify-center text-[12px] font-normal not-italic leading-[1.66]",
                getHelperTextColorClasses()
              )}
            >
              {helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
