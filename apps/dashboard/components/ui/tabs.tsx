"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({
    width: 0,
    left: 0,
    opacity: 0
  });

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeTab = list.querySelector<HTMLElement>('[data-state="active"]');
    if (!activeTab) return;
    setIndicatorStyle({
      width: activeTab.offsetWidth,
      left: activeTab.offsetLeft,
      opacity: 1
    });
  }, []);

  React.useEffect(() => {
    updateIndicator();
    const observer = new MutationObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, { attributes: true, subtree: true, attributeFilter: ["data-state"] });
    }
    return () => observer.disconnect();
  }, [updateIndicator]);

  return (
    <TabsPrimitive.List
      ref={(node) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn("relative inline-flex h-8 items-center overflow-hidden rounded-[6px] bg-secondary p-1", className)}
      {...props}
    >
      <div
        className="top-0.6 absolute h-[calc(100%-6px)] rounded-[5px] bg-primary shadow-[0_1px_6px_0_rgba(0,0,0,0.12)] transition-[left,width] duration-200 ease-out"
        style={indicatorStyle}
      />
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[5px] px-3 py-1 text-sm font-medium transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary data-[state=inactive]:text-tertiary data-[state=inactive]:hover:text-secondary",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
