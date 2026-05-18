import React, { useState, useMemo, useEffect } from "react";
import { format, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import { CalendarBlank } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {Button} from "@/components/ui/button"
type PresetOption = {
  label: string;
  getValue: () => DateRange;
};

interface DateRangePickerProps {
  fromDate?: string;
  toDate?: string;
  onDateRangeChange: (from?: string, to?: string) => void;
  className?: string;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  showIcon?: boolean;
  disableFutureDates?: boolean;
}

export function DateRangePicker({
  fromDate,
  toDate,
  onDateRangeChange,
  className,
  triggerClassName,
  align = "start",
  showIcon = true,
  disableFutureDates = false,
}: DateRangePickerProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("Custom");
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  const extractDateForDisplay = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    // Create date in local timezone for display
    return new Date(year, month - 1, day);
  };

  // Local state for date range (allows partial selection before applying)
  const [localDateRange, setLocalDateRange] = useState<DateRange | undefined>(
    fromDate || toDate
      ? {
          from: fromDate ? extractDateForDisplay(fromDate) : undefined,
          to: toDate ? extractDateForDisplay(toDate) : undefined,
        }
      : undefined
  );

  // Sync local state with props when they change externally
  useEffect(() => {
    setLocalDateRange(
      fromDate || toDate
        ? {
            from: fromDate ? extractDateForDisplay(fromDate) : undefined,
            to: toDate ? extractDateForDisplay(toDate) : undefined,
          }
        : undefined
    );
  }, [fromDate, toDate]);

  // Preset options for date picker
  const presetOptions: PresetOption[] = useMemo(
    () => [
      {
        label: "Today",
        getValue: () => ({
          from: dayjs().startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
      },
      {
        label: "Yesterday",
        getValue: () => ({
          from: dayjs().subtract(1, "day").startOf("day").toDate(),
          to: dayjs().subtract(1, "day").endOf("day").toDate(),
        }),
      },
      {
        label: "Last 7 days",
        getValue: () => ({
          from: dayjs().subtract(6, "day").startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
      },
      {
        label: "Last 14 days",
        getValue: () => ({
          from: dayjs().subtract(13, "day").startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
      },
      {
        label: "This month",
        getValue: () => ({
          from: dayjs().startOf("month").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
      },
      {
        label: "Last 30 days",
        getValue: () => ({
          from: dayjs().subtract(29, "day").startOf("day").toDate(),
          to: dayjs().endOf("day").toDate(),
        }),
      },
    ],
    []
  );

  const handlePresetSelect = (preset: PresetOption) => {
    const range = preset.getValue();
    if (!range.from || !range.to) return;

    setSelectedPreset(preset.label);
    setHoveredDate(undefined);

    const fromYear = range.from.getFullYear();
    const fromMonth = String(range.from.getMonth() + 1).padStart(2, '0');
    const fromDay = String(range.from.getDate()).padStart(2, '0');
    
    const toYear = range.to.getFullYear();
    const toMonth = String(range.to.getMonth() + 1).padStart(2, '0');
    const toDay = String(range.to.getDate()).padStart(2, '0');

    const fromDate = `${fromYear}-${fromMonth}-${fromDay}`;
    const toDate = `${toYear}-${toMonth}-${toDay}`;

    onDateRangeChange(fromDate, toDate);
    setDatePickerOpen(false);
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setSelectedPreset("Custom");

    if (!!selectedDate?.from && !!selectedDate?.to) {
      const currentRangeExists = localDateRange?.from && localDateRange?.to;
      const clickedDateIsNew =
        currentRangeExists &&
        selectedDate.to.getTime() !== localDateRange.from!.getTime() &&
        selectedDate.to.getTime() !== localDateRange.to!.getTime();

      if (clickedDateIsNew) {
        setLocalDateRange({
          from: startOfDay(selectedDate.to),
          to: undefined,
        });
        setHoveredDate(undefined);
      } else {
        const displayRange = {
          from: startOfDay(selectedDate.from),
          to: startOfDay(selectedDate.to), // Keep display as start of day
        };
        setLocalDateRange(displayRange);
        setHoveredDate(undefined);

        setTimeout(() => {
          const fromYear = displayRange.from.getFullYear();
          const fromMonth = String(displayRange.from.getMonth() + 1).padStart(2, '0');
          const fromDay = String(displayRange.from.getDate()).padStart(2, '0');
          
          const toYear = displayRange.to.getFullYear();
          const toMonth = String(displayRange.to.getMonth() + 1).padStart(2, '0');
          const toDay = String(displayRange.to.getDate()).padStart(2, '0');

          const fromDate = `${fromYear}-${fromMonth}-${fromDay}`;
          const toDate = `${toYear}-${toMonth}-${toDay}`;

          onDateRangeChange(fromDate, toDate);
          setDatePickerOpen(false);
        }, 100);
      }
    } else if (selectedDate?.from) {
      setLocalDateRange({
        from: startOfDay(selectedDate.from),
        to: undefined,
      });
    } else {
      setLocalDateRange(undefined);
      setHoveredDate(undefined);
    }
  };

  const handleClearDates = () => {
    setSelectedPreset("Custom");
    setLocalDateRange(undefined);
    onDateRangeChange(undefined, undefined);
    setDatePickerOpen(false);
  };

  const handleDayMouseEnter = (day: Date) => {
    if (localDateRange?.from && !localDateRange?.to) {
      setHoveredDate(day);
    }
  };

  const previewRange = useMemo(() => {
    if (localDateRange?.from && !localDateRange?.to && hoveredDate) {
      // Handle both directions - hovering before or after the selected date
      const fromTime = localDateRange.from.getTime();
      const hoveredTime = hoveredDate.getTime();
      return {
        from: fromTime <= hoveredTime ? localDateRange.from : hoveredDate,
        to: fromTime <= hoveredTime ? hoveredDate : localDateRange.from,
      };
    }
    return undefined;
  }, [localDateRange?.from, localDateRange?.to, hoveredDate]);

  const getDateRangeLabel = () => {
    if (localDateRange?.from && localDateRange?.to) {
      const isSameDay = dayjs(localDateRange.from).isSame(dayjs(localDateRange.to), "day");
      if (isSameDay) {
        return dayjs(localDateRange.from).isSame(dayjs(), "day")
          ? "Today"
          : format(localDateRange.from, "MMM d");
      }
      const fromStr = format(localDateRange.from, "MMM d");
      const toStr = dayjs(localDateRange.to).isSame(dayjs(), "day")
        ? "Today"
        : format(localDateRange.to, "MMM d");
      return `${fromStr} - ${toStr}`;
    }
    if (localDateRange?.from) {
      return `From ${format(localDateRange.from, "MMM d")}`;
    }
    return "Select dates";
  };

  // Create disabled matcher for future dates
  const disabledMatcher = disableFutureDates 
    ? { after: new Date() } 
    : undefined;


  return (
    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
      <PopoverTrigger asChild>
        <Button
        variant="secondary"
        leftIcon= {showIcon && (
            <CalendarBlank size={18} className="text-icon-tertiary" />
          )}
          className={cn('border-none',
            triggerClassName
          )}
        >
          <span className="text-xs text-secondary tracking-[0.15px]">
            {getDateRangeLabel()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", className)} align={align}>
        <div className="flex">
          {/* Presets sidebar */}
          <div className="w-[160px] border-r border-default p-2 flex flex-col">
            <div className="space-y-1 flex-1">
              <button
                onClick={() => setSelectedPreset("Custom")}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                  selectedPreset === "Custom"
                    ? "bg-interactive-surface-default text-white"
                    : "text-secondary hover:bg-alpha-5"
                )}
              >
                Custom
              </button>
              {presetOptions.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                    selectedPreset === preset.label
                      ? "bg-interactive-surface-default text-white"
                      : "text-secondary hover:bg-alpha-5"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            {(fromDate || localDateRange?.from) && (
              <div className="mt-2 pt-2 border-t border-default">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleClearDates}
                  className="w-full"
                >
                  Clear selection
                </Button>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="flex flex-col">
            <div className="m-2 mb-0 flex items-center justify-between">
              <p className="ml-3 text-sm text-tertiary">
                {localDateRange?.from && localDateRange?.to
                  ? `${format(localDateRange.from, "dd/MM/yyyy")} – ${format(localDateRange.to, "dd/MM/yyyy")}`
                  : localDateRange?.from
                    ? `From ${format(localDateRange.from, "dd/MM/yyyy")}`
                    : "Select date or range"}
              </p>
            </div>
            <div onMouseLeave={() => setHoveredDate(undefined)}>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={localDateRange?.from}
                selected={localDateRange}
                onSelect={handleDateSelect}
                onDayMouseEnter={handleDayMouseEnter}
                numberOfMonths={2}
                disabled={disabledMatcher}
                modifiers={
                  previewRange
                    ? {
                        preview: (day: Date) => {
                          const time = startOfDay(day).getTime();
                          const fromTime = startOfDay(previewRange.from).getTime();
                          const toTime = startOfDay(previewRange.to).getTime();
                          return time >= fromTime && time <= toTime;
                        },
                      }
                    : {}
                }
                modifiersClassNames={{
                  preview: "!bg-alpha-15 rounded-sm",
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
