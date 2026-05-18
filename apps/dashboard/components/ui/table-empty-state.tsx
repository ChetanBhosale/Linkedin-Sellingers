import React from "react";
import { GlobeSimple } from "@phosphor-icons/react";

interface TableEmptyStateProps {
  /** Main title/description text */
  title: string;
  /** Optional secondary description */
  description?: string;
  /** Optional custom icon - defaults to GlobeSimple */
  icon?: React.ReactNode;
  /** Optional action button */
  action?: React.ReactNode;
}

/**
 * Empty state component for tables when no data is available
 * Displays a centered icon with title and optional description
 */
export function TableEmptyState({
  title,
  description,
  icon,
  action,
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 px-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-secondary)]">
        {icon || <GlobeSimple size={24} weight="regular" className="text-[var(--text-tertiary)]" />}
      </div>
      <div className="flex flex-col items-center gap-1 text-center max-w-[300px]">
        <p className="text-body-sm font-normal text-[var(--text-secondary)]">
          {title}
        </p>
        {description && (
          <p className="text-body-sm font-normal text-[var(--text-tertiary)]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default TableEmptyState;
