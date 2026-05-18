import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/**
 * TooltipProvider - Global tooltip context provider
 * 
 * ⚠️ IMPORTANT: This should only be used ONCE at the app root level (see _app.tsx)
 * Do NOT wrap individual tooltips with TooltipProvider - they will automatically
 * use the global provider.
 * 
 * @param delayDuration - Delay in ms before tooltip appears (default: 300ms)
 * @param skipDelayDuration - Delay in ms when moving between tooltips (default: 100ms)
 * @param disableHoverableContent - Prevents tooltip from staying open when hovering over it (default: true)
 */
const TooltipProvider = ({
  children,
  delayDuration = 300,
  skipDelayDuration = 100,
  disableHoverableContent = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider 
    delayDuration={delayDuration} 
    skipDelayDuration={skipDelayDuration}
    disableHoverableContent={disableHoverableContent}
    {...props}
  >
    {children}
  </TooltipPrimitive.Provider>
);

/**
 * Tooltip - Root tooltip component
 * 
 * By default, tooltips only trigger on HOVER, not on focus/click.
 * This prevents tooltips from appearing when elements receive focus during animations.
 * 
 * Usage:
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 * 
 * For controlled tooltips (e.g., with dropdowns):
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <Tooltip open={open} onOpenChange={setOpen}>
 *   <TooltipTrigger asChild>
 *     <DropdownMenu onOpenChange={(isOpen) => {
 *       if (isOpen) setOpen(false); // Close tooltip when dropdown opens
 *     }}>
 *       ...
 *     </DropdownMenu>
 *   </TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 */
const Tooltip = ({ 
  children, 
  disableHoverableContent = true,
  ...props 
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Root 
    disableHoverableContent={disableHoverableContent}
    {...props}
  >
    {children}
  </TooltipPrimitive.Root>
);

/**
 * TooltipTrigger - Trigger element for tooltip
 * 
 * IMPORTANT: Only responds to HOVER events by default (not focus/click).
 * This prevents tooltips from appearing when elements receive focus.
 */
const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onFocus, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    onFocus={(e) => {
      // Prevent tooltip from opening on focus
      e.preventDefault();
      onFocus?.(e);
    }}
    {...props}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[9999] overflow-hidden rounded border-0 bg-[var(--gray-solid-900)] dark:bg-[var(--gray-solid-100)] px-2 py-1 text-xs text-[var(--gray-solid-0)] dark:text-[var(--gray-solid-900)] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

