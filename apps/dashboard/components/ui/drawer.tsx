import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const Drawer = DialogPrimitive.Root;

const DrawerTrigger = DialogPrimitive.Trigger;

const DrawerPortal = DialogPrimitive.Portal;

const DrawerClose = DialogPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      ...style
    }}
    {...props}
  />
));
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName;

const drawerVariants = cva(
  "fixed z-50 flex flex-col border-default bg-primary shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      side: {
        top: "inset-x-2 top-2 border-b border-l border-r h-auto max-h-[90vh] rounded-lg data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-2 bottom-2 border-t border-l border-r h-auto max-h-[90vh] rounded-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-2 left-2 h-[calc(100%-1rem)] border-r border-t border-b rounded-lg data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-2 right-2 h-[calc(100%-1rem)] border-l border-t border-b rounded-lg data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
      }
    },
    defaultVariants: {
      side: "left"
    }
  }
);

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  width?: string | number;
  height?: string | number;
  hideDefaultClose?: boolean;
}

const DrawerContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DrawerContentProps>(
  ({ className, children, side = "left", width, height, hideDefaultClose = true, ...props }, ref) => {
    // For top/bottom: always full width (handled by inset-x-2), use height prop
    // For left/right: use width prop, always full height (handled by inset-y-2)
    const isVertical = side === "top" || side === "bottom";

    const style: React.CSSProperties = {
      ...props.style
    };

    if (isVertical) {
      // Top/Bottom: Width is automatically handled by inset-x-2, just set height
      style.height = height ? (typeof height === "number" ? `${height}px` : height) : "400px";
    } else {
      // Left/Right: Height is automatically handled by inset-y-2, just set width
      style.width = width ? (typeof width === "number" ? `${width}px` : width) : "480px";
    }

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <DialogPrimitive.Content ref={ref} className={cn(drawerVariants({ side }), "focus:outline-none focus-visible:ring-0 focus-visible:outline-none", className)} style={style} {...props}>
          {children}
          {!hideDefaultClose && (
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-50 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-interactive-surface-default focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DrawerPortal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-3 border-b border-light px-4 py-3", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

// DrawerBody is the main scrollable content area
// Users can use this for the content between header and footer, or just use regular divs
const DrawerBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto px-4 py-4", className)} {...props} />
);
DrawerBody.displayName = "DrawerBody";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 border-t border-light px-4 py-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-heading3 font-medium leading-heading3 text-primary", className)}
    {...props}
  />
));
DrawerTitle.displayName = DialogPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-body-md text-secondary", className)} {...props} />
));
DrawerDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
};
