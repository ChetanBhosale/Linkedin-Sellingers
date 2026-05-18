import { Domain } from "@/data/project";
import { useDomainStatus } from "@/hooks/use-domain-status";
import { cn } from "@/lib/utils";
import { CircleNotch, Check, Warning } from "@phosphor-icons/react";
import { DropdownMenuItem } from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface DomainMenuItemProps {
  domain: Domain;
  projectId: string;
  selectedDomainId: number | null;
  onDomainSelect: (domainId: number) => void;
}

export const DomainMenuItem = ({
  domain,
  projectId,
  selectedDomainId,
  onDomainSelect
}: DomainMenuItemProps) => {
  const { data: status, isLoading } = useDomainStatus(projectId, domain.id);
  const hasSSL = status?.ssl === true;
  const isDisabled = (!hasSSL && !isLoading) || isLoading;
  const isSelected = selectedDomainId === domain.id;

  return (
    <DropdownMenuItem
      onClick={() => {
        if (!isDisabled && hasSSL) {
          onDomainSelect(domain.id);
        }
      }}
      className={cn(
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
      onSelect={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
      rightIcon={
        isSelected && !isLoading ? (
          <Check className="h-4 w-4 text-interactive-surface-default" weight="bold" />
        ) : null
      }
    >
      <span className="flex items-center gap-2 text-body-md">
        {domain.name}
        {domain.is_primary && (
          <span className="rounded bg-secondary px-2 py-0.5 text-caption text-tertiary">Primary</span>
        )}
        {isLoading && (
          <CircleNotch className="h-3.5 w-3.5 text-interactive-surface-default animate-spin" weight="bold" />
        )}
        {!isLoading && !hasSSL && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex">
                  <Warning className="h-4 w-4 text-status-warning" weight="fill" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>SSL certificate not generated. Please wait or check domain settings.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>
    </DropdownMenuItem>
  );
};







