import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, CaretRight, Circle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

// Counter Dot Badge Component (matches Figma Menu component specs)
interface CounterDotProps {
  count: number | string;
  className?: string;
}

const CounterDot = ({ count, className }: CounterDotProps) => {
  return (
    <div
      className={cn(
        "flex h-5 min-w-5 items-center justify-center rounded-full bg-status-info px-1.5 text-counter-dot font-medium leading-counter-dot tracking-counter-dot text-status-info",
        className
      )}
    >
      {count}
    </div>
  );
};

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-md px-2 py-1 text-body-md leading-body-md text-primary outline-none transition-colors hover:bg-alpha-5 focus:bg-alpha-5 data-[state=open]:bg-alpha-5",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <CaretRight className="ml-auto h-3.5 w-3.5 text-icon-secondary" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 flex min-w-[220px] flex-col gap-0.5 overflow-hidden rounded-lg border border-light bg-primary p-1.5 text-primary shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    minWidth?: number;
  }
>(({ className, minWidth = 220, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      style={{ minWidth: `${minWidth}px` }}
      className={cn(
        "z-50 flex flex-col overflow-hidden rounded-lg border border-light bg-primary p-1 text-primary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    badge?: React.ReactNode;
    variant?: "default" | "destructive";
  }
>(({ className, inset, leftIcon, rightIcon, badge, variant = "default", children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-body-md leading-body-md outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      variant === "destructive"
        ? "text-status-error hover:bg-status-error hover:text-status-error focus:bg-status-error focus:text-status-error"
        : "text-primary hover:bg-alpha-5 focus:bg-alpha-5",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {leftIcon && <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">{leftIcon}</span>}
    <span className="flex-1">{children}</span>
    {rightIcon && <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">{rightIcon}</span>}
    {badge && <span className="flex-shrink-0">{badge}</span>}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 text-body-md leading-body-md text-primary outline-none transition-colors hover:bg-alpha-5 focus:bg-alpha-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="ml-2 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
      <Check className="h-3.5 w-3.5 text-interactive-surface-default" />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 text-body-md leading-body-md text-primary outline-none transition-colors hover:bg-alpha-5 focus:bg-alpha-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="ml-2 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
      <Circle className="h-2 w-2 fill-current text-interactive-surface-default" />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1 text-[11px] font-medium leading-body-sm text-tertiary", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("mx-1 my-0.5 h-px bg-border-light", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-body-sm leading-body-sm text-tertiary", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  CounterDot
};

export type { CounterDotProps };
