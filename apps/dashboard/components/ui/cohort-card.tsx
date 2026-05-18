import React from "react";
import { Users } from "@phosphor-icons/react";

interface EventInfo {
  event: string;
  action: "did" | "did_not";
}

interface CohortCardProps {
  name: string;
  description: string;
  userCount: string | number;
  events?: EventInfo[];
  onClick?: () => void;
  className?: string;
}

const EventTags: React.FC<{ events: string[]; label: string }> = ({
  events,
  label,
}) => {
  if (events.length === 0) return null;

  const visibleEvents = events.slice(0, 2);
  const remainingCount = events.length - 2;

  return (
    <div className="flex flex-col gap-[4px]">
      <span className="text-[12px] leading-[1.45] tracking-[0.15px] font-medium text-[var(--text-tertiary)] capitalize">
        {label}
      </span>
      <div className="flex flex-wrap gap-[6px]">
        {visibleEvents.map((event, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-[8px] py-[2px] bg-[var(--bg-tertiary)] group-hover:bg-[var(--bg-quaternary)] transition-colors rounded-[4px] font-mono text-[12px] leading-[16px] tracking-[-0.4px] text-[var(--text-secondary)]"
          >
            {event}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="inline-flex items-center px-[8px] py-[2px] bg-[var(--bg-tertiary)] group-hover:bg-[var(--bg-quaternary)] transition-colors rounded-[4px] font-mono text-[12px] leading-[16px] tracking-[-0.4px] text-[var(--text-secondary)]">
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
};

const CohortCard: React.FC<CohortCardProps> = ({
  name,
  description,
  userCount,
  events = [],
  onClick,
  className,
}) => {
  const eventsDone = events
    .filter((e) => e.action === "did")
    .map((e) => e.event);
  const eventsNotDone = events
    .filter((e) => e.action === "did_not")
    .map((e) => e.event);

  const hasEvents = eventsDone.length > 0 || eventsNotDone.length > 0;

  return (
    <div
      className={`flex flex-col cursor-pointer group w-[277px] ${className ?? ""}`}
      onClick={onClick}
    >
      {/* Top row: badge pill + inverted corner connector */}
      <div className="flex items-end">
        {/* Badge pill */}
        <div className="relative inline-flex items-center gap-[6px] bg-[var(--bg-secondary)] group-hover:bg-[var(--bg-tertiary)] transition-colors px-[10px] py-[6px] rounded-t-[10px]">
          <div className="inline-flex items-center gap-[5px] bg-[var(--bg-tertiary)] group-hover:bg-[var(--bg-quaternary)] transition-colors px-[8px] py-[3px] rounded-full">
            <Users
              size={13}
              weight="regular"
              className="text-[var(--text-secondary)] shrink-0"
            />
            <span className="text-[12px] leading-[16px] tracking-[-0.1px] font-medium text-[var(--text-secondary)] whitespace-nowrap">
              {userCount.toLocaleString()}
            </span>
          </div>
        </div>
        {/* Inverted border-radius connector */}
        <div className="relative w-[10px] h-[10px]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0"
          >
            <path
              d="M0 0 Q0 10 10 10 L0 10 Z"
              className="fill-[var(--bg-secondary)] group-hover:fill-[var(--bg-tertiary)] transition-colors"
            />
          </svg>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-[var(--bg-secondary)] p-[12px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] w-full overflow-hidden transition-colors group-hover:bg-[var(--bg-tertiary)]">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[14px] leading-[20px] tracking-[-0.3px] font-medium text-[var(--text-primary)]">
            {name}
          </p>
          <p className="text-[12px] leading-[16px] tracking-[-0.1px] font-normal text-[var(--text-tertiary)] truncate">
            {description}
          </p>
        </div>

        {/* Events section */}
        {hasEvents && (
          <div className="flex flex-col gap-[8px] mt-[12px] pt-[12px] border-t border-[rgba(13,13,13,0.10)]">
            <EventTags events={eventsDone} label="Events Done" />
            <EventTags events={eventsNotDone} label="Events Not Done" />
          </div>
        )}
      </div>
    </div>
  );
};

export { CohortCard };
export type { EventInfo, CohortCardProps };
