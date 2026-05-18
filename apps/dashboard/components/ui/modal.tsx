import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ModalRoot = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const modalSizes = {
  sm: "max-w-[400px]",
  md: "max-w-[550px]",
  lg: "max-w-[700px]",
  xl: "max-w-[900px]",
  full: "max-w-[calc(100vw-48px)]",
};

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, hideCloseButton = false, size = "md", ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 flex flex-col w-full translate-x-[-50%] translate-y-[-50%]",
        "max-h-[90vh] overflow-hidden",
        "bg-primary border border-default rounded-[12px] shadow-lg",
        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        modalSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = "ModalContent";

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  hideCloseButton?: boolean;
  onClose?: () => void;
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, hideCloseButton = false, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 px-4 py-3 border-b border-[var(--border-light,rgba(13,13,13,0.02))] shrink-0",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {!hideCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            "flex items-center justify-center p-2 rounded-md",
            "border border-default",
            "opacity-70 transition-opacity hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-interactive-surface-default focus:ring-offset-2",
            "disabled:pointer-events-none"
          )}
          onClick={onClose}
        >
          <X className="h-5 w-5" weight="bold" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </div>
  )
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[18px] font-medium leading-[26px] tracking-[-0.45px] text-primary",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-tertiary", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto min-h-0 scrollbar-none",
        !noPadding && "p-5",
        className
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      {...props}
    />
  )
);
ModalBody.displayName = "ModalBody";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, noBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2 p-5 shrink-0",
        !noBorder && "border-t border-default",
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = "ModalFooter";

// Convenience wrapper component for simple use cases
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  hideCloseButton?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}

function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  hideCloseButton = false,
  contentClassName,
  bodyClassName,
  noPadding = false,
}: ModalProps) {
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent size={size} className={contentClassName}>
        <ModalHeader hideCloseButton={hideCloseButton}>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalBody noPadding={noPadding} className={bodyClassName}>
          {children}
        </ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalRoot>
  );
}

export {
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};
