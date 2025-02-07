import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

type DatePickerWithRangeProps = {
  className?: string;
  date?: DateRange;
  onChange: (date: any) => void;
};

export default function InputDateRangePicker({
  className,
  date,
  onChange,
}: // onChange,
Readonly<DatePickerWithRangeProps>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: date?.from,
    to: date?.to,
  });

  const [open, setOpen] = React.useState(false);

  const applyDate = () => {
    onChange(dateRange);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
          <div className="flex justify-end w-full pb-2 pe-2">
            <Button onClick={applyDate}>
              <span className="text-sm">Apply</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
